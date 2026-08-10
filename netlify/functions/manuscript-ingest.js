// manuscript-ingest.js
// Node 1 — Ingestion: accepts plain text, splits into chapters, stores in Supabase
// POST body: { text: string, title: string, authorName: string, authToken?: string }
// Returns: { manuscriptId, chapters: [{ number, title, wordCount }] }

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// ── Chapter Splitter ─────────────────────────────────────────
// Priority 1: detect standard chapter headings
// Priority 2: fall back to 3,000-word chunks
const CHAPTER_PATTERNS = [
  /^(chapter\s+[\d]+(?:[\s:—\-]+.+)?)/im,
  /^(chapter\s+(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)(?:[\s:—\-]+.+)?)/im,
  /^([\d]+\.\s+[A-Z][^\n]{2,60})/m,
  /^(PART\s+[\d\w]+(?:[\s:—\-]+.+)?)/im,
];

function splitIntoChapters(text) {
  const lines = text.split('\n');
  const chapters = [];
  let currentTitle = 'Opening';
  let currentLines = [];
  let chapterNum = 0;

  // Build a map of line indices that are chapter headings
  const headingIndices = new Set();
  const headingTitles = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    for (const pattern of CHAPTER_PATTERNS) {
      const match = line.match(pattern);
      if (match) {
        headingIndices.add(i);
        headingTitles[i] = line;
        break;
      }
    }
  }

  if (headingIndices.size === 0) {
    // No headings found — split by 3,000-word chunks
    const words = text.split(/\s+/).filter(Boolean);
    const chunkSize = 3000;
    let chunkNum = 0;
    for (let i = 0; i < words.length; i += chunkSize) {
      chunkNum++;
      const chunk = words.slice(i, i + chunkSize).join(' ');
      chapters.push({
        chapter_number: chunkNum,
        chapter_title: `Part ${chunkNum}`,
        raw_text: chunk,
        word_count: Math.min(chunkSize, words.length - i),
        status: 'pending',
      });
    }
    return chapters;
  }

  // Split on detected headings
  for (let i = 0; i < lines.length; i++) {
    if (headingIndices.has(i) && currentLines.length > 0) {
      chapterNum++;
      const body = currentLines.join('\n').trim();
      if (body.length > 0) {
        const words = body.split(/\s+/).filter(Boolean).length;
        chapters.push({
          chapter_number: chapterNum,
          chapter_title: currentTitle,
          raw_text: body,
          word_count: words,
          status: 'pending',
        });
      }
      currentTitle = headingTitles[i] || `Chapter ${chapterNum + 1}`;
      currentLines = [];
    } else if (headingIndices.has(i)) {
      currentTitle = headingTitles[i] || `Chapter ${chapterNum + 1}`;
    } else {
      currentLines.push(lines[i]);
    }
  }

  // Push final chapter
  if (currentLines.length > 0) {
    chapterNum++;
    const body = currentLines.join('\n').trim();
    if (body.length > 0) {
      const words = body.split(/\s+/).filter(Boolean).length;
      chapters.push({
        chapter_number: chapterNum,
        chapter_title: currentTitle,
        raw_text: body,
        word_count: words,
        status: 'pending',
      });
    }
  }

  return chapters.length > 0 ? chapters : [{
    chapter_number: 1,
    chapter_title: 'Full Manuscript',
    raw_text: text.trim(),
    word_count: text.split(/\s+/).filter(Boolean).length,
    status: 'pending',
  }];
}

// ── Supabase helpers ─────────────────────────────────────────
async function supabaseInsert(table, data, authToken) {
  const token = authToken || SUPABASE_SERVICE_KEY;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase insert ${table} failed: ${err}`);
  }
  return res.json();
}

// ── Handler ──────────────────────────────────────────────────
exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: 'Method not allowed' }) };

  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  const { text, title, authorName, authToken } = body;
  if (!text || typeof text !== 'string' || text.trim().length < 100) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'text must be at least 100 characters' }) };
  }
  if (!title) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'title is required' }) };
  }

  try {
    // 1. Split into chapters
    const chapters = splitIntoChapters(text.trim());

    // 2. Create manuscript record
    const [manuscript] = await supabaseInsert('manuscripts', {
      title: title.trim(),
      author_name: authorName || 'Unknown Author',
      status: 'uploaded',
      total_chapters: chapters.length,
      polished_count: 0,
    }, authToken);

    const manuscriptId = manuscript.id;

    // 3. Insert all chapters
    const chapterRows = chapters.map(ch => ({ ...ch, manuscript_id: manuscriptId }));
    await supabaseInsert('manuscript_chapters', chapterRows, authToken);

    // 4. Return summary
    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({
        manuscriptId,
        title: manuscript.title,
        totalChapters: chapters.length,
        totalWords: chapters.reduce((sum, ch) => sum + ch.word_count, 0),
        chapters: chapters.map(ch => ({
          number: ch.chapter_number,
          title: ch.chapter_title,
          wordCount: ch.word_count,
        })),
      }),
    };
  } catch (err) {
    console.error('manuscript-ingest error:', err);
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: String(err) }) };
  }
};

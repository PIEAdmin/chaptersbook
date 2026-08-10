// manuscript-diagnose.js
// Node 2 — Diagnostic: analyzes first chapter + outline to extract Tone DNA
// POST body: { manuscriptId: string, authToken?: string }
// Returns: { toneDna: { primary_tone, vocabulary_level, pacing, core_themes, developmental_feedback } }

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// ── Supabase helpers ─────────────────────────────────────────
function sbHeaders(authToken) {
  const token = authToken || SUPABASE_SERVICE_KEY;
  return {
    apikey: SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

async function sbGet(path, authToken) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: sbHeaders(authToken) });
  if (!res.ok) throw new Error(`Supabase GET ${path} failed: ${await res.text()}`);
  return res.json();
}

async function sbPatch(table, id, data, authToken) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH',
    headers: { ...sbHeaders(authToken), Prefer: 'return=representation' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Supabase PATCH ${table} failed: ${await res.text()}`);
  return res.json();
}

// ── OpenAI call ──────────────────────────────────────────────
async function callGPT(systemPrompt, userPrompt) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 800,
      response_format: { type: 'json_object' },
    }),
  });
  if (!res.ok) throw new Error(`OpenAI error: ${await res.text()}`);
  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

// ── Handler ──────────────────────────────────────────────────
exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: 'Method not allowed' }) };

  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  const { manuscriptId, authToken } = body;
  if (!manuscriptId) return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'manuscriptId required' }) };

  if (!OPENAI_API_KEY) return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: 'OpenAI API key not configured' }) };

  try {
    // Fetch manuscript + chapters
    const [manuscript] = await sbGet(`manuscripts?id=eq.${manuscriptId}&select=*`, authToken);
    if (!manuscript) return { statusCode: 404, headers: CORS, body: JSON.stringify({ error: 'Manuscript not found' }) };

    const chapters = await sbGet(
      `manuscript_chapters?manuscript_id=eq.${manuscriptId}&select=chapter_number,chapter_title,raw_text&order=chapter_number.asc`,
      authToken
    );
    if (!chapters.length) return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'No chapters found for this manuscript' }) };

    // Build outline + first chapter sample
    const outline = chapters.map(ch => `Chapter ${ch.chapter_number}: ${ch.chapter_title}`).join('\n');
    const firstChapter = chapters[0].raw_text.slice(0, 4000); // ~800-word sample

    // Mark as diagnosing
    await sbPatch('manuscripts', manuscriptId, { status: 'diagnosing' }, authToken);

    const systemPrompt = `You are an elite Big Five developmental editor. The user will provide a raw manuscript chapter and chapter outline. Your task is NOT to rewrite it, but to extract its DNA.

Output ONLY a valid JSON object with this exact structure:
{
  "primary_tone": "e.g., Conversational, Academic, Witty, Somber, Inspirational",
  "vocabulary_level": "e.g., Middle school, High school, College, Post-graduate",
  "pacing": "e.g., Fast and urgent, Methodical, Slow and reflective, Erratic",
  "sentence_style": "e.g., Short punchy sentences, Long flowing prose, Mixed rhythm",
  "core_themes": ["Theme 1", "Theme 2", "Theme 3"],
  "stylistic_quirks": ["Quirk 1 the editor must preserve", "Quirk 2"],
  "developmental_feedback": "A 3-sentence summary of the manuscript's key structural opportunities (show-don't-tell, pacing issues, transitions, etc.)"
}`;

    const userPrompt = `Book title: "${manuscript.title}"
Author: ${manuscript.author_name}

Chapter Outline:
${outline}

First Chapter Sample:
---
${firstChapter}
---

Extract the manuscript DNA.`;

    const toneDna = await callGPT(systemPrompt, userPrompt);

    // Save tone DNA + update status
    await sbPatch('manuscripts', manuscriptId, {
      tone_dna: toneDna,
      status: 'polishing',
    }, authToken);

    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({ manuscriptId, toneDna }),
    };
  } catch (err) {
    console.error('manuscript-diagnose error:', err);
    await sbPatch('manuscripts', manuscriptId, { status: 'error', error_message: String(err) }, authToken).catch(() => {});
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: String(err) }) };
  }
};

// Netlify serverless function — Real AI story generation via OpenAI GPT-4o
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'OpenAI API key not configured' }) };
  }

  let params;
  try {
    params = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { mode, recipientType, recipientName, occasion, qa, tone, length } = params;
  const name = recipientName || 'You';
  const numChapters = ({ short: 4, medium: 5, long: 6 }[length] ?? 5);

  const toneDesc = {
    warm: 'warm, loving, and heartfelt',
    funny: 'humorous, playful, and witty with light jokes',
    formal: 'elegant, dignified, and literary',
    inspire: 'uplifting, motivational, and inspiring',
  }[tone] || 'warm and heartfelt';

  const recipientDesc = {
    child: 'a child', grandchild: 'a grandchild', future: 'your future self',
    teacher: 'a beloved teacher', other: 'someone special',
  }[recipientType] || 'someone special';

  const answeredQA = (qa || []).filter(p => p.answer && p.answer.trim().length > 0);
  const qaText = answeredQA.map((p, i) => `Q${i+1}: ${p.question}\nA: ${p.answer}`).join('\n\n');

  const systemPrompt = `You are a master storyteller and ghostwriter specializing in personal, meaningful storybooks. 
You create deeply personal, emotionally resonant books that feel like treasured keepsakes.
Your writing style is ${toneDesc}.
Always write in flowing prose — no bullet points, no headers within chapters.
Each chapter should be 150-250 words of beautiful, personal narrative.`;

  const userPrompt = `Create a personalized storybook with exactly ${numChapters} chapters.

Context:
- This book is ${mode === 'group' ? 'a group tribute book' : 'a solo personal book'} for ${recipientDesc} named "${name}"
- Occasion: ${occasion || 'a special moment'}
- Tone: ${toneDesc}
- Length: ${length} (${numChapters} chapters)

Personal details shared by the author:
${qaText || 'Write from the heart with universal themes of love, growth, and connection.'}

Return ONLY valid JSON in this exact format:
{
  "title": "A beautiful, personal book title",
  "subtitle": "${occasion || 'A Story Written With Love'}",
  "dedication": "A heartfelt one-sentence dedication",
  "chapters": [
    {
      "number": 1,
      "title": "Chapter title",
      "prose": "Full chapter prose text (150-250 words of flowing narrative)..."
    }
  ]
}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.85,
        max_tokens: 4000,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('OpenAI error:', err);
      return { statusCode: 502, body: JSON.stringify({ error: 'AI generation failed', detail: err }) };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return { statusCode: 502, body: JSON.stringify({ error: 'Empty AI response' }) };

    const book = JSON.parse(content);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(book),
    };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal error', detail: String(err) }) };
  }
};

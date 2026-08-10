// manuscript-polish.js
// Node 3 — Iterative Polish: line-edits one chapter using the Tone DNA
// POST body: { manuscriptId: string, chapterNumber: number, authToken?: string }
// Returns: { chapterNumber, chapterTitle, polishedText, wordCount }

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const CORS = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type','Content-Type':'application/json'};
function sbHeaders(authToken){const token=authToken||SUPABASE_SERVICE_KEY;return {apikey:SUPABASE_SERVICE_KEY,Authorization:`Bearer ${token}`,'Content-Type':'application/json'};}
async function sbGet(path,authToken){const res=await fetch(`${SUPABASE_URL}/rest/v1/${path}`,{headers:sbHeaders(authToken)});if(!res.ok)throw new Error(`Supabase GET failed: ${await res.text()}`);return res.json();}
async function sbPatch(table,filter,data,authToken){const res=await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}`,{method:'PATCH',headers:{...sbHeaders(authToken),Prefer:'return=representation'},body:JSON.stringify(data)});if(!res.ok)throw new Error(`Supabase PATCH failed: ${await res.text()}`);return res.json();}
async function callGPT(systemPrompt,userPrompt){const res=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:'gpt-4o',messages:[{role:'system',content:systemPrompt},{role:'user',content:userPrompt}],temperature:0.4,max_tokens:4000})});if(!res.ok)throw new Error(`OpenAI error: ${await res.text()}`);const data=await res.json();return data.choices[0].message.content;}
exports.handler=async(event)=>{if(event.httpMethod==='OPTIONS')return{statusCode:204,headers:CORS,body:''};if(event.httpMethod!=='POST')return{statusCode:405,headers:CORS,body:JSON.stringify({error:'Method not allowed'})};let body;try{body=JSON.parse(event.body);}catch{return{statusCode:400,headers:CORS,body:JSON.stringify({error:'Invalid JSON'})};}const{manuscriptId,chapterNumber,authToken}=body;if(!manuscriptId||chapterNumber===undefined)return{statusCode:400,headers:CORS,body:JSON.stringify({error:'manuscriptId and chapterNumber required'})};if(!OPENAI_API_KEY)return{statusCode:500,headers:CORS,body:JSON.stringify({error:'OpenAI API key not configured'})};try{const[manuscript]=await sbGet(`manuscripts?id=eq.${manuscriptId}&select=title,author_name,tone_dna,total_chapters`,authToken);if(!manuscript)return{statusCode:404,headers:CORS,body:JSON.stringify({error:'Manuscript not found'})};if(!manuscript.tone_dna)return{statusCode:400,headers:CORS,body:JSON.stringify({error:'Run manuscript-diagnose first to generate Tone DNA'})};const[chapter]=await sbGet(`manuscript_chapters?manuscript_id=eq.${manuscriptId}&chapter_number=eq.${chapterNumber}&select=*`,authToken);if(!chapter)return{statusCode:404,headers:CORS,body:JSON.stringify({error:`Chapter ${chapterNumber} not found`})};await sbPatch('manuscript_chapters',`manuscript_id=eq.${manuscriptId}&chapter_number=eq.${chapterNumber}`,{status:'polishing'},authToken);const dna=manuscript.tone_dna;const systemPrompt=`You are a master line editor preparing a manuscript for Amazon KDP publishing.

You will receive a raw chapter and the author's Tone DNA profile. Follow these directives with precision:

TONE DNA (MUST BE PRESERVED):
- Primary tone: ${dna.primary_tone}
- Vocabulary level: ${dna.vocabulary_level}
- Pacing: ${dna.pacing}
- Sentence style: ${dna.sentence_style}
- Core themes: ${(dna.core_themes||[]).join(', ')}
- Stylistic quirks to PRESERVE: ${(dna.stylistic_quirks||[]).join('; ')}

EDITING DIRECTIVES:
1. PRESERVE the author's original meaning, voice, and stylistic quirks above. Do not homogenize. Do not make it sound like a generic AI.
2. Fix all grammatical errors, spelling mistakes, and awkward phrasing.
3. Eliminate repetitive word choices and redundant sentences.
4. Improve sentence rhythm and paragraph-to-paragraph flow.
5. Apply KDP Markdown formatting:
   - Use # for the Chapter Title (first line only)
   - Use standard paragraph breaks (blank line between paragraphs)
   - Do NOT use bullet points, bold, italic, or subheadings unless they existed in the original
6. Do NOT add new content, scenes, or information the author did not write.
7. Output ONLY the polished chapter text in Markdown. No commentary, no preamble, no explanations.`;const userPrompt=`Book: "${manuscript.title}" by ${manuscript.author_name}
Chapter ${chapterNumber}: ${chapter.chapter_title}

RAW CHAPTER TEXT:
---
${chapter.raw_text}
---

Polish this chapter now.`;const polishedText=await callGPT(systemPrompt,userPrompt);const wordCount=polishedText.split(/\s+/).filter(Boolean).length;await sbPatch('manuscript_chapters',`manuscript_id=eq.${manuscriptId}&chapter_number=eq.${chapterNumber}`,{polished_text:polishedText,status:'complete',word_count:wordCount},authToken);const[updated]=await sbGet(`manuscripts?id=eq.${manuscriptId}&select=polished_count,total_chapters`,authToken);const newCount=(updated.polished_count||0)+1;const allDone=newCount>=updated.total_chapters;await sbPatch('manuscripts',`id=eq.${manuscriptId}`,{polished_count:newCount,...(allDone?{status:'compiling'}:{})},authToken);return{statusCode:200,headers:CORS,body:JSON.stringify({manuscriptId,chapterNumber,chapterTitle:chapter.chapter_title,wordCount,polishedText,allChaptersPolished:allDone,progress:`${newCount}/${updated.total_chapters}`})};}catch(err){console.error('manuscript-polish error:',err);await sbPatch('manuscript_chapters',`manuscript_id=eq.${manuscriptId}&chapter_number=eq.${chapterNumber}`,{status:'error'},authToken).catch(()=>{});return{statusCode:500,headers:CORS,body:JSON.stringify({error:String(err)})};}};

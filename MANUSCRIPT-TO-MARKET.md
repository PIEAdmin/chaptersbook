# Manuscript to Market — Pipeline Reference

## Overview
5-node AI pipeline that takes a raw manuscript (.txt or plain text) and outputs:
- A fully polished, KDP-formatted Markdown document
- A complete Amazon KDP launch package (description, keywords, BISAC, social posts)

## Pipeline Flow

```
[Ingest] → [Diagnose] → [Polish × N chapters] → [Compile] → [Metadata]
```

## API Endpoints

All endpoints: `POST https://chaptersbook.com/.netlify/functions/<function-name>`

### 1. manuscript-ingest
```json
{
  "text": "full manuscript plain text",
  "title": "Book Title",
  "authorName": "Author Name",
  "authToken": "optional-supabase-jwt"
}
```
**Returns:** `{ manuscriptId, totalChapters, totalWords, chapters[] }`

### 2. manuscript-diagnose
```json
{ "manuscriptId": "uuid", "authToken": "optional" }
```
**Returns:** `{ toneDna }` — saves Tone DNA to Supabase

### 3. manuscript-polish (call once per chapter)
```json
{ "manuscriptId": "uuid", "chapterNumber": 1, "authToken": "optional" }
```
**Returns:** `{ polishedText, progress }` — call for chapters 1 through N

### 4. manuscript-compile
```json
{ "manuscriptId": "uuid", "authToken": "optional" }
```
**Returns:** `{ markdown, stats }` — full KDP-formatted Markdown

### 5. manuscript-metadata
```json
{ "manuscriptId": "uuid", "authToken": "optional" }
```
**Returns:** Amazon description, 7 keywords, BISAC categories, 3 social posts

## Environment Variables Required
Set in Netlify Site Settings → Environment Variables:
- `OPENAI_API_KEY` ✅ already set
- `SUPABASE_URL` — set to `https://lqnefcvdrdvpsqefrpml.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY` — get from Supabase Dashboard → Settings → API → service_role key
  *(more secure than anon key for server-side operations)*

## Supabase Setup
Run `supabase-schema-manuscripts.sql` in Supabase SQL Editor to create:
- `manuscripts` table
- `manuscript_chapters` table
- RLS policies for both

## Status Tracking
Manuscript statuses: `uploaded → diagnosing → polishing → compiling → metadata → complete`
Chapter statuses: `pending → polishing → complete`

## Phase 2 Additions (Planned)
- `.docx` file upload (mammoth.js parsing in lambda)
- EPUB + DOCX download generation (Pandoc via external service or pre-built binary)
- ChaptersBook Pro UI — drag-and-drop upload, progress dashboard, download buttons

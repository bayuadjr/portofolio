# Portfolio & Personal Notebook

Personal portfolio and intellectual notebook for Bayu Adji Ramadhan, bringing together formal work (research, software tools, business systems) and informal notes (essays and field journal entries).

## Stack

- **Frontend:** React 19, Vite 8, React Router 7
- **Styling:** CSS custom properties (`src/index.css`) + CSS Modules
- **CMS:** Sanity v5 (`@sanity/client`, `@portabletext/react`, `@sanity/image-url`) with lazy-loaded Sanity Studio at `/studio`
- **Fallback Data:** Local fallback modules in `src/data/` so primary pages remain readable if the CMS is unreachable

## Structure

- `src/pages/Home.jsx`: Overview, current interests, featured & recent work, recent writing, currently exploring, and contact CTA
- `src/pages/Work.jsx` & `src/pages/ProjectDetail/`: Category-filtered work index (`Research`, `Software & Tools`, `Product & Business`) and detailed case study views
- `src/pages/Adventure.jsx` & `src/pages/AdventureDetail/`: Beyond / Field Journal for visual notes and informal observations
- `src/pages/Writing.jsx` & `src/pages/PostDetail/`: Essays, reading notes, references, and related entries
- `src/pages/About.jsx`: Narrative background, education, honors, current activities, research interests, tools/methods, and timeline
- `src/pages/Contact.jsx`: Starter-note email composer and external links
- `src/sanity/schemaTypes/`: Non-breaking `project`, `post`, and `glimpse` Sanity document schemas

## Development

Install dependencies:

```bash
npm install
```

Configure environment variables by copying `.env.example` to `.env`:

```bash
cp .env.example .env
```

Available scripts:

- `npm run dev`: Start the local Vite development server
- `npm run lint`: Run ESLint across the repository
- `npm run build`: Build production static assets into `dist/`
- `npm run preview`: Preview the production build locally

## Environment Variables

See `.env.example`:

- `VITE_SANITY_PROJECT_ID`: Sanity project ID (defaults to `ee61qwkf`)
- `VITE_SANITY_DATASET`: Sanity dataset name (defaults to `production`)
- `VITE_EMAIL`: Target email address used by the Contact composer

## Deployment

Configured for Vercel via `vercel.json` with single-page application rewrites and HTTP security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`).

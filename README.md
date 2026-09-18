# MD. FOISAL IQBAL — Portfolio

A personal portfolio built with Next.js App Router, React, TypeScript and Tailwind CSS. Dark navy surfaces, mint accents, animated orbital artwork, responsive skill cards and scroll reveals. Uses the owner's supplied biography, education, skills and contact details; no invented projects, employers or proficiency percentages.

## Status

Source code is available on `feat/foisal-portfolio`. The original `main` branch is unchanged until the pull request is merged. Lint, type-check, production build and browser tests have **not been executed in the authoring environment**, which has GitHub access but no command runner. Review and execute the checks below before merging or publishing. No live deployment is claimed.

## Requirements

Node.js 22 or a newer compatible LTS version and npm. No database, authentication service or paid API is required.

## Local setup

```bash
git clone https://github.com/dropmagnetx420/Portfolio.git
cd Portfolio
git switch feat/foisal-portfolio
npm install
npm run dev
```

Open http://localhost:3000.

Dependency ranges intentionally stay within the specified major versions and resolve available compatible patches at install time. This environment cannot run npm to generate a verified lockfile. After a successful installation and verification, commit the generated `package-lock.json` for reproducible installs; subsequent CI installations should use `npm ci`. Check dependency advisories with `npm audit` and review any findings rather than using forced upgrades blindly.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm start
```

Keep the production server running, then use a second terminal:

```bash
npm test
```

The build command includes lint and TypeScript checks before `next build`. Browser tests require a running server. They cover profile details, contact links, anchor destinations, keyboard-operated mobile navigation, 320px horizontal overflow, reduced motion, and browser errors. To test a deployed preview, set `PLAYWRIGHT_BASE_URL` to its actual URL before running tests. A protected preview may require authentication and is not automatically bypassed.

## Deploy on Vercel

Review the draft pull request, run checks and merge it into `main` when ready. Then import this GitHub repository into Vercel. Do not import the original README-only main branch before merging, unless explicitly configuring the feature branch for the deployment.

| Setting | Value |
| --- | --- |
| Framework preset | Next.js |
| Root directory | Repository root |
| Build command | `npm run build` |
| Output directory | Next.js default |
| Install command | `npm install` until a lockfile is committed; then `npm ci` |
| Node.js | 22.x or a newer compatible LTS version |
| Required environment variables | None |

Alternatively, use the Vercel CLI from a checked-out copy of the feature branch to create a preview. Do not mark the deployment as production until the build and browser checks pass. No `vercel.json` is required for this standard Next.js application.

## Add your photo

The chat portrait was visible but had no directly usable image-file URL. The application uses an intentional FI monogram rather than a broken image or an unrelated stock photo.

Add your chosen portrait to `public/profile.jpg`. Set the following in `.env.local`, or in Vercel project environment variables, and rebuild:

```dotenv
NEXT_PUBLIC_PROFILE_IMAGE=/profile.jpg
```

Only same-site absolute paths are accepted by the page. The existing Next.js Image component crops the portrait within the card and falls back to the initials artwork if loading fails. An environment variable beginning with `NEXT_PUBLIC_` is public, so never store secrets there. The photo file must be committed separately before deploying with this variable.

## Content and behavior

| Area | Editing location or behavior |
| --- | --- |
| Name and introduction | `app/page.tsx` |
| Skills, education and languages | Arrays at the top of `app/page.tsx` |
| Colors, layout and animations | `app/globals.css` |
| SEO and sharing metadata | `app/layout.tsx` |
| Contact | Email and telephone links open the visitor's own applications |
| Clipboard | Copy-email button reports success or explains a permission failure |
| Resume | Print / Save résumé opens the browser print dialog with a print stylesheet |
| Motion | Respects the operating system's reduced-motion preference |
| Photo | Optional local asset configured as described above |

The contact section does not pretend to submit a form or send email from a server. There is no fictional CV download, no made-up social profile link, no analytics and no third-party font request. The print action formats the portfolio content; it is not the original DOCX resume.

Tailwind CSS is the conventional name for the user's supplied Tailwind skill. All education completion dates and availability are owner-provided. The phone number and email are intentionally public portfolio content; remove them before publication if that is not desired.

## Manual review before publishing

| Check | Expected behavior |
| --- | --- |
| Mobile widths | Test 320px, 390px, 768px and desktop; no horizontal scrolling |
| Keyboard | Visible focus, working skip link, menu toggle and Escape dismissal |
| Animation | Reduced-motion preference disables movement and leaves content visible |
| Navigation | Each section link reaches the correct content |
| Contact | Email and telephone values match the owner's information |
| Clipboard | Verify both allowed and denied clipboard permission paths |
| Portrait | Verify both configured portrait and missing-file fallback |
| Print | Preview printable content before saving as PDF |
| Build | Lint, type-check, production build and Playwright suite pass |

## Setup references

Official Next.js installation documentation: https://nextjs.org/docs/app/getting-started/installation

Official Tailwind CSS Next.js guide: https://tailwindcss.com/docs/guides/nextjs

Retrieved 2026-09-18. Exact installed dependency versions are determined by npm and should be captured in the generated lockfile.

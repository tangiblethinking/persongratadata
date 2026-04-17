# The Persona Project — Portfolio Case Study

**Christopher Kenreigh · Sr. Director of UX Design**

A production-grade, interactive portfolio case study documenting the design and deployment of a centralized, generative persona system at Plexus Worldwide.

## Stack
- Vite + React
- Framer Motion (animations)
- MUI Icons / Material Icons Round
- Google Fonts: Syne + DM Sans

## Local Dev
```bash
npm install
npm run dev
```

## Deploy to Vercel
1. Push this repo to GitHub
2. Import repo at vercel.com/new
3. Framework: Vite (auto-detected)
4. Deploy — no env vars needed

## Adding Images
Each section has a clearly marked image placeholder. To add an image, replace the placeholder `<div>` with:
```jsx
<img src="YOUR_IMAGE_URL" alt="description" style={{ width:'100%', borderRadius:16, objectFit:'cover' }} />
```

Image slots are in:
- `ProblemSection.jsx`
- `ToolSection.jsx`
- `HowItWorksSection.jsx`
- `PersonaTiersSection.jsx` (+ each tier's side sheet)
- `DepartmentUseSection.jsx`
- `ValidationSection.jsx`
- `OrgAdoptionSection.jsx`
- `OutcomesSection.jsx`

# Niruni Prabhasha - Portfolio

A responsive portfolio website built with React and Vite.

## Run it locally
1. Install Node.js (LTS) from https://nodejs.org
2. In this folder, open a terminal and run:
```
npm install
npm run dev
```
3. Open the address it prints (usually http://localhost:5173).

## Where to edit things
- Text, projects, skills, notes, links, CV file name: `src/data.js`
- Page layout and components: `src/App.jsx`
- Colors, fonts, spacing: `src/styles.css` (colors are at the top, in `:root`)
- Profile photos: `public/photos/` (then list them in `PHOTOS` in `src/data.js`)
- Project screenshots: `public/projects/` (then set `img` on the project in `src/data.js`)
- Your CV: replace `public/Niruni-Prabhasha-CV.pdf` with your latest PDF (same name)

## Build for production
```
npm run build
```
The finished site is created in the `dist` folder. Deploy it on Netlify (build command `npm run build`, publish directory `dist`).

## Tech
React 18, Vite 5, plain CSS.

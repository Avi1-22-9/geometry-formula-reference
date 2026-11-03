# Geometry

A searchable reference of core 2D and 3D geometry formulas, made for competitive exam preparation such as SSC, RRB and bank exams.

## Features

- 2D plane figures and 3D solids
- Search by figure, formula, symbol or note
- Category navigation, formula details, variable definitions, units and conditions
- Reference notes for π, angles, slant height and common area/volume units

## Run locally

Requires Node.js and npm.

```sh
npm install
npm run dev
```

Build the static app with `npm run build`; Vite writes the production bundle to `dist/`.

## Project structure

- `src/lib/formulas2d.js` and `src/lib/formulas3d.js`: formula records
- `src/lib/formulas.js`: figure data, symbol glossary, units and search matching
- `src/App.jsx`: reference app interface
- `src/components/Glyph.jsx`: figure illustrations
- `src/index.css`: global styles
- `index.html`: document metadata and app entry

## Formula scope

The reference includes triangle variants, quadrilaterals, circles, sectors and regular polygons, plus standard polyhedra and round solids. Conditions are stated alongside formulas, including parallel bases for trapezia, degree/radian sector forms, right cylinders and cones, and slant versus vertical height.

## Privacy and deployment

This source snapshot contains only the app code and public formula content. It does not include account data, database credentials, or the private Folk database helper. The original app remains on Folk at https://geometry-nr6f.folkapps.com. This GitHub repository is a public source-code copy and does not itself make the original Folk app public.

## License

No license is included. All rights remain with the respective rights holders unless a license is added.

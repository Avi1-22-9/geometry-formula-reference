import { figures2d } from "./formulas2d.js";
import { figures3d } from "./formulas3d.js";

export const DIMS = {
  "2D": { label: "2D figures", categories: ["Triangles", "Quadrilaterals", "Circles", "Polygons"] },
  "3D": { label: "3D solids", categories: ["Polyhedra", "Round solids"] },
};

export const KIND_ORDER = ["Perimeter", "Lateral", "Total", "Area", "Volume", "Other"];

export const figures = [
  ...figures2d.map((f) => ({ ...f, dim: "2D" })),
  ...figures3d.map((f) => ({ ...f, dim: "3D" })),
];

export const GLOSSARY = [
  ["π", "Pi, the ratio of circumference to diameter. Exact in formulas; 22/7 or 3.1416 are approximations only."],
  ["a, b, c", "Side lengths of a polygon or triangle."],
  ["l, b, h", "Length, breadth and height of a box or rectangle."],
  ["r", "Radius (circle, sphere, cone base, cylinder base)."],
  ["d", "Diameter, or a diagonal, as labelled in each record."],
  ["h", "Perpendicular (vertical) height. Never a slanted side."],
  ["l (cone, frustum)", "Slant height: distance along the curved surface from apex or top rim to the base rim."],
  ["θ", "Angle. Degrees use θ/360; radians use the direct form."],
  ["s", "Semiperimeter of a triangle: (a + b + c) / 2."],
  ["r_a", "Apothem of a regular polygon: distance from centre to the midpoint of a side."],
  ["n", "Number of sides of a regular polygon."],
];

export const UNITS = [
  ["Length", "m, cm, mm. Perimeters, sides, radii, heights."],
  ["Area", "m², cm². Surface areas and plane regions."],
  ["Volume", "m³, cm³. Solids and capacity (1 cm³ = 1 mL)."],
];

export function recordMatches(record, q) {
  return [record.name, record.kind, record.eq, record.note, ...record.vars.flat()]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

export function figureMatches(figure, q) {
  const needle = q.trim().toLowerCase();
  if (!needle) return { matches: true, records: figure.records };
  const head = [figure.name, figure.category, figure.blurb, figure.dim].join(" ").toLowerCase();
  const records = figure.records.filter((r) => recordMatches(r, needle));
  const headerHit = head.includes(needle);
  return { matches: headerHit || records.length > 0, records: headerHit ? figure.records : records };
}

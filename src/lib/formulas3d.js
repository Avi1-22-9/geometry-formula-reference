// 3D solids. Record: [kind, name, equation, variables, note].
// Kinds: "Lateral" (curved surface), "Total" (surface), "Volume", "Other".
// Cylinder, cone, prism, pyramid and frustum formulas assume right/regular forms.
const R = (kind, name, eq, vars, note = "") => ({ kind, name, eq, vars, note });

export const figures3d = [
  {
    id: "cube", category: "Polyhedra", name: "Cube", shape: "cube",
    blurb: "Six equal square faces, twelve equal edges.",
    records: [
      R("Total", "Total surface area", "T = 6a²", [["a", "edge length", "length"]]),
      R("Volume", "Volume", "V = a³", [["a", "edge length", "length"]]),
      R("Other", "Space diagonal", "d = a√3", [["d", "diagonal through the solid", "length"], ["a", "edge length", "length"]]),
    ],
  },
  {
    id: "cuboid", category: "Polyhedra", name: "Cuboid (rectangular prism)", shape: "cuboid",
    blurb: "Six rectangular faces. Opposite faces are equal.",
    records: [
      R("Lateral", "Lateral surface area", "L = 2h(l + b)", [["l", "length", "length"], ["b", "breadth", "length"], ["h", "height", "length"]], "Four side faces only."),
      R("Total", "Total surface area", "T = 2(lb + bh + hl)", [["l, b, h", "the three edges", "length"]]),
      R("Volume", "Volume", "V = l × b × h", [["l, b, h", "the three edges", "length"]]),
      R("Other", "Space diagonal", "d = √(l² + b² + h²)", [["d", "diagonal through the solid", "length"]]),
    ],
  },
  {
    id: "cylinder", category: "Round solids", name: "Right circular cylinder", shape: "cylinder",
    blurb: "Two equal circular ends joined by a curved side. Formulas assume a right cylinder.",
    records: [
      R("Lateral", "Curved surface area", "C = 2πrh", [["r", "radius of the base", "length"], ["h", "height", "length"]], "Curved surface only, without the two circular ends."),
      R("Total", "Total surface area", "T = 2πr(r + h)", [["r", "radius", "length"], ["h", "height", "length"]], "Curved surface plus two circles, 2πr² in total."),
      R("Volume", "Volume", "V = πr²h", [["r", "radius", "length"], ["h", "height", "length"]]),
    ],
  },
  {
    id: "cone", category: "Round solids", name: "Right circular cone", shape: "cone",
    blurb: "A circular base tapering to an apex above the base centre.",
    records: [
      R("Other", "Slant height", "l = √(r² + h²)", [["l", "slant height: from the apex to a point on the base rim", "length"], ["r", "base radius", "length"], ["h", "vertical height (apex to base centre)", "length"]], "Slant height is not the vertical height h."),
      R("Lateral", "Curved surface area", "C = πrl", [["r", "base radius", "length"], ["l", "slant height", "length"]]),
      R("Total", "Total surface area", "T = πr(l + r)", [["r", "base radius", "length"], ["l", "slant height", "length"]], "Curved surface plus base circle."),
      R("Volume", "Volume", "V = ⅓πr²h", [["r", "base radius", "length"], ["h", "vertical height", "length"]], "A cone is one third of the cylinder with the same base and height."),
    ],
  },
  {
    id: "sphere", category: "Round solids", name: "Sphere", shape: "sphere",
    blurb: "All points at the same distance r from the centre.",
    records: [
      R("Total", "Surface area", "A = 4πr²", [["r", "radius", "length"]], "A sphere has only one surface, so its curved and total surface areas are the same."),
      R("Volume", "Volume", "V = (4/3)πr³", [["r", "radius", "length"]]),
    ],
  },
  {
    id: "hemisphere", category: "Round solids", name: "Hemisphere", shape: "hemisphere",
    blurb: "Half of a sphere, cut by a flat circular face.",
    records: [
      R("Lateral", "Curved surface area", "C = 2πr²", [["r", "radius", "length"]], "Curved half only."),
      R("Total", "Total surface area", "T = 3πr²", [["r", "radius", "length"]], "Curved half plus the flat circle πr²."),
      R("Volume", "Volume", "V = (2/3)πr³", [["r", "radius", "length"]]),
    ],
  },
  {
    id: "prism", category: "Polyhedra", name: "Prism (general)", shape: "prism",
    blurb: "Two congruent, parallel polygon ends joined by rectangles. Right prism assumed.",
    records: [
      R("Lateral", "Lateral surface area", "L = P × h", [["P", "perimeter of the base polygon", "length"], ["h", "height (distance between the bases)", "length"]], "For a right prism, the side faces are rectangles."),
      R("Total", "Total surface area", "T = L + 2 × B", [["L", "lateral surface area", "area"], ["B", "area of one base", "area"]]),
      R("Volume", "Volume", "V = B × h", [["B", "area of one base", "area"], ["h", "height", "length"]]),
    ],
  },
  {
    id: "pyramid", category: "Polyhedra", name: "Pyramid (general)", shape: "pyramid",
    blurb: "A polygon base with triangular faces meeting at an apex. Regular pyramid assumed for slant height.",
    records: [
      R("Lateral", "Lateral surface area (regular)", "L = ½ × P × l", [["P", "perimeter of the base", "length"], ["l", "slant height of a triangular face", "length"]], "Only for a regular pyramid, where the apex is above the base centre."),
      R("Total", "Total surface area", "T = L + B", [["L", "lateral surface area", "area"], ["B", "area of the base", "area"]]),
      R("Volume", "Volume", "V = ⅓ × B × h", [["B", "area of the base", "area"], ["h", "perpendicular height from apex to base", "length"]], "Works for any pyramid, not only regular ones."),
    ],
  },
  {
    id: "frustum", category: "Round solids", name: "Frustum of a right circular cone", shape: "frustum",
    blurb: "A cone with its tip cut off by a plane parallel to the base.",
    records: [
      R("Other", "Slant height", "l = √((R − r)² + h²)", [["l", "slant height along the curved side", "length"], ["R, r", "radii of the bottom and top circles", "length"], ["h", "vertical height between the two circles", "length"]], "Use the vertical height, not the slanted side, inside the root."),
      R("Lateral", "Curved surface area", "C = π(R + r)l", [["R, r", "bottom and top radii", "length"], ["l", "slant height", "length"]]),
      R("Total", "Total surface area", "T = π(R² + r² + (R + r)l)", [["R, r", "bottom and top radii", "length"], ["l", "slant height", "length"]], "Curved surface plus both circular ends."),
      R("Volume", "Volume", "V = ⅓πh(R² + Rr + r²)", [["R, r", "bottom and top radii", "length"], ["h", "vertical height", "length"]]),
    ],
  },
];

// 2D plane figures. Record: [kind, name, equation, variables, note].
// variables: [symbol, meaning, unit]. π is exact; 22/7 and 3.1416 are approximations only.
const R = (kind, name, eq, vars, note = "") => ({ kind, name, eq, vars, note });

export const figures2d = [
  {
    id: "triangle", category: "Triangles", name: "Triangle (general)", shape: "triangle",
    blurb: "Any three-sided figure. Use base and height, or Heron's formula.",
    records: [
      R("Perimeter", "Perimeter", "P = a + b + c", [["a, b, c", "the three sides", "length"]], "Works for every triangle."),
      R("Area", "Area, base and height", "A = ½ × b × h", [["b", "base", "length"], ["h", "perpendicular height to that base", "length"]], "h is the perpendicular drop from the opposite vertex to the base line, not a slanted side."),
      R("Area", "Area, Heron's formula", "A = √(s(s − a)(s − b)(s − c))", [["s", "semiperimeter = (a + b + c) / 2", "length"], ["a, b, c", "the three sides", "length"]], "Use when the height is not known. The sides must satisfy the triangle inequality."),
    ],
  },
  {
    id: "equilateral", category: "Triangles", name: "Equilateral triangle", shape: "equilateral",
    blurb: "All three sides and all three angles (60°) are equal.",
    records: [
      R("Perimeter", "Perimeter", "P = 3a", [["a", "side length", "length"]]),
      R("Area", "Area", "A = (√3 / 4) a²", [["a", "side length", "length"]]),
      R("Other", "Height", "h = (√3 / 2) a", [["h", "altitude from a vertex to the opposite side", "length"], ["a", "side length", "length"]], "The altitude also bisects the opposite side."),
    ],
  },
  {
    id: "right-triangle", category: "Triangles", name: "Right-angled triangle", shape: "right",
    blurb: "One angle is 90°. The two legs are perpendicular to each other.",
    records: [
      R("Perimeter", "Perimeter", "P = p + q + r", [["p, q", "the two legs", "length"], ["r", "hypotenuse", "length"]]),
      R("Area", "Area", "A = ½ × p × q", [["p, q", "the two legs (base and height)", "length"]], "The legs are the perpendicular sides, so no extra height is needed."),
      R("Other", "Hypotenuse (Pythagoras)", "r = √(p² + q²)", [["r", "hypotenuse, opposite the right angle", "length"], ["p, q", "the two legs", "length"]]),
      R("Other", "Inradius", "r_in = (p + q − r) / 2", [["r_in", "radius of the inscribed circle", "length"]], "Holds only for right-angled triangles."),
    ],
  },
  {
    id: "square", category: "Quadrilaterals", name: "Square", shape: "square",
    blurb: "Four equal sides and four right angles.",
    records: [
      R("Perimeter", "Perimeter", "P = 4a", [["a", "side length", "length"]]),
      R("Area", "Area", "A = a²", [["a", "side length", "length"]]),
      R("Other", "Diagonal", "d = a√2", [["d", "diagonal", "length"], ["a", "side length", "length"]], "The diagonals are equal, bisect each other, and cross at right angles."),
    ],
  },
  {
    id: "rectangle", category: "Quadrilaterals", name: "Rectangle", shape: "rectangle",
    blurb: "Opposite sides are equal and all four angles are right angles.",
    records: [
      R("Perimeter", "Perimeter", "P = 2(l + b)", [["l", "length (longer side)", "length"], ["b", "breadth (shorter side)", "length"]], "A square is the case l = b."),
      R("Area", "Area", "A = l × b", [["l", "length", "length"], ["b", "breadth", "length"]]),
      R("Other", "Diagonal", "d = √(l² + b²)", [["d", "diagonal", "length"], ["l, b", "sides", "length"]], "From Pythagoras on a right triangle formed by a diagonal."),
    ],
  },
  {
    id: "parallelogram", category: "Quadrilaterals", name: "Parallelogram", shape: "parallelogram",
    blurb: "Opposite sides are parallel and equal. Angles are not right angles in general.",
    records: [
      R("Perimeter", "Perimeter", "P = 2(a + b)", [["a, b", "adjacent sides", "length"]]),
      R("Area", "Area, base and height", "A = b × h", [["b", "base", "length"], ["h", "perpendicular height to that base", "length"]], "h is perpendicular to the base, not the slanted side."),
      R("Area", "Area, two sides and angle", "A = a × b × sin θ", [["a, b", "adjacent sides", "length"], ["θ", "angle between them", "angle"]], "θ is the angle between sides a and b."),
    ],
  },
  {
    id: "rhombus", category: "Quadrilaterals", name: "Rhombus", shape: "rhombus",
    blurb: "All four sides are equal. Diagonals bisect each other at right angles.",
    records: [
      R("Perimeter", "Perimeter", "P = 4a", [["a", "side length", "length"]]),
      R("Area", "Area from diagonals", "A = ½ × d₁ × d₂", [["d₁, d₂", "the two diagonals", "length"]], "Usually the fastest form in problems."),
      R("Area", "Area, base and height", "A = a × h", [["a", "side length (base)", "length"], ["h", "perpendicular height", "length"]]),
      R("Other", "Side from diagonals", "a = √((d₁/2)² + (d₂/2)²)", [["a", "side length", "length"], ["d₁, d₂", "the two diagonals", "length"]]),
    ],
  },
  {
    id: "trapezium", category: "Quadrilaterals", name: "Trapezium (trapezoid)", shape: "trapezium",
    blurb: "Exactly one pair of opposite sides is parallel. Those are the bases.",
    records: [
      R("Perimeter", "Perimeter", "P = a + b + c + d", [["a, b", "the parallel sides (bases)", "length"], ["c, d", "the two non-parallel sides (legs)", "length"]]),
      R("Area", "Area", "A = ½ × (a + b) × h", [["a, b", "parallel sides (bases)", "length"], ["h", "perpendicular distance between the bases", "length"]], "h is the perpendicular height, not a leg."),
      R("Other", "Median (mid-segment)", "m = (a + b) / 2", [["m", "line joining midpoints of the legs", "length"]], "Area also equals m × h."),
    ],
  },
  {
    id: "kite", category: "Quadrilaterals", name: "Kite", shape: "kite",
    blurb: "Two pairs of equal adjacent sides. Diagonals cross at right angles.",
    records: [
      R("Perimeter", "Perimeter", "P = 2(a + b)", [["a, b", "the two distinct side lengths", "length"]], "Each length appears twice."),
      R("Area", "Area from diagonals", "A = ½ × d₁ × d₂", [["d₁", "main diagonal (joins the two unequal angles)", "length"], ["d₂", "cross diagonal (joins the two equal angles)", "length"]], "Valid because the diagonals are perpendicular."),
    ],
  },
  {
    id: "circle", category: "Circles", name: "Circle", shape: "circle",
    blurb: "All points at the same distance r from the centre.",
    records: [
      R("Perimeter", "Circumference", "C = 2πr = πd", [["r", "radius", "length"], ["d", "diameter = 2r", "length"]]),
      R("Area", "Area", "A = πr²", [["r", "radius", "length"]]),
    ],
  },
  {
    id: "semicircle", category: "Circles", name: "Semicircle", shape: "semicircle",
    blurb: "Half of a circle, bounded by an arc and the diameter.",
    records: [
      R("Perimeter", "Perimeter (arc + diameter)", "P = πr + 2r = r(π + 2)", [["r", "radius", "length"]], "The curved arc alone is πr."),
      R("Area", "Area", "A = ½ × πr²", [["r", "radius", "length"]]),
    ],
  },
  {
    id: "sector", category: "Circles", name: "Sector", shape: "sector",
    blurb: "A slice of a circle between two radii. The angle can be in degrees or radians.",
    records: [
      R("Other", "Arc length, θ in degrees", "l = (θ/360) × 2πr", [["θ", "central angle in degrees", "angle"], ["r", "radius", "length"]], "Here θ is in degrees, so the fraction is θ/360. Sector perimeter = 2r + l."),
      R("Area", "Area, θ in degrees", "A = (θ/360) × πr²", [["θ", "central angle in degrees", "angle"], ["r", "radius", "length"]]),
      R("Other", "Arc length, θ in radians", "l = rθ", [["θ", "central angle in radians", "angle"], ["r", "radius", "length"]], "Here θ is in radians. Do not mix with the degree form."),
      R("Area", "Area, θ in radians", "A = ½ × r² × θ", [["θ", "central angle in radians", "angle"], ["r", "radius", "length"]]),
    ],
  },
  {
    id: "polygon", category: "Polygons", name: "Regular polygon", shape: "polygon",
    blurb: "n equal sides and n equal angles. Its centre is equidistant from all vertices.",
    records: [
      R("Perimeter", "Perimeter", "P = n × a", [["n", "number of sides", "count"], ["a", "side length", "length"]]),
      R("Other", "Interior angle", "θ_int = (n − 2) × 180° / n", [["n", "number of sides", "count"]], "Each interior angle is the same for a regular polygon."),
      R("Area", "Area from apothem", "A = ½ × P × r_a", [["P", "perimeter", "length"], ["r_a", "apothem: distance from centre to midpoint of a side", "length"]], "The apothem is perpendicular to a side."),
      R("Area", "Area from side length", "A = (n × a²) / (4 × tan(π/n))", [["n", "number of sides", "count"], ["a", "side length", "length"]], "Here π/n is in radians. Use the apothem form when r_a is given."),
    ],
  },
];

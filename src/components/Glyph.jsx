import { motion } from "framer-motion";

const SHAPES = {
  triangle: <path d="M10 50 L44 50 L24 16 Z" />,
  equilateral: <path d="M8 48 L56 48 L32 6 Z" />,
  right: <path d="M12 50 L50 50 L12 14 Z" />,
  square: <rect x="14" y="14" width="36" height="36" />,
  rectangle: <rect x="8" y="20" width="48" height="26" />,
  parallelogram: <path d="M16 46 L52 46 L44 18 L8 18 Z" />,
  rhombus: <path d="M32 6 L56 32 L32 58 L8 32 Z" />,
  trapezium: <path d="M18 18 L46 18 L56 48 L8 48 Z" />,
  kite: <path d="M32 6 L50 26 L32 58 L14 26 Z" />,
  circle: <circle cx="32" cy="32" r="24" />,
  semicircle: <path d="M8 46 L56 46 A24 24 0 0 0 8 46 Z" />,
  sector: <path d="M32 32 L32 8 A24 24 0 0 1 53 44 Z" />,
  polygon: <path d="M32 6 L55 22 L47 50 L17 50 L9 22 Z" />,
  cube: <path d="M14 22 L36 22 L36 44 L14 44 Z M14 22 L24 12 L46 12 L36 22 M36 22 L46 12 L46 34 L36 44 M36 44 L46 34" />,
  cuboid: <path d="M8 26 L38 26 L38 48 L8 48 Z M8 26 L18 16 L50 16 L38 26 M38 26 L50 16 L50 38 L38 48" />,
  cylinder: <path d="M14 18 L14 46 A18 6 0 0 0 50 46 L50 18 M14 18 A18 6 0 0 1 50 18 A18 6 0 0 1 14 18" />,
  cone: <path d="M32 6 L52 46 A20 6 0 0 1 12 46 Z M12 46 A20 6 0 0 0 52 46" />,
  sphere: <circle cx="32" cy="32" r="24" />,
  hemisphere: <path d="M8 36 A24 24 0 0 1 56 36 Z M8 36 A24 6 0 0 0 56 36" />,
  prism: <path d="M10 26 L24 14 L54 14 L54 42 L40 54 L10 54 Z M10 26 L40 26 L40 54 M40 26 L54 14" />,
  pyramid: <path d="M32 8 L54 48 L10 48 Z M32 8 L26 48" />,
  frustum: <path d="M20 14 L44 14 L56 50 L8 50 Z M20 14 A12 3 0 0 1 44 14" />,
};

export default function Glyph({ shape, layoutId, size = 56, tone = "#0075de" }) {
  return (
    <motion.span
      layoutId={layoutId}
      className="inline-grid shrink-0 place-items-center rounded-lg bg-white shadow-[0_0_0_1px_#e6e6e6]"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" width={size * 0.7} height={size * 0.7} fill="none" stroke="#1f1e1c" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        <g fill={tone} fillOpacity="0.14" stroke={tone}>{SHAPES[shape]}</g>
      </svg>
    </motion.span>
  );
}

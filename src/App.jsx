import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { MagnifyingGlass, X, CaretLeft, CaretRight, Info } from "@phosphor-icons/react";
import Glyph from "./components/Glyph.jsx";
import { DIMS, KIND_ORDER, GLOSSARY, UNITS, figures, figureMatches } from "./lib/formulas.js";

const SPRING = { type: "spring", stiffness: 420, damping: 36, mass: 0.9 };
const SOFT = { type: "spring", stiffness: 260, damping: 30 };
const PREF_KEY = "geometry:dim";

function useLocalDim() {
  const [dim, setDim] = useState(() => {
    try {
      const v = localStorage.getItem(PREF_KEY);
      return v === "2D" || v === "3D" ? v : "2D";
    } catch {
      return "2D";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(PREF_KEY, dim);
    } catch {
      /* storage can be unavailable; the preference is optional */
    }
  }, [dim]);
  return [dim, setDim];
}

function RollingCount({ value }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      key={value}
      initial={reduce ? false : { y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={SPRING}
      className="tabular-nums"
    >
      {value}
    </motion.span>
  );
}

export default function App() {
  const reduce = useReducedMotion();
  const [dim, setDim] = useLocalDim();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  const [showNotes, setShowNotes] = useState(false);

  const categories = DIMS[dim].categories;
  const inDim = figures.filter((f) => f.dim === dim);
  const visible = useMemo(() => {
    return inDim
      .filter((f) => category === "All" || f.category === category)
      .map((f) => ({ figure: f, ...figureMatches(f, query) }))
      .filter((r) => r.matches);
  }, [inDim, category, query]);

  const selectDim = (next) => {
    setDim(next);
    setCategory("All");
  };

  const openFigure = figures.find((f) => f.id === openId);
  const openIndex = openFigure ? visible.findIndex((v) => v.figure.id === openFigure.id) : -1;

  const step = (delta) => {
    if (openIndex < 0 || visible.length === 0) return;
    const next = visible[(openIndex + delta + visible.length) % visible.length];
    setOpenId(next.figure.id);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!openFigure) return;
      if (e.key === "Escape") setOpenId(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="min-h-screen bg-canvas font-body text-ink">
      <header className="mx-auto max-w-5xl px-5 pt-10 pb-6 sm:px-8">
        <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">
          Formula reference
        </p>
        <h1 className="mt-2 font-display text-[44px] leading-[1.02] tracking-[-0.02em] sm:text-[56px]">
          Geometry
        </h1>
        <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-ink-2">
          Standard formulas for plane figures and solids, with their variables, units and conditions.
        </p>

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <LayoutGroup id="dim">
            <div role="tablist" aria-label="Figure type" className="relative inline-flex rounded-full bg-plate p-1">
              {Object.keys(DIMS).map((d) => {
                const active = d === dim;
                return (
                  <button
                    key={d}
                    role="tab"
                    aria-selected={active}
                    onClick={() => selectDim(d)}
                    className={`relative z-10 rounded-full px-5 py-2 text-[15px] font-medium transition-colors duration-200 ${
                      active ? "text-white" : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="dim-pill"
                        transition={reduce ? { duration: 0 } : SPRING}
                        className="absolute inset-0 -z-10 rounded-full bg-primary"
                      />
                    )}
                    {DIMS[d].label}
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <label className="relative flex w-full items-center sm:max-w-xs">
            <MagnifyingGlass size={18} className="pointer-events-none absolute left-3.5 text-muted" aria-hidden="true" />
            <span className="sr-only">Search figures and formulas</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search area, volume, radius"
              className="w-full rounded-full bg-surface py-2.5 pl-10 pr-4 text-[15px] shadow-[0_0_0_1px_#e6e6e6] placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
        </div>

        <div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by category">
          {["All", ...categories].map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                aria-pressed={active}
                onClick={() => setCategory(c)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-[14px] font-medium transition-colors duration-200 ${
                  active ? "bg-ink text-white" : "bg-surface text-ink-2 shadow-[0_0_0_1px_#e6e6e6] hover:text-ink"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
        <p className="mb-4 text-[14px] text-muted" aria-live="polite">
          <RollingCount value={visible.length} /> of {inDim.length} {dim === "2D" ? "figures" : "solids"}
          {query && ` match "${query.trim()}"`}
        </p>

        {visible.length === 0 ? (
          <div className="rounded-2xl bg-surface p-10 text-center shadow-lift">
            <p className="font-display text-[26px]">No match for “{query.trim()}”</p>
            <p className="mt-2 text-muted">Try a figure name like “cone”, or a term like “volume”.</p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="mt-5 rounded-full bg-primary px-5 py-2 text-[15px] font-medium text-white transition-transform duration-150 active:scale-[0.97]"
            >
              Clear search
            </button>
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false}>
              {visible.map(({ figure, records }, i) => (
                <motion.li
                  key={figure.id}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ ...SOFT, delay: reduce ? 0 : Math.min(i * 0.03, 0.3) }}
                >
                  <button
                    onClick={() => setOpenId(figure.id)}
                    className="group flex w-full items-center gap-4 rounded-2xl bg-surface p-4 text-left shadow-lift transition-transform duration-150 hover:-translate-y-px active:scale-[0.99]"
                  >
                    <Glyph shape={figure.shape} layoutId={`glyph-${figure.id}`} />
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                        {figure.category} · {records.length} {records.length === 1 ? "formula" : "formulas"}
                      </span>
                      <motion.span
                        layoutId={`title-${figure.id}`}
                        className="mt-0.5 block font-display text-[22px] leading-tight"
                      >
                        {figure.name}
                      </motion.span>
                      <span className="mt-1 block truncate text-[14px] text-muted">{figure.blurb}</span>
                    </span>
                    <CaretRight size={18} className="shrink-0 text-faint transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}

        <button
          onClick={() => setShowNotes(true)}
          className="mt-10 inline-flex items-center gap-2 text-[15px] font-medium text-primary underline-offset-4 hover:underline"
        >
          <Info size={18} aria-hidden="true" /> Symbols and units
        </button>
      </main>

      <AnimatePresence>
        {openFigure && (
          <FigureSheet
            key="figure"
            figure={openFigure}
            index={openIndex}
            total={visible.length}
            query={query}
            onClose={() => setOpenId(null)}
            onStep={step}
          />
        )}
        {showNotes && <NotesSheet key="notes" onClose={() => setShowNotes(false)} />}
      </AnimatePresence>
    </div>
  );
}

function Sheet({ children, onClose, label }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.2 }}
    >
      <button aria-label="Close" tabIndex={-1} onClick={onClose} className="absolute inset-0 bg-ink/30" />
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-label={label}
        initial={reduce ? false : { y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduce ? { opacity: 0 } : { y: 48, opacity: 0 }}
        transition={reduce ? { duration: 0 } : SPRING}
        className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-surface shadow-sheet sm:max-w-2xl sm:rounded-3xl"
      >
        {children}
      </motion.section>
    </motion.div>
  );
}

function FigureSheet({ figure, index, total, query, onClose, onStep }) {
  const reduce = useReducedMotion();
  const [dir, setDir] = useState(1);
  const groups = useMemo(() => {
    const matched = figureMatches(figure, query).records;
    return KIND_ORDER.map((k) => ({ kind: k, items: matched.filter((r) => r.kind === k) })).filter((g) => g.items.length);
  }, [figure, query]);

  const go = (d) => {
    setDir(d);
    onStep(d);
  };

  return (
    <Sheet onClose={onClose} label={figure.name}>
      <div className="flex items-center gap-3 border-b border-hairline px-5 py-4 sm:px-6">
        <button
          onClick={onClose}
          aria-label="Back to all figures"
          className="grid h-10 w-10 place-items-center rounded-full bg-plate transition-transform duration-150 active:scale-95"
        >
          <X size={18} aria-hidden="true" />
        </button>
        <p className="min-w-0 flex-1 truncate font-mono text-[12px] uppercase tracking-[0.1em] text-muted">
          {figure.category} · {index + 1} of {total}
        </p>
        <div className="flex gap-2">
          <button onClick={() => go(-1)} aria-label="Previous figure" disabled={total < 2} className="grid h-10 w-10 place-items-center rounded-full bg-plate transition-transform duration-150 active:scale-95 disabled:opacity-40">
            <CaretLeft size={18} aria-hidden="true" />
          </button>
          <button onClick={() => go(1)} aria-label="Next figure" disabled={total < 2} className="grid h-10 w-10 place-items-center rounded-full bg-plate transition-transform duration-150 active:scale-95 disabled:opacity-40">
            <CaretRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto px-5 pb-8 pt-6 sm:px-6">
        <div className="flex items-center gap-4">
          <Glyph shape={figure.shape} layoutId={`glyph-${figure.id}`} size={72} />
          <motion.h2 layoutId={`title-${figure.id}`} className="font-display text-[32px] leading-tight">
            {figure.name}
          </motion.h2>
        </div>
        <p className="mt-4 text-[16px] leading-relaxed text-ink-2">{figure.blurb}</p>

        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={figure.id}
            custom={dir}
            initial={reduce ? false : { opacity: 0, x: dir * 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -28 }}
            transition={reduce ? { duration: 0 } : SPRING}
            className="mt-6 space-y-6"
          >
            {groups.length === 0 && <p className="text-muted">No formulas match this search in this figure.</p>}
            {groups.map((g) => (
              <section key={g.kind} aria-label={`${g.kind} formulas`}>
                <h3 className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-muted">{g.kind}</h3>
                <div className="mt-2 space-y-3">
                  {g.items.map((r) => (
                    <article key={r.name + r.eq} className="rounded-2xl bg-canvas p-4">
                      <h4 className="text-[15px] font-semibold">{r.name}</h4>
                      <p className="mt-2 break-words font-mono text-[18px] text-ink">{r.eq}</p>
                      <dl className="mt-3 space-y-1.5 text-[14px]">
                        {r.vars.map(([sym, meaning, unit]) => (
                          <div key={sym + meaning} className="grid grid-cols-[auto_1fr] gap-x-3">
                            <dt className="font-mono font-semibold">{sym}</dt>
                            <dd className="text-ink-2">
                              {meaning} <span className="text-faint">({unit})</span>
                            </dd>
                          </div>
                        ))}
                      </dl>
                      {r.note && <p className="mt-3 border-t border-hairline pt-3 text-[14px] text-muted">{r.note}</p>}
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Sheet>
  );
}

function NotesSheet({ onClose }) {
  return (
    <Sheet onClose={onClose} label="Symbols and units">
      <div className="flex items-center gap-3 border-b border-hairline px-5 py-4 sm:px-6">
        <button onClick={onClose} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full bg-plate transition-transform duration-150 active:scale-95">
          <X size={18} aria-hidden="true" />
        </button>
        <p className="font-display text-[24px]">Symbols and units</p>
      </div>
      <div className="overflow-y-auto px-5 pb-8 pt-5 sm:px-6">
        <h3 className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-muted">Symbols</h3>
        <dl className="mt-2 divide-y divide-hairline">
          {GLOSSARY.map(([sym, meaning]) => (
            <div key={sym} className="grid grid-cols-[7rem_1fr] gap-3 py-2.5 text-[15px]">
              <dt className="font-mono font-semibold">{sym}</dt>
              <dd className="text-ink-2">{meaning}</dd>
            </div>
          ))}
        </dl>
        <h3 className="mt-7 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-muted">Units</h3>
        <dl className="mt-2 divide-y divide-hairline">
          {UNITS.map(([kind, note]) => (
            <div key={kind} className="grid grid-cols-[7rem_1fr] gap-3 py-2.5 text-[15px]">
              <dt className="font-semibold">{kind}</dt>
              <dd className="text-ink-2">{note}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-[14px] text-muted">
          π is exact in every formula. 22/7 and 3.1416 are only approximations for calculation.
        </p>
      </div>
    </Sheet>
  );
}

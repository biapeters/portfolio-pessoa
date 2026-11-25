import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { categories, projects } from '../../data/projects.js';
import ProjectCard from '../projects/ProjectCard.jsx';
import ProjectModal from '../projects/ProjectModal.jsx';
import Reveal from '../ui/Reveal.jsx';
import SectionTitle from '../ui/SectionTitle.jsx';

const GRID_LIMIT = 6;

export default function Projects() {
    const [filter, setFilter] = useState('todos');
    const [selected, setSelected] = useState(null);
    const closeModal = useCallback(() => setSelected(null), []);

    const visible = filter === 'todos' ? projects : projects.filter((p) => p.category === filter);

    // carrossel do celular: qual card está visível (para as bolinhas)
    const trackRef = useRef(null);
    const [active, setActive] = useState(0);
    const handleScroll = () => {
        const el = trackRef.current;
        const card = el?.firstElementChild;
        if (!card) return;
        const step = card.getBoundingClientRect().width + 16; // largura + gap-4
        setActive(Math.min(visible.length - 1, Math.round(el.scrollLeft / step)));
    };

    // grade (md+): mostra até GRID_LIMIT cards; o resto aparece com "Ver todos"
    const [expanded, setExpanded] = useState(false);
    const hiddenCount = expanded ? 0 : Math.max(0, visible.length - GRID_LIMIT);

    // ao trocar o filtro, volta o carrossel para o primeiro card e recolhe a grade
    useEffect(() => {
        trackRef.current?.scrollTo({ left: 0 });
        setActive(0);
        setExpanded(false);
    }, [filter]);

    return (
        <section id="projetos" className="scroll-mt-20 py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionTitle
                    eyebrow="// projetos"
                    title="Meus trabalhos até agora!"
                    description="Projetos profissionais, acadêmicos e pessoais. Toque ou clique em um card para ver os detalhes."
                />

                <Reveal className="mb-10 flex justify-center">
                    {/* no celular vira uma grade 2×2; a partir de sm, uma pílula só */}
                    <div
                        role="tablist"
                        aria-label="Filtrar projetos"
                        className="glass grid w-full max-w-sm grid-cols-2 gap-1 rounded-3xl p-1.5 sm:inline-flex sm:w-auto sm:max-w-none sm:rounded-full"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                role="tab"
                                aria-selected={filter === cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={`relative rounded-full px-4 py-2.5 text-sm font-semibold transition sm:px-5 sm:py-2 ${
                                    filter === cat.id ? 'text-white' : 'text-ink/60 hover:text-ink dark:text-violet-100/60 dark:hover:text-white'
                                }`}
                            >
                                {filter === cat.id && (
                                    <motion.span
                                        layoutId="filter-pill"
                                        className="absolute inset-0 rounded-full bg-linear-to-r from-lilac-500 to-lilac-300"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative">{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </Reveal>

                {/* celular: carrossel de arrastar pro lado; md: grade de 2 colunas; lg: 3 colunas */}
                <div
                    ref={trackRef}
                    onScroll={handleScroll}
                    aria-label="Projetos"
                    className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
                >
                    <AnimatePresence mode="popLayout">
                        {visible.map((project, i) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onOpen={setSelected}
                                // no grid (md+) mostra só os primeiros até clicar em "Ver todos"; no carrossel aparecem todos
                                className={!expanded && i >= GRID_LIMIT ? 'md:hidden' : ''}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {hiddenCount > 0 && (
                    <div className="mt-10 hidden justify-center md:flex">
                        <button
                            type="button"
                            onClick={() => setExpanded((v) => !v)}
                            aria-expanded={expanded}
                            className="rounded-full border-2 border-lilac-400 px-6 py-2.5 text-sm font-semibold text-lilac-700 transition hover:bg-lilac-400/10 dark:text-lilac-200"
                        >
                            {expanded ? 'Mostrar menos' : `Ver todos os projetos (+${hiddenCount})`}
                        </button>
                    </div>
                )}

                {/* indicador de posição do carrossel (só no celular) */}
                <div className="mt-5 flex items-center justify-center gap-1.5 md:hidden" aria-hidden="true">
                    {visible.map((project, i) => (
                        <span
                            key={project.id}
                            className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-lilac-400' : 'w-2 bg-lilac-400/30'}`}
                        />
                    ))}
                </div>
                <p className="mt-2 text-center text-xs text-ink/50 md:hidden dark:text-violet-100/50">
                    Arraste para o lado para ver mais →
                </p>
            </div>

            <AnimatePresence>
                {selected && <ProjectModal project={selected} onClose={closeModal} />}
            </AnimatePresence>
        </section>
    );
}

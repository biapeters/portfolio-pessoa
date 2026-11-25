import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { categories, projects } from '../../data/projects.js';
import ProjectCard from '../projects/ProjectCard.jsx';
import ProjectModal from '../projects/ProjectModal.jsx';
import Reveal from '../ui/Reveal.jsx';
import SectionTitle from '../ui/SectionTitle.jsx';

export default function Projects() {
    const [filter, setFilter] = useState('todos');
    const [selected, setSelected] = useState(null);
    const closeModal = useCallback(() => setSelected(null), []);

    const visible = filter === 'todos' ? projects : projects.filter((p) => p.category === filter);

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

                <motion.div layout className="grid gap-6 sm:gap-8 md:grid-cols-2">
                    <AnimatePresence mode="popLayout">
                        {visible.map((project) => (
                            <ProjectCard key={project.id} project={project} onOpen={setSelected} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            <AnimatePresence>
                {selected && <ProjectModal project={selected} onClose={closeModal} />}
            </AnimatePresence>
        </section>
    );
}

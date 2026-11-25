import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { experience } from '../../data/experience.js';
import Reveal from '../ui/Reveal.jsx';
import SectionTitle from '../ui/SectionTitle.jsx';
import Tags from '../ui/Tags.jsx';

function TimelineCard({ item }) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="glass rounded-3xl p-5 sm:p-9"
        >
            <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${
                    item.current ? 'bg-linear-to-r from-pink-600 to-peach' : 'bg-linear-to-r from-lilac-500 to-lilac-300'
                }`}
            >
                {item.badge}
            </span>
            <h3 className="mt-3 text-xl font-bold sm:text-2xl">{item.title}</h3>
            <p className="mb-5 font-medium text-lilac-700 dark:text-lilac-300">{item.subtitle}</p>

            {item.roles && (
                <ol className="mb-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3" aria-label="Cargos">
                    {item.roles.map((role) => (
                        <li
                            key={role.title}
                            className={`flex flex-col rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 ${
                                role.current
                                    ? 'border border-lilac-400 bg-lilac-400/15'
                                    : 'border border-dashed border-lilac-400/60 opacity-80'
                            }`}
                        >
                            <span className="font-semibold">{role.title}</span>
                            <span className="text-xs text-ink/60 sm:text-sm dark:text-violet-100/60">{role.period}</span>
                        </li>
                    ))}
                </ol>
            )}

            <p className="text-ink/75 dark:text-violet-100/75">{item.intro}</p>

            {item.brands && (
                <ul className="my-5 flex flex-wrap gap-2 sm:gap-3" aria-label="Marcas">
                    {item.brands.map((brand) => (
                        <motion.li
                            key={brand}
                            whileHover={{ scale: 1.06 }}
                            className="rounded-xl border border-lilac-300/60 bg-linear-to-br from-pink-50 to-violet-100 px-3.5 py-1.5 text-sm font-semibold sm:px-5 sm:py-2 sm:text-base dark:from-lilac-700/40 dark:to-lilac-500/20"
                        >
                            {brand}
                        </motion.li>
                    ))}
                </ul>
            )}

            {item.highlights && (
                <ul className="mb-6 space-y-3">
                    {item.highlights.map((h) => (
                        <li key={h.label} className="relative pl-5 text-[0.95rem] leading-relaxed text-ink/75 sm:pl-6 sm:text-base dark:text-violet-100/75">
                            <span className="absolute left-0 top-[0.6em] h-2 w-2 bg-lilac-300" aria-hidden="true" />
                            <strong className="text-ink dark:text-white">{h.label}:</strong> {h.text}
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-5">
                <Tags items={item.tags} />
            </div>
        </motion.div>
    );
}

export default function Experience() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <section id="experiencia" className="scroll-mt-20 py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionTitle eyebrow="// carreira" title="Experiência & formação" />

                <div ref={ref} className="relative mx-auto max-w-3xl pl-7 sm:pl-12">
                    {/* Linha da timeline que se desenha conforme a rolagem */}
                    <div className="absolute bottom-2 left-[9px] top-2 w-[3px] rounded-full bg-lilac-400/20" aria-hidden="true" />
                    <motion.div
                        style={{ scaleY }}
                        className="absolute bottom-2 left-[9px] top-2 w-[3px] origin-top rounded-full bg-linear-to-b from-lilac-400 via-candy to-peach"
                        aria-hidden="true"
                    />

                    <div className="space-y-10">
                        {experience.map((item, i) => (
                            <Reveal key={item.id} delay={i * 0.1} x={-30} y={0} className="relative">
                                <span
                                    className="absolute -left-7 top-7 h-[21px] w-[21px] sm:top-8 rounded-full border-4 border-lilac-400 bg-white shadow-[0_0_0_6px_rgba(160,140,245,0.2)] sm:-left-12 dark:bg-night"
                                    aria-hidden="true"
                                />
                                <TimelineCard item={item} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

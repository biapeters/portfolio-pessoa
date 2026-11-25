import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'motion/react';
import { profile } from '../../data/profile.js';
import { projects } from '../../data/projects.js';
import Reveal from '../ui/Reveal.jsx';
import SectionTitle from '../ui/SectionTitle.jsx';

function Counter({ to, from = 0 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const [value, setValue] = useState(from);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(from, to, {
            duration: 1.4,
            ease: 'easeOut',
            onUpdate: (v) => setValue(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, from, to]);

    return <span ref={ref}>{value}</span>;
}

const STATS = [
    { to: 3, label: 'marcas que cuido no dia a dia' },
    { to: projects.length, label: 'projetos publicados aqui' },
    { to: 2026, from: 2000, label: 'ano da formatura em IA 🎓' },
];

export default function About() {
    return (
        <section id="sobre" className="scroll-mt-20 py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionTitle eyebrow="// sobre mim" title="Quem sou eu?" />

                <div className="grid gap-8 lg:grid-cols-5">
                    <Reveal className="glass rounded-3xl p-6 sm:p-10 lg:col-span-3">
                        <div className="space-y-4 text-base leading-relaxed sm:text-lg text-ink/80 dark:text-violet-100/80">
                            <p>
                                Olá! Eu me chamo Bianca, sou apaixonada por tecnologia, design e games. Concluí o curso de
                                Tecnologia em Inteligência Artificial na PUCPR em dezembro de 2026.
                            </p>
                            <p>
                                Hoje trabalho no grupo <strong className="text-ink dark:text-white">Skelt Beauty Brands</strong>,
                                cuidando dos sites das marcas Skelt, Creamy e The Joy Lab na plataforma VTEX: desenvolvo
                                melhorias, corrijo bugs e acompanho os processos de pagamento das lojas.
                            </p>
                            <p>
                                Gosto de criar com atenção aos detalhes, clareza visual e um toque de feminilidade. Acredito
                                que tecnologia também pode ser sensível, acolhedora e inspiradora.
                            </p>
                            <p>
                                Meu objetivo é atuar em projetos que impactem positivamente a vida das pessoas. Estou aberta a
                                novas oportunidades e colaborações criativas.
                            </p>
                        </div>

                        <ul className="mt-8 flex flex-wrap gap-3" aria-label="Interesses">
                            {profile.interests.map((item) => (
                                <motion.li
                                    key={item}
                                    whileHover={{ rotate: [0, -6, 6, 0], scale: 1.08 }}
                                    transition={{ duration: 0.4 }}
                                    className="cursor-default rounded-xl border border-lilac-400/40 bg-lilac-300/15 px-4 py-2 font-medium"
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </Reveal>

                    {/* 3 números lado a lado no celular, empilhados ao lado do texto no desktop */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:col-span-2 lg:grid-cols-1">
                        {STATS.map((stat, i) => (
                            <Reveal key={stat.label} delay={0.1 * (i + 1)} x={30} y={0}>
                                <motion.div
                                    whileHover={{ y: -6 }}
                                    className="glass flex h-full flex-col justify-center rounded-2xl p-3 text-center sm:rounded-3xl sm:p-6 sm:text-left"
                                >
                                    <span className="text-gradient text-2xl font-extrabold min-[400px]:text-3xl sm:text-5xl">
                                        <Counter to={stat.to} from={stat.from} />
                                    </span>
                                    <span className="mt-1 text-xs leading-snug text-ink/70 sm:mt-2 sm:text-base dark:text-violet-100/70">{stat.label}</span>
                                </motion.div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

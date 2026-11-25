import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useDragControls } from 'motion/react';
import { profile } from '../../data/profile.js';
import Magnetic from '../ui/Magnetic.jsx';
import PixelAvatar from '../PixelAvatar/PixelAvatar.jsx';

const TITLE = ['Missão:', 'aprender,', 'criar', 'e', 'evoluir.'];

function RoleRotator() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2600);
        return () => clearInterval(id);
    }, []);

    return (
        <span className="relative inline-flex h-[1.6em] overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
                <motion.span
                    key={profile.roles[index]}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="font-semibold text-lilac-500 dark:text-lilac-300"
                >
                    {profile.roles[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

function PixelWindow() {
    const controls = useDragControls();

    return (
        <motion.div
            drag
            dragControls={controls}
            dragListener={false}
            dragSnapToOrigin
            dragElastic={0.4}
            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 120, damping: 14 }}
            className="w-full max-w-[230px] shrink-0 min-[400px]:max-w-[280px] [@media(max-height:500px)]:max-w-[230px] overflow-hidden rounded-2xl border-[3px] border-ink bg-white/70 shadow-[8px_8px_0_rgba(45,27,64,0.85)] backdrop-blur-xl sm:max-w-[340px] dark:border-lilac-300 dark:bg-night-2/80 dark:shadow-[8px_8px_0_rgba(201,155,255,0.55)]"
        >
            <div
                onPointerDown={(e) => controls.start(e)}
                className="flex cursor-grab touch-none items-center gap-1.5 border-b-[3px] border-ink bg-linear-to-r from-lilac-400 via-lilac-300 to-candy px-3.5 py-2.5 active:cursor-grabbing dark:border-lilac-300"
                title="Arraste a janela"
            >
                {[0, 1, 2].map((i) => (
                    <span key={i} className="h-2.5 w-2.5 border-2 border-ink bg-white" />
                ))}
                <span className="ml-auto font-pixel text-[0.55rem] text-ink">bia.exe</span>
            </div>
            <div className="bg-linear-to-b from-sky/15 to-candy/20 dark:from-night-2 dark:to-lilac-700/30">
                <PixelAvatar />
            </div>
        </motion.div>
    );
}

export default function Hero() {
    return (
        <section id="inicio" className="relative flex min-h-svh items-center pb-12 pt-24 sm:pb-16 sm:pt-28">
            <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-8 px-4 sm:gap-14 sm:px-6 md:flex-row md:justify-between md:gap-10 lg:gap-14">
                <div className="max-w-xl text-center md:text-left">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-lilac-400/40 bg-white/60 px-4 py-1.5 text-sm font-medium dark:bg-white/5"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        </span>
                        Olá, mundo! Bem-vindo(a) 👾
                    </motion.p>

                    <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl [@media(max-height:500px)]:text-4xl">
                        {TITLE.map((word, i) => (
                            <motion.span
                                key={word}
                                className={`mr-[0.25em] inline-block ${i === TITLE.length - 1 ? 'text-gradient' : ''}`}
                                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ delay: 0.15 + i * 0.09, duration: 0.5 }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-6 text-xl"
                    >
                        Oi, eu sou a Bianca, <RoleRotator />
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-4 text-base text-ink/70 sm:text-lg dark:text-violet-100/70"
                    >
                        Desenvolvo e cuido de e-commerces na VTEX e sou tecnóloga em Inteligência Artificial pela PUCPR.
                        Criar, errar, aprender, repetir e me divertir no caminho!
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.95 }}
                        className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-9 sm:gap-4 md:justify-start"
                    >
                        <Magnetic>
                            <a
                                href="#projetos"
                                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-lilac-500 to-lilac-300 px-7 py-3.5 font-semibold text-white shadow-lg shadow-lilac-400/40 transition hover:brightness-110"
                            >
                                Ver projetos
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a
                                href="#contato"
                                className="inline-flex items-center gap-2 rounded-full border-2 border-lilac-400 px-7 py-3 font-semibold text-lilac-700 transition hover:bg-lilac-400/10 dark:text-lilac-200"
                            >
                                Fale comigo
                            </a>
                        </Magnetic>
                    </motion.div>
                </div>

                <PixelWindow />
            </div>

            <motion.a
                href="#sobre"
                aria-label="Rolar para a seção Sobre"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block [@media(max-height:700px)]:hidden"
            >
                <span className="flex h-10 w-6 justify-center rounded-full border-2 border-ink/30 pt-2 dark:border-white/30">
                    <motion.span
                        className="h-2 w-1 rounded-full bg-lilac-500"
                        animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                    />
                </span>
            </motion.a>
        </section>
    );
}

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { asset } from '../../utils/asset.js';
import { CloseIcon, CodeIcon, ExternalIcon } from '../ui/Icons.jsx';
import Tags from '../ui/Tags.jsx';
import ProjectCover from './ProjectCover.jsx';

export default function ProjectModal({ project, onClose }) {
    const closeRef = useRef(null);

    // Fecha com Esc, trava a rolagem do fundo e foca o botão de fechar
    useEffect(() => {
        const previous = document.activeElement;
        const onKey = (e) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
            previous?.focus?.();
        };
    }, [onClose]);

    const { media, links } = project;

    return (
        <motion.div
            // flex + m-auto no filho: centraliza quando cabe e, quando o conteúdo é maior que a tela,
            // começa do topo e rola (com place-items-center o topo ficava cortado no celular)
            className="fixed inset-0 z-50 flex overflow-y-auto overscroll-contain bg-ink/60 p-3 backdrop-blur-sm sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative m-auto w-full max-w-3xl overflow-clip rounded-3xl bg-cream shadow-2xl sm:my-8 dark:bg-night-2"
            >
                {/* botão de fechar "grudado" no topo enquanto a pessoa rola o modal */}
                <div className="sticky top-0 z-10 flex h-0 justify-end">
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Fechar"
                        className="mr-3 mt-3 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/90 text-ink shadow transition hover:rotate-90 sm:mr-4 sm:mt-4"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {media.type === 'cover' ? (
                    <div className="aspect-[2.4/1] w-full">
                        <ProjectCover media={media} />
                    </div>
                ) : media.type === 'video' ? (
                    <video src={asset(media.src)} controls autoPlay muted playsInline className="aspect-video w-full bg-black" />
                ) : (
                    <img src={asset(media.src)} alt={media.alt} className="w-full bg-white" />
                )}

                <div className="p-5 sm:p-9">
                    <h3 id="modal-title" className="text-2xl font-bold sm:text-3xl">{project.title}</h3>
                    {project.role && (
                        <p className="mt-2 font-pixel text-[0.6rem] uppercase leading-relaxed text-lilac-500 dark:text-lilac-300">
                            {project.role}
                        </p>
                    )}
                    <p className="mb-6 mt-4 text-lg leading-relaxed text-ink/75 dark:text-violet-100/75">
                        {project.description}
                    </p>
                    {project.highlights && (
                        <ul className="mb-6 space-y-2.5">
                            {project.highlights.map((item) => (
                                <li key={item} className="flex gap-3 text-ink/80 dark:text-violet-100/80">
                                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-lilac-400" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                    <Tags items={project.tags} />
                    <div className="mt-7 flex flex-wrap gap-3">
                        {links.code ? (
                            <a
                                href={links.code}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-lilac-500 to-lilac-300 px-5 py-2.5 font-semibold text-white"
                            >
                                <CodeIcon className="h-4 w-4" /> Ver código no GitHub
                            </a>
                        ) : (
                            <p className="rounded-2xl border-2 border-dashed border-ink/15 px-4 py-3 text-sm text-ink/65 dark:border-white/15 dark:text-violet-100/65">
                                🔒 Projeto interno da empresa: o código é privado, por isso mostro aqui o problema, a solução e as tecnologias.
                            </p>
                        )}
                        {links.demo && (
                            <a
                                href={links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border-2 border-lilac-400 px-5 py-2 font-semibold text-lilac-700 dark:text-lilac-200"
                            >
                                <ExternalIcon className="h-4 w-4" /> Demo online
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

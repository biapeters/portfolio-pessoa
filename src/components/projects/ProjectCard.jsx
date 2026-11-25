import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { asset } from '../../utils/asset.js';
import { CodeIcon, ExternalIcon, PlayIcon } from '../ui/Icons.jsx';
import ProjectCover from './ProjectCover.jsx';
import Tags from '../ui/Tags.jsx';

const CATEGORY_LABEL = { profissional: 'Profissional', academico: 'Acadêmico', pessoal: 'Pessoal' };

// Card com inclinação 3D e brilho que seguem o mouse; o vídeo toca ao passar o mouse
export default function ProjectCard({ project, onOpen }) {
    const cardRef = useRef(null);
    const videoRef = useRef(null);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const springX = useSpring(rotateX, { stiffness: 150, damping: 15 });
    const springY = useSpring(rotateY, { stiffness: 150, damping: 15 });

    const handleMove = (e) => {
        const el = cardRef.current;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        rotateY.set((px - 0.5) * 10);
        rotateX.set((0.5 - py) * 10);
        el.style.setProperty('--mx', `${px * 100}%`);
        el.style.setProperty('--my', `${py * 100}%`);
    };

    const handleEnter = () => {
        videoRef.current?.play().catch(() => {});
    };

    const handleLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const { media, links } = project;

    return (
        <motion.article
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
            className="glass group relative flex flex-col overflow-hidden rounded-3xl"
        >
            {/* Brilho que acompanha o mouse */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(201,155,255,0.18), transparent 40%)' }}
            />

            <button
                type="button"
                onClick={() => onOpen(project)}
                className="relative aspect-video overflow-hidden bg-night-2 text-left"
                aria-label={`Ver detalhes de ${project.title}`}
            >
                {media.type === 'cover' ? (
                    <ProjectCover media={media} compact />
                ) : media.type === 'video' ? (
                    <video
                        ref={videoRef}
                        src={`${asset(media.src)}#t=0.5`}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <img
                        src={asset(media.src)}
                        alt={media.alt}
                        loading="lazy"
                        className="h-full w-full bg-white object-cover object-top transition duration-500 group-hover:scale-105"
                    />
                )}
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
                    {CATEGORY_LABEL[project.category]}
                </span>
                <span className="absolute inset-0 grid place-items-center bg-ink/0 transition group-hover:bg-ink/20">
                    <span className="flex scale-75 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink opacity-0 shadow-lg transition group-hover:scale-100 group-hover:opacity-100">
                        <PlayIcon className="h-3.5 w-3.5" /> Ver detalhes
                    </span>
                </span>
            </button>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-xl font-bold leading-snug">{project.title}</h3>
                <p className="mb-5 mt-2 flex-1 text-ink/70 dark:text-violet-100/70">{project.summary}</p>
                <Tags items={project.tags} />
                <div className="relative z-20 mt-6 flex flex-wrap gap-3">
                    {links.code ? (
                        <a
                            href={links.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-lilac-700 dark:bg-lilac-300 dark:text-ink dark:hover:bg-lilac-200"
                        >
                            <CodeIcon className="h-4 w-4" /> Código
                        </a>
                    ) : (
                        <button
                            type="button"
                            onClick={() => onOpen(project)}
                            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-lilac-700 dark:bg-lilac-300 dark:text-ink dark:hover:bg-lilac-200"
                        >
                            Ver estudo de caso
                        </button>
                    )}
                    {!links.code && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-dashed border-ink/20 px-3 py-1.5 text-xs font-semibold text-ink/60 dark:border-white/20 dark:text-violet-100/60">
                            🔒 Código interno
                        </span>
                    )}
                    {links.demo && (
                        <a
                            href={links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-lilac-400 px-4 py-1.5 text-sm font-semibold text-lilac-700 transition hover:bg-lilac-400/10 dark:text-lilac-200"
                        >
                            <ExternalIcon className="h-4 w-4" /> Demo online
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

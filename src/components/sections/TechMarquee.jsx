import { techStack } from '../../data/profile.js';

// Faixa infinita com as tecnologias (pausa ao passar o mouse)
export default function TechMarquee() {
    const items = [...techStack, ...techStack];

    return (
        <div
            className="group relative overflow-hidden border-y border-lilac-400/20 bg-white/40 py-5 dark:bg-white/[0.03]"
            style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}
        >
            <ul className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none" aria-label="Tecnologias que uso">
                {items.map((tech, i) => (
                    <li
                        key={i}
                        aria-hidden={i >= techStack.length}
                        className="flex items-center gap-10 whitespace-nowrap text-lg font-semibold text-ink/70 dark:text-violet-100/70"
                    >
                        {tech}
                        <span className="h-2 w-2 rotate-45 bg-lilac-400" aria-hidden="true" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

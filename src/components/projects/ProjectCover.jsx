// Capa ilustrada para projetos sem vídeo/imagem (ex.: projetos internos da empresa):
// um ícone grande e o fluxo do sistema em "chips" no estilo pixel.
const THEMES = {
    lilac: 'from-lilac-500 via-lilac-400 to-candy',
    sky: 'from-sky via-lilac-400 to-lilac-300',
    peach: 'from-peach via-candy to-lilac-400',
    candy: 'from-candy via-lilac-300 to-sky',
};

export default function ProjectCover({ media, compact = false }) {
    return (
        <div
            className={`relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden bg-linear-to-br p-6 ${THEMES[media.theme] ?? THEMES.lilac}`}
        >
            {/* grade pixelada de fundo */}
            <div
                aria-hidden="true"
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                }}
            />
            <span
                aria-hidden="true"
                className={`relative grid place-items-center border-[3px] border-ink bg-white shadow-[4px_4px_0_rgba(45,27,64,0.85)] transition duration-500 group-hover:-translate-y-1 group-hover:rotate-3 ${compact ? 'h-14 w-14 text-3xl' : 'h-20 w-20 text-5xl'}`}
            >
                {media.icon}
            </span>
            <ol className="relative flex flex-wrap items-center justify-center gap-1.5" aria-label="Fluxo do sistema">
                {media.flow.map((step, i) => (
                    <li key={step} className="flex items-center gap-1.5">
                        <span className="border-2 border-ink bg-white/90 px-2 py-1 font-pixel text-[0.5rem] leading-none text-ink sm:text-[0.55rem]">
                            {step}
                        </span>
                        {i < media.flow.length - 1 && (
                            <span aria-hidden="true" className="font-pixel text-[0.6rem] text-ink">
                                →
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

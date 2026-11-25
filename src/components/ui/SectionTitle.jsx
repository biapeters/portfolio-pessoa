import Reveal from './Reveal.jsx';

export default function SectionTitle({ eyebrow, title, description }) {
    return (
        <Reveal className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
            <p className="mb-4 font-pixel text-[0.65rem] tracking-wider text-lilac-500 dark:text-lilac-300">
                {eyebrow}
            </p>
            <h2 className="text-gradient text-[2rem] font-bold leading-tight min-[400px]:text-4xl sm:text-5xl">{title}</h2>
            {description && (
                <p className="mt-4 text-base sm:mt-5 sm:text-lg text-ink/70 dark:text-violet-100/70">{description}</p>
            )}
        </Reveal>
    );
}

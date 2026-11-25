export default function Tags({ items, label = 'Tecnologias' }) {
    return (
        <ul className="flex flex-wrap gap-2" aria-label={label}>
            {items.map((tag) => (
                <li
                    key={tag}
                    className="rounded-full border border-lilac-400/40 bg-lilac-400/10 px-3 py-1 text-xs font-medium text-lilac-700 dark:text-lilac-200"
                >
                    {tag}
                </li>
            ))}
        </ul>
    );
}

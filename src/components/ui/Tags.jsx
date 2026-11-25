// Lista de tecnologias em pílulas. Com `max`, mostra só as primeiras e um "+N" com o resto.
export default function Tags({ items, label = 'Tecnologias', max }) {
    const shown = max ? items.slice(0, max) : items;
    const hidden = items.length - shown.length;

    return (
        <ul className="flex flex-wrap gap-2" aria-label={label}>
            {shown.map((tag) => (
                <li
                    key={tag}
                    className="rounded-full border border-lilac-400/40 bg-lilac-400/10 px-3 py-1 text-xs font-medium text-lilac-700 dark:text-lilac-200"
                >
                    {tag}
                </li>
            ))}
            {hidden > 0 && (
                <li
                    className="rounded-full px-2 py-1 text-xs font-semibold text-ink/50 dark:text-violet-100/50"
                    title={items.slice(shown.length).join(', ')}
                >
                    +{hidden}
                </li>
            )}
        </ul>
    );
}

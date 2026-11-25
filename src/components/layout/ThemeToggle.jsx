import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from '../../hooks/useTheme.js';
import { MoonIcon, SunIcon } from '../ui/Icons.jsx';

export default function ThemeToggle() {
    const [theme, toggleTheme] = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
            title={isDark ? 'Tema claro' : 'Tema escuro'}
            className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-lilac-400/40 bg-white/60 text-lilac-700 transition hover:scale-110 hover:border-lilac-400 dark:bg-white/5 dark:text-lilac-200"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={theme}
                    initial={{ y: 20, rotate: -90, opacity: 0 }}
                    animate={{ y: 0, rotate: 0, opacity: 1 }}
                    exit={{ y: -20, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {isDark ? <SunIcon /> : <MoonIcon />}
                </motion.span>
            </AnimatePresence>
        </button>
    );
}

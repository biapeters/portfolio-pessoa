import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useActiveSection } from '../../hooks/useActiveSection.js';
import { CloseIcon, MenuIcon } from '../ui/Icons.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const LINKS = [
    { id: 'sobre', label: 'Sobre' },
    { id: 'experiencia', label: 'Experiência' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'contato', label: 'Contato' },
];
const IDS = LINKS.map((l) => l.id);

export default function Navbar() {
    const active = useActiveSection(IDS);
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // menu do celular: o pulo nativo do link (#secao) era cancelado quando o menu fechava,
    // e a página ficava parada. Então fechamos o menu e rolamos nós mesmos, no quadro seguinte.
    const goTo = (e, id) => {
        e.preventDefault();
        setOpen(false);
        history.pushState(null, '', `#${id}`);
        requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    };

    return (
        <header
            className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
                scrolled ? 'border-b border-white/40 bg-cream/70 shadow-sm backdrop-blur-xl dark:border-white/5 dark:bg-night/70' : ''
            }`}
        >
            <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Principal">
                <a href="#inicio" className="group flex items-center gap-3 font-bold">
                    <span className="grid h-9 w-9 place-items-center bg-ink font-pixel text-[0.6rem] text-lilac-300 shadow-[3px_3px_0_#a08cf5] transition group-hover:-rotate-6 dark:bg-lilac-300 dark:text-ink dark:shadow-[3px_3px_0_#ff9fc6]">
                        BP
                    </span>
                    <span className="text-lg">Bianca Peters</span>
                </a>

                <ul className="hidden items-center gap-1 md:flex">
                    {LINKS.map((link) => (
                        <li key={link.id} className="relative">
                            <a
                                href={`#${link.id}`}
                                className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition ${
                                    active === link.id ? 'text-ink dark:text-white' : 'text-ink/60 hover:text-ink dark:text-violet-100/60 dark:hover:text-white'
                                }`}
                            >
                                {link.label}
                            </a>
                            {active === link.id && (
                                <motion.span
                                    layoutId="nav-pill"
                                    className="absolute inset-0 rounded-full bg-lilac-300/30 dark:bg-lilac-400/20"
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        type="button"
                        className="grid h-10 w-10 place-items-center rounded-full md:hidden"
                        onClick={() => setOpen((o) => !o)}
                        aria-expanded={open}
                        aria-controls="menu-mobile"
                        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
                    >
                        {open ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        id="menu-mobile"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden border-b border-white/40 bg-cream/95 px-4 backdrop-blur-xl md:hidden dark:border-white/5 dark:bg-night/95"
                    >
                        {LINKS.map((link, i) => (
                            <motion.li
                                key={link.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <a
                                    href={`#${link.id}`}
                                    onClick={(e) => goTo(e, link.id)}
                                    className="block py-3 text-lg font-medium"
                                >
                                    {link.label}
                                </a>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </header>
    );
}

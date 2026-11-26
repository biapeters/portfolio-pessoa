import { ArrowUpIcon } from '../ui/Icons.jsx';
import FooterDog from './FooterDog.jsx';

export default function Footer() {
    return (
        <footer className="border-t border-lilac-400/20 pb-8">
            <FooterDog />
            <div className="mx-auto mt-6 flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-center text-sm sm:gap-4 sm:text-left text-ink/60 sm:flex-row sm:px-6 dark:text-violet-100/60">
                <p>© 2026 Bianca Peters</p>
                <a
                    href="#inicio"
                    className="group inline-flex items-center gap-2 px-2 py-3 font-medium transition hover:text-lilac-500"
                >
                    Voltar ao topo
                    <ArrowUpIcon className="h-4 w-4 transition group-hover:-translate-y-1" />
                </a>
            </div>
        </footer>
    );
}

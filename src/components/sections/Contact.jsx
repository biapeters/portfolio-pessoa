import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { profile } from '../../data/profile.js';
import { CheckIcon, CopyIcon, GitHubIcon, LinkedInIcon, MailIcon } from '../ui/Icons.jsx';
import Reveal from '../ui/Reveal.jsx';
import SectionTitle from '../ui/SectionTitle.jsx';

const LINKS = [
    { label: 'LinkedIn', description: 'Vamos nos conectar', href: profile.linkedin, Icon: LinkedInIcon },
    { label: 'GitHub', description: 'Veja meus repositórios', href: profile.github, Icon: GitHubIcon },
];

export default function Contact() {
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${profile.email}`;
        }
    };

    return (
        <section id="contato" className="scroll-mt-20 py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionTitle
                    eyebrow="// contato"
                    title="Fale comigo ou pergunte o que quiser"
                    description="Tem uma ideia de projeto, feedback ou quer só bater um papo sobre UX ou programação? Fique à vontade para entrar em contato."
                />

                <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
                    <Reveal className="md:col-span-3">
                        <div className="glass flex flex-col items-center gap-5 rounded-3xl p-6 text-center sm:flex-row sm:p-8 sm:text-left">
                            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-lilac-500 to-candy text-white">
                                <MailIcon className="h-6 w-6" />
                            </span>
                            <div className="flex-1">
                                <p className="text-sm text-ink/60 dark:text-violet-100/60">E-mail</p>
                                {/* <wbr> deixa quebrar a linha depois do @, nunca no meio do domínio */}
                                <a href={`mailto:${profile.email}`} className="inline-block py-2.5 text-base font-semibold hover:text-lilac-500 min-[400px]:text-lg sm:text-xl">
                                    {profile.email.split('@')[0]}@<wbr />
                                    {profile.email.split('@')[1]}
                                </a>
                            </div>
                            <button
                                type="button"
                                onClick={copyEmail}
                                className="relative inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-semibold text-white transition hover:bg-lilac-700 dark:bg-lilac-300 dark:text-ink"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.span
                                        key={copied ? 'ok' : 'copy'}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        className="inline-flex items-center gap-2"
                                    >
                                        {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                                        {copied ? 'Copiado!' : 'Copiar'}
                                    </motion.span>
                                </AnimatePresence>
                            </button>
                        </div>
                    </Reveal>

                    {LINKS.map(({ label, description, href, Icon }, i) => (
                        <Reveal key={label} delay={0.1 * (i + 1)} className={i === 0 ? 'md:col-span-2' : ''}>
                            <motion.a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -6 }}
                                className="glass group flex h-full items-center gap-4 rounded-3xl p-5 sm:gap-5 sm:p-7"
                            >
                                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-lilac-500 to-candy text-white transition group-hover:rotate-6">
                                    <Icon className="h-6 w-6" />
                                </span>
                                <span>
                                    <span className="block text-xl font-bold">{label}</span>
                                    <span className="text-ink/60 dark:text-violet-100/60">{description}</span>
                                </span>
                            </motion.a>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

import { motion, useScroll, useSpring } from 'motion/react';

// Barrinha no topo que mostra quanto da página já foi lido
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

    return (
        <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-linear-to-r from-sky via-lilac-400 to-candy"
        />
    );
}

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

// Bolhas de cor flutuando no fundo + um brilho que segue o mouse
export default function Background() {
    const mouseX = useMotionValue(-400);
    const mouseY = useMotionValue(-400);
    const x = useSpring(mouseX, { stiffness: 80, damping: 20 });
    const y = useSpring(mouseY, { stiffness: 80, damping: 20 });
    const [finePointer, setFinePointer] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(pointer: fine)');
        setFinePointer(mq.matches);
        const onMove = (e) => {
            mouseX.set(e.clientX - 200);
            mouseY.set(e.clientY - 200);
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, [mouseX, mouseY]);

    const blobs = [
        { className: 'left-[-10%] top-[-10%] h-[45vw] w-[45vw] bg-lilac-300/40 dark:bg-lilac-500/20', move: { x: [0, 60, 0], y: [0, 40, 0] }, duration: 18 },
        { className: 'right-[-15%] top-[20%] h-[40vw] w-[40vw] bg-candy/30 dark:bg-candy/10', move: { x: [0, -50, 0], y: [0, 60, 0] }, duration: 22 },
        { className: 'bottom-[-15%] left-[20%] h-[40vw] w-[40vw] bg-sky/25 dark:bg-sky/15', move: { x: [0, 40, 0], y: [0, -50, 0] }, duration: 26 },
    ];

    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            {blobs.map((blob, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full blur-3xl ${blob.className}`}
                    animate={blob.move}
                    transition={{ duration: blob.duration, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}
            {finePointer && (
                <motion.div
                    style={{ x, y }}
                    className="absolute h-[400px] w-[400px] rounded-full bg-lilac-400/15 blur-3xl dark:bg-lilac-300/10"
                />
            )}
        </div>
    );
}

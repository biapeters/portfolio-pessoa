import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

// Elemento que é "puxado" na direção do mouse
export default function Magnetic({ children, strength = 0.3 }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 15 });
    const springY = useSpring(y, { stiffness: 200, damping: 15 });

    const handleMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className="inline-block"
            style={{ x: springX, y: springY }}
            onMouseMove={handleMove}
            onMouseLeave={reset}
        >
            {children}
        </motion.div>
    );
}

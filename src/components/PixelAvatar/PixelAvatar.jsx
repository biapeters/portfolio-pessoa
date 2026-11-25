import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EARRING, EYES, FACE, GRID, HEIGHT, PALETTE, WIDTH } from './avatarMap.js';

const PHRASES = [
    'Oi! Eu sou a Bia 👋',
    'Bem-vindo(a) ao meu cantinho!',
    'Bora tomar um chá e codar? 🍵',
    'Bug encontrado... bug resolvido! 🐞',
    'Já testou o tema escuro? 🌙',
    'Psiu: tem projetos lá embaixo ↓',
    'Me chama no LinkedIn! 💜',
];

const HEART_COLORS = ['#e91e63', '#c99bff', '#ff8a50', '#9b6fe0'];

function PixelHeart({ color }) {
    return (
        <svg viewBox="0 0 7 6" className="h-full w-full" shapeRendering="crispEdges" aria-hidden="true">
            <path fill={color} d="M1 0h2v1h1V0h2v1h1v2H6v1H5v1H4v1H3V5H2V4H1V3H0V1h1z" />
        </svg>
    );
}

export default function PixelAvatar() {
    const canvasRef = useRef(null);
    const face = useRef({ look: 0, blinking: false, happy: false, talking: false, mouthOpen: false });
    const timers = useRef({});
    const phraseIndex = useRef(0);
    const [bubble, setBubble] = useState(null);
    const [hearts, setHearts] = useState([]);
    const reduceMotion = useReducedMotion();

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const s = face.current;
        const px = (x, y, color) => {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        };

        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        GRID.forEach((row, y) => {
            [...row].forEach((ch, x) => {
                if (ch !== '.') px(x, y, PALETTE[ch]);
            });
        });
        EARRING.forEach(([x, y]) => px(x, y, PALETTE.P));

        if (s.happy) {
            px(11, 15, PALETTE.B);
            px(20, 15, PALETTE.B);
        }

        // Olhos
        EYES.forEach(({ x, outer }) => {
            if (s.blinking) {
                for (let i = 0; i < 3; i++) px(x + i, 14, FACE.eyeDark);
                px(outer, 13, FACE.eyeDark);
                return;
            }
            for (let i = 0; i < 3; i++) {
                px(x + i, 12, FACE.eyeDark);
                px(x + i, 13, FACE.iris);
                px(x + i, 14, FACE.iris);
            }
            px(outer, 12, FACE.eyeDark);
            const pupil = x + 1 + s.look;
            px(pupil, 13, FACE.eyeDark);
            px(pupil, 14, FACE.eyeDark);
            px(s.look < 0 ? x + 2 : x, 13, '#ffffff');
        });

        // Boca
        if (s.talking && s.mouthOpen) {
            px(15, 18, FACE.mouth);
            px(16, 18, FACE.mouth);
            px(15, 19, FACE.mouthOpen);
            px(16, 19, FACE.mouthOpen);
        } else if (s.happy || s.talking) {
            px(14, 18, FACE.mouth);
            px(15, 19, FACE.mouth);
            px(16, 19, FACE.mouth);
            px(17, 18, FACE.mouth);
        } else {
            px(15, 18, FACE.mouth);
            px(16, 18, FACE.mouth);
        }
    }, []);

    // Piscar sozinha e seguir o cursor com os olhos
    useEffect(() => {
        const t = timers.current;
        draw();

        const blink = (times) => {
            face.current.blinking = true;
            draw();
            t.blinkEnd = setTimeout(() => {
                face.current.blinking = false;
                draw();
                if (times > 1) t.blinkAgain = setTimeout(() => blink(times - 1), 160);
            }, 130);
        };
        const schedule = () => {
            t.blink = setTimeout(() => {
                blink(Math.random() < 0.25 ? 2 : 1);
                schedule();
            }, 2500 + Math.random() * 3000);
        };
        schedule();

        const onMove = (e) => {
            const rect = canvasRef.current?.getBoundingClientRect();
            if (!rect) return;
            const dx = e.clientX - (rect.left + rect.width / 2);
            const look = dx < -60 ? -1 : dx > 60 ? 1 : 0;
            if (look !== face.current.look) {
                face.current.look = look;
                draw();
            }
        };
        window.addEventListener('mousemove', onMove);

        return () => {
            window.removeEventListener('mousemove', onMove);
            Object.values(t).forEach((id) => {
                clearTimeout(id);
                clearInterval(id);
            });
        };
    }, [draw]);

    const setHappy = (value) => {
        face.current.happy = value;
        draw();
    };

    const handleClick = () => {
        const t = timers.current;
        const text = PHRASES[phraseIndex.current];
        phraseIndex.current = (phraseIndex.current + 1) % PHRASES.length;
        setBubble({ id: Date.now(), text });
        clearTimeout(t.bubble);
        t.bubble = setTimeout(() => setBubble(null), 2800);

        // Boca mexendo enquanto "fala"
        clearInterval(t.talk);
        clearTimeout(t.talkEnd);
        face.current.talking = true;
        t.talk = setInterval(() => {
            face.current.mouthOpen = !face.current.mouthOpen;
            draw();
        }, 140);
        t.talkEnd = setTimeout(() => {
            clearInterval(t.talk);
            face.current.talking = false;
            face.current.mouthOpen = false;
            draw();
        }, 1200);

        if (!reduceMotion) {
            const now = Date.now();
            setHearts((h) => [
                ...h,
                ...Array.from({ length: 5 }, (_, i) => ({
                    id: `${now}-${i}`,
                    left: 30 + Math.random() * 40,
                    color: HEART_COLORS[i % HEART_COLORS.length],
                    delay: i * 0.08,
                })),
            ]);
        }
    };

    return (
        <div className="relative flex flex-col items-center overflow-hidden px-5 pb-5 pt-20">
            {/* Estrelinhas em pixel no fundo */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 animate-twinkle motion-reduce:animate-none">
                {[[8, 10], [86, 14], [18, 40], [82, 52], [12, 76], [90, 84], [48, 6], [70, 32]].map(([l, tp], i) => (
                    <span
                        key={i}
                        className="absolute h-1 w-1"
                        style={{ left: `${l}%`, top: `${tp}%`, background: ['#c99bff', '#ff9fc6', '#a08cf5'][i % 3] }}
                    />
                ))}
            </div>

            <div role="status" aria-live="polite" className="absolute left-1/2 top-3 z-10 -translate-x-1/2">
                <AnimatePresence>
                    {bubble && (
                        <motion.p
                            key={bubble.id}
                            initial={{ opacity: 0, y: 8, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-max max-w-[200px] border-[3px] sm:max-w-[240px] border-ink bg-white px-3 py-2 text-center font-pixel text-[0.55rem] leading-relaxed text-ink shadow-[4px_4px_0_rgba(45,27,64,0.85)]"
                        >
                            {bubble.text}
                            <span className="absolute -bottom-[9px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-[3px] border-r-[3px] border-ink bg-white" />
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            <button
                type="button"
                onClick={handleClick}
                onMouseEnter={() => setHappy(true)}
                onMouseLeave={() => setHappy(false)}
                onFocus={() => setHappy(true)}
                onBlur={() => setHappy(false)}
                aria-label="Bianca em pixel art. Clique para ela falar com você."
                className="relative z-[1] animate-bob cursor-pointer rounded focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-dashed focus-visible:outline-lilac-300 motion-reduce:animate-none"
            >
                <canvas
                    ref={canvasRef}
                    width={WIDTH}
                    height={HEIGHT}
                    className="pixelated block h-[200px] w-[160px] drop-shadow-[0_8px_0_rgba(45,27,64,0.15)] min-[400px]:h-[240px] min-[400px]:w-[192px] sm:h-[320px] sm:w-[256px] [@media(max-height:500px)]:h-[200px] [@media(max-height:500px)]:w-[160px]"
                />
            </button>

            {hearts.map((heart) => (
                <motion.span
                    key={heart.id}
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-[40%] z-[2] h-[18px] w-[21px]"
                    style={{ left: `${heart.left}%` }}
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: -150, opacity: 0 }}
                    transition={{ duration: 1.4, delay: heart.delay, ease: 'easeOut' }}
                    onAnimationComplete={() => setHearts((h) => h.filter((x) => x.id !== heart.id))}
                >
                    <PixelHeart color={heart.color} />
                </motion.span>
            ))}

            <p className="mt-3 font-pixel text-[0.55rem] text-ink/50 dark:text-violet-100/50" aria-hidden="true">
                clique em mim ✨
            </p>
        </div>
    );
}

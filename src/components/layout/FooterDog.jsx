import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

// Buldogue cinza em pixel art (16x10), olhando para a direita.
// Mesmo formato do avatarMap.js: cada letra é uma cor, "." é transparente.
const PALETTE = {
    O: '#2b2a33', // contorno
    g: '#8d8d99', // pelo
    w: '#c9c9d3', // focinho e peito
    E: '#16151b', // olhos
    n: '#16151b', // nariz
    P: '#9b6fe0', // coleira lilás
};
const HEART_COLOR = '#ff6fa8';

const TOP = [
    '.........OO..OO.',
    '........OggggggO',
    '........OgEggEgO',
    '.O......OgwwwwgO',
    '.OO..OOOOgwnnwgO',
    '..OgggggggOwwwwO',
    '..OgggwwwPPOOOO.',
    '..OggggggggggO..',
];
// Rabinho abanando (troca as linhas 3 e 4)
const WAG = { 3: '........OgwwwwgO', 4: 'OO...OOOOgwnnwgO' };
const LEGS_A = ['..OgOgO...OgOgO.', '..OO.OO...OO.OO.'];
const LEGS_B = ['...OgOgO.OgOgO..', '...OO.OO.OO.OO..'];
const SIT = ['..OggggggggggO..', '..OOOOOOOOOOOO..'];
const HEART = ['.X.X.', 'XXXXX', '.XXX.', '..X..'];

const DOG_W = 16;
const DOG_H = 10;
const SCALE = 4; // cada pixel do sprite vira 4px na tela
const STAGE_H = 18; // altura do palco em pixels do sprite
const BARKS = ['au au!', 'rrrf!', '*ronco*', 'carinho? 🥺', 'volta sempre!'];

function drawMap(ctx, rows, palette, ox, oy, flip = false) {
    const w = rows[0].length;
    rows.forEach((row, y) => {
        [...row].forEach((ch, x) => {
            if (ch === '.') return;
            ctx.fillStyle = palette[ch];
            ctx.fillRect(Math.round(ox + (flip ? w - 1 - x : x)), Math.round(oy + y), 1, 1);
        });
    });
}

export default function FooterDog() {
    const stageRef = useRef(null);
    const canvasRef = useRef(null);
    const dog = useRef({ x: 20, tx: 20, hoverX: null, dir: 1, t: 0, wait: 60, hearts: [] });
    const barkIndex = useRef(0);
    const bubbleTimer = useRef(null);
    const [bubble, setBubble] = useState(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const stage = stageRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const s = dog.current;
        let frame = 0;
        let visible = false;

        // Largura do canvas acompanha a largura do rodapé
        const resize = () => {
            canvas.width = Math.max(DOG_W + 4, Math.floor(canvas.clientWidth / SCALE));
            canvas.height = STAGE_H;
            s.x = Math.min(s.x, canvas.width - DOG_W);
        };
        const ro = new ResizeObserver(resize);
        ro.observe(stage);
        resize();

        const tick = () => {
            const W = canvas.width;
            s.t++;
            if (s.hoverX == null && !reduceMotion && --s.wait <= 0) {
                s.tx = Math.random() * (W - DOG_W);
                s.wait = 200 + Math.random() * 250;
            }
            const target = s.hoverX ?? s.tx;
            const dx = target - s.x;
            const moving = Math.abs(dx) > 3;
            if (moving) {
                s.x += Math.sign(dx) * (s.hoverX != null ? 0.9 : 0.4);
                s.dir = Math.sign(dx);
            }
            s.x = Math.max(0, Math.min(W - DOG_W, s.x));

            const top = TOP.slice();
            if (!moving && Math.floor(s.t / 12) % 2) Object.assign(top, WAG);
            const legs = moving ? (Math.floor(s.t / 7) % 2 ? LEGS_A : LEGS_B) : SIT;

            ctx.clearRect(0, 0, W, STAGE_H);
            ctx.fillStyle = 'rgba(45, 27, 64, 0.15)';
            ctx.fillRect(Math.round(s.x) + 3, STAGE_H - 1, 11, 1);
            drawMap(ctx, top.concat(legs), PALETTE, s.x, STAGE_H - DOG_H, s.dir < 0);

            s.hearts = s.hearts.filter((h) => ((h.y += h.vy), --h.life > 0));
            s.hearts.forEach((h) => drawMap(ctx, HEART, { X: HEART_COLOR }, h.x, h.y));

            if (visible) frame = requestAnimationFrame(tick);
        };

        // Só anima quando o rodapé está na tela
        const io = new IntersectionObserver(([entry]) => {
            const wasVisible = visible;
            visible = entry.isIntersecting;
            if (visible && !wasVisible) frame = requestAnimationFrame(tick);
            if (!visible) cancelAnimationFrame(frame);
        });
        io.observe(stage);

        return () => {
            io.disconnect();
            ro.disconnect();
            cancelAnimationFrame(frame);
            clearTimeout(bubbleTimer.current);
        };
    }, [reduceMotion]);

    const pointerX = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return ((e.clientX - rect.left) / rect.width) * canvasRef.current.width - DOG_W / 2;
    };

    const handleClick = () => {
        const s = dog.current;
        if (!reduceMotion) {
            for (let i = 0; i < 3; i++) {
                s.hearts.push({ x: s.x + 9 + (i - 1) * 4, y: STAGE_H - 12, vy: -0.2 - Math.random() * 0.15, life: 45 + i * 8 });
            }
        }
        const text = BARKS[barkIndex.current];
        barkIndex.current = (barkIndex.current + 1) % BARKS.length;
        const left = ((s.x + DOG_W / 2) / canvasRef.current.width) * 100;
        setBubble({ id: Date.now(), text, left: Math.min(85, Math.max(15, left)) });
        clearTimeout(bubbleTimer.current);
        bubbleTimer.current = setTimeout(() => setBubble(null), 1600);
    };

    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div ref={stageRef} className="relative pt-14">
            <div role="status" aria-live="polite">
                {bubble && (
                    <p
                        key={bubble.id}
                        className="absolute top-2 z-10 w-max -translate-x-1/2 border-[3px] border-ink bg-white px-2.5 py-1.5 font-pixel text-[0.5rem] leading-relaxed text-ink shadow-[3px_3px_0_rgba(45,27,64,0.85)]"
                        style={{ left: `${bubble.left}%` }}
                    >
                        {bubble.text}
                    </p>
                )}
            </div>
            <button
                type="button"
                onClick={handleClick}
                onPointerMove={(e) => (dog.current.hoverX = pointerX(e))}
                onPointerLeave={() => (dog.current.hoverX = null)}
                aria-label="Buldogue em pixel art. Clique para fazer carinho."
                className="block w-full cursor-pointer border-b-4 border-dotted border-lilac-300/70 focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-dashed focus-visible:outline-lilac-300"
            >
                <canvas ref={canvasRef} className="pixelated block w-full" style={{ height: STAGE_H * SCALE }} />
            </button>
        </div>
        </div>
    );
}

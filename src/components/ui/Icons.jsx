// Ícones em SVG (traço herda a cor do texto)
const base = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
};

export const SunIcon = (p) => (
    <svg {...base} {...p}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
);

export const MoonIcon = (p) => (
    <svg {...base} {...p}>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
);

export const MailIcon = (p) => (
    <svg {...base} {...p}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
    </svg>
);

export const LinkedInIcon = (p) => (
    <svg {...base} {...p}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

export const GitHubIcon = (p) => (
    <svg {...base} {...p}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.3 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19.9 1S18.7.7 16 2.5a13.4 13.4 0 0 0-7 0C6.3.7 5.1 1 5.1 1A5 5 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.7c0 5.5 3.3 6.7 6.4 7A3.4 3.4 0 0 0 9 18.1V22" />
    </svg>
);

export const ExternalIcon = (p) => (
    <svg {...base} {...p}>
        <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
);

export const CodeIcon = (p) => (
    <svg {...base} {...p}>
        <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
);

export const PlayIcon = (p) => (
    <svg {...base} {...p}>
        <path d="m6 3 14 9-14 9V3z" fill="currentColor" />
    </svg>
);

export const CloseIcon = (p) => (
    <svg {...base} {...p}>
        <path d="M18 6 6 18M6 6l12 12" />
    </svg>
);

export const MenuIcon = (p) => (
    <svg {...base} {...p}>
        <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
);

export const CopyIcon = (p) => (
    <svg {...base} {...p}>
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
);

export const CheckIcon = (p) => (
    <svg {...base} {...p}>
        <path d="M20 6 9 17l-5-5" />
    </svg>
);

export const ArrowUpIcon = (p) => (
    <svg {...base} {...p}>
        <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
);

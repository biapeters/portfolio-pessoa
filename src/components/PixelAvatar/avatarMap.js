// Mapa do avatar em pixel art (32x40).
// Cada linha é a METADE ESQUERDA (16 colunas) e é espelhada para formar o rosto.
// Olhos, boca e brinco são desenhados à parte (em PixelAvatar.jsx) para poderem animar.
// Legenda: veja PALETTE. "." = transparente.

export const PALETTE = {
    H: '#3b2618', // contorno do cabelo
    h: '#7a5235', // cabelo
    l: '#a8774a', // reflexo do cabelo
    S: '#f8d9c6', // pele
    s: '#e9b9a1', // sombra da pele
    B: '#f4a3a3', // blush
    P: '#9b6fe0', // elásticos e brinco lilás
    T: '#cdbde6', // gola alta lavanda
    t: '#ad9bd0', // dobra da gola
    C: '#3a3340', // cardigan
    c: '#4f4658', // dobra do cardigan
};

export const FACE = {
    eyeDark: '#2a1a14',
    iris: '#5a3826',
    mouth: '#d65a6a',
    mouthOpen: '#9c3346',
};

const LEFT = [
    '............HHHH',
    '..........HHhhhh',
    '.........Hhhhlhh',
    '........Hhhhlhhh',
    '.......Hhhhlhhhh',
    '.......Hhhlhhhhh',
    '......Hhhhhhhhhh',
    '......Hhhhhhhhhh',
    '......Hhhhhhhhhh',
    '......HhhhShhShh',
    '......HhhSSShSSS',
    '......HhSSSSSSSS',
    '......HhSSSSSSSS',
    '......HhSSSSSSSS',
    '......HhSSSSSSSS',
    '......HhSBBSSSSS',
    '......HhSSSSSSSs',
    '......HhhSSSSSSS',
    '......HhhSSSSSSS',
    '.....HhhhhSSSSSS',
    '.....HhhhhhSSSSS',
    '.....HhhhH..ssSS',
    '.....HhhhH...sSS',
    '.....HhhH...TTTT',
    '.....HhhH..ttttt',
    '..CCCHhhHCCTTTTT',
    '.CCCCHlhHCCTTTTT',
    '.CCCCPPPPCCTTTTT',
    'CCCCCHhlHCCTTTTT',
    'CCCCCHlhHCcTTTTT',
    'CCCCCHhlHCcTTTTT',
    'CCCCCHlhHCcTTTTT',
    'CCCCCHhlHCcTTTTT',
    'CCCCCHlhHCcTTTTT',
    'CCCCCPPPPCcTTTTT',
    'CCCCHhlhhHcTTTTT',
    'CCCCHlhlhHcTTTTT',
    'CCCCCHhhHCcTTTTT',
    'CCCCCCHHCCcTTTTT',
    'CCCCCCCCCCcTTTTT',
];

export const GRID = LEFT.map((row) => row + row.split('').reverse().join(''));
export const WIDTH = 32;
export const HEIGHT = GRID.length;

// Brinco de argola só de um lado
export const EARRING = [[24, 15], [23, 16], [25, 16], [24, 17]];

// Posição dos olhos: x inicial (3px de largura) e o cantinho externo do cílio
export const EYES = [
    { x: 10, outer: 9 },
    { x: 19, outer: 22 },
];

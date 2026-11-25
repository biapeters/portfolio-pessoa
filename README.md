# 🌟 Portfólio · Bianca Peters

Meu portfólio pessoal: experiência com e-commerce na VTEX, formação em Inteligência Artificial pela PUCPR e projetos acadêmicos e pessoais.

**[Ver online →](https://biapeters.github.io/portfolio-pessoa/)**

## 🛠️ Tecnologias

- **React** com **Vite**
- **Tailwind CSS**
- **Motion** (animações)
- Avatar em pixel art desenhado em `<canvas>`

## 🚀 Rodando localmente

Precisa do [Node.js](https://nodejs.org/) instalado.

```bash
npm install     # só na primeira vez
npm run dev     # abre em http://localhost:5173/portfolio-pessoa/
```

Outros comandos:

```bash
npm run build    # gera a versão final na pasta dist/
npm run preview  # testa a versão final localmente
```

## 📁 Estrutura

```
├── public/                 # arquivos servidos como estão
│   ├── images/
│   └── videos/
├── src/
│   ├── components/
│   │   ├── layout/         # Navbar, rodapé, fundo, barra de progresso
│   │   ├── sections/       # Hero, Sobre, Experiência, Projetos, Contato
│   │   ├── projects/       # Card e modal de projeto
│   │   ├── PixelAvatar/    # Avatar em pixel art (mapa + animações)
│   │   └── ui/             # Peças reutilizáveis (ícones, tags, animações)
│   ├── data/               # ✏️ Conteúdo do site (edite aqui!)
│   │   ├── profile.js      # contato, frases do topo, tecnologias
│   │   ├── experience.js   # experiência e formação
│   │   └── projects.js     # projetos
│   ├── hooks/
│   ├── App.jsx
│   └── index.css           # tema do Tailwind
└── .github/workflows/      # deploy automático no GitHub Pages
```

### Adicionar um projeto

1. Coloque o vídeo ou imagem em `public/videos/` ou `public/images/`.
2. Copie um dos objetos em `src/data/projects.js` e ajuste os campos.

## 🌐 Deploy

A cada push na `main`, o GitHub Actions gera o site e publica no GitHub Pages (`.github/workflows/deploy.yml`).

## ✉️ Contato

[LinkedIn](https://www.linkedin.com/in/biancapetersbarroso/) · bianca.sjbb0909@gmail.com

---

Feito com 💜 (e muito chá 🍵) por Bianca Peters

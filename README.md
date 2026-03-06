# V.I.S. | Property & Hospitality Services

Landing page profesional construida con React + TypeScript + Vite.

## 🚀 Deploy

### Opción A — Vercel (Recomendado, más fácil)

1. Sube el repositorio a GitHub
2. Ve a [vercel.com](https://vercel.com) → **New Project** → importa el repo
3. Vercel detecta Vite automáticamente → click **Deploy**
4. ✅ Tu web estará en `https://tu-proyecto.vercel.app`

### Opción B — GitHub Pages (con Actions)

1. Sube el repositorio a GitHub (rama `main`)
2. Ve a **Settings → Pages → Source → GitHub Actions**
3. El workflow en `.github/workflows/deploy.yml` se ejecuta automáticamente en cada push
4. ✅ Tu web estará en `https://tu-usuario.github.io/nombre-repo/`

> **Nota GitHub Pages:** Si el repo no está en la raíz del usuario (`usuario.github.io`), agrega `base: '/nombre-del-repo/'` en `vite.config.ts` dentro del objeto `defineConfig`.

## 💻 Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 🛠️ Build

```bash
npm run build      # genera la carpeta /dist
npm run preview    # previsualiza el build localmente
```

## 📁 Estructura

```
├── components/       # Componentes React
├── index.html        # Entry point HTML
├── index.tsx         # Entry point JS/TS
├── App.tsx           # Componente raíz
├── types.ts          # Tipos TypeScript
├── vite.config.ts    # Configuración Vite
├── vercel.json       # Config para Vercel (SPA routing)
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions → GitHub Pages
```

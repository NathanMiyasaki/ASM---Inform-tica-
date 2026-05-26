# A.S.M. Informática — Site Institucional

> Website institucional responsivo para empresa de soluções em TI, construído com HTML5, CSS3 e JavaScript puro — sem frameworks ou dependências externas.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Demonstração Visual](#demonstração-visual)
- [Arquitetura](#arquitetura)
- [Funcionalidades](#funcionalidades)
- [Tech Stack](#tech-stack)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Módulos JavaScript](#módulos-javascript)
- [Sistema de Chatbot](#sistema-de-chatbot)
- [Design System](#design-system)
- [Responsividade](#responsividade)
- [Performance](#performance)
- [Deploy](#deploy)
- [Contato](#contato)

---

## Visão Geral

O projeto é o site oficial da **A.S.M. Informática**, empresa brasileira de tecnologia com foco em:

- Venda de hardware (computadores, notebooks, periféricos)
- Infraestrutura e redes corporativas
- Consultoria estratégica em TI
- Suporte técnico especializado

O site é uma **Single Page Application estática** — toda a lógica, estilos e conteúdo residem em um único arquivo `index.html`, tornando o deploy trivial em qualquer servidor de arquivos estáticos ou CDN.

---

## Arquitetura

```
┌──────────────────────────────────────────────────────────┐
│                       index.html                         │
│                                                          │
│   ┌───────────────────────────────────────────────────┐  │
│   │  <style>  —  CSS Embarcado (11 seções modulares)  │  │
│   └───────────────────────────────────────────────────┘  │
│                                                          │
│   ┌───────────────────────────────────────────────────┐  │
│   │  <body>   —  Markup Semântico (HTML5)             │  │
│   │    ├── <nav>      Navegação fixa                  │  │
│   │    ├── <section>  Hero + Canvas animado           │  │
│   │    ├── <section>  Mensagem institucional          │  │
│   │    ├── <section>  Grid de serviços (6 cards)      │  │
│   │    ├── <section>  CTA / Contato                   │  │
│   │    ├── <footer>   Links e redes sociais           │  │
│   │    └── #chat-widget  Chatbot flutuante            │  │
│   └───────────────────────────────────────────────────┘  │
│                                                          │
│   ┌───────────────────────────────────────────────────┐  │
│   │  <script>  —  Dois módulos IIFE                   │  │
│   │    ├── NetworkCanvas  — animação de fundo         │  │
│   │    └── Chatbot        — assistente interativo     │  │
│   └───────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘

Assets externos
├── /images/        (4 imagens locais)
├── favicon.png
└── Google Fonts CDN (Bebas Neue, Outfit)
```

**Padrão arquitetural:** Monólito estático modular — sem build pipeline, sem transpilation, sem dependências de runtime.

---

## Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| Navegação fixa | Barra de navegação sempre visível com scroll suave às seções |
| Hero animado | Seção de entrada com animações CSS escalonadas (stagger) |
| Network Canvas | Background animado com 70 nós conectados por Canvas API |
| Grid de serviços | 6 cards de serviços com ícones SVG inline |
| Chatbot inteligente | Assistente com detecção de intenção baseada em palavras-chave |
| Botões de ação rápida | Atalhos de conversa no chatbot para perguntas frequentes |
| Redirecionamento WhatsApp | Links diretos `wa.me` para atendimento imediato |
| Design responsivo | Layout adaptável de 320px a 4K |
| Proteção de conteúdo | Context menu desabilitado no lado cliente |

---

## Tech Stack

| Camada | Tecnologia |
|---|---|
| Estrutura | HTML5 semântico |
| Estilização | CSS3 com custom properties (variáveis nativas) |
| Interatividade | JavaScript ES5 vanilla (IIFEs) |
| Animação de fundo | Canvas API + `requestAnimationFrame` |
| Tipografia | Google Fonts — Bebas Neue, Outfit |
| Ícones | SVG inline |
| Hospedagem | Qualquer servidor estático / GitHub Pages |

Sem frameworks CSS, sem jQuery, sem bundlers. Zero dependências de `node_modules`.

---

## Estrutura de Arquivos

```
Sistema A.S.M Informática/
│
├── index.html                    # Aplicação completa (1.354 linhas, ~47 KB)
├── favicon.png                   # Ícone do navegador
│
└── images/
    ├── logo.png                  # Logotipo da empresa
    ├── servico-computadores.png  # Imagem — seção hardware
    ├── servico-planejamento.png  # Imagem — seção planejamento/redes
    └── servico-servicos-grid.png # Imagem — grid de serviços
```

### Organização interna do `index.html`

O arquivo é dividido em **etapas** comentadas:

```
Linha 1      → DOCTYPE, meta tags, Google Fonts
Linha 11     → <style> — Início do CSS
  ├── Seção 1   Reset + Variáveis CSS globais
  ├── Seção 2   Navegação
  ├── Seção 3   Hero
  ├── Seção 4   Canvas de fundo
  ├── Seção 5   Seção institucional
  ├── Seção 6   Grid de serviços
  ├── Seção 7   CTA e contato
  ├── Seção 8   Footer
  ├── Seção 9   Utilitários e animações
  ├── Seção 10  Media queries (responsividade)
  └── Seção 11  Widget do chatbot
Linha ~938   → </style>
Linha ~940   → <body> — Markup HTML
Linha ~1097  → <script> — JavaScript
  ├── IIFE 1: NetworkCanvas (linhas 1099–1174)
  └── IIFE 2: Chatbot       (linhas 1177–1341)
Linha 1354   → Fim do arquivo
```

---

## Módulos JavaScript

### 1. NetworkCanvas

Cria e anima um grafo de partículas no elemento `<canvas>` do Hero.

```
Configuração
  ├── 70 nós com posição e velocidade aleatórias
  ├── Rebote nas bordas do viewport
  ├── Conexões desenhadas entre nós a < 140px de distância
  └── Opacidade da linha proporcional à distância

Loop de renderização
  └── requestAnimationFrame → limpa canvas → atualiza posições → desenha linhas → desenha nós
```

Responsivo: listener em `window.resize` recalcula dimensões do canvas.

---

### 2. Chatbot

Motor de chatbot baseado em correspondência de intenções (intent matching).

```
Fluxo de uma mensagem
  1. Usuário envia texto
  2. normalizeText() remove acentos e converte para minúsculas
  3. detectIntent() percorre o array de intents comparando keywords
  4. Se match encontrado → exibe resposta + botões de ação rápida
  5. Se nenhum match     → resposta de fallback genérica
  6. Delay de 500ms simula latência de digitação
```

**Ações de scroll automático:** algumas respostas chamam `scrollToSection(id)` para levar o usuário à seção relevante da página.

---

## Sistema de Chatbot

### Intenções cadastradas

| Intenção | Palavras-chave (amostra) | Ação extra |
|---|---|---|
| Serviços gerais | serviço, solução, oferecer, ajudar | Scroll → `#servicos` |
| Hardware | computador, notebook, pc, hardware | Scroll → `#servicos` |
| Redes | rede, infraestrutura, cabeamento, wi-fi | Scroll → `#servicos` |
| Consultoria | consultoria, planejamento, estratégia | Scroll → `#servicos` |
| Contato | contato, telefone, email, whatsapp | Scroll → `#contato` |
| Suporte técnico | suporte, técnico, manutenção, problema | — |
| Parcerias | parceria, parceiro, empresa | — |

### Normalização de texto

O bot remove diacríticos antes de comparar, garantindo que "computação" e "computacao" gerem o mesmo match:

```javascript
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '');
}
```

---

## Design System

### Variáveis CSS globais

```css
:root {
    --accent:       #0099D4;   /* Azul primário da marca */
    --accent-dark:  #0077AA;   /* Hover / estados ativos */
    --bg-dark:      #0A0E1A;   /* Fundo escuro base */
    --bg-card:      #111827;   /* Cards e superfícies elevadas */
    --text-primary: #F0F4F8;   /* Texto principal */
    --text-muted:   #8892A4;   /* Texto secundário / labels */
    --border:       rgba(0,153,212,0.15); /* Divisores sutis */
}
```

### Efeitos visuais

| Efeito | Implementação |
|---|---|
| Glassmorphism | `backdrop-filter: blur(...)` + `background: rgba(...)` |
| Tipografia fluida | `clamp(min, viewport, max)` — sem media queries para fonte |
| Animação de entrada | `@keyframes` com `animation-delay` escalonado |
| Gradientes | Sobreposições em imagens de serviço para legibilidade |

---

## Responsividade

Breakpoints definidos por `@media`:

| Faixa | Layout |
|---|---|
| `< 480px` | Coluna única, fonte reduzida, chat compacto |
| `480px – 768px` | Grid 2 colunas para serviços |
| `768px – 1024px` | Ajustes de padding e hero height |
| `> 1024px` | Layout completo desktop |

Unidades utilizadas: `dvh` (dynamic viewport height) para compatibilidade com navegadores móveis que alteram a altura ao rolar; `safe-area-inset` para dispositivos com notch.

---

## Performance

- **Sem dependências de runtime** — carregamento instantâneo sem bloqueio de scripts externos
- **Canvas acelerado por GPU** — animação via `requestAnimationFrame` usa compositing de hardware
- **Imagens com lazy load** — atributo `loading="lazy"` nos elementos `<img>`
- **CSS custom properties** — reutilização sem duplicação de valores no stylesheet
- **Zero JavaScript externo** — todo JS é carregado inline, eliminando round-trips de rede adicionais

---

## Deploy

Por ser um site puramente estático, o deploy se resume a servir os arquivos:

### GitHub Pages

```bash
# Na raiz do repositório
git push origin main
# Ativar GitHub Pages nas configurações do repositório → branch: main / root
```

### Servidor local (desenvolvimento)

```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .

# VS Code: extensão Live Server → botão "Go Live"
```

Acesse `http://localhost:8080` após iniciar qualquer um dos servidores acima.

### Repositório

```
https://github.com/NathanMiyasaki/ASM---Inform-tica-
```

---

## Contato

| Canal | Informação |
|---|---|
| WhatsApp | (11) 9-3448-6577 |
| E-mail | vendas@infoasm.com |
| Desenvolvedor | Nathan Miyasaki — nathan.miyasaki@anchieta.br |

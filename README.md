# Portfólio Profissional — Pedro José Camilo

Website de portfólio profissional desenvolvido para o **Laboratório 01** da disciplina **Desenvolvimento e Integração de Aplicações Web (DIAW)** do curso de Engenharia de Software da PUC Minas.

O site apresenta minha trajetória, habilidades, projetos e formas de contato em uma página única, responsiva e bilíngue (português e inglês).

## Status

🚧 **Sprint 01 — Planejamento e prototipação**

## Seções previstas

| Seção | Conteúdo |
| --- | --- |
| **Sobre Mim** | Apresentação em português e inglês: formação, área de atuação, interesses e objetivos |
| **Projetos** | Linha do tempo, do mais antigo ao mais recente, com descrição, tecnologias, link do GitHub e imagens |
| **Experiências** | Formação, projetos e cursos, com instituição, atividade, período e descrição |
| **Contato** | Ícones de e-mail, WhatsApp, LinkedIn e GitHub, além de formulário com envio por e-mail |

## Protótipo (wireframes)

Wireframes de média fidelidade feitos no Figma, nas versões desktop e mobile:

🔗 [Abrir no Figma](https://www.figma.com/design/dg4oqhBoANejbjIByxsy8i/Portifolio?node-id=0-1&t=50rcibEosvjXIEyv-1)

![Wireframes do portfólio](docs/prototipo/wireframes.png)

## Tecnologias previstas

- **React** + **TypeScript**, com build pelo **Vite**
- **Tailwind CSS** para estilização
- **Framer Motion** para animações
- **React Hook Form** + **Zod** para o formulário e suas validações
- **EmailJS** para envio de e-mail direto do front-end
- **React Icons** para os ícones
- Hospedagem na **Vercel**

## Estrutura inicial

```
portifolio/
├── docs/prototipo/       # wireframes
├── public/               # favicon
├── src/
│   ├── components/       # Header, Footer, LanguageToggle, SectionHeading
│   ├── data/             # dados do perfil e das seções
│   ├── hooks/            # useActiveSection (destaque da seção ativa no menu)
│   ├── i18n/             # textos em PT/EN e contexto de idioma
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── package.json
```

## Como executar

```bash
npm install
npm run dev
```

O site abre em `http://localhost:5173`.

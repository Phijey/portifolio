import type { Localized } from '../i18n/types'

export type ExperienceType = 'education' | 'project' | 'course'

export interface Experience {
  id: string
  type: ExperienceType
  institution: string
  role: Localized
  /** Anos no formato AAAA. Sem `end`, a experiência está em andamento. */
  start: string
  end?: string
  description: Localized
  tags?: string[]
}

export const experiences: Experience[] = [
  {
    id: 'puc',
    type: 'education',
    institution: 'PUC Minas',
    role: { pt: 'Graduação em Engenharia de Software', en: "Bachelor's in Software Engineering" },
    start: '2026',
    description: {
      pt: 'Formação em desenvolvimento de software com projetos práticos em equipe, desenvolvimento web, engenharia de requisitos e integração de aplicações.',
      en: 'Software development degree with hands-on team projects, web development, requirements engineering and application integration.',
    },
  },
  {
    id: 'flamer',
    type: 'project',
    institution: 'Projeto Flamer · PUC Minas',
    role: { pt: 'Desenvolvedor em equipe de 6 pessoas', en: 'Developer in a 6-person team' },
    start: '2026',
    end: '2026',
    description: {
      pt: 'Responsável pelos módulos de Qualidade do Ar e Focos Ativos de uma plataforma de prevenção de queimadas, com mapas interativos, indicadores e gráficos.',
      en: 'Responsible for the Air Quality and Active Fires modules of a wildfire prevention platform, with interactive maps, indicators and charts.',
    },
    tags: ['JavaScript', 'Leaflet', 'Chart.js', 'JSON Server'],
  },
  {
    id: 'alura',
    type: 'course',
    institution: 'Alura',
    role: { pt: 'Formação em Data Science', en: 'Data Science track' },
    start: '2025',
    end: '2025',
    description: {
      pt: 'Seis cursos de Python para Data Science: exploração e análise de dados, visualização com bibliotecas Python, testes de hipóteses, regressão linear e séries temporais.',
      en: 'Six Python for Data Science courses: data exploration and analysis, visualization with Python libraries, hypothesis testing, linear regression and time series.',
    },
    tags: ['Python', 'Data Science', 'Data Visualization'],
  },
  {
    id: 'cotemig',
    type: 'education',
    institution: 'Colégio COTEMIG',
    role: { pt: 'Ensino Médio Técnico em Informática', en: 'High School with Technical Degree in IT' },
    start: '2022',
    end: '2024',
    description: {
      pt: 'Programação em C# com ASP.NET e Blazor, bancos de dados SQL e NoSQL, arquitetura MVC, desenvolvimento front-end com HTML e CSS e planilhas integradas no Excel.',
      en: 'C# programming with ASP.NET and Blazor, SQL and NoSQL databases, MVC architecture, front-end development with HTML and CSS and integrated Excel spreadsheets.',
    },
    tags: ['C#', 'ASP.NET', 'Blazor', 'SQL', 'MVC'],
  },
]

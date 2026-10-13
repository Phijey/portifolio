import type { Localized } from '../i18n/types'

import flamerAlertas from '../assets/projects/flamer/alertas.webp'
import flamerConta from '../assets/projects/flamer/configuracao-conta.webp'
import flamerDashboard from '../assets/projects/flamer/dashboard.webp'
import flamerFocos from '../assets/projects/flamer/focos-ativos.webp'
import flamerHistorico from '../assets/projects/flamer/historico.webp'
import flamerHome from '../assets/projects/flamer/home.webp'
import flamerMeteorologia from '../assets/projects/flamer/meteorologia.webp'
import flamerPropriedade from '../assets/projects/flamer/minha-propriedade.webp'
import flamerQualidadeAr from '../assets/projects/flamer/qualidade-do-ar.webp'
import flamerRelatorios from '../assets/projects/flamer/relatorios.webp'
import flamerReportar from '../assets/projects/flamer/reportar-ocorrencia.webp'
import vibeCadastro from '../assets/projects/vibemusic/cadastro-admin.webp'
import vibeDetalhe from '../assets/projects/vibemusic/detalhe-artista.webp'
import vibeFavoritos from '../assets/projects/vibemusic/favoritos.webp'
import vibeHome from '../assets/projects/vibemusic/home.webp'

export interface ProjectImage {
  src: string
  caption: Localized
}

export interface Project {
  id: string
  name: string
  /** Mês de conclusão no formato AAAA-MM, usado para ordenar a linha do tempo. */
  date: string
  description: Localized
  highlights: Localized<string[]>
  technologies: string[]
  repository: string
  images: ProjectImage[]
  team?: { size: number; myRole: Localized }
}

export const projects: Project[] = [
  {
    id: 'flamer',
    name: 'Flamer',
    date: '2026-07',
    description: {
      pt: 'Plataforma de monitoramento e prevenção de queimadas para produtores rurais. Reúne mapa de focos ativos, índice de risco de fogo, meteorologia, qualidade do ar, reporte de ocorrências com geolocalização, histórico, alertas e relatórios por propriedade.',
      en: 'Wildfire monitoring and prevention platform for rural producers. It brings together an active fire map, fire risk index, weather, air quality, geolocated incident reports, history, alerts and per-property reports.',
    },
    highlights: {
      pt: [
        'Mapa interativo com milhares de focos de calor e filtro por raio',
        'Painel de qualidade do ar com índice IQA, PM2.5, PM10 e CO',
        'Gráficos de histórico e dashboard com dados do JSON Server',
      ],
      en: [
        'Interactive map with thousands of hotspots and radius filter',
        'Air quality panel with AQI, PM2.5, PM10 and CO',
        'History charts and dashboard backed by JSON Server data',
      ],
    },
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'JSON Server', 'Leaflet', 'Chart.js', 'Bootstrap'],
    repository: 'https://github.com/Phijey/Flamer',
    team: {
      size: 6,
      myRole: {
        pt: 'Desenvolvi os módulos de Qualidade do Ar e Focos Ativos.',
        en: 'I built the Air Quality and Active Fires modules.',
      },
    },
    images: [
      { src: flamerFocos, caption: { pt: 'Focos ativos no mapa', en: 'Active fires on the map' } },
      { src: flamerQualidadeAr, caption: { pt: 'Qualidade do ar', en: 'Air quality' } },
      { src: flamerHome, caption: { pt: 'Página inicial', en: 'Home page' } },
      { src: flamerDashboard, caption: { pt: 'Dashboard', en: 'Dashboard' } },
      { src: flamerMeteorologia, caption: { pt: 'Previsão meteorológica', en: 'Weather forecast' } },
      { src: flamerHistorico, caption: { pt: 'Histórico de queimadas', en: 'Wildfire history' } },
      { src: flamerReportar, caption: { pt: 'Reportar ocorrência', en: 'Report an incident' } },
      { src: flamerAlertas, caption: { pt: 'Alertas e notificações', en: 'Alerts and notifications' } },
      { src: flamerRelatorios, caption: { pt: 'Relatórios', en: 'Reports' } },
      { src: flamerPropriedade, caption: { pt: 'Minha propriedade', en: 'My property' } },
      { src: flamerConta, caption: { pt: 'Configuração de conta', en: 'Account settings' } },
    ],
  },
  {
    id: 'vibemusic',
    name: 'VibeMusic',
    date: '2026-06',
    description: {
      pt: 'Plataforma de descoberta musical com home dinâmica, busca em tempo real, carrossel de destaques, páginas de detalhes de artistas e álbuns, login de usuários, favoritos, CRUD para administradores e estatísticas com gráfico.',
      en: 'Music discovery platform with a dynamic home page, real-time search, featured carousel, artist and album detail pages, user login, favorites, admin CRUD and statistics with a chart.',
    },
    highlights: {
      pt: [
        'API REST com JSON Server, sem dados fixos no código',
        'Sessão de usuário, papéis de administrador e favoritos',
        'Busca que ignora acentos e maiúsculas',
      ],
      en: [
        'REST API with JSON Server, no hardcoded data',
        'User session, admin roles and favorites',
        'Search that ignores accents and letter case',
      ],
    },
    technologies: ['HTML', 'CSS', 'JavaScript', 'JSON Server', 'Bootstrap', 'Chart.js'],
    repository: 'https://github.com/Phijey/VibeMusic',
    images: [
      { src: vibeHome, caption: { pt: 'Página inicial', en: 'Home page' } },
      { src: vibeDetalhe, caption: { pt: 'Detalhes do artista', en: 'Artist details' } },
      { src: vibeFavoritos, caption: { pt: 'Favoritos do usuário', en: 'User favorites' } },
      { src: vibeCadastro, caption: { pt: 'Cadastro de itens (admin)', en: 'Item management (admin)' } },
    ],
  },
]

/** Projetos do mais antigo ao mais recente. */
export const projectsTimeline = [...projects].sort((a, b) => a.date.localeCompare(b.date))

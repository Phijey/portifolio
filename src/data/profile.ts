import type { IconType } from 'react-icons'
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'
import { MdOutlineEmail } from 'react-icons/md'
import type { Localized } from '../i18n/types'

export const profile = {
  name: 'Pedro José Camilo',
  shortName: 'Pedro Camilo',
  role: {
    pt: 'Estudante de Engenharia de Software · PUC Minas',
    en: 'Software Engineering student · PUC Minas',
  } satisfies Localized,
  about: {
    pt: [
      'Sou estudante de Engenharia de Software na PUC Minas e Técnico em Informática formado pelo Colégio COTEMIG. Tenho experiência com C# (ASP.NET e Blazor), SQL, Python para análise de dados e desenvolvimento web com HTML, CSS e JavaScript.',
      'Gosto de aprender tecnologias novas rápido, me adapto bem a diferentes ambientes e trabalho bem em equipe. Hoje busco minha primeira oportunidade de estágio em desenvolvimento de software.',
    ],
    en: [
      "I'm a Software Engineering student at PUC Minas and hold a technical degree in IT from Colégio COTEMIG. I have experience with C# (ASP.NET and Blazor), SQL, Python for data analysis and web development with HTML, CSS and JavaScript.",
      "I pick up new technologies quickly, adapt well to different environments and work well in teams. I'm currently looking for my first software development internship.",
    ],
  } satisfies Localized<string[]>,
  skills: [
    'C#',
    'ASP.NET',
    'Blazor',
    'SQL / MySQL',
    'NoSQL',
    'Python',
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Git',
    'Excel',
  ],
  languages: [
    { name: { pt: 'Português', en: 'Portuguese' }, level: { pt: 'Nativo', en: 'Native' } },
    { name: { pt: 'Inglês', en: 'English' }, level: { pt: 'Intermediário', en: 'Intermediate' } },
  ] satisfies { name: Localized; level: Localized }[],
  certificates: 6,
}

export interface ContactLink {
  id: string
  label: Localized
  value: string
  href: string
  icon: IconType
}

export const contacts: ContactLink[] = [
  {
    id: 'email',
    label: { pt: 'E-mail', en: 'Email' },
    value: 'pedrojosetavarescamilo@gmail.com',
    href: 'mailto:pedrojosetavarescamilo@gmail.com',
    icon: MdOutlineEmail,
  },
  {
    id: 'whatsapp',
    label: { pt: 'WhatsApp', en: 'WhatsApp' },
    value: '(31) 98336-8391',
    href: 'https://wa.me/5531983368391',
    icon: FaWhatsapp,
  },
  {
    id: 'linkedin',
    label: { pt: 'LinkedIn', en: 'LinkedIn' },
    value: 'in/pedro-josé-m-t-camilo',
    href: 'https://www.linkedin.com/in/pedro-jos%C3%A9-m-t-camilo-5224352b4',
    icon: FaLinkedinIn,
  },
  {
    id: 'github',
    label: { pt: 'GitHub', en: 'GitHub' },
    value: 'github.com/Phijey',
    href: 'https://github.com/Phijey',
    icon: FaGithub,
  },
]

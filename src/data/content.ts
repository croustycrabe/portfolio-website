import type { Localized, TranslationKey } from '../i18n/translations';
import nodeEditorImg from '../assets/Node_editor.png';

/* ------------------------------------------------------------------ */
/* Journey                                                             */
/* ------------------------------------------------------------------ */

export type JourneyType = 'work' | 'education' | 'extra';

export interface JourneyItem {
  type: JourneyType;
  title: Localized;
  organization: string;
  location: Localized;
  period: Localized;
  bullets: Localized[];
  highlight?: Localized;
}

export const journey: JourneyItem[] = [
  {
    type: 'work',
    title: { fr: 'Chef de projet MES, SI & OT', en: 'MES, IT & OT Project Manager' },
    organization: 'Akkodis · Saft',
    location: { fr: 'Poitiers, France', en: 'Poitiers, France' },
    period: { fr: 'Depuis septembre 2026', en: 'Since September 2026' },
    bullets: [
      {
        fr: 'Consultant Akkodis au sein du service informatique de Saft Poitiers',
        en: 'Akkodis consultant within the IT department of Saft Poitiers',
      },
      {
        fr: 'Pilotage de la mise en place du standard Ignition : design, architecture logicielle, modèle de données',
        en: 'Leading the rollout of the Ignition standard: design, software architecture, data model',
      },
      {
        fr: 'Interface entre les utilisateurs (services techniques) et l’intégrateur Ignition',
        en: 'Link between the users (technical services) and the Ignition integrator',
      },
      {
        fr: 'Projets SI : gestion de l’infrastructure Linux pour les déploiements Docker',
        en: 'IT projects: managing Linux infrastructure for Docker deployments',
      },
      { fr: 'Sécurité réseau', en: 'Network security' },
    ],
  },
  {
    type: 'education',
    title: {
      fr: 'Diplômé ingénieur Systèmes et Technologies de l’Information',
      en: 'Graduated as an Information Systems & Technology engineer',
    },
    organization: 'Polytech Nancy',
    location: { fr: 'Nancy, France', en: 'Nancy, France' },
    period: { fr: 'Septembre 2026', en: 'September 2026' },
    highlight: { fr: 'Diplôme d’ingénieur obtenu', en: 'Engineering degree obtained' },
    bullets: [
      {
        fr: 'Fin du cycle ingénieur en apprentissage, réalisé en alternance chez Saft',
        en: 'Completed the engineering program as an apprentice at Saft',
      },
    ],
  },
  {
    type: 'extra',
    title: { fr: 'Cyber Humanum Est : lieutenant LIO', en: 'Cyber Humanum Est: offensive team lieutenant' },
    organization: 'Polytech Nancy',
    location: { fr: 'Nancy, France', en: 'Nancy, France' },
    period: { fr: 'Février 2026', en: 'February 2026' },
    highlight: { fr: 'Prix de la meilleure équipe LIO', en: 'Best offensive team award' },
    bullets: [
      {
        fr: 'Wargame cyber : lieutenant de l’équipe Lutte Informatique Offensive (LIO)',
        en: 'Cyber wargame: lieutenant of the offensive cyber operations team',
      },
      { fr: 'Management d’une équipe de 10 personnes en situation de crise', en: 'Led a team of 10 people in a crisis scenario' },
      {
        fr: 'Définition des stratégies et coordination avec les autres cellules',
        en: 'Defined strategies and coordinated with the other cells',
      },
    ],
  },
  {
    type: 'extra',
    title: { fr: 'Week-end de cohésion des apprentis', en: 'Apprentice team-building weekend' },
    organization: 'Réseau Polytech',
    location: { fr: 'Nancy, France', en: 'Nancy, France' },
    period: { fr: 'Mai 2025 & mai 2026', en: 'May 2025 & May 2026' },
    bullets: [
      {
        fr: 'Organisation d’un week-end de cohésion pour les apprentis du réseau Polytech',
        en: 'Organized a team-building weekend for apprentices across the Polytech network',
      },
      {
        fr: 'Création des goodies, relation fournisseurs et analyse des offres',
        en: 'Designed the merch, handled suppliers and compared offers',
      },
      { fr: 'Gestion du budget', en: 'Budget management' },
    ],
  },
  {
    type: 'work',
    title: { fr: 'Mobilité internationale', en: 'International assignment' },
    organization: 'SAFT',
    location: { fr: 'Oskarshamn, Suède', en: 'Oskarshamn, Sweden' },
    period: { fr: 'Juin – août 2025', en: 'June – August 2025' },
    bullets: [
      { fr: 'Échange de compétences avec l’équipe locale', en: 'Skill exchange with the local team' },
      { fr: 'Prise en main des outils de vision Basler', en: 'Hands-on work with Basler vision tools' },
      {
        fr: 'Intégration des systèmes de vision avec des automates (Siemens, KepWare)',
        en: 'Integrated vision systems with PLCs (Siemens, KepWare)',
      },
    ],
  },
  {
    type: 'work',
    title: { fr: 'Ingénieur industrialisation (apprentissage)', en: 'Industrialization engineer (apprenticeship)' },
    organization: 'SAFT',
    location: { fr: 'Poitiers, France', en: 'Poitiers, France' },
    period: { fr: '2023 – 2026', en: '2023 – 2026' },
    bullets: [
      { fr: 'Participation à la rédaction du standard de développement MES', en: 'Co-wrote the MES development standard' },
      {
        fr: 'Rédaction de cahiers des charges et de documentations d’applications',
        en: 'Wrote specifications and application documentation',
      },
      { fr: 'Gestion de projets logiciels', en: 'Software project management' },
      {
        fr: 'Études comparatives de systèmes de vision et déploiement de solutions à base d’IA',
        en: 'Benchmarked vision systems and deployed AI-based vision solutions',
      },
      { fr: 'Applications full-stack avec Flutter et Python', en: 'Full-stack applications with Flutter and Python' },
      { fr: 'Applications de traçabilité sur la plateforme Ignition', en: 'Traceability applications on the Ignition platform' },
    ],
  },
  {
    type: 'education',
    title: {
      fr: 'Diplôme d’ingénieur Systèmes et Technologies de l’Information',
      en: 'Engineering degree, Information Systems & Technology',
    },
    organization: 'Polytech Nancy',
    location: { fr: 'Nancy, France', en: 'Nancy, France' },
    period: { fr: '2023 – 2026', en: '2023 – 2026' },
    bullets: [
      { fr: 'Cycle ingénieur en apprentissage', en: 'Engineering program as an apprentice (work-study)' },
    ],
  },
  {
    type: 'work',
    title: { fr: 'Stage : banc optique de calibration de caméra', en: 'Internship: optical camera calibration bench' },
    organization: 'CEA DAM',
    location: { fr: 'Gramat, France', en: 'Gramat, France' },
    period: { fr: 'Avril – juin 2023', en: 'April – June 2023' },
    bullets: [
      {
        fr: 'Conception d’un banc de test LASER pour corriger le bruit des capteurs de caméras',
        en: 'Built a LASER test bench to correct camera sensor noise',
      },
      { fr: 'Développement d’un logiciel Python pour piloter le banc', en: 'Developed Python software to drive the bench' },
    ],
  },
  {
    type: 'education',
    title: { fr: 'DUT Mesures Physiques', en: 'Associate degree in Physical Measurements (DUT)' },
    organization: 'IUT de Blois',
    location: { fr: 'Blois, France', en: 'Blois, France' },
    period: { fr: '2021 – 2023', en: '2021 – 2023' },
    bullets: [
      {
        fr: 'Formation scientifique et technique : instrumentation, électronique, mécanique, matériaux',
        en: 'Scientific & technical training: instrumentation, electronics, mechanics, materials',
      },
    ],
  },
  {
    type: 'education',
    title: { fr: 'Bac général maths / physique', en: 'High-school diploma, maths & physics' },
    organization: 'Lycée Victor Hugo',
    location: { fr: 'Poitiers, France', en: 'Poitiers, France' },
    period: { fr: '2021', en: '2021' },
    bullets: [{ fr: 'Mention assez bien', en: 'With honors' }],
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export interface Skill {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
}

export const skillGroups: { key: TranslationKey; skills: Skill[] }[] = [
  {
    key: 'skills.cat.languages',
    skills: [
      { name: 'Python', level: 4 },
      { name: 'Rust', level: 3 },
      { name: 'C++', level: 2 },
    ],
  },
  {
    key: 'skills.cat.frameworks',
    skills: [
      { name: 'Socket.IO', level: 4 },
      { name: 'Flutter', level: 4 },
      { name: 'Django', level: 3 },
      { name: 'React Js', level: 2 },
    ],
  },
  {
    key: 'skills.cat.industry',
    skills: [
      { name: 'Ignition', level: 5 },
      { name: 'Linux', level: 4 },
      { name: 'KepWare', level: 2 },
    ],
  },
  {
    key: 'skills.cat.design',
    skills: [
      { name: 'Figma', level: 4 },
      { name: 'Penpot', level: 4 },
      { name: 'Lunacy', level: 4 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectCover = 'rust-api' | 'chat-app' | { image: string };

export interface Project {
  title: Localized;
  description: Localized;
  tech: string[];
  kind: 'personal' | 'education';
  cover: ProjectCover;
  githubUrl?: string;
  figmaUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: { fr: 'Éditeur de programmes no-code', en: 'No-code program editor' },
    description: {
      fr: 'Package front-end Flutter pour créer des programmes en no-code avec des nœuds, à la manière de Simulink.',
      en: 'Flutter front-end package to build programs visually with nodes, Simulink-style.',
    },
    tech: ['Flutter'],
    kind: 'personal',
    cover: { image: nodeEditorImg },
    githubUrl: 'https://github.com/avagst3/node_program_editor',
  },
  {
    title: { fr: 'API HTTP en Rust', en: 'Rust HTTP API' },
    description: {
      fr: 'API HTTP asynchrone développée en Rust avec Tokio et Axum.',
      en: 'Asynchronous HTTP API written in Rust with Tokio and Axum.',
    },
    tech: ['Rust'],
    kind: 'education',
    cover: 'rust-api',
    githubUrl: 'https://github.com/avagst3/rust_api',
  },
  {
    title: { fr: 'Design d’une application de chat', en: 'Chat app design' },
    description: {
      fr: 'Conception UI/UX complète d’une application de messagerie, publiée sur la communauté Figma.',
      en: 'Full UI/UX design of a messaging app, published on the Figma community.',
    },
    tech: ['Figma'],
    kind: 'personal',
    cover: 'chat-app',
    figmaUrl: 'https://www.figma.com/community/file/1557706229756083214',
  },
];

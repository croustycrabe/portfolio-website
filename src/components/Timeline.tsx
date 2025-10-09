import { useI18n } from '../contexts/i18n-context';
import { Briefcase, GraduationCap } from 'lucide-react';

interface TimelineItem {
  type: 'work' | 'education';
  title: { fr: string; en: string };
  organization: string;
  period: string;
  description: { fr: string; en: string };
  location: string;
}

const timelineData: TimelineItem[] = [
  {
    type: 'work',
    title: { fr: 'Apprenti ingénieur', en: 'Engineering apprentice' },
    organization: 'Saft',
    period: '2023 - 2025',
    description: {
      fr: "Alternant ingénieur. Développement et installation de systèmes de vision sur les lignes de production. Création d'interface utilisateur (Flutter et API Websocket en Python) ainsi que de programme de traitement d'image avec Python et les librairies OpenCV et TensorFlow.",
      en: "Alternating engineer. Development and installation of vision systems on production lines. Creation of user interface (Flutter and Websocket API in Python) as well as image processing program with Python and the OpenCV and TensorFlow libraries.",
    },
    location: 'Poitiers, France',
  },
  {
    type: 'work',
    title: { fr: 'Mobilité internationale', en: 'International mobility' },
    organization: 'Saft',
    period: '2025',
    description: {
      fr: "Échange avec l'équipe industrielle sur un autre site de mon entreprise. Apport de mes compétences en développement logiciel et apprentissage de l'utilisation de systèmes automatisés (Automate Siemens, plateforme KepWare)",
      en: "Exchange with the industrial team on another site of my company. Contribution of my skills in software development and learning the use of automated systems (Siemens automation, KepWare platform)",
    },
    location: 'Oskarsahmn, Sweden',
  },
  
  {
    type: 'education',
    title: { fr: 'Diplôme d\'Ingénieur Informatique', en: 'Computer Science Engineering Degree' },
    organization: 'Polytech',
    period: '2023 - 2025',
    description: {
      fr: "Diplôme d'ingénieur en Informatique Automatique Robotique et Réseau en apprentissage.",
      en: 'Diploma of Engineer in Automatic Computing, Robotics and Network in learning.',
    },
    location: 'Nancy, France',
  },
  {
    type: 'work',
    title: { fr: 'Stagiaire', en: 'Intern' },
    organization: 'CEA',
    period: '2023',
    description: {
      fr: "Stage de fin d'études (DUT). Conception d'un banc de calibration de caméra pour l'imagerie LASER. Création de différents exécutables en Python avec Tkinter et OpenCV.",
      en: "Final year internship (DUT). Design of a camera calibration bench for LASER imaging. Creation of different executables in Python with Tkinter and OpenCV.",
    },
    location: 'Gramat, France',
  },
  {
    type: 'education',
    title: { fr: 'DUT Mesures Physique', en: 'Computer Science Associate Degree' },
    organization: 'IUT',
    period: '2021 - 2023',
    description: {
      fr: "DUT mesures physiques, spécialité technique d'instrumentation. Formation scientifique généraliste et technique sur différents domaines tels que l'électronique, la mécanique des solides ou encore la chimie des matériaux.",
      en: "DUT physical measures, technical specialty of instrumentation. General scientific and technical training in different fields such as electronics, solid mechanics, or even material chemistry.",
    },
    location: 'Blois, France',
  },
];

export function Timeline() {
  const { language, t } = useI18n();

  return (
    <section id="journey" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-[#2F6B7C] libre-bodoni-regular mb-2">{t('journey.title')}</h2>
          <p className="text-muted-foreground">{t('journey.subtitle')}</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Icon */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#F6FAFE] border-4 border-primary flex items-center justify-center z-10">
                  {item.type === 'work' ? (
                    <Briefcase className="text-primary" size={24} />
                  ) : (
                    <GraduationCap className="text-primary" size={24} />
                  )}
                </div>

                {/* Spacer for desktop */}
                <div className="hidden md:block md:w-1/2"></div>

                {/* Content */}
                <div className={`md:w-1/2 ml-24 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h3>{item.title[language]}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {item.period}
                      </span>
                    </div>
                    <h4 className="text-primary mb-1">{item.organization}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{item.location}</p>
                    <p className="text-sm text-muted-foreground">{item.description[language]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

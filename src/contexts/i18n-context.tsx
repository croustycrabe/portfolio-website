import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type Language = "fr" | "en";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(
  undefined,
);

const translations = {
  fr: {
    // Page Title
    "page.title": "Auguste Lacheteau - Portfolio",

    // Navigation
    "nav.home": "accueil",
    "nav.journey": "parcours",
    "nav.skills": "compétences",
    "nav.projects": "projets",
    "nav.contact":"contact",

    // Hero
    "hero.name": "Auguste Lacheteau",
    "hero.title": "Apprenti ingénieur en informatique",
    "hero.cta.journey": "Mon parcours",
    "hero.cta.projects": "Mes projets",

    // About
    "about.title": "À propos de moi",
    "about.description": "Je suis actuellement apprenti ingénieur en Informatique Automatique, Robotique et Réseau (IA2R) à Polytech Nancy. Mon alternance se déroule au sein de l'entreprise SAFT à Poitiers, où ma mission consiste à installer des systèmes de vision sur les lignes de production.",
    "about.highlight1": "📍 Basé en France",
    "about.highlight2": "Télécharger mon CV",

    // Contact
    "contact.title": "Mes réseaux :",
    "contact.subtitle" : " ",
    "contact.getInTouch" : "Mes conctacts",
    "contact.reach": "Me contacter :",
    "contact.social": "Mes réseaux",
    "contact.button": "Me contacter par mail",
    "contact.form.title": "Envoyer un message",
    "contact.form.description":
      "Remplissez le formulaire ci-dessous et votre client mail s'ouvrira avec les informations pré-remplies.",
    "contact.form.name": "Nom",
    "contact.form.namePlaceholder": "Votre nom",
    "contact.form.emailLabel": "Email",
    "contact.form.emailPlaceholder": "votre.email@exemple.com",
    "contact.form.subject": "Sujet",
    "contact.form.subjectPlaceholder": "Objet de votre message",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder":
      "Écrivez votre message ici...",
    "contact.form.cancel": "Annuler",
    "contact.form.send": "Envoyer",
    "contact.form.success": "Votre client mail va s'ouvrir !",
    "contact.form.from": "De",
    "contact.form.email": "Email",

    // Journey
    "journey.title": "Mon Parcours",
    "journey.subtitle":
      "Expérience professionnelle et formation",

    // Skills
    "skills.title": "Compétences",
    "skills.subtitle": "Mes principales compétences techniques",
    "skills.rating.title": "Système d'évaluation",
    "skills.rating.1": "Connaissances fondamentales - nécessite la documentation pour l'implémentation",
    "skills.rating.2": "Maîtrise fonctionnelle - capable d'implémenter des fonctionnalités de base de manière autonome",
    "skills.rating.3": "Expertise production - capable de construire des systèmes complets prêts pour la production",
    "skills.rating.4": "Maîtrise avancée - compréhension approfondie des concepts fondamentaux",
    "skills.rating.5": "Niveau expert - capable d'accompagner et de former d'autres développeurs",

    // Projects
    "projects.title": "Projets",
    "projects.subtitle": "Découvrez mes réalisations",
    "projects.all": "Tous",
    "projects.viewProject": "Voir le projet",

    // Footer
    "footer.rights":
      "© 2025 Auguste Lacheteau. Tous droits réservés.",
  },
  en: {
    // Page Title
    "page.title": "Auguste Lacheteau - Portfolio",

    // Navigation
    "nav.home": "home",
    "nav.journey": "journey",
    "nav.skills": "skills",
    "nav.projects": "projects",
    "nav.contact":"contact",

    // Hero
    "hero.name": "Auguste Lacheteau",
    "hero.title": "Apprentice Software Engineer",
    "hero.cta.journey": "My Journey",
    "hero.cta.projects": "My Projects",

    // About
    "about.title": "About Me",
    "about.description": "I am currently an apprentice engineer in Computer Science, Automation, Robotics and Networks (IA2R) at Polytech Nancy. My work-study program takes place at SAFT in Poitiers, where my mission is to install vision systems on production lines.",
    "about.highlight1": "📍 Based in France",
    "about.highlight2": "Download my CV",

    // Contact
    "contact.title": "My networks:",
    "contact.subtitle" : " ",
    "contact.reach": "Contact me:",
    "contact.social": "My networks",
    "contact.button": "Contact me by email",
    "contact.getInTouch" : "My conctacts",
    "contact.form.title": "Send a message",
    "contact.form.description":
      "Fill out the form below and your email client will open with the pre-filled information.",
    "contact.form.name": "Name",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.emailLabel": "Email",
    "contact.form.emailPlaceholder": "your.email@example.com",
    "contact.form.subject": "Subject",
    "contact.form.subjectPlaceholder":
      "Subject of your message",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder":
      "Write your message here...",
    "contact.form.cancel": "Cancel",
    "contact.form.send": "Send",
    "contact.form.success": "Your email client will open!",
    "contact.form.from": "From",
    "contact.form.email": "Email",

    // Journey
    "journey.title": "My Journey",
    "journey.subtitle": "Professional experience and education",

    // Skills
    "skills.title": "Skills",
    "skills.subtitle": "My main technical skills",
    "skills.rating.title": "Proficiency Levels",
    "skills.rating.1": "Fundamental knowledge - requires documentation for implementation",
    "skills.rating.2": "Functional proficiency - capable of implementing basic features independently",
    "skills.rating.3": "Production-ready expertise - capable of building complete systems for production",
    "skills.rating.4": "Advanced mastery - deep understanding of core concepts",
    "skills.rating.5": "Expert level - capable of mentoring and training other developers",

    // Projects
    "projects.title": "Projects",
    "projects.subtitle": "Discover my work",
    "projects.all": "All",
    "projects.viewProject": "View Project",

    // Footer
    "footer.rights":
      "© 2025 Auguste Lacheteau. All rights reserved.",
  },
};

export function I18nProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)["fr"]
      ] || key
    );
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error(
      "useI18n must be used within an I18nProvider",
    );
  }
  return context;
}
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
    "skills.rating.title": "Matrice de Compétences",
    "skills.rating.1.name": "Débutant",
    "skills.rating.1.desc": "Connaissances de base - Connaît les principes fondamentaux. A besoin d'encadrement pour appliquer la compétence. Pas encore autonome.",
    "skills.rating.2.name": "Intermédiaire",
    "skills.rating.2.desc": "Application guidée - Peut utiliser la compétence dans des cas simples ou standards. Autonomie partielle avec supervision occasionnelle.",
    "skills.rating.3.name": "Confirmé",
    "skills.rating.3.desc": "Autonome - Utilise la compétence de manière autonome dans la plupart des situations. Capable de résoudre des problèmes courants.",
    "skills.rating.4.name": "Avancé",
    "skills.rating.4.desc": "Expertise reconnue - Maîtrise complète. Capacité à résoudre des problèmes complexes, optimiser des solutions, conseiller les autres.",
    "skills.rating.5.name": "Référent",
    "skills.rating.5.desc": "Leader / Référent / Formateur - Fait autorité dans le domaine. Définit des standards, forme les autres, innove ou pilote des projets stratégiques.",
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
    "skills.rating.title": "Competency Matrix",
    "skills.rating.1.name": "Beginner",
    "skills.rating.1.desc": "Basic knowledge - Knows fundamental principles. Needs guidance to apply the competence. Not yet autonomous.",
    "skills.rating.2.name": "Intermediate",
    "skills.rating.2.desc": "Guided application - Can use the competence in simple or standard cases. Partial autonomy with occasional supervision.",
    "skills.rating.3.name": "Confirmed",
    "skills.rating.3.desc": "Autonomous - Uses the competence autonomously in most situations. Capable of solving common problems.",
    "skills.rating.4.name": "Advanced",
    "skills.rating.4.desc": "Recognized expertise - Complete mastery. Capable of solving complex problems, optimizing solutions, advising others.",
    "skills.rating.5.name": "Reference",
    "skills.rating.5.desc": "Leader / Reference / Trainer - Authority in the domain. Defines standards, trains others, innovates or pilots strategic projects.",

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
export const profile = {
  name: "Samyen Lee Andriatiana",
  shortName: "Samyen Lee",
  title: "Software Engineer",
  subtitle: ".NET / React / Node Fullstack Developer",
  yearsOfExperience: 5,
  email: "andriatiana.samyen@gmail.com",
  phone: "+261 34 626 30",
  location: "Antananarivo, Madagascar",
  github: "https://github.com/Samyen-Lee",
  linkedin: "https://www.linkedin.com/in/samyen-lee-andriatiana-1180a92a6",

  summary:
    "Software Engineer Fullstack avec 5 ans d'expérience dans le développement d'applications web et systèmes d'entreprise. Expertise en .NET, ReactJS/NextJS, Java Spring et bases de données Oracle/PostgreSQL. Solide expérience en environnements corporate internationaux avec pratiques DevOps et méthodologies Agile. Intérêt marqué pour l'IA générative (LLMs, LangChain, RAG) avec un projet appliqué de chatbot médical utilisant OpenAI et VectorStore.",

  stats: [
    { label: "Années d'expérience", value: 5, suffix: "+" },
    { label: "Projets réalisés", value: 10, suffix: "+" },
    { label: "Stacks maîtrisées", value: 4, suffix: "" },
    { label: "Entreprises", value: 4, suffix: "+" },
  ],
};

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  context: string;
  contribution: string;
  team: string;
  methodology: string;
  domains: { title: string; items: string[] }[];
  techEnv: string[];
}

export const experiences: Experience[] = [
  {
    id: "conduent",
    company: "Conduent",
    role: "Développeur .NET Fullstack – Consultant (Astek Group Madagascar)",
    period: "Juin 2024 – Présent",
    context:
      "Conduent, créée en 2017 après sa scission de Xerox, est une entreprise spécialisée dans la gestion des processus métier (BPO), opérant dans le transport, la santé, les services publics et financiers.",
    contribution:
      "En charge de la maintenance des différents secteurs de la Vente à Distance (VAD) : ajout de nouveaux modules, validation des tests unitaires, de non-régressions et d'intégrations, correctifs sur les anomalies fonctionnelles.",
    team: "6 à 8 personnes par affaire (Chef de projet, Tech Lead, développeurs)",
    methodology: "Agile (Développement itératif, Démo)",
    domains: [
      {
        title: "Front End",
        items: [
          "Intégration d'interfaces pour l'outil de test (VueJS)",
          "Intégration de systèmes de paiement CPGS, Worldline (Angular)",
          "Maintenance d'applications WPF, UWP",
        ],
      },
      {
        title: "Back End",
        items: [
          "Création de tests unitaires et automatiques",
          "Scripts BDD (SQL, PL/SQL, packages)",
          "Scripts de génération de médias pour le déploiement",
        ],
      },
      {
        title: "DevOps",
        items: [
          "Scripts de déploiements",
          "Versionning / Build / Release",
          "Mise en production",
        ],
      },
    ],
    techEnv: [
      "TFS (Azure DevOps)",
      "Visual Studio 2022",
      "Oracle SQL Developer",
      "VueJS",
      ".NET Framework 4.7.2",
      ".NET Core 8",
      "WPF",
      "SOAP",
      "REST",
      "C#",
      "Angular",
    ],
  },
  {
    id: "kki",
    company: "KKI (Kyowa Kirin Hub)",
    role: "Développeur ReactJS / NextJS – Consultant (RAPP Indian Ocean Mauritius)",
    period: "Nov 2021 – Juin 2024",
    context:
      "KKI (Kyowa Kirin Hub) est un centre de recherche et d'innovation affilié à Kyowa Kirin, dédié à la découverte et au développement de nouvelles thérapies pharmaceutiques.",
    contribution:
      "Développement de composants et pages sur le site KKIHub. Implémentation de la logique d'accès aux contenus via les deeplinks, accès temporaires. Trois modes de connexion (OneKey, DocCheck, SelfCert) avec trois niveaux d'accès. Création de contenu via le CMS Acoustic.",
    team: "8 personnes (Chef de projet, Tech Lead, QA, 3 Dev, 2 intervenants UK)",
    methodology: "Agile (Développement itératif, Démo)",
    domains: [
      {
        title: "Front End",
        items: [
          "Création de templates / composants React liés au CMS Acoustic",
          "Logique d'accès : deeplinks, accès temporaires",
          "Responsive pages",
        ],
      },
      {
        title: "Back End",
        items: [
          "Gestion de contenus CMS",
          "Gestion des environnements (staging, dev, prelive, prod)",
        ],
      },
    ],
    techEnv: [
      "JavaScript",
      "ReactJS",
      "NextJS",
      "Jira",
      "Bitbucket",
      "Acoustic CMS",
      "Figma",
    ],
  },
  {
    id: "bici",
    company: "BICI Madagascar",
    role: "Développeur Fullstack Java – Consultant",
    period: "Nov 2020 – Nov 2021",
    context:
      "BICI Madagascar, entreprise spécialisée en services informatiques, propose des solutions technologiques aux entreprises et particuliers à Madagascar.",
    contribution:
      "Développement de projets backoffices intégrant plusieurs modules : Gestion de stock, Gestion de Fournisseurs, Facturation. De la création d'interfaces web (JSP) aux logiques métiers et gestion des données.",
    team: "10 personnes (Chef de projet, 3 QA, 6 Dev)",
    methodology: "Agile (Développement itératif, Démo)",
    domains: [
      {
        title: "Front End",
        items: [
          "Pages de CRUD : saisie, liste avec recherche avancée et pagination",
          "Communication JS - Java, Socket",
        ],
      },
      {
        title: "Back End",
        items: ["Import de données", "Logiques métiers", "Maintenance"],
      },
    ],
    techEnv: ["Java (Spring)", "Socket", "JSP", "Oracle", "Git", "PostgreSQL"],
  },
];

export interface Project {
  id: string;
  title: string;
  company: string;
  description: string;
  role: string;
  stack: string[];
  highlights: string[];
  period: string;
}

export const projects: Project[] = [
  {
    id: "conduent-vad",
    title: "Systèmes de Paiement & VAD",
    company: "Conduent",
    description:
      "Développement et maintenance de la plateforme de Vente à Distance (VAD) incluant l'intégration de systèmes de paiement (CPGS, Worldline) et d'outils de tests automatisés.",
    role: "Développeur .NET Fullstack",
    stack: [".NET Core 8", "C#", "Angular", "VueJS", "WPF", "Oracle", "Azure DevOps"],
    highlights: [
      "Intégration de systèmes de paiement multi-fournisseurs",
      "Automatisation des tests (unitaires, non-régression, intégration)",
      "Pipeline DevOps complet (build, release, production)",
    ],
    period: "2024",
  },
  {
    id: "kki-hub",
    title: "KKI Hub – Plateforme Pharmaceutique",
    company: "Kyowa Kirin Hub",
    description:
      "Site web pharmaceutique international avec système d'authentification multi-niveaux, gestion de contenu CMS, et accès personnalisé au contenu médical.",
    role: "Développeur ReactJS / NextJS",
    stack: ["ReactJS", "NextJS", "JavaScript", "Acoustic CMS", "Figma"],
    highlights: [
      "Système d'authentification à 3 niveaux (OneKey, DocCheck, SelfCert)",
      "Logique d'accès deeplinks et accès temporaires",
      "Templates React connectés au CMS Acoustic",
    ],
    period: "2021 – 2024",
  },
  {
    id: "madasante",
    title: "MadaSanté – Chatbot Médical IA",
    company: "Projet de fin d'études",
    description:
      "Système intégrant un LLM pour un chatbot médical contextualisé : diagnostic à partir de symptômes, recherche de ressources médicales, analyse de documents avec RAG et VectorStore.",
    role: "Développeur Python / AI",
    stack: [
      "Python",
      "FastAPI",
      "LangChain",
      "OpenAI API",
      "ReactJS",
      "PostgreSQL",
      "SQLite",
    ],
    highlights: [
      "Chatbot médical contextualisé avec LLM",
      "Architecture RAG (Retrieval-Augmented Generation)",
      "Mémoire conversationnelle et chaînage de processus",
    ],
    period: "2023",
  },
];

export interface SkillCategory {
  name: string;
  icon: string;
  skills: { name: string; level: number }[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    icon: "monitor",
    skills: [
      { name: "ReactJS", level: 90 },
      { name: "NextJS", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Angular", level: 65 },
      { name: "VueJS", level: 60 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    name: "Backend",
    icon: "server",
    skills: [
      { name: ".NET Core", level: 85 },
      { name: "C#", level: 85 },
      { name: "Java Spring", level: 70 },
      { name: "Node.js", level: 75 },
      { name: "FastAPI", level: 70 },
      { name: "REST / SOAP", level: 85 },
    ],
  },
  {
    name: "Base de données",
    icon: "database",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "Oracle", level: 80 },
      { name: "SQL Server", level: 75 },
      { name: "SQLite", level: 70 },
    ],
  },
  {
    name: "DevOps & Cloud",
    icon: "cloud",
    skills: [
      { name: "Azure DevOps", level: 80 },
      { name: "Docker", level: 70 },
      { name: "Git", level: 90 },
      { name: "CI/CD", level: 75 },
      { name: "Kubernetes", level: 55 },
    ],
  },
  {
    name: "Intelligence Artificielle",
    icon: "brain",
    skills: [
      { name: "LLMs / OpenAI", level: 75 },
      { name: "LangChain", level: 70 },
      { name: "RAG", level: 70 },
      { name: "Prompt Engineering", level: 75 },
      { name: "VectorStore", level: 65 },
    ],
  },
];

export const skillTags = [
  "React",
  "Next.js",
  "TypeScript",
  ".NET",
  "C#",
  "Angular",
  "VueJS",
  "Node.js",
  "Python",
  "Java",
  "Spring",
  "FastAPI",
  "Docker",
  "Kubernetes",
  "Azure",
  "Git",
  "PostgreSQL",
  "Oracle",
  "SQL Server",
  "LangChain",
  "OpenAI",
  "RAG",
  "REST",
  "GraphQL",
  "Tailwind",
  "Figma",
  "Jira",
  "CI/CD",
];

export interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
  highlights: string[];
}

export const education: Education[] = [
  {
    degree: "Master 2 of Science – Big Data Intelligence for Human Augmented Reality (BIHAR)",
    school: "ESTIA",
    location: "Nice, Île-de-France",
    period: "2022 – 2023",
    highlights: ["Cyber Sécurité", "BlockChain", "AR/VR", "AI"],
  },
  {
    degree: "Master 1 Data Science",
    school: "IT University",
    location: "Antananarivo, Madagascar",
    period: "2021 – 2022",
    highlights: ["Data Science", "Machine Learning"],
  },
  {
    degree: "Bachelor of Computer Science – Web Application Development",
    school: "IT University",
    location: "Antananarivo, Madagascar",
    period: "2017 – 2020",
    highlights: ["Web Development", "Software Engineering"],
  },
];

export const navLinks = [
  { label: "Accueil", href: "#hero" },
  { label: "À propos", href: "#about" },
  { label: "Expériences", href: "#experience" },
  { label: "Compétences", href: "#skills" },
  { label: "Projets", href: "#projects" },
  { label: "Formation", href: "#education" },
  { label: "Contact", href: "#contact" },
];

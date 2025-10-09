import { useState } from 'react';
import { useI18n } from '../contexts/i18n-context';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Github,Figma } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  tags: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  figmaUrl?:string;
}

const projectsData: Project[] = [
  {
    title: { fr: 'API HTTP en Rust', en: 'Rust HTTP API' },
    description: {
      fr: 'API HTTP dévellopé en Rust avec les librairies Tokio et Axum.',
      en: 'Rust HTTP API made with Tokio and Axum.',
    },
    tags: ['Rust',"Education"],
    image: 'https://github.com/rust-lang/rust-artwork/blob/master/logo/rust-logo-512x512-blk.png?raw=true',
    githubUrl: 'https://github.com/avagst3/rust_api',
  },
  {
    title: { fr: 'Design application de chat', en: 'Chat App design' },
    description: {
      fr: "Design d'une application de chat pour un projet personnel.",
      en: "Chat app design for personal project.",
    },
    tags: ['Figma',"Personal"],
    image: 'https://images.unsplash.com/photo-1602576666092-bf6447a729fc?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    figmaUrl: 'https://www.figma.com/community/file/1557706229756083214',
  },
  {
    title: { fr: 'Editeur de programme en no code', en: 'No code program editor' },
    description: {
      fr: "Création d'un package front-end permettant de créer des programmes en no-code à la manière de Simulink.",
      en: "Creation of a front-end package allowing to create programs in no-code like Simulink.",
    },
    tags: ['Flutter',"Personal"],
    image: 'https://github.com/avagst3/node_program_editor/raw/main/image.png',
    githubUrl: 'https://github.com/avagst3/node_program_editor',
  },
];

export function Projects() {
  const { language, t } = useI18n();
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Extract all unique tags
  const allTags = Array.from(
    new Set(projectsData.flatMap((project) => project.tags))
  );

  // Filter projects based on selected tag
  const filteredProjects =
    selectedTag === 'all'
      ? projectsData
      : projectsData.filter((project) => project.tags.includes(selectedTag));

  return (
    <section id="projects" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="mb-2 text-[#2F6B7C] libre-bodoni-regular">{t('projects.title')}</h2>
          <p className="text-muted-foreground ">{t('projects.subtitle')}</p>
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Badge
            variant={selectedTag === 'all' ? 'default' : 'outline'}
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => setSelectedTag('all')}
          >
            {t('projects.all')}
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title[language]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <h3 className="mb-2">{project.title[language]}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description[language]}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      size="sm"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      {t('projects.viewProject')}
                    </Button>
                  )}
                  {
                    project.figmaUrl && (
                      <Button
                      variant={"outline"}
                      size="sm"
                      onClick={() => window.open(project.figmaUrl, '_blank')}
                      >
                        <Figma size={16} className="mr-2" />
                        Figma community
                      </Button>
                    )
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

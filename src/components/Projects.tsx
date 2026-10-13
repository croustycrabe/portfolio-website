import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowSquareOutIcon, FigmaLogoIcon, GithubLogoIcon } from '@phosphor-icons/react';
import { useI18n } from '../contexts/i18n-context';
import { projects, type Project } from '../data/content';
import { ButtonLink, Chip, SectionHeading } from './primitives';
import ProjectsIllustration from '../assets/illustrations/projects.svg?react';
import RustApiIllustration from '../assets/illustrations/rust-api.svg?react';
import ChatAppIllustration from '../assets/illustrations/chat-app.svg?react';

const coverIllustrations = {
  'rust-api': RustApiIllustration,
  'chat-app': ChatAppIllustration,
};

function Cover({ project, alt }: { project: Project; alt: string }) {
  if (typeof project.cover === 'object') {
    return (
      <img
        src={project.cover.image}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
    );
  }
  const Illustration = coverIllustrations[project.cover];
  return (
    <Illustration
      role="img"
      aria-label={alt}
      className="h-full w-full p-6 transition-transform duration-500 group-hover:scale-105"
    />
  );
}

export function Projects() {
  const { l, t } = useI18n();
  const [selected, setSelected] = useState<string>('all');

  const kindLabel = (kind: Project['kind']) => t(`projects.tag.${kind}`);
  const allTags = Array.from(new Set(projects.flatMap((p) => [...p.tech, kindLabel(p.kind)])));
  const filtered =
    selected === 'all' ? projects : projects.filter((p) => p.tech.includes(selected) || kindLabel(p.kind) === selected);

  return (
    <section id="projects" className="bg-grid relative border-b-2 border-ink px-4 py-24 md:py-32" aria-labelledby="projects-title">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="projects-title"
          index="03"
          label={t('projects.label')}
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
          Illustration={ProjectsIllustration}
        />

        <div className="mb-12 flex flex-wrap gap-3" role="group" aria-label={t('projects.title')}>
          <Chip active={selected === 'all'} onClick={() => setSelected('all')}>
            {t('projects.all')}
          </Chip>
          {allTags.map((tag) => (
            <Chip key={tag} active={selected === tag} onClick={() => setSelected(tag)}>
              {tag}
            </Chip>
          ))}
        </div>

        <motion.ul layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.li
                layout
                key={project.title.en}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-brutal-md border-2 border-ink bg-surface shadow-brutal-xl">
                  <div className="bg-hatch relative h-52 overflow-hidden border-b-2 border-ink">
                    <Cover project={project} alt={l(project.title)} />
                    <span className="absolute top-3 right-3 rounded-brutal-sm border-2 border-ink bg-ink px-2 py-0.5 text-xs font-bold text-cream">
                      {kindLabel(project.kind)}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg">{l(project.title)}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-fg/75">{l(project.description)}</p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <li key={tech} className="rounded-brutal-sm border-2 border-ink bg-surface-2 px-2.5 py-0.5 text-xs font-medium">
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {project.githubUrl && (
                        <ButtonLink href={project.githubUrl} target="_blank" rel="noopener noreferrer" size="sm" variant="outline">
                          <GithubLogoIcon size={16} weight="bold" />
                          {t('projects.code')}
                        </ButtonLink>
                      )}
                      {project.figmaUrl && (
                        <ButtonLink href={project.figmaUrl} target="_blank" rel="noopener noreferrer" size="sm" variant="outline">
                          <FigmaLogoIcon size={16} weight="bold" />
                          {t('projects.figma')}
                        </ButtonLink>
                      )}
                      {project.liveUrl && (
                        <ButtonLink href={project.liveUrl} target="_blank" rel="noopener noreferrer" size="sm">
                          <ArrowSquareOutIcon size={16} weight="bold" />
                          {t('projects.live')}
                        </ButtonLink>
                      )}
                    </div>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}

import { useI18n } from '../contexts/i18n-context';
import { Star } from 'lucide-react';

interface Skill {
  name: string;
  level: number; // 1-5 stars
  category: string;
}

const skillsData: Skill[] = [  
  { name: 'Tensorflow', level: 2, category: 'Frameworks & Librairies' },
  { name: 'Pytorch', level: 2, category: 'Frameworks & Librairies' },
  { name: 'Django', level: 3, category: 'Frameworks & Librairies' },
  { name: 'SocketIO', level: 3, category: 'Frameworks & Librairies' },
  { name: 'React', level: 2, category: 'Frameworks & Librairies' },
  { name: 'Arduino', level: 2, category: 'Frameworks & Librairies' },
  { name: 'Python', level: 4, category: 'Language' },
  { name: 'Flutter (Dart)', level: 3, category: 'Language' },
  { name: 'Ignition', level: 2, category: 'Industry' },
  { name: 'KepWare', level: 2, category: 'Industry' },
  { name: 'Rust', level: 3, category: 'Language' },
  { name: 'C++', level: 2, category: 'Language' },
  { name: 'Figma', level: 4, category: 'Design' },
  { name: 'Lunacy', level: 4, category: 'Design' },
];

function StarRating({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${
            star <= level
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-none text-muted-foreground'
          }`}
        />
      ))}
    </div>
  );
}

export function Skills() {
  const { t } = useI18n();

  const categories = Array.from(new Set(skillsData.map((skill) => skill.category)));

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-[#2F6B7C] libre-bodoni-regular mb-2">{t('skills.title')}</h2>
          <p className="text-muted-foreground">{t('skills.subtitle')}</p>
        </div>

        {/* Rating System Legend */}
        <div className="mb-12 bg-[#FBFDFF]/5 border border-[#2F6B7C]/20 rounded-xl p-6 max-w-4xl mx-auto shadow-lg">
          <h3 className="text-[#2F6B7C] mb-4">{t('skills.rating.title')}</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((level) => (
              <div key={level} className="flex items-start gap-3">
                <div className="flex gap-1 mt-0.5 flex-shrink-0">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={`${
                        star <= level
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-none text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  {t(`skills.rating.${level}`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category} className="space-y-4">
              <h3 className="text-primary border-b border-border pb-2">{category}</h3>
              <div className="space-y-3">
                {skillsData
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between gap-4 p-3 rounded-lg bg-card border border-border hover:border-primary transition-colors"
                    >
                      <span>{skill.name}</span>
                      <StarRating level={skill.level} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

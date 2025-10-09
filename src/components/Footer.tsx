import { useI18n } from '../contexts/i18n-context';
import { Github, Linkedin, Mail } from 'lucide-react';
import logo from "../assets/logo.svg"
import icon from "../assets/icon.svg"
export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-[#001E2C] text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={icon} alt="" className='h-16'/>
              <span className='libre-bodoni-regular text-lg'>Auguste Lacheteau</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              {t('hero.title')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Navigation</h4>
            <div className="space-y-2">
              <a
                href="#home"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {t('nav.home')}
              </a>
              <a
                href="#journey"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {t('nav.journey')}
              </a>
              <a
                href="#skills"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {t('nav.skills')}
              </a>
              <a
                href="#projects"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {t('nav.projects')}
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4">{t('contact.title')}</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/avagst3"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/auguste-lacheteau"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:lacheteau@gmail.com"
                className="hover:opacity-80 transition-opacity"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/80">
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}

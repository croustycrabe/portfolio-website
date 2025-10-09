import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useI18n } from '../contexts/i18n-context';
import { Button } from './ui/button';
import logo from "../assets/logo.svg"
import { Fr,Gb } from 'react-flags-select';

export function Header() {
  const { language, setLanguage, t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : isMobileMenuOpen ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      } `}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
              <img src={logo} alt="" className='h-12'/>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 libre-bodoni-regular text-xl text-[#001E2C]">
            <button
              onClick={() => scrollToSection('home')}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => scrollToSection('journey')}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              {t('nav.journey')}
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              {t('nav.skills')}
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              {t('nav.projects')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              {t('nav.contact')}
            </button>
          </nav>

          {/* Language Toggle */}
          <div className="flex items-center gap-4" >
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="text-3xl hover:scale-110 transition-transform"
              aria-label="Toggle language"
            >
              {
              language === 'fr' ? 
              <img src="https://hatscripts.github.io/circle-flags/flags/fr.svg" className='h-7' />
               : <img src="https://hatscripts.github.io/circle-flags/flags/gb.svg" className='h-7 ' />
               }
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('home')}
              className="text-foreground/70 hover:text-foreground transition-colors text-left"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => scrollToSection('journey')}
              className="text-foreground/70 hover:text-foreground transition-colors text-left"
            >
              {t('nav.journey')}
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-foreground/70 hover:text-foreground transition-colors text-left"
            >
              {t('nav.skills')}
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-foreground/70 hover:text-foreground transition-colors text-left"
            >
              {t('nav.projects')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground/70 hover:text-foreground transition-colors text-left"
            >
              {t('nav.contact')}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

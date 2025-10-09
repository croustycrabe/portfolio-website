import { MapPin, Download } from 'lucide-react';
import { useI18n } from '../contexts/i18n-context';
import { Button } from './ui/button';

export function Hero() {
  const { t } = useI18n();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Introduction */}
          <div className="space-y-6">
            <div className='libre-bodoni-bold'>
              <h1 className="text-5xl md:text-6xl lg:text-8xl text-[#5B5B7E] mb-2">
                Auguste
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-8xl text-[#5B5B7E]">
                Lacheteau
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-foreground/80">
              {t('hero.title')}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                onClick={() => scrollToSection('journey')}
                className="bg-[#2F6B7C] hover:bg-[#2F6B7C]/90 text-white w-40"
              >
                {t('hero.cta.journey')}
              </Button>
              <Button
                onClick={() => scrollToSection('projects')}
                variant="outline"
                className="border-[#2F6B7C] text-[#2F6B7C] hover:bg-[#2F6B7C]/10 w-40"
              >
                {t('hero.cta.projects')}
              </Button>
            </div>
          </div>

          {/* Right side - About Me Card */}
          <div className="relative">
            <div className="relative bg-white border border-gray-200 rounded-3xl p-8 md:p-10 max-w-md mx-auto shadow-lg overflow-hidden">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8BC4D4]/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#2F6B7C]/20 to-transparent rounded-full blur-3xl"></div>
              
              <div className="relative space-y-6">
                <div>
                  <h3 className="text-[#2F6B7C] libre-bodoni-regular mb-3">{t('about.title')}</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {t('about.description')}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#2F6B7C]/5 to-transparent rounded-lg border border-[#2F6B7C]/20">
                    <div className="w-10 h-10 bg-[#2F6B7C] rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-white" size={18} />
                    </div>
                    <span className="text-foreground/80">{t('about.highlight1')}</span>
                  </div>
                  
                  <a 
                    href="/cv.pdf" 
                    download="Auguste_Lacheteau_CV.pdf"
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#8BC4D4]/5 to-transparent rounded-lg border border-[#8BC4D4]/20 hover:border-[#8BC4D4] hover:from-[#8BC4D4]/10 transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 bg-[#8BC4D4] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Download className="text-white" size={18} />
                    </div>
                    <span className="text-foreground/80 group-hover:text-foreground transition-colors">{t('about.highlight2')}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

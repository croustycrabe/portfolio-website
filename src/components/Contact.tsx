import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { useI18n } from '../contexts/i18n-context';

export function Contact() {
  const { t } = useI18n();

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-background to-[#2F6B7C]/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-[#2F6B7C] libre-bodoni-regular mb-4">{t('contact.title')}</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Contact Information */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
            <h3 className="text-[#2F6B7C] mb-6">{t('contact.getInTouch')}</h3>
            
            <div className="space-y-4">
              {/* Phone */}
              <a
                href="tel:+33769082527"
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#2F6B7C]/5 to-transparent rounded-lg border border-[#2F6B7C]/20 hover:border-[#2F6B7C]/40 transition-all group"
              >
                <div className="w-12 h-12 bg-[#2F6B7C] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Téléphone</p>
                  <p className="text-foreground">+33 7 69 08 25 27</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:lacheteaua@gmail.com"
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#8BC4D4]/5 to-transparent rounded-lg border border-[#8BC4D4]/20 hover:border-[#8BC4D4]/40 transition-all group"
              >
                <div className="w-12 h-12 bg-[#8BC4D4] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Email</p>
                  <p className="text-foreground break-all">lacheteaua@gmail.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Social Networks */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
            <h3 className="text-[#2F6B7C] mb-6">{t('contact.social')}</h3>
            
            <div className="flex gap-4">
              <a
                href="https://github.com/avagst3"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-[#2F6B7C]/5 to-transparent rounded-lg border border-[#2F6B7C]/20 hover:border-[#2F6B7C]/40 hover:scale-105 transition-all"
                aria-label="GitHub"
              >
                <Github className="text-[#2F6B7C]" size={24} />
                <span className="text-foreground/80">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/auguste-lacheteau-790419239"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-[#8BC4D4]/5 to-transparent rounded-lg border border-[#8BC4D4]/20 hover:border-[#8BC4D4]/40 hover:scale-105 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="text-[#8BC4D4]" size={24} />
                <span className="text-foreground/80">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

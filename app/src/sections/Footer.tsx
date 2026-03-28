import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Главная', href: '#hero' },
  { label: 'Обо мне', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Результаты', href: '#results' },
  { label: 'Приём', href: '#appointments' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Line animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: 'top 90%',
          onEnter: () => {
            gsap.fromTo(
              lineRef.current,
              { width: 0 },
              { width: '100px', duration: 0.6, ease: 'expo.out' }
            );
          },
          once: true,
        })
      );

      // Logo animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: logoRef.current,
          start: 'top 90%',
          onEnter: () => {
            gsap.fromTo(
              logoRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.2 }
            );
          },
          once: true,
        })
      );

      // Nav links animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: navRef.current,
          start: 'top 90%',
          onEnter: () => {
            const links = navRef.current?.querySelectorAll('a');
            links?.forEach((link, index) => {
              gsap.fromTo(
                link,
                { y: 15, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.3,
                  ease: 'power2.out',
                  delay: 0.3 + index * 0.05,
                }
              );
            });
          },
          once: true,
        })
      );

      // Contact animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: contactRef.current,
          start: 'top 90%',
          onEnter: () => {
            gsap.fromTo(
              contactRef.current,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.5 }
            );
          },
          once: true,
        })
      );

      // Social icons animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: socialRef.current,
          start: 'top 90%',
          onEnter: () => {
            const icons = socialRef.current?.querySelectorAll('a');
            icons?.forEach((icon, index) => {
              gsap.fromTo(
                icon,
                { scale: 0 },
                {
                  scale: 1,
                  duration: 0.3,
                  ease: 'back.out(1.7)',
                  delay: 0.6 + index * 0.08,
                }
              );
            });
          },
          once: true,
        })
      );

      // Copyright animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: copyrightRef.current,
          start: 'top 95%',
          onEnter: () => {
            gsap.fromTo(
              copyrightRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.8 }
            );
          },
          once: true,
        })
      );

      return () => {
        scrollTriggers.forEach((st) => st.kill());
      };
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="bg-white pt-20 pb-8">
      <div className="container-custom">
        {/* Decorative Line */}
        <div className="flex justify-center mb-12">
          <div ref={lineRef} className="h-[1px] bg-gold" style={{ width: 0 }} />
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <div ref={logoRef} className="lg:col-span-1 opacity-0">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="font-heading text-3xl text-[#1a1a1a] block mb-4"
            >
              Доктор <span className="text-gold">Волкова</span>
            </a>
            <p className="font-body text-sm text-[#888888] leading-relaxed">
              Пластический хирург с 15-летним опытом. 
              Создаю естественную красоту через искусство хирургии.
            </p>
          </div>

          {/* Navigation */}
          <div ref={navRef}>
            <h4 className="font-nav text-xs uppercase tracking-[0.15em] text-[#1a1a1a] mb-6">
              Навигация
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="font-body text-sm text-[#666666] hover:text-gold transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div ref={contactRef} className="opacity-0">
            <h4 className="font-nav text-xs uppercase tracking-[0.15em] text-[#1a1a1a] mb-6">
              Контакты
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+79991234567"
                  className="flex items-center gap-3 font-body text-sm text-[#666666] hover:text-gold transition-colors"
                >
                  <Phone size={14} className="text-gold" />
                  +7 (999) 123-45-67
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@drvolkova.ru"
                  className="flex items-center gap-3 font-body text-sm text-[#666666] hover:text-gold transition-colors"
                >
                  <Mail size={14} className="text-gold" />
                  info@drvolkova.ru
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 font-body text-sm text-[#666666]">
                  <MapPin size={14} className="text-gold mt-0.5" />
                  <span>Москва, ул. Тверская, 15</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div ref={socialRef}>
            <h4 className="font-nav text-xs uppercase tracking-[0.15em] text-[#1a1a1a] mb-6">
              Социальные сети
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-[#f5f5f5] flex items-center justify-center text-[#666666] transition-all duration-300 hover:bg-gold hover:text-white hover:-translate-y-1"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          ref={copyrightRef}
          className="border-t border-[#e8e8e8] pt-8 opacity-0"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-[#aaaaaa]">
              © {new Date().getFullYear()} Доктор Волкова. Все права защищены.
            </p>
            <p className="font-body text-xs text-[#aaaaaa]">
              Сайт носит информационный характер и не является публичной офертой.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

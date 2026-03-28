import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Главная', href: '#hero' },
  { label: 'Обо мне', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Результаты', href: '#results' },
  { label: 'Приём', href: '#appointments' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.05)]'
            : 'bg-transparent'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-smooth)' }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="font-heading text-2xl md:text-3xl text-[#1a1a1a] transition-transform duration-300"
              style={{ transform: isScrolled ? 'scale(0.85)' : 'scale(1)' }}
            >
              Доктор <span className="text-gold">Волкова</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="nav-link"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <a
              href="#appointments"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#appointments');
              }}
              className="hidden lg:inline-flex btn-primary"
            >
              Записаться
            </a>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#1a1a1a]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
        >
          <div className="flex flex-col pt-24 px-8">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="py-4 font-nav text-sm uppercase tracking-[0.15em] text-[#1a1a1a] border-b border-gray-100 transition-all duration-300 hover:text-gold hover:pl-2"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#appointments"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#appointments');
              }}
              className="btn-primary mt-8 text-center"
            >
              Записаться
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

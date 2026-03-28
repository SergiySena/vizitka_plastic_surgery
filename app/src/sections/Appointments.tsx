import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    city: 'Москва',
    address: 'ул. Тверская, 15',
    hours: 'Пн-Пт: 9:00 - 19:00',
    phone: '+7 (999) 123-45-67',
    isMain: true,
  },
  {
    city: 'Санкт-Петербург',
    address: 'Невский проспект, 45',
    hours: 'Вт, Чт: 10:00 - 18:00',
    phone: '+7 (999) 987-65-43',
    isMain: false,
  },
];

export default function Appointments() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Header animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              headerRef.current,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }
            );
          },
          once: true,
        })
      );

      // Cards animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: 'top 75%',
          onEnter: () => {
            cardRefs.current.forEach((card, index) => {
              gsap.fromTo(
                card,
                { x: -60, opacity: 0 },
                {
                  x: 0,
                  opacity: 1,
                  duration: 0.6,
                  ease: 'expo.out',
                  delay: 0.3 + index * 0.15,
                }
              );
            });
          },
          once: true,
        })
      );

      // CTA animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: ctaRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              ctaRef.current,
              { y: 30, scale: 0.9, opacity: 0 },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: 'back.out(1.7)',
                delay: 0.5,
              }
            );
          },
          once: true,
        })
      );

      return () => {
        scrollTriggers.forEach((st) => st.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToCardRefs = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="appointments"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Diagonal Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(98deg, #f5f5f5 50%, #ffffff 50%)',
        }}
      />

      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="label-text block mb-4">Приём</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a]">
            Где принимаю
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Location Cards */}
          <div ref={cardsRef} className="space-y-6">
            {locations.map((location) => (
              <div
                key={location.city}
                ref={addToCardRefs}
                className={`bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl opacity-0 ${
                  location.isMain ? 'border-l-4 border-gold' : ''
                }`}
              >
                {/* City */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gold/10 flex items-center justify-center">
                    <MapPin size={18} className="text-gold" />
                  </div>
                  <h3 className="font-heading text-2xl text-[#1a1a1a]">
                    {location.city}
                  </h3>
                  {location.isMain && (
                    <span className="px-3 py-1 bg-gold/10 text-gold font-nav text-[10px] uppercase tracking-[0.1em]">
                      Основная
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-[#888888] mt-1 flex-shrink-0" />
                    <span className="font-body text-sm text-[#666666]">
                      {location.address}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-[#888888] mt-1 flex-shrink-0" />
                    <span className="font-body text-sm text-[#666666]">
                      {location.hours}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-[#888888] mt-1 flex-shrink-0" />
                    <a
                      href={`tel:${location.phone.replace(/\s/g, '')}`}
                      className="font-body text-sm text-[#666666] hover:text-gold transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Contact Info */}
            <div className="bg-[#1a1a1a] p-8 text-white">
              <h3 className="font-heading text-xl mb-6">Контактная информация</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-gold" />
                  <a
                    href="tel:+79991234567"
                    className="font-body text-sm hover:text-gold transition-colors"
                  >
                    +7 (999) 123-45-67
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gold" />
                  <a
                    href="mailto:info@drvolkova.ru"
                    className="font-body text-sm hover:text-gold transition-colors"
                  >
                    info@drvolkova.ru
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col justify-center h-full">
            <div ref={ctaRef} className="bg-white p-10 md:p-12 shadow-xl opacity-0">
              <h3 className="font-heading text-3xl md:text-4xl text-[#1a1a1a] mb-4">
                Запишитесь на приём
              </h3>
              <p className="font-body text-base text-[#888888] mb-8 leading-relaxed">
                Запись происходит любым удобным для Вас способом. 
                Я отвечу на все ваши вопросы и помогу определиться с планом лечения.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-nav text-xs text-gold">1</span>
                  </div>
                  <span className="font-body text-sm text-[#666666]">
                    Первичная консультация и осмотр
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-nav text-xs text-gold">2</span>
                  </div>
                  <span className="font-body text-sm text-[#666666]">
                    Обсуждение целей и планирование
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-nav text-xs text-gold">3</span>
                  </div>
                  <span className="font-body text-sm text-[#666666]">
                    Назначение даты операции
                  </span>
                </div>
              </div>

              <a
                href="tel:+79991234567"
                className="btn-primary w-full text-center"
              >
                Позвонить для записи
              </a>
            </div>

            {/* Decorative */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-16 h-[1px] bg-gold/30" />
              <span className="font-nav text-[10px] uppercase tracking-[0.2em] text-[#aaaaaa]">
                Или
              </span>
              <div className="w-16 h-[1px] bg-gold/30" />
            </div>

            <div className="mt-8 text-center">
              <a
                href="mailto:info@drvolkova.ru"
                className="font-body text-sm text-[#666666] hover:text-gold transition-colors"
              >
                Написать на email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

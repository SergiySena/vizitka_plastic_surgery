import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scissors, HeartPulse, Scan, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: 'Эстетическая хирургия',
    price: 'от $1000',
    description: 'Лицо, тело, молочные железы. Современные методики омоложения и коррекции.',
    icon: Scissors,
    features: ['Ринопластика', 'Блефаропластика', 'Подтяжка лица', 'Пластика груди'],
  },
  {
    id: 2,
    title: 'Реконструктивная хирургия',
    price: 'от $800',
    description: 'Восстановление после травм, врождённые аномалии, постонкологическая реконструкция.',
    icon: HeartPulse,
    features: ['Восстановление формы', 'Коррекция дефектов', 'Реконструкция груди', 'Работа с рубцами'],
  },
  {
    id: 3,
    title: 'Лазерная хирургия',
    price: 'от $200',
    description: 'Современные лазерные технологии для точных и безопасных процедур.',
    icon: Scan,
    features: ['Лазерное омоложение', 'Удаление новообразований', 'Лазерная шлифовка', 'Фракционное лечение'],
  },
  {
    id: 4,
    title: 'Консультации',
    price: '$150',
    description: 'Предварительная беседа, диагноз, план лечения и ответы на все вопросы.',
    icon: MessageSquare,
    features: ['Осмотр', 'Обсуждение целей', 'План операции', 'Рекомендации'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

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
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }
            );
          },
          once: true,
        })
      );

      // Cards stagger animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.fromTo(
              cardsRef.current,
              { rotateX: 15, opacity: 0 },
              {
                rotateX: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'expo.out',
              }
            );
            cardRefs.current.forEach((card, index) => {
              gsap.fromTo(
                card,
                { x: 100, opacity: 0 },
                {
                  x: 0,
                  opacity: 1,
                  duration: 0.6,
                  ease: 'expo.out',
                  delay: 0.3 + index * 0.12,
                }
              );
            });
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
      id="services"
      ref={sectionRef}
      className="section-padding bg-[#f5f5f5]"
    >
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="label-text block mb-4">Услуги</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a]">
            Специализации
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1200 opacity-0"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                ref={addToCardRefs}
                className="group relative bg-white p-8 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl opacity-0"
                style={{
                  transitionTimingFunction: 'var(--ease-smooth)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-[#f5f5f5] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-gold group-hover:text-white">
                  <Icon size={24} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl text-[#1a1a1a] mb-3">
                  {service.title}
                </h3>

                {/* Price */}
                <div className="font-heading text-2xl text-gold mb-4">
                  {service.price}
                </div>

                {/* Description */}
                <p className="font-body text-sm text-[#888888] leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 font-body text-xs text-[#666666]"
                    >
                      <span className="w-1 h-1 bg-gold rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover border effect */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="#appointments" className="btn-outline">
            Получить консультацию
          </a>
        </div>
      </div>
    </section>
  );
}

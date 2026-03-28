import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Елена М.',
    age: 42,
    rating: 5,
    text: 'Хочу поблагодарить доктора Волкову за талант и профессионализм. Оперируюсь не первый раз и каждый раз результат превосходит ожидания. Настоящий врач от Бога!',
    procedure: 'Подтяжка лица',
  },
  {
    id: 2,
    name: 'Марина К.',
    age: 35,
    rating: 5,
    text: 'СПАСИБО огромное за Ваш труд и талант! Вы вернули мне уверенность в себе. Вы — Врач от Бога и Человек от Бога! Рекомендую всем своим подругам.',
    procedure: 'Блефаропластика',
  },
  {
    id: 3,
    name: 'Анна П.',
    age: 28,
    rating: 5,
    text: 'Доктор Волкова — настоящий профессионал. Всё объяснила, успокоила, операция прошла идеально. Результат натуральный и красивый. Очень довольна!',
    procedure: 'Ринопластика',
  },
  {
    id: 4,
    name: 'Ирина С.',
    age: 48,
    rating: 5,
    text: 'После операции прошло полгода, и я всё ещё каждый день благодарю судьбу за знакомство с Александрой. Мастер высочайшего класса!',
    procedure: 'Пластика груди',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

      // Carousel animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: carouselRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.fromTo(
              carouselRef.current,
              { translateZ: -100, opacity: 0 },
              { translateZ: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
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

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + testimonials.length) % testimonials.length);
    const adjustedDiff = normalizedDiff > testimonials.length / 2 ? normalizedDiff - testimonials.length : normalizedDiff;

    if (adjustedDiff === 0) {
      return {
        transform: 'translateX(0) translateZ(100px) scale(1) rotateY(0deg)',
        opacity: 1,
        zIndex: 10,
      };
    } else if (adjustedDiff === 1 || adjustedDiff === -testimonials.length + 1) {
      return {
        transform: 'translateX(120%) translateZ(-50px) scale(0.85) rotateY(-15deg)',
        opacity: 0.6,
        zIndex: 5,
      };
    } else if (adjustedDiff === -1 || adjustedDiff === testimonials.length - 1) {
      return {
        transform: 'translateX(-120%) translateZ(-50px) scale(0.85) rotateY(15deg)',
        opacity: 0.6,
        zIndex: 5,
      };
    } else {
      return {
        transform: 'translateX(0) translateZ(-150px) scale(0.7)',
        opacity: 0,
        zIndex: 0,
      };
    }
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-padding bg-[#f5f5f5] overflow-hidden"
    >
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="label-text block mb-4">Отзывы</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a]">
            Что говорят пациенты
          </h2>
        </div>

        {/* 3D Carousel */}
        <div
          ref={carouselRef}
          className="relative h-[400px] md:h-[350px] perspective-1200 opacity-0"
        >
          <div className="relative w-full h-full flex items-center justify-center preserve-3d">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="absolute w-full max-w-2xl bg-white p-8 md:p-12 shadow-xl transition-all duration-600"
                style={{
                  ...getCardStyle(index),
                  transitionTimingFunction: 'var(--ease-smooth)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gold flex items-center justify-center animate-float">
                  <Quote size={20} className="text-white" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-gold fill-gold" />
                  ))}
                </div>

                {/* Text */}
                <p className="font-body text-base md:text-lg text-[#666666] leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-heading text-lg text-[#1a1a1a]">
                      {testimonial.name}
                    </div>
                    <div className="font-body text-sm text-[#888888]">
                      {testimonial.age} года · {testimonial.procedure}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white border border-[#e0e0e0] flex items-center justify-center transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a]"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-gold w-6' : 'bg-[#d0d0d0]'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white border border-[#e0e0e0] flex items-center justify-center transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a]"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

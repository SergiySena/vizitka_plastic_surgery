import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    id: 1,
    procedure: 'Блефаропластика',
    age: '45 лет',
    recovery: '2 недели',
    beforeImage: '/before-photo.jpg',
    afterImage: '/after-photo.jpg',
  },
  {
    id: 2,
    procedure: 'Подтяжка лица',
    age: '52 года',
    recovery: '3 недели',
    beforeImage: '/before-photo.jpg',
    afterImage: '/after-photo.jpg',
  },
  {
    id: 3,
    procedure: 'Ринопластика',
    age: '28 лет',
    recovery: '10 дней',
    beforeImage: '/before-photo.jpg',
    afterImage: '/after-photo.jpg',
  },
];

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [currentCase, setCurrentCase] = useState(0);

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

      // Comparison container animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: comparisonRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.fromTo(
              comparisonRef.current,
              { x: -100, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.8, ease: 'expo.out' }
            );
          },
          once: true,
        })
      );

      // Slider handle animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sliderRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.fromTo(
              sliderRef.current,
              { scale: 0 },
              { scale: 1, duration: 0.4, ease: 'back.out(1.7)', delay: 0.5 }
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

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const nextCase = () => {
    setCurrentCase((prev) => (prev + 1) % cases.length);
  };

  const prevCase = () => {
    setCurrentCase((prev) => (prev - 1 + cases.length) % cases.length);
  };

  const currentCaseData = cases[currentCase];

  return (
    <section
      id="results"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 opacity-0">
          <span className="label-text block mb-4">Результаты</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-4">
            До и после
          </h2>
          <p className="font-body text-base text-[#888888] max-w-lg mx-auto">
            Реальные результаты моих пациентов. Каждая операция — индивидуальный подход.
          </p>
        </div>

        {/* Case Navigation */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={prevCase}
            className="w-10 h-10 border border-[#e0e0e0] flex items-center justify-center transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a]"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="text-center">
            <span className="font-heading text-lg text-[#1a1a1a]">
              {currentCaseData.procedure}
            </span>
            <span className="font-body text-sm text-[#888888] ml-3">
              {currentCaseData.age} · Восстановление {currentCaseData.recovery}
            </span>
          </div>
          <button
            onClick={nextCase}
            className="w-10 h-10 border border-[#e0e0e0] flex items-center justify-center transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a]"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Comparison Slider */}
        <div
          ref={comparisonRef}
          className="relative w-full max-w-4xl mx-auto aspect-[3/2] overflow-hidden cursor-ew-resize select-none opacity-0"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
        >
          {/* Before Image (Full) */}
          <div className="absolute inset-0">
            <img
              src={currentCaseData.beforeImage}
              alt="До процедуры"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/90 px-4 py-2">
              <span className="font-nav text-xs uppercase tracking-[0.15em] text-[#1a1a1a]">
                До
              </span>
            </div>
          </div>

          {/* After Image (Clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src={currentCaseData.afterImage}
              alt="После процедуры"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-gold/90 px-4 py-2">
              <span className="font-nav text-xs uppercase tracking-[0.15em] text-white">
                После
              </span>
            </div>
          </div>

          {/* Slider Handle */}
          <div
            ref={sliderRef}
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
            style={{
              left: `${sliderPosition}%`,
              transform: 'translateX(-50%)',
              boxShadow: isDragging ? '0 0 20px rgba(201, 169, 98, 0.5)' : 'none',
            }}
          >
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gold rounded-full flex items-center justify-center transition-transform duration-300 ${
                isDragging ? 'scale-125' : ''
              }`}
            >
              <div className="flex items-center gap-1">
                <ChevronLeft size={14} className="text-white" />
                <ChevronRight size={14} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Case Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {cases.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentCase(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentCase ? 'bg-gold w-6' : 'bg-[#e0e0e0]'
              }`}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center font-body text-xs text-[#aaaaaa] mt-8 max-w-2xl mx-auto">
          * Результаты процедур индивидуальны и зависят от особенностей организма пациента.
          Консультация специалиста необходима для определения ожидаемого результата.
        </p>
      </div>
    </section>
  );
}

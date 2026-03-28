import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRefs = useRef<HTMLSpanElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([labelRef.current, ...titleRefs.current, subtitleRef.current], {
        opacity: 0,
        y: 60,
      });
      gsap.set(lineRef.current, { width: 0 });
      gsap.set(imageRef.current, { opacity: 0, rotateY: -25 });
      gsap.set(frameRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(patternRef.current, { opacity: 0, scale: 1.1 });

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(patternRef.current, {
        opacity: 0.4,
        scale: 1,
        duration: 1.2,
        ease: 'expo.out',
      })
        .to(
          lineRef.current,
          {
            width: '80px',
            duration: 0.8,
            ease: 'expo.out',
          },
          0.3
        )
        .to(
          labelRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'expo.out',
          },
          0.5
        )
        .to(
          titleRefs.current[0],
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'expo.out',
          },
          0.7
        )
        .to(
          titleRefs.current[1],
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'expo.out',
          },
          0.85
        )
        .to(
          titleRefs.current[2],
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'expo.out',
          },
          1.0
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          1.2
        )
        .to(
          imageRef.current,
          {
            opacity: 1,
            rotateY: 0,
            duration: 1,
            ease: 'expo.out',
          },
          0.6
        )
        .to(
          frameRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          1.0
        );

      // Scroll animations
      const scrollTriggers: ScrollTrigger[] = [];

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=50%',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(patternRef.current, {
              y: -80 * progress,
              opacity: 1 - progress * 0.7,
            });
            gsap.set(imageRef.current, {
              rotateY: 15 * progress,
              scale: 1 - progress * 0.1,
            });
            gsap.set(frameRef.current, {
              y: -40 * progress,
              rotate: 10 * progress,
            });
          },
        })
      );

      return () => {
        scrollTriggers.forEach((st) => st.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToTitleRefs = (el: HTMLSpanElement | null) => {
    if (el && !titleRefs.current.includes(el)) {
      titleRefs.current.push(el);
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-white"
    >
      {/* Background Pattern */}
      <div
        ref={patternRef}
        className="absolute inset-0 opacity-0"
        style={{
          backgroundImage: `linear-gradient(45deg, transparent 48%, #f0f0f0 49%, #f0f0f0 51%, transparent 52%),
                           linear-gradient(-45deg, transparent 48%, #f0f0f0 49%, #f0f0f0 51%, transparent 52%)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 min-h-screen items-center pt-20 lg:pt-0">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center py-12 lg:py-0 perspective-1200">
            {/* Label */}
            <span
              ref={labelRef}
              className="label-text mb-6"
            >
              Пластический хирург
            </span>

            {/* Title */}
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#1a1a1a] leading-[0.95] mb-8">
              <span ref={addToTitleRefs} className="block">
                Доктор
              </span>
              <span ref={addToTitleRefs} className="block text-gold">
                Александра
              </span>
              <span ref={addToTitleRefs} className="block">
                Волкова
              </span>
            </h1>

            {/* Decorative Line */}
            <div
              ref={lineRef}
              className="deco-line mb-8"
              style={{ width: 0 }}
            />

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="font-body text-base md:text-lg text-[#888888] max-w-md leading-relaxed"
            >
              Эстетическая хирургия с заботой о вашей природной красоте. 
              Более 15 лет опыта в создании естественных результатов.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <a href="#appointments" className="btn-primary">
                Записаться на консультацию
              </a>
              <a href="#services" className="btn-outline">
                Узнать больше
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative flex items-center justify-center lg:justify-end py-12 lg:py-0 perspective-1200 preserve-3d">
            {/* Gold Frame */}
            <div
              ref={frameRef}
              className="absolute -top-4 -right-4 lg:top-8 lg:right-8 w-full max-w-md h-[500px] md:h-[600px] border-2 border-gold opacity-0 animate-float"
              style={{ transform: 'translateZ(100px)' }}
            />

            {/* Portrait Image */}
            <div
              ref={imageRef}
              className="relative w-full max-w-md h-[500px] md:h-[600px] overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
              style={{
                transform: 'translateZ(50px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <img
                src="/hero-portrait.jpg"
                alt="Доктор Александра Волкова"
                className="w-full h-full object-cover"
              />
              
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-8 -left-8 w-24 h-24 border border-gold/30 rounded-full animate-breathe" />
            <div className="absolute top-1/4 -left-12 w-2 h-2 bg-gold rounded-full" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-nav text-[10px] uppercase tracking-[0.2em] text-[#888888]">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}

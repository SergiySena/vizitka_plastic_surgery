import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, BookOpen, Microscope, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  { id: 'education', label: 'Образование', icon: BookOpen },
  { id: 'specialization', label: 'Специализации', icon: Award },
  { id: 'science', label: 'Наука', icon: Microscope },
  { id: 'work', label: 'Работа', icon: Briefcase },
];

const tabContent = {
  education: {
    title: 'Образование',
    content: [
      'Московский государственный медико-стоматологический университет, специальность «лечебное дело» (2004-2010)',
      'Интернатура по общей хирургии на базе Центральной клинической больницы (2010-2011)',
      'Ординатура по пластической хирургии в Российском университете медицинских наук (2011-2013)',
      'Стажировка в клиниках Южной Кореи по эстетической хирургии лица (2015)',
    ],
  },
  specialization: {
    title: 'Специализации',
    content: [
      'Эстетическая хирургия лица и шеи (ритидэктомия, блефаропластика, ринопластика)',
      'Пластика молочных желез (аугментация, подтяжка, редукция)',
      'Боди-контуринг (липосакция, абдоминопластика, липофилинг)',
      'Реконструктивная хирургия после онкологических операций',
    ],
  },
  science: {
    title: 'Научная деятельность',
    content: [
      'Кандидат медицинских наук по специальности «хирургия» (2016)',
      'Автор 25 научных публикаций в рецензируемых журналах',
      'Докладчик на международных конгрессах ISAPS и EURAPS',
      'Разработка методик минимально инвазивного омоложения',
    ],
  },
  work: {
    title: 'Профессиональный опыт',
    content: [
      'Ведущий пластический хирург в сети клиник «Эстетик Мед» (с 2015)',
      'Главный врач отделения пластической хирургии (с 2018)',
      'Член Российского общества пластических хирургов (ROPREH)',
      'Член Международного общества эстетической пластической хирургии (ISAPS)',
    ],
  },
};

const stats = [
  { value: 15, suffix: '+', label: 'лет опыта' },
  { value: 3000, suffix: '+', label: 'операций' },
  { value: 98, suffix: '%', label: 'довольных пациентов' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('education');
  const [counters, setCounters] = useState<number[]>([0, 0, 0]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Label animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: labelRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              labelRef.current,
              { x: -30, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.5, ease: 'expo.out' }
            );
          },
          once: true,
        })
      );

      // Title animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              titleRef.current,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }
            );
          },
          once: true,
        })
      );

      // Text animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: textRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              textRef.current,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.2 }
            );
          },
          once: true,
        })
      );

      // Image animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: imageRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              imageRef.current,
              { scale: 1.1, clipPath: 'inset(100% 0 0 0)' },
              {
                scale: 1,
                clipPath: 'inset(0% 0 0 0)',
                duration: 1,
                ease: 'expo.out',
              }
            );
          },
          once: true,
        })
      );

      // Tabs animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: tabsRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              tabsRef.current,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.3 }
            );
          },
          once: true,
        })
      );

      // Stats counter animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 85%',
          onEnter: () => {
            if (!hasAnimated.current) {
              hasAnimated.current = true;
              stats.forEach((stat, index) => {
                gsap.to(
                  { value: 0 },
                  {
                    value: stat.value,
                    duration: 1.5,
                    ease: 'expo.out',
                    delay: 0.6 + index * 0.1,
                    onUpdate: function () {
                      setCounters((prev) => {
                        const newCounters = [...prev];
                        newCounters[index] = Math.round(this.targets()[0].value);
                        return newCounters;
                      });
                    },
                  }
                );
              });
            }
            gsap.fromTo(
              statsRef.current,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.5 }
            );
          },
          once: true,
        })
      );

      // Parallax effect
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(imageRef.current, {
              y: 50 - progress * 100,
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-white overflow-hidden"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Image */}
          <div className="relative order-2 lg:order-1">
            <div
              ref={imageRef}
              className="relative aspect-[3/4] overflow-hidden"
              style={{ clipPath: 'inset(100% 0 0 0)' }}
            >
              <img
                src="/about-portrait.jpg"
                alt="Доктор Волкова в кабинете"
                className="w-full h-full object-cover img-hover"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-gold/40 -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/10 -z-10" />
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            {/* Label */}
            <span ref={labelRef} className="label-text block mb-4 opacity-0">
              Обо мне
            </span>

            {/* Title */}
            <h2
              ref={titleRef}
              className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-tight mb-6 opacity-0"
            >
              Создаю естественную красоту через искусство хирургии
            </h2>

            {/* Description */}
            <div ref={textRef} className="space-y-4 mb-8 opacity-0">
              <p className="font-body text-base text-[#666666] leading-relaxed">
                Более 15 лет я посвятила пластической хирургии, помогая пациентам
                обрести уверенность в себе. Мой подход основан на трёх принципах:
                безопасность, естественность, индивидуальность.
              </p>
              <p className="font-body text-base text-[#666666] leading-relaxed">
                Каждая операция — это не просто медицинская процедура, а творческий
                процесс, где я сочетаю медицинскую точность с эстетическим видением.
              </p>
            </div>

            {/* Tabs */}
            <div ref={tabsRef} className="mb-10 opacity-0">
              {/* Tab Buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 font-nav text-xs uppercase tracking-[0.1em] transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-[#1a1a1a] text-white'
                          : 'bg-[#f5f5f5] text-[#666666] hover:bg-[#e8e8e8]'
                      }`}
                    >
                      <Icon size={14} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="bg-[#f5f5f5] p-6 md:p-8">
                <h3 className="font-heading text-xl text-[#1a1a1a] mb-4">
                  {tabContent[activeTab as keyof typeof tabContent].title}
                </h3>
                <ul className="space-y-3">
                  {tabContent[activeTab as keyof typeof tabContent].content.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 font-body text-sm text-[#666666] leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-6 opacity-0"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-heading text-4xl md:text-5xl text-gold mb-1">
                    {counters[index]}
                    {stat.suffix}
                  </div>
                  <div className="font-nav text-[10px] uppercase tracking-[0.15em] text-[#888888]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

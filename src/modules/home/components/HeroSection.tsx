import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY_INFO } from "../../../constants";

interface Slide {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
}

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      tag: "ELITE ATELIER • GLOBAL",
      title: "Invitations as\nMemorable as Your Day",
      subtitle: COMPANY_INFO.heroDescription,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCVFZun0dWWErWQfESOq9ji2PZGhaJkIlksr3VXihl-dyOyfUhbVyYZyQ2mx-mNEjhUfRyjfdWS64Ue_ex9a77-82foqSDRPjyuvm-C-bl3GLzcyyvw4O_CdmTySQrIphk32ErhXQmvZ6MqjTPw5RuVRYiBdax756uefSGPQJ4Ebfx3tD7mmAYW3ykvLvBEwbZq4NR1wPFgb2QpW5RX_9NT-1nGOMo7HQkBEN9l0Lnld8QTiKkP_Bxs",
    },
    {
      id: 2,
      tag: "HANDCRAFTED LUXURY • EMBOSSED & FOILED",
      title: "Bespoke Royal\nWedding Suites",
      subtitle:
        "Custom hot-foil stamping, intricate laser-cuts, and heavy deckle-edge cotton paper for your grand celebration.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCpA-SP1AmBRuWCnnXJ872xN_QzRExsf0eyWQp4dPFhoSeDaPup74jOjFfR6Se0PRLVANQq0jRvBA4S4sYWOZkHo5pIqA1nxNhFMF7tzxhES1RyYXgkL41LZTOCI0ZTU_ygfPIkVRrSnm31wPzsGqOh99K1IoAwtt5OGE1TG28r5E8AVzeK2FlVQVxBKcAYMykriNb6K64M3ESi1VtL5V29eJd-SZKxtx8AcGxTWwXIDE8Shl_qY0WN",
    },
    {
      id: 3,
      tag: "3000+ DESIGNS • WORLDWIDE SHIPPING",
      title: "Timeless Artifacts\nFor Every Occasion",
      subtitle:
        "From traditional sacred rituals to contemporary modern galas — discover invitation artistry that captivates.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA48XfYZWHtnQtOrCQuQjlksiPdAfxQ-u9BUyFYeoUDAp9mA6YYvaOPrdCjXh41DKIgrIIj9rS00-da1FPffuEQddDnWvtOlG_YKT1IQMNCObwo6VFM3BlAiLHM1clasFIfcy8JkK5enTq5XrL5bIw6fm1tOrx7IKi09q68P668dxeFXGeWeKIrfuqsElZlMyxyGBBdb1a1_nZ4rxleGrAA7rXhLSpQgfGsaLAanHkhZfNVWJguLnd8",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[activeSlide];

  return (
    <section className="relative w-full h-[80vh] min-h-[550px] flex items-center overflow-hidden bg-surface-container-low group/hero">
      {/* Background Images */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${activeSlide === idx ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          <img
            alt={slide.title}
            className="w-full h-full object-cover transform scale-105 transition-transform duration-7000 ease-out"
            src={slide.image}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        </div>
      ))}

      {/* Slide Content Overlay */}
      <div className="relative z-10 text-left max-w-[1440px] mx-auto px-6 sm:px-12 md:px-24 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="max-w-2xl space-y-4"
          >
            <span className="font-label text-xs font-semibold text-[#F5C77E] mb-2 block tracking-[0.2em] uppercase drop-shadow-sm">
              {current.tag}
            </span>
            <h1 className="font-HelveticaNow text-3xl sm:text-5xl md:text-[56px] text-white font-bold leading-[1.1] whitespace-pre-line drop-shadow-lg">
              {current.title}
            </h1>
            <p className="font-HelveticaNow text-base md:text-lg text-white/90 max-w-xl mb-8 leading-relaxed font-light drop-shadow-md">
              {current.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                className="inline-block bg-[#E5A93C] hover:bg-[#d4962b] text-[#2C053B] font-label text-xs font-bold px-8 py-4 rounded-full uppercase tracking-[0.1em] transition-all duration-300 shadow-xl whitespace-nowrap hover:scale-105 active:scale-95"
                href="#collections"
              >
                Browse the Collection
              </a>
              <a
                className="inline-flex items-center gap-2 border-2 border-white/80 text-white hover:bg-white hover:text-[#2C053B] font-label text-xs font-bold px-8 py-3.5 rounded-full uppercase tracking-[0.1em] backdrop-blur-sm bg-black/25 transition-all duration-300 whitespace-nowrap hover:scale-105 active:scale-95 shadow-md"
                href={COMPANY_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#25D366]">chat</span>
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls (Hidden by default, reveals on hover) */}
      <button
        onClick={() =>
          setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-surface/85 dark:bg-surface-dim/85 backdrop-blur-sm rounded-full flex items-center justify-center text-primary z-20 hover:bg-secondary hover:text-on-secondary transition-all duration-300 cursor-pointer shadow-lg opacity-0 group-hover/hero:opacity-100 -translate-x-3 group-hover/hero:translate-x-0 pointer-events-none group-hover/hero:pointer-events-auto active:scale-90"
        aria-label="Previous Slide"
      >
        <span className="material-symbols-outlined text-[22px]">chevron_left</span>
      </button>
      <button
        onClick={() =>
          setActiveSlide((prev) => (prev + 1) % slides.length)
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-surface/85 dark:bg-surface-dim/85 backdrop-blur-sm rounded-full flex items-center justify-center text-primary z-20 hover:bg-secondary hover:text-on-secondary transition-all duration-300 cursor-pointer shadow-lg opacity-0 group-hover/hero:opacity-100 translate-x-3 group-hover/hero:translate-x-0 pointer-events-none group-hover/hero:pointer-events-auto active:scale-90"
        aria-label="Next Slide"
      >
        <span className="material-symbols-outlined text-[22px]">chevron_right</span>
      </button>

      {/* Slider Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${activeSlide === idx
                ? "w-6 h-2 bg-secondary"
                : "w-2 h-2 bg-surface-container-highest/80 hover:bg-surface-container-highest"
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

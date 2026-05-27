import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { slides } from "@/data/home";

const textContainerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      duration: 0.25,
    },
  },
};

const textItemVariants: Variants = {
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.25 } },
};

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const handleIndicatorClick = (index: number) => {
    setActiveSlide(index);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-charcoal"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={activeSlide}
            src={slides[activeSlide].bgImage}
            alt="Signova Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/30 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent z-[1]" />
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute size-2 rounded-full bg-lime/40 blur-sm z-[2]"
          style={{ left: `${(i * 83) % 100}%`, top: `${(i * 47) % 100}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="relative w-full max-w-7xl mx-auto px-6 py-32 text-white z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            variants={textContainerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col justify-center min-h-[60vh] md:min-h-[70vh]"
          >
            <motion.div
              variants={textItemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-xs uppercase tracking-[0.25em] text-lime mb-8 self-start"
            >
              <Sparkles className="size-3.5" /> {slides[activeSlide].eyebrow}
            </motion.div>

            <motion.h1
              variants={textItemVariants}
              className="text-4xl sm:text-6xl md:text-8xl font-bold leading-[1.1] md:leading-[0.95] max-w-5xl"
            >
              {slides[activeSlide].titlePre}
              <span className="text-gradient">
                {slides[activeSlide].titleHighlight}
              </span>
              {slides[activeSlide].titlePost}
            </motion.h1>

            <motion.p
              variants={textItemVariants}
              className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed"
            >
              {slides[activeSlide].desc}
            </motion.p>

            <motion.div
              variants={textItemVariants}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4"
            >
              {slides[activeSlide].ctas.map((cta, cIdx) => {
                const Icon = cta.icon;
                return (
                  <Link
                    key={cIdx}
                    to={cta.path}
                    className={
                      cta.isPrimary
                        ? "group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-lime-gradient text-charcoal font-semibold shadow-glow hover:scale-[1.02] transition w-full sm:w-auto"
                        : "group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl glass-dark text-white font-semibold hover:bg-white/10 transition w-full sm:w-auto"
                    }
                  >
                    {cta.text}
                    <Icon className="size-4 group-hover:translate-x-1 transition" />
                  </Link>
                );
              })}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Combined Navigation Control */}
      <div className="absolute bottom-30 md:bottom-32 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6 px-6 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-lg">
        <button
          onClick={prevSlide}
          className="text-white/60 hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className="group relative cursor-pointer focus:outline-none flex items-center justify-center"
              aria-label={`Go to slide ${index + 1}`}
            >
              {activeSlide === index ? (
                <div className="w-8 h-2.5 rounded-full bg-lime overflow-hidden relative transition-all duration-300">
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 bg-white rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    key={activeSlide}
                  />
                </div>
              ) : (
                <div className="size-2 rounded-full bg-white/35 group-hover:bg-white/60 transition-colors duration-200" />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="text-white/60 hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
          aria-label="Next slide"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/50 text-xs uppercase tracking-[0.3em] z-20">
        <span>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

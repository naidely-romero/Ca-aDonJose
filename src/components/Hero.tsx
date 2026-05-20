import React from "react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 bg-black" />
      
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6 inline-block border-y border-brand-gold/30 px-4 py-2"
        >
          <span className="font-accent text-xs uppercase tracking-[0.4em] text-brand-gold drop-shadow-sm font-semibold">
            Desde Mahuixtlán, Veracruz
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-8xl font-display mb-8 leading-[0.9] tracking-tighter text-white"
        >
          El Espíritu de la <br />
          <span className="italic gold-gradient bg-clip-text text-transparent">Pura Caña</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-2xl mx-auto text-lg md:text-xl font-accent font-light opacity-80 tracking-wide mb-12 text-white/90"
        >
          Destilería artesanal donde la tradición se encuentra con la excelencia. Un legado de sabor nacido en el corazón de Mahuixtlán.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#productos"
            className="w-full sm:w-auto bg-brand-gold text-brand-black px-10 py-4 font-accent text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 text-center"
          >
            Explorar Variedad
          </a>
          <a
            href="#historia"
            className="w-full sm:w-auto border border-white/20 px-10 py-4 font-accent text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-brand-black transition-all duration-300 text-center text-white"
          >
            Nuestra Herencia
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-brand-gold to-transparent" />
      </motion.div>
    </section>
  );
}

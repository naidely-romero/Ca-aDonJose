import React from "react";
import { motion } from "motion/react";

export function History() {
  return (
    <section id="historia" className="py-24 bg-brand-cream text-white overflow-hidden border-t border-b border-light">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col items-center">
          
          {/* Centered Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center max-w-3xl"
          >
            <h2 className="text-brand-gold text-xs uppercase tracking-[0.4em] mb-4 font-accent font-semibold">
              Nuestra Herencia
            </h2>
            <h3 className="text-4xl md:text-5xl font-display mb-8 leading-tight tracking-tighter text-white">
              El Legado de <br />
              <span className="italic text-brand-gold/80">Mahuixtlán</span>
            </h3>
            
            <div className="space-y-6 font-accent text-xs md:text-sm text-white/75 font-light leading-relaxed text-justify md:text-center">
              <p className="italic font-normal border-l-2 md:border-l-0 md:border-b border-brand-gold pl-4 md:pl-0 pb-4 mb-8 text-brand-gold/80 text-base inline-block">
                "Caña Don José no es solo una marca; es el latido de un pueblo destilador."
              </p>
              <p>
                Fundada en el corazón de Mahuixtlán, Veracruz, nuestra destilería nació del deseo de preservar la pureza técnica del aguardiente de caña tradicional. El nombre de <strong>Caña Don José</strong> es un profundo homenaje al padre de nuestro fundador, aquel Don José que, aunque ya no se encuentra en este plano físico, dejó sembrada la semilla del trabajo honesto y la pasión por el destilado.
              </p>
              <p>
                Hoy, su hijo continúa con este legacy, asegurando que cada gota que sale de nuestras cubas mantenga el estándar de excelencia que su padre siempre soñó. En nuestra casa respetamos los tiempos de la naturaleza; utilizamos cañas seleccionadas a mano, procesadas con técnicas que han sido perfeccionadas como una herencia viva.
              </p>
              <p>
                Nuestros famosos Toritos (especialmente el de piñón y cacahuate) y nuestros Compuestos de maracuyá, tamarindo y el distinguido aguardiente reposado, son el resultado de esta evolución. Un puente entre el pasado de Don José y el presente vibrante de Mahuixtlán.
              </p>
            </div>

            <div className="mt-12 flex items-center justify-center space-x-12">
              <div>
                <span className="block text-2xl font-display text-brand-gold font-medium">Veracruz</span>
                <span className="text-[9px] uppercase tracking-widest text-[#71717a] font-accent font-semibold">
                  Origen Protegido
                </span>
              </div>
              <div className="h-12 w-[1px] bg-white/10" />
              <div>
                <span className="block text-2xl font-display text-brand-gold font-medium font-accent">Tradición</span>
                <span className="text-[9px] uppercase tracking-widest text-[#71717a] font-accent font-semibold">
                  Familiar
                </span>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

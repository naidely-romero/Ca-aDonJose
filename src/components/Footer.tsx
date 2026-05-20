import React, { useState } from "react";
import { Instagram, Facebook } from "lucide-react";
import { Modal } from "./Modal";

export function Footer() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | "responsibility" | null>(null);

  const navigationLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Productos", href: "#productos" },
    { name: "Nuestra Historia", href: "#historia" },
    { name: "Ubicación", href: "#ubicacion" },
  ];

  const handleOpenModal = (type: "privacy" | "terms" | "responsibility") => {
    setActiveModal(type);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <footer className="bg-brand-black pt-24 pb-12 border-t border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Upper Grid */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
          <div>
            <h2 className="font-display text-4xl tracking-tighter text-brand-gold uppercase leading-none mb-2">
              Caña Don José
            </h2>
            <p className="font-accent text-[10px] tracking-[0.4em] opacity-40 uppercase text-white/60">
              El auténtico sabor de Mahuixtlán
            </p>
          </div>
          
          {/* Socials */}
          <div className="flex space-x-6 mt-8 md:mt-0">
            <a
              href="https://www.instagram.com/mahuix.don.jose?igsh=MTBzOTV6eDlzYTY2OA=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all cursor-pointer text-white"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/share/18UX7Nqkj1/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all cursor-pointer text-white"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-20 border-t border-white/5 pt-16">
          {/* Navigation */}
          <div>
            <h4 className="font-accent text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-6 font-bold">
              Navegación
            </h4>
            <ul className="space-y-4 font-accent text-sm text-white/50">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-brand-gold transition-colors text-white/70 hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Policies */}
          <div>
            <h4 className="font-accent text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-6 font-bold">
              Legal y Compromiso
            </h4>
            <ul className="space-y-4 font-accent text-sm text-white/60">
              <li>
                <button
                  onClick={() => handleOpenModal("privacy")}
                  className="hover:text-brand-gold transition-colors text-white/70 text-left cursor-pointer hover:text-white"
                >
                  Aviso de Privacidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenModal("terms")}
                  className="hover:text-brand-gold transition-colors text-white/70 text-left cursor-pointer hover:text-white"
                >
                  Términos y Condiciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenModal("responsibility")}
                  className="hover:text-brand-gold transition-colors text-white/70 text-left cursor-pointer hover:text-white"
                >
                  Consumo Responsable
                </button>
              </li>
            </ul>
          </div>

          {/* Location details */}
          <div>
            <h4 className="font-accent text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-6 font-bold">
              Ubicación Base
            </h4>
            <p className="font-accent text-sm text-white/50 leading-relaxed mb-4">
              C. Primera de Mayo 82, 96, Mahuixtlán, <br />
              91608 Mahuixtlán, Veracruz, México.
            </p>
            <p className="font-accent text-xs text-brand-gold opacity-80 uppercase tracking-widest italic col-span-2">
              Veracruz • Origen Protegido
            </p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-white/5 pt-12 text-center text-xs text-white/40 font-accent space-y-4">
          <p className="tracking-wide">
            © 2026 Destilería Caña Don José. Todos los derechos reservados.
          </p>
          <p className="text-[10px] uppercase tracking-widest text-brand-gold/60 font-semibold italic">
            Evite el exceso. Disfrute con moderación. Referencial de edad legal requerido.
          </p>
        </div>

        {/* Modals injection */}
        <Modal
          isOpen={activeModal === "privacy"}
          onClose={handleCloseModal}
          title="Aviso de Privacidad"
        >
          <div className="space-y-6">
            <p className="text-white/90">
              En Destilería Caña Don José, valoramos su privacidad. Este aviso describe cómo manejamos su información personal.
            </p>
            <h4 className="text-brand-gold font-display text-xl">1. Recolección de Datos</h4>
            <p className="text-white/70 leading-relaxed">
              Solo recolectamos información que usted nos proporciona voluntariamente a través de nuestros canales de contacto directos, de WhatsApp o llamada telefónica.
            </p>
            <h4 className="text-brand-gold font-display text-xl">2. Uso de la Información</h4>
            <p className="text-white/70 leading-relaxed">
              Su información se utiliza exclusivamente para resolver sus dudas, coordinar la entrega o cotización de nuestros destilados tradicionales y de nuestros famosos toritos, así como para mejorar la experiencia con nuestra destilería.
            </p>
            <h4 className="text-brand-gold font-display text-xl">3. Protección</h4>
            <p className="text-white/70 leading-relaxed">
              Implementamos medidas de seguridad técnicas para proteger sus datos personales contra accesos no autorizados. No compartimos sus datos con agencias o terceros para venta.
            </p>
            <p className="mt-8 text-xs opacity-50 italic text-white/40">
              Última actualización: Mayo 2026.
            </p>
          </div>
        </Modal>

        <Modal
          isOpen={activeModal === "terms"}
          onClose={handleCloseModal}
          title="Términos y Condiciones"
        >
          <div className="space-y-6">
            <p className="text-white/90">
              Al acceder a este sitio, usted acepta los siguientes términos:
            </p>
            <h4 className="text-brand-gold font-display text-xl">1. Mayoría de Edad</h4>
            <p className="text-white/70 leading-relaxed">
              Usted declara tener la mayoría de edad legal para consumir bebidas alcohólicas en su país o región de residencia (18 años en México).
            </p>
            <h4 className="text-brand-gold font-display text-xl">2. Propiedad Intelectual</h4>
            <p className="text-white/70 leading-relaxed">
              Todo el contenido expuesto en este portal, incluyendo logotipos, catálogos, imágenes fotográficas, secretos de marca de los compuestos artesanalmente elaborados y textos de autoría familiar, son propiedad exclusiva de la Destilería Caña Don José y están amparados bajo leyes de propiedad intelectual de los Estados Unidos Mexicanos.
            </p>
            <h4 className="text-brand-gold font-display text-xl">3. Limitación de Responsabilidad</h4>
            <p className="text-white/70 leading-relaxed">
              La Destilería Caña Don José no se hace responsable por el mal uso que terceras personas den a nuestros productos artesanales o por posibles daños derivados del acceso a este sitio informático de exhibición. No frotar los ojos, consumir con cautela.
            </p>
          </div>
        </Modal>

        <Modal
          isOpen={activeModal === "responsibility"}
          onClose={handleCloseModal}
          title="Consumo Responsable"
        >
          <div className="space-y-6">
            <h4 className="text-brand-gold font-display text-2xl italic mb-4">
              "El aguardiente es cultura y tradición, disfrútalo con respeto."
            </h4>
            <p className="text-white/80 leading-relaxed">
              En Caña Don José promovemos una cultura de consumo consciente. Beber con la debida moderación es esencial para apreciar el sabor de nuestros Toritos de piñón y cacahuate, así como los compuestos frutales de maracuyá y tamarindo.
            </p>
            <ul className="list-disc pl-5 space-y-3 text-white/70 font-accent">
              <li>No combines el consumo de alcohol con la conducción de vehículos motorizados u operaciones pesadas.</li>
              <li>Conoce tus límites personales de degustación y respétalos en todo momento.</li>
              <li>Alterna el consumo de bebidas compuestas con agua pura para conservar el paladar y la hidratación.</li>
              <li>El consumo de alcohol es perjudicial para la salud de menores de edad y mujeres embarazadas. Evítelo a toda costa.</li>
            </ul>
            <p className="border-t border-white/10 pt-6 text-white/80 leading-relaxed">
              Nuestra misión es llevar la esencia y el sabor de Mahuixtlán al mundo, fomentando un ambiente ético, familiar, sano y seguro para toda nuestra querida comunidad destiladora.
            </p>
          </div>
        </Modal>

      </div>
    </footer>
  );
}
export default Footer;

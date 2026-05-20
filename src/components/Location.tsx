import React, { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Clock, Phone, PhoneCall, MessageCircle } from "lucide-react";
import { EditableImage } from "./EditableImage";
import { Modal } from "./Modal";

import map1Img from "../assets/images/regenerated_image_1779295957177.jpg";
import map2Img from "../assets/images/regenerated_image_1779295957717.jpg";

interface Establishment {
  id: number;
  title: string;
  address: string;
  mapLink: string;
  hours: string;
  phone: string;
  imageId: string;
}

const ESTABLISHMENTS: Establishment[] = [
  {
    id: 1,
    title: "Ubicación 1",
    address: `C. Primera de Mayo 82, 96, Mahuixtlán,
91608 Mahuixtlán, Veracruz, México.`,
    mapLink: "https://www.google.com/maps/search/?api=1&query=C.+Primera+de+Mayo+82,+Mahuixtlán,+Veracruz",
    hours: "Lunes a Domingo: 8:00 AM - 9:00 PM",
    phone: "228 177 0513",
    imageId: "map1",
  },
  {
    id: 2,
    title: "Ubicación 2",
    address: `Cerca de C. Primero de Mayo 91-69,
91608 Mahuixtlán, Veracruz, México.`,
    mapLink: "https://maps.app.goo.gl/RgDG85psudRXPqN18",
    hours: "Lunes a Domingo: 8:00 AM - 9:00 PM",
    phone: "228 177 0513",
    imageId: "map2",
  },
];

export function Location() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeContactPhone, setActiveContactPhone] = useState("");

  const handleOpenMap = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleOpenContact = (phone: string) => {
    setActiveContactPhone(phone);
    setIsModalOpen(true);
  };

  const formatWhatsAppLink = (phoneStr: string) => {
    const rawNumber = phoneStr.replace(/\D/g, "");
    const prefixed = rawNumber.startsWith("52") ? rawNumber : `52${rawNumber}`;
    return `https://wa.me/${prefixed}`;
  };

  const formatPhoneLink = (phoneStr: string) => {
    const rawNumber = phoneStr.replace(/\D/g, "");
    return `tel:+52${rawNumber}`;
  };

  return (
    <section id="ubicacion" className="py-24 bg-brand-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-brand-gold text-xs uppercase tracking-[0.4em] mb-4 text-center">
            Nuestras Casas
          </h2>
          <h3 className="text-4xl md:text-5xl font-display mb-2 text-center text-white">
            Visítanos en <span className="italic opacity-60 text-brand-gold">Mahuixtlán</span>
          </h3>
          <p className="text-center font-accent text-xs uppercase tracking-widest opacity-40 mt-4 text-white/50">
            Conoce nuestros dos establecimientos y vive la tradición de cerca
          </p>
        </div>

        {/* Establishments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {ESTABLISHMENTS.map((est, idx) => (
            <div key={est.id} className="space-y-12">
              
              {/* Info Block */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-brand-gold/20" />
                  <h4 className="font-display text-2xl text-brand-gold italic">
                    {est.title}
                  </h4>
                  <div className="h-px flex-1 bg-brand-gold/20" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8 text-white">
                  
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full border border-brand-gold/30 flex items-center justify-center shrink-0">
                      <MapPin className="text-brand-gold w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-display text-lg mb-1">
                        Dirección
                      </span>
                      <p className="font-accent text-xs opacity-60 tracking-wide whitespace-pre-line text-white/70">
                        {est.address}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full border border-brand-gold/30 flex items-center justify-center shrink-0">
                      <Clock className="text-brand-gold w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-display text-lg mb-1">
                        Horarios
                      </span>
                      <p className="font-accent text-xs opacity-60 tracking-wide text-white/70">
                        {est.hours}
                      </p>
                    </div>
                  </div>

                  {/* Contact Button */}
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full border border-brand-gold/30 flex items-center justify-center shrink-0">
                      <Phone className="text-brand-gold w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-display text-lg mb-1">
                        Contacto
                      </span>
                      <button
                        onClick={() => handleOpenContact(est.phone)}
                        className="font-accent text-xs text-brand-gold hover:text-white underline underline-offset-4 tracking-wide transition-colors cursor-pointer"
                      >
                        {est.phone}
                      </button>
                    </div>
                  </div>

                </div>

                {/* Open Map Button */}
                <button
                  onClick={() => handleOpenMap(est.mapLink)}
                  className="w-full bg-white/5 border border-white/10 text-brand-gold px-12 py-4 font-accent text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-brand-gold hover:text-brand-black transition-all group cursor-pointer"
                >
                  Cómo llegar a {est.title}
                </button>
              </div>

              {/* Map Preview Image placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative aspect-video overflow-hidden group border border-white/10 rounded-sm shadow-lg"
              >
                <div className="absolute top-4 left-4 z-10 bg-brand-black/80 backdrop-blur-md px-4 py-2 border border-brand-gold/20">
                  <span className="font-accent text-[10px] uppercase tracking-widest text-brand-gold font-semibold">
                    {est.title}
                  </span>
                </div>
                
                <EditableImage
                  id={est.imageId}
                  defaultSrc={
                    est.imageId === "map1"
                      ? map1Img
                      : map2Img
                  }
                  alt={`Mapa de Ubicación ${est.id}`}
                  className="w-full h-full animate-none"
                  imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 pointer-events-none bg-brand-gold/5 mix-blend-overlay" />
              </motion.div>

            </div>
          ))}
        </div>

        {/* Contact Selection Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Opciones de Contacto"
        >
          <div className="flex flex-col gap-6 py-4">
            <p className="text-center font-display text-xl italic opacity-80 mb-4 text-white">
              ¿Cómo deseas ponerte en contacto con nosotros?
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Call Now */}
              <a
                href={formatPhoneLink(activeContactPhone)}
                className="flex items-center justify-center gap-3 bg-brand-gold text-brand-black px-6 py-8 font-accent text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-all transform hover:-translate-y-1 rounded-sm text-center"
              >
                <PhoneCall size={20} />
                Llamar ahora
              </a>

              {/* WhatsApp Option */}
              <a
                href={formatWhatsAppLink(activeContactPhone)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-8 font-accent text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#128C7E] transition-all transform hover:-translate-y-1 rounded-sm text-center"
              >
                <MessageCircle size={20} />
                Enviar WhatsApp
              </a>
            </div>

            <div className="mt-6 text-center text-white/50">
              <p className="font-accent text-[10px] uppercase tracking-widest opacity-40">
                Número: {activeContactPhone}
              </p>
            </div>
          </div>
        </Modal>

      </div>
    </section>
  );
}
export default Location;

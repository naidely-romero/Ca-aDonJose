import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import prodImg0 from "../assets/images/regenerated_image_1779295954280.jpg";
import prodImg1 from "../assets/images/regenerated_image_1779295954745.jpg";
import prodImg2 from "../assets/images/regenerated_image_1779295955366.jpg";
import prodImg3 from "../assets/images/regenerated_image_1779295955949.jpg";
import prodImg4 from "../assets/images/regenerated_image_1779295956258.jpg";

interface Product {
  name: string;
  type: string;
  description: string;
  image: string;
  tag: string;
}

const FEATURED_PRODUCTS: Product[] = [
  {
    name: "Aguardiente Tradicional",
    type: "Pura Caña",
    description: "Nuestro destilado más puro, esencia de la caña veracruzana.",
    image: prodImg0,
    tag: "Clásico",
  },
  {
    name: "Don José Reposado",
    type: "Reserva Especial",
    description: "Suave al paladar, reposado en barricas de roble seleccionado.",
    image: prodImg1,
    tag: "Premium",
  },
  {
    name: "Compuesto de Tamarindo",
    type: "Frutal Artesanal",
    description: "Equilibrio perfecto entre la acidez del tamarindo y la fuerza de la caña.",
    image: prodImg2,
    tag: "Favorito",
  },
  {
    name: "Compuesto de Maracuyá",
    type: "Exótico",
    description: "Explosión tropical con notas dulces y cítricas de maracuyá fresco.",
    image: prodImg3,
    tag: "Refrescante",
  },
  {
    name: "Toritos: Cacahuate y Piñón",
    type: "Tradición Cremosa",
    description: "Nuestras dos joyas de la casa. El clásico Torito de Cacahuate tostado y el refinado Torito de Piñón, ambos elaborados con nuestra receta secreta artesanal.",
    image: prodImg4,
    tag: "Especialidades",
  },
];

const OTHER_VARIETIES = [
  "Torito de Café",
  "Torito de Fresa",
  "Licor de Coco Crema",
  "Torito de Cajeta",
  "Torito de Coco",
  "Torito de Guanábana",
  "Torito de Pistache",
  "Torito de Nutella",
  "Torito de Macadamia",
  "Licor de Piña",
  "Licor de Naranja",
  "Licor de Café",
  "Licor de Jamaica",
  "Licor de Vainilla",
  "Licor de Limón",
  "Licor de Guanábana",
  "Licor de Coco",
  "Licor de Cocotazo",
  "Licor de Mora Azul",
  "Burro",
  "Alcohol del 96",
  "Crucetillo",
];

export function Products() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="productos" className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div className="max-w-2xl">
            <h2 className="text-brand-gold text-xs uppercase tracking-[0.4em] mb-4">
              Selección de la Casa
            </h2>
            <h3 className="text-4xl md:text-6xl font-display leading-tight text-white">
              Destilados con <br />
              <span className="italic opacity-60">Alma Veracruzana</span>
            </h3>
          </div>
          <p className="mt-8 md:mt-0 font-accent text-sm opacity-50 max-w-sm tracking-wide leading-relaxed text-white/70">
            Cada botella es el resultado de un proceso meticuloso que respeta el tiempo y la naturaleza de nuestra tierra.
          </p>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {FEATURED_PRODUCTS.map((prod, idx) => (
            <motion.div
              key={prod.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Product Image Frame */}
              <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-brand-brown/10 rounded-sm">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-brand-black/80 backdrop-blur-md border border-brand-gold/30 px-3 py-1 text-[10px] uppercase tracking-widest text-brand-gold font-accent font-semibold">
                    {prod.tag}
                  </span>
                </div>
                
                {/* Overlay overlay */}
                <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                
                {/* Action Circle */}
                <div className="absolute bottom-4 right-4 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-12 h-12 rounded-full border border-brand-gold flex items-center justify-center bg-brand-black/40 backdrop-blur-sm">
                    <ArrowUpRight className="text-brand-gold w-5 h-5 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-2 block font-accent font-semibold">
                  {prod.type}
                </span>
                <h4 className="text-2xl font-display mb-3 text-white group-hover:text-brand-gold transition-colors">
                  {prod.name}
                </h4>
                <p className="font-accent text-sm opacity-50 tracking-wide line-clamp-2 leading-relaxed text-white/70">
                  {prod.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See More Section */}
        <div className="mt-24 text-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="group relative inline-flex items-center gap-4 text-brand-gold transition-colors cursor-pointer"
          >
            <span className="font-accent text-xs uppercase tracking-[0.4em] font-bold">
              {showMore ? "Cerrar" : "Ver más variedad"}
            </span>
            <div
              className={`w-12 h-px bg-brand-gold/20 transition-all group-hover:w-20 group-hover:bg-brand-gold ${
                showMore ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-12 overflow-hidden"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-brand-gold/10 p-12 rounded-sm shadow-xl">
                  <h4 className="font-display text-3xl text-brand-gold mb-8 italic">
                    Más Variedad
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-left">
                    {OTHER_VARIETIES.map((item, id) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: id * 0.05 }}
                        className="flex items-center gap-3 group/item cursor-default"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold scale-0 group-hover/item:scale-100 transition-transform shrink-0" />
                        <span className="font-accent text-sm text-white/70 group-hover/item:text-brand-gold transition-colors">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <p className="mt-12 font-accent text-xs text-brand-gold/60 italic tracking-widest uppercase">
                    y muchísima más variedad que puedes encontrar dentro de nuestros establecimientos
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

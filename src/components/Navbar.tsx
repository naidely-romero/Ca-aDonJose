import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Pen, X, Menu } from "lucide-react";
import { useCustomization } from "./CustomizationContext";

export function Navbar() {
  const { isEditMode, setEditMode } = useCustomization();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Productos", href: "#productos" },
    { name: "Nuestra Historia", href: "#historia" },
    { name: "Ubicación", href: "#ubicacion" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-brand-black/90 backdrop-blur-md py-4 shadow-lg border-b border-white/5" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="font-display text-xl tracking-[0.16em] text-white uppercase font-normal leading-none mb-1">
            Caña <span className="text-brand-gold italic">Don José</span>
          </span>
          <span className="font-accent text-[8px] tracking-[0.4em] uppercase text-brand-gold/60 font-semibold font-mono">
            Destilería Mahuixtlán
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="font-accent text-xs uppercase tracking-widest hover:text-brand-gold transition-colors text-white"
            >
              {link.name}
            </motion.a>
          ))}
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setEditMode(!isEditMode)}
            className={`border border-brand-gold px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              isEditMode ? "bg-brand-gold text-brand-black" : "text-brand-gold hover:bg-brand-gold hover:text-brand-black"
            }`}
          >
            <Pen size={12} />
            {isEditMode ? "Guardar" : "Editar"}
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-brand-gold cursor-pointer p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-brand-black border-t border-white/10 p-8 flex flex-col space-y-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-display text-2xl text-center text-white hover:text-brand-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <button
              onClick={() => {
                setEditMode(!isEditMode);
                setIsOpen(false);
              }}
              className={`border border-brand-gold px-4 py-4 text-[12px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                isEditMode ? "bg-brand-gold text-brand-black" : "text-brand-gold hover:bg-brand-gold/10"
              }`}
            >
              <Pen size={16} />
              {isEditMode ? "Guardar Cambios" : "Activar Edición"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

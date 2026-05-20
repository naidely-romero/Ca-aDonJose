import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-black/90 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-20 bg-brand-black border border-brand-gold/20 z-[101] overflow-hidden flex flex-col rounded-sm shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h3 className="font-display text-2xl text-brand-gold tracking-tight">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-brand-gold transition-colors p-2 cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 font-accent text-sm leading-relaxed text-white/85 max-w-none">
              {children}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="bg-brand-gold text-brand-black px-8 py-3 font-accent text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
export default Modal;

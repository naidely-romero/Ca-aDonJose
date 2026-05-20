import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImagePlus, Upload, Link as LinkIcon, Compass, Check, X, RotateCcw } from "lucide-react";
import { useCustomization } from "./CustomizationContext";

function normalizePath(path: string) {
  if (!path) return "";
  if (path.startsWith("data:") || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  
  let basePath = "/";
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname;
    const isGithubIo = window.location.hostname.endsWith("github.io");
    const parts = pathname.split("/").filter(Boolean);
    
    if (isGithubIo && parts.length > 0) {
      basePath = `/${parts[0]}/`;
    } else {
      basePath = "/";
    }
  }
  
  const root = basePath.endsWith("/") ? basePath : `${basePath}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${root}${cleanPath}`;
}

const BRAND_PRESET_IMAGES = [
  {
    name: "Alambique de Cobre (Clásico)",
    url: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=800&auto=format&fit=crop",
    category: "Destilería",
  },
  {
    name: "Barricas de Roble",
    url: "https://images.unsplash.com/photo-1568644391225-4720935d97f4?q=80&w=800&auto=format&fit=crop",
    category: "Bodega",
  },
  {
    name: "Campos de Veracruz",
    url: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800&auto=format&fit=crop",
    category: "Origen",
  },
  {
    name: "Toritos Dulces y Cremosos",
    url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
    category: "Bebidas",
  },
  {
    name: "Compuesto Tropical Piñón",
    url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop",
    category: "Bebidas",
  },
  {
    name: "Aguardiente Cristalino",
    url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
    category: "Destilado",
  },
  {
    name: "Copas de la Casa",
    url: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop",
    category: "Degustación",
  },
  {
    name: "Mesa del Destilador",
    url: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=800&auto=format&fit=crop",
    category: "Tradición",
  },
];

interface EditableImageProps {
  id: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  animate?: any;
}

export function EditableImage({
  id,
  defaultSrc,
  alt,
  className = "",
  imgClassName = "",
  animate,
}: EditableImageProps) {
  const { images, updateImage, isEditMode } = useCustomization();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [showEditor, setShowEditor] = useState(false);
  const [activeTab, setActiveTab ] = useState<"file" | "url" | "presets">("presets");
  const [urlInput, setUrlInput] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const currentSrc = normalizePath(images[id] || defaultSrc);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      applyFile(file);
    }
  };

  const applyFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        updateImage(id, reader.result);
        setShowEditor(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      applyFile(e.dataTransfer.files[0]);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      updateImage(id, urlInput.trim());
      setShowEditor(false);
      setUrlInput("");
    }
  };

  const handlePresetSelect = (url: string) => {
    updateImage(id, url);
    setShowEditor(false);
  };

  const handleReset = () => {
    updateImage(id, "");
    setShowEditor(false);
  };

  return (
    <div className={`relative group ${className}`}>
      <motion.img
        src={currentSrc}
        alt={alt}
        className={imgClassName}
        {...animate}
        onError={(e: any) => {
          e.target.src = normalizePath(defaultSrc);
        }}
        referrerPolicy="no-referrer"
      />
      
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-black/40 backdrop-blur-[3px] flex items-center justify-center z-20 pointer-events-auto"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowEditor(true);
              }}
              className="bg-brand-black text-brand-gold p-4 rounded-full border border-brand-gold/50 shadow-2xl hover:scale-110 active:scale-95 transition-all flex flex-col items-center gap-2 cursor-pointer z-30"
            >
              <ImagePlus size={24} />
              <span className="text-[10px] uppercase tracking-widest font-bold font-accent">Cambiar Imagen</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Dark Customizer Modal */}
      <AnimatePresence>
        {showEditor && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditor(false)}
              className="fixed inset-0 bg-brand-black/95 backdrop-blur-md z-[110] pointer-events-auto"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-4 md:inset-auto md:w-[680px] md:h-[580px] md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-[#0c0c0c] border border-white/10 p-6 md:p-8 flex flex-col rounded-sm z-[120] shadow-2xl pointer-events-auto overflow-hidden text-white"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="font-display text-2xl text-brand-gold font-normal tracking-tight">
                    Personalizar Imagen
                  </h3>
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block font-mono">
                    ID: {id}
                  </span>
                </div>
                <button
                  onClick={() => setShowEditor(false)}
                  className="text-white/60 hover:text-brand-gold transition-colors p-1.5 border border-white/5 hover:border-brand-gold/20 rounded-sm cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Tabs selector */}
              <div className="flex border-b border-white/5 mb-6">
                <button
                  onClick={() => setActiveTab("presets")}
                  className={`flex-1 py-3 text-[10px] uppercase tracking-[0.2em] font-accent font-semibold transition-all border-b-2 flex items-center justify-center gap-2 ${
                    activeTab === "presets"
                      ? "border-brand-gold text-brand-gold"
                      : "border-transparent text-white/50 hover:text-white"
                  }`}
                >
                  <Compass size={14} />
                  Galería
                </button>
                <button
                  onClick={() => setActiveTab("file")}
                  className={`flex-1 py-3 text-[10px] uppercase tracking-[0.2em] font-accent font-semibold transition-all border-b-2 flex items-center justify-center gap-2 ${
                    activeTab === "file"
                      ? "border-brand-gold text-brand-gold"
                      : "border-transparent text-white/50 hover:text-white"
                  }`}
                >
                  <Upload size={14} />
                  Subir Archivo
                </button>
                <button
                  onClick={() => setActiveTab("url")}
                  className={`flex-1 py-3 text-[10px] uppercase tracking-[0.2em] font-accent font-semibold transition-all border-b-2 flex items-center justify-center gap-2 ${
                    activeTab === "url"
                      ? "border-brand-gold text-brand-gold"
                      : "border-transparent text-white/50 hover:text-white"
                  }`}
                >
                  <LinkIcon size={14} />
                  Enlace URL
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto pr-1">
                {/* PRESETS TAB */}
                {activeTab === "presets" && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {BRAND_PRESET_IMAGES.map((preset) => (
                      <div
                        key={preset.name}
                        onClick={() => handlePresetSelect(preset.url)}
                        className="group/preset relative aspect-[4/3] rounded-sm overflow-hidden border border-white/5 hover:border-brand-gold/50 cursor-pointer transition-all bg-[#151515]"
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover opacity-60 group-hover/preset:opacity-90 group-hover/preset:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
                          <span className="text-[10px] font-display text-white font-medium truncate leading-tight group-hover/preset:text-brand-gold transition-colors">
                            {preset.name}
                          </span>
                          <span className="text-[8px] uppercase tracking-widest text-brand-gold/60 font-accent mt-0.5">
                            {preset.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* FILE UPLOAD TAB */}
                {activeTab === "file" && (
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`h-[240px] border border-dashed rounded-sm flex flex-col items-center justify-center p-6 text-center transition-all cursor-pointer ${
                      dragActive
                        ? "border-brand-gold bg-brand-gold/15"
                        : "border-white/10 hover:border-brand-gold bg-white/[0.01]"
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                    <Upload size={32} className={`mb-4 text-white/40 ${dragActive ? "text-brand-gold animate-bounce" : ""}`} />
                    <h4 className="font-display text-lg text-white mb-2">
                      Arrastra y suelta tu imagen aquí
                    </h4>
                    <p className="font-accent text-xs text-white/50 max-w-sm mb-4">
                      O haz clic para explorar los archivos locales de tu dispositivo. Soporta JPG, PNG, WEBP.
                    </p>
                    <span className="text-[9px] uppercase tracking-widest border border-white/10 px-3 py-1 bg-white/5 text-white/75 hover:bg-brand-gold hover:text-brand-black transition-colors rounded-xs">
                      Seleccionar Archivo
                    </span>
                  </div>
                )}

                {/* URL INPUT TAB */}
                {activeTab === "url" && (
                  <form onSubmit={handleUrlSubmit} className="space-y-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] font-accent text-white/60 mb-2">
                        Enlace Directo de la Imagen
                      </label>
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        className="w-full bg-[#151515] border border-white/15 px-4 py-3.5 font-accent text-xs text-white focus:outline-none focus:border-brand-gold transition-all rounded-xs"
                        required
                      />
                    </div>

                    {urlInput && (
                      <div className="border border-white/10 p-3 bg-white/[0.01]">
                        <span className="block text-[9px] uppercase tracking-widest text-[#71717a] font-mono mb-2">
                          Vista Previa Enlace:
                        </span>
                        <div className="aspect-video max-h-[140px] rounded-xs overflow-hidden relative bg-black/40">
                          <img
                            src={urlInput}
                            alt="Vista previa personalizada"
                            className="w-full h-full object-contain"
                            onError={(e: any) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-brand-gold text-brand-black py-3.5 font-accent text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-brand-black transition-all cursor-pointer rounded-xs"
                    >
                      Aplicar Enlace de Imagen
                    </button>
                  </form>
                )}
              </div>

              {/* Footer controls */}
              <div className="pt-4 border-t border-white/10 mt-6 flex justify-between items-center gap-4">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 border border-white/10 px-4 py-3 text-[10px] text-white/60 uppercase tracking-[0.1em] font-accent hover:border-red-500/30 hover:text-red-400 transition-colors cursor-pointer rounded-xs"
                  title="Restaurar a la imagen que viene por defecto"
                >
                  <RotateCcw size={12} />
                  Restaurar Original
                </button>

                <button
                  onClick={() => setShowEditor(false)}
                  className="bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-3 text-[10px] uppercase tracking-[0.1em] font-accent text-white transition-colors cursor-pointer rounded-xs"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
export { normalizePath };

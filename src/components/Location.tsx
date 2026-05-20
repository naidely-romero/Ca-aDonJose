import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Clock, 
  Phone, 
  PhoneCall, 
  MessageCircle, 
  Navigation, 
  Compass, 
  Map, 
  Info,
  Sparkles,
  Layers
} from "lucide-react";
import { Modal } from "./Modal";

interface Establishment {
  id: number;
  title: string;
  address: string;
  mapLink: string;
  hours: string;
  phone: string;
  imageId: string;
  coords: string;
  tag: string;
  description: string;
  features: string[];
}

const ESTABLISHMENTS: Establishment[] = [
  {
    id: 1,
    title: "Venta Principal - Destilería Caña Don José",
    address: `C. Primera de Mayo 82, Mahuixtlán,
91608 Mahuixtlán, Veracruz, México.`,
    mapLink: "https://maps.app.goo.gl/Hq4dwvRzwVTfoCNB7",
    hours: "Lunes a Domingo: 8:00 AM - 9:00 PM",
    phone: "228 177 0513",
    imageId: "map1",
    coords: "19.4313° N, 96.9152° W",
    tag: "Fábrica & Alambique Tradicional",
    description: "Nuestra mítica casa principal donde el jugo de caña recién extraído es destilado usando técnicas centenarias transmitidas por generaciones.",
    features: ["Destilación a la Leña", "Catas Directas en Alambique", "Lotes de Reserva Añeja", "Atención para Ventas de Mayoreo"],
  },
  {
    id: 2,
    title: "El Despacho Familiar (Punto de Venta)",
    address: `Cerca de C. Primero de Mayo 91-69,
91608 Mahuixtlán, Veracruz, México.`,
    mapLink: "https://maps.app.goo.gl/KfdpHfn7YSv4VQnd8",
    hours: "Lunes a Domingo: 8:00 AM - 9:00 PM",
    phone: "228 177 0513",
    imageId: "map2",
    coords: "19.4308° N, 96.9144° W",
    tag: "Boutique Familiar & Despacho",
    description: "Un acogedor rincón familiar de degustación directa a pocos metros de la destilería principal, ideal para adquirir botellas numeradas y cremas de caña.",
    features: ["Selección de Lotes Premium", "Degustación de Cremas Especiales", "Venta Directa al Menudeo"],
  },
];

export function Location() {
  const [activeId, setActiveId] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeContactPhone, setActiveContactPhone] = useState("");
  const [hoveredStreet, setHoveredStreet] = useState<string | null>(null);

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

  const activeEst = ESTABLISHMENTS.find(e => e.id === activeId) || ESTABLISHMENTS[0];

  return (
    <section id="ubicacion" className="py-24 bg-brand-black border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-brand-gold text-xs uppercase tracking-[0.4em] mb-4 text-center">
            Nuestras Casas
          </h2>
          <h3 className="text-4xl md:text-5xl font-display mb-2 text-center text-white">
            Visítanos en <span className="italic opacity-80 text-brand-gold">Mahuixtlán</span>
          </h3>
          <p className="text-center font-accent text-[10px] uppercase tracking-[0.25em] text-white/40 max-w-xl mx-auto leading-relaxed mt-4">
            Explora las ubicaciones a través del croquis interactivo de la comunidad y encuentra los accesos directos
          </p>
        </div>

        {/* Combined Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Synchronized Location Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between h-full">
            <div className="space-y-6">
              {ESTABLISHMENTS.map((est) => {
                const isActive = est.id === activeId;
                return (
                  <motion.div
                    key={est.id}
                    onClick={() => setActiveId(est.id)}
                    className={`p-6 border transition-all duration-500 cursor-pointer relative rounded-sm ${
                      isActive
                        ? "bg-brand-brown/95 border-brand-gold shadow-[0_4px_30px_rgba(196,166,126,0.1)] scale-[1.01]"
                        : "bg-[#111112]/50 border-white/5 hover:border-white/15 hover:bg-[#111112]/80"
                    }`}
                    whileHover={{ y: -2 }}
                    layout
                  >
                    {/* Active highlight bar */}
                    {isActive && (
                      <div className="absolute top-0 left-0 w-[3px] h-full bg-brand-gold" />
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[9px] uppercase tracking-[0.2em] font-accent font-bold px-2.5 py-1 border ${
                        isActive
                          ? "border-brand-gold/30 text-brand-gold bg-brand-gold/5"
                          : "border-white/10 text-white/40"
                      }`}>
                        {est.tag}
                      </span>
                      <span className="font-mono text-[9px] opacity-40 text-brand-gold">
                        {est.coords}
                      </span>
                    </div>

                    <h4 className={`font-display text-xl md:text-2xl transition-colors duration-300 ${
                      isActive ? "text-brand-gold text-shadow-gold italic" : "text-white"
                    }`}>
                      {est.title}
                    </h4>

                    <p className="font-accent text-xs text-white/60 font-light mt-3 leading-relaxed">
                      {est.description}
                    </p>

                    {/* Features checklist */}
                    {isActive && (
                      <motion.ul 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 space-y-1.5 text-[11px] font-accent text-brand-gold/80"
                      >
                        {est.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <Sparkles size={10} className="text-brand-gold flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </motion.ul>
                    )}

                    {/* Address / Hour row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-white/40">
                          <MapPin size={12} className="text-brand-gold" />
                          <span className="font-accent text-[9px] uppercase tracking-wider font-bold">Dirección</span>
                        </div>
                        <p className="font-accent text-[11px] text-white/70 leading-relaxed font-light whitespace-pre-line">
                          {est.address}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-white/40">
                          <Clock size={12} className="text-brand-gold" />
                          <span className="font-accent text-[9px] uppercase tracking-wider font-bold">Horario</span>
                        </div>
                        <p className="font-accent text-[11px] text-white/70 leading-relaxed font-light">
                          {est.hours}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons inside card */}
                    <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-white/5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenContact(est.phone);
                        }}
                        className="flex items-center justify-center gap-2 border border-white/10 hover:border-brand-gold/40 text-white hover:text-brand-gold py-2.5 px-2 font-accent text-[10px] uppercase tracking-widest font-semibold transition-all rounded-sm cursor-pointer"
                      >
                        <Phone size={11} />
                        Contacto
                      </button>

                      <a
                        href={est.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-2 bg-brand-gold hover:bg-white text-brand-black font-bold py-2.5 px-2 font-accent text-[10px] uppercase tracking-widest transition-all rounded-sm text-center"
                      >
                        <Navigation size={11} />
                        Ver Mapa
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Helpful interactive advice */}
            <div className="hidden lg:block bg-brand-brown/40 border border-white/5 p-4 rounded-sm text-white/50 text-[11px] font-accent leading-relaxed">
              <div className="flex gap-2.5 items-start">
                <Info size={14} className="text-brand-gold shrink-0 mt-0.5" />
                <p>
                  <span className="text-white font-semibold">Consejo de Ruta:</span> Ambas casas están ubicadas sobre la calle <span className="text-brand-gold">Primera de Mayo</span>, a escasos 150 metros de distancia una de la otra. Puedes transitar entre ambas a pie.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Stylized Interactive "Croquis" Map (7 cols) */}
          <div className="lg:col-span-7 bg-[#0c0c0e]/95 border border-white/10 p-4 md:p-6 rounded-sm relative shadow-2xl flex flex-col justify-between overflow-hidden group min-h-[420px]">
            
            {/* Top Bar Map Controls Display */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4 mb-4 text-xs font-accent text-white/50">
              <div className="flex items-center gap-2">
                <Map size={14} className="text-brand-gold" />
                <span className="uppercase tracking-[0.2em] font-semibold text-[10px] text-white">
                  Croquis Coorporativo de Canales & Acceso
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-gold/20 border border-brand-gold animate-pulse inline-block" />
                  Mahuixtlán, Ver.
                </span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 border border-white/10 rounded-sm">
                  ESQUEMÁTICO 2D
                </span>
              </div>
            </div>

            {/* SVG Croquis Map Canvas */}
            <div className="relative flex-1 flex items-center justify-center bg-brand-black/90 p-1 border border-white/5 rounded-sm overflow-hidden min-h-[300px]">
              
              {/* Overlay Watermark/Stamp */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none select-none text-left">
                <h5 className="font-display text-brand-gold italic text-sm tracking-wide leading-none">
                  Caña Don José
                </h5>
                <span className="font-accent text-[7px] uppercase tracking-[0.3em] text-white/30 block mt-1">
                  CROQUIS DE TRADICIÓN • VERACRUZ
                </span>
              </div>

              {/* Interactive Street Hover Indicator */}
              {hoveredStreet && (
                <div className="absolute bottom-4 left-4 z-10 bg-brand-black/90 border border-brand-gold/30 px-3 py-1.5 rounded-sm shadow-xl pointer-events-none">
                  <span className="font-accent text-[9px] uppercase tracking-widest text-brand-gold/80 font-bold block leading-none">
                    Vía Identificada
                  </span>
                  <span className="font-accent text-[11px] text-white mt-1 block">
                    {hoveredStreet}
                  </span>
                </div>
              )}

              <svg
                viewBox="0 0 600 420"
                className="w-full h-auto text-white select-none z-10 relative"
              >
                {/* Background Grid Lines */}
                <g stroke="rgba(196, 166, 126, 0.04)" strokeWidth="0.75" fill="none">
                  {/* Vertical lines */}
                  <line x1="50" y1="15" x2="50" y2="405" />
                  <line x1="100" y1="15" x2="100" y2="405" />
                  <line x1="150" y1="15" x2="150" y2="405" />
                  <line x1="200" y1="15" x2="200" y2="405" />
                  <line x1="250" y1="15" x2="250" y2="405" />
                  <line x1="300" y1="15" x2="300" y2="405" />
                  <line x1="350" y1="15" x2="350" y2="405" />
                  <line x1="400" y1="15" x2="400" y2="405" />
                  <line x1="450" y1="15" x2="450" y2="405" />
                  <line x1="500" y1="15" x2="500" y2="405" />
                  <line x1="550" y1="15" x2="550" y2="405" />

                  {/* Horizontal lines */}
                  <line x1="15" y1="50" x2="585" y2="50" />
                  <line x1="15" y1="100" x2="585" y2="100" />
                  <line x1="15" y1="150" x2="585" y2="150" />
                  <line x1="15" y1="200" x2="585" y2="200" />
                  <line x1="15" y1="250" x2="585" y2="250" />
                  <line x1="15" y1="300" x2="585" y2="300" />
                  <line x1="15" y1="350" x2="585" y2="350" />
                </g>

                {/* Drafting Borders Frame */}
                <rect 
                  x="15" 
                  y="15" 
                  width="570" 
                  height="390" 
                  fill="none" 
                  stroke="rgba(196, 166, 126, 0.12)" 
                  strokeWidth="1" 
                />
                
                {/* Visual Landscape Elements: Rio Sordo */}
                <g>
                  <path
                    d="M -10,360 Q 150,335 300,370 T 610,345"
                    fill="none"
                    stroke="rgba(196, 166, 126, 0.1)"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  <path
                    d="M -10,360 Q 150,335 300,370 T 610,345"
                    fill="none"
                    stroke="rgba(196, 166, 126, 0.05)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="10, 15"
                  />
                  <text
                    x="290"
                    y="384"
                    fill="rgba(196, 166, 126, 0.25)"
                    className="font-accent text-[8px] uppercase tracking-[0.3em] font-semibold"
                  >
                    Río Sordo (Afluente Natural)
                  </text>
                </g>

                {/* Soccer Field Landmark */}
                <g>
                  <rect
                    x="45"
                    y="55"
                    width="140"
                    height="85"
                    fill="rgba(255, 255, 255, 0.01)"
                    stroke="rgba(196, 166, 126, 0.08)"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                    rx="3"
                  />
                  <line x1="115" y1="55" x2="115" y2="140" stroke="rgba(196, 166, 126, 0.07)" strokeWidth="1" />
                  <circle cx="115" cy="97" r="18" fill="none" stroke="rgba(196, 166, 126, 0.07)" strokeWidth="1" />
                  <text
                    x="115"
                    y="100"
                    textAnchor="middle"
                    fill="rgba(255, 255, 255, 0.2)"
                    className="font-accent text-[8px] uppercase tracking-[0.25em]"
                  >
                    Campo Deportivo
                  </text>
                </g>

                {/* Sugarcane fields area (Cañaverales) */}
                <g opacity="0.12">
                  <text 
                    x="450" 
                    y="65" 
                    fill="var(--color-brand-gold)" 
                    className="font-accent text-[8px] uppercase tracking-widest font-bold"
                  >
                    Zonas de Cañaverales
                  </text>
                  {/* Small plant lines rendering */}
                  <path d="M 460,75 L 460,95 M 460,85 L 454,79 M 460,90 L 466,84" stroke="var(--color-brand-gold)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 490,80 L 490,100 M 490,90 L 484,84 M 490,95 L 496,89" stroke="var(--color-brand-gold)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 520,70 L 520,90 M 520,80 L 514,74 M 520,85 L 526,79" stroke="var(--color-brand-gold)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 550,85 L 550,105 M 550,95 L 544,89 M 550,100 L 556,94" stroke="var(--color-brand-gold)" strokeWidth="1.5" strokeLinecap="round" />
                </g>

                {/* STREET: C. Melchor Ocampo */}
                <g 
                  onMouseEnter={() => setHoveredStreet("Calle Melchor Ocampo • Cruzamiento")}
                  onMouseLeave={() => setHoveredStreet(null)}
                  className="cursor-help"
                >
                  <path
                    d="M 160,110 L 160,340"
                    fill="none"
                    stroke="#161618"
                    strokeWidth="24"
                    strokeLinecap="square"
                  />
                  <path
                    d="M 160,110 L 160,340"
                    fill="none"
                    stroke="rgba(196, 166, 126, 0.12)"
                    strokeWidth="26"
                    strokeLinecap="square"
                  />
                  <text
                    x="160"
                    y="295"
                    fill="rgba(255, 255, 255, 0.35)"
                    textAnchor="middle"
                    transform="rotate(-90 160 295)"
                    className="font-accent text-[7.5px] uppercase tracking-[0.25em] font-semibold pointer-events-none"
                  >
                    Calle Melchor Ocampo
                  </text>
                </g>

                {/* STREET: Callejón Cerrada */}
                <g
                  onMouseEnter={() => setHoveredStreet("Callejón de Descarga • Uso Local")}
                  onMouseLeave={() => setHoveredStreet(null)}
                  className="cursor-help"
                >
                  <path
                    d="M 450,200 L 450,100"
                    fill="none"
                    stroke="#161618"
                    strokeWidth="18"
                    strokeLinecap="square"
                  />
                  <path
                    d="M 450,200 L 450,100"
                    fill="none"
                    stroke="rgba(196, 166, 126, 0.08)"
                    strokeWidth="20"
                    strokeLinecap="square"
                  />
                </g>

                {/* MAIN STREET: Calle Primera de Mayo */}
                <g
                  onMouseEnter={() => setHoveredStreet("Calle Primera de Mayo • Avenida Principal")}
                  onMouseLeave={() => setHoveredStreet(null)}
                  className="cursor-help"
                >
                  {/* Asphalt road base */}
                  <path
                    d="M 15,220 L 585,190"
                    fill="none"
                    stroke="#161618"
                    strokeWidth="32"
                    strokeLinecap="square"
                  />
                  {/* Gold trim lines for border aesthetic */}
                  <path
                    d="M 15,220 L 585,190"
                    fill="none"
                    stroke="rgba(196, 166, 126, 0.18)"
                    strokeWidth="34"
                    strokeLinecap="square"
                  />
                  {/* Lane separators (Gold dashed road marking) */}
                  <path
                    d="M 15,220 L 585,190"
                    fill="none"
                    stroke="var(--color-brand-gold)"
                    strokeWidth="1"
                    strokeDasharray="6,12"
                    opacity="0.35"
                  />
                  
                  {/* Horizontal Street Labels */}
                  <text
                    x="480"
                    y="180"
                    fill="rgba(255, 255, 255, 0.3)"
                    className="font-accent text-[7px] uppercase tracking-widest font-semibold pointer-events-none"
                  >
                    Salida a Coatepec &gt;&gt;
                  </text>
                  <text
                    x="35"
                    y="242"
                    fill="rgba(255, 255, 255, 0.3)"
                    className="font-accent text-[7px] uppercase tracking-widest font-semibold pointer-events-none"
                  >
                    &lt;&lt; Entrada de Mahuixtlán
                  </text>

                  {/* Street Label */}
                  <text
                    x="290"
                    y="201"
                    fill="rgba(255, 255, 255, 0.75)"
                    textAnchor="middle"
                    className="font-accent font-semibold tracking-[0.3em] text-[8.5px] uppercase pointer-events-none"
                  >
                    Calle Primera de Mayo
                  </text>
                </g>

                {/* COMPASS ROSE GADGET */}
                <g transform="translate(535, 75)" className="opacity-75 relative z-20 pointer-events-none">
                  <circle cx="0" cy="0" r="20" fill="none" stroke="var(--color-brand-gold)" strokeWidth="0.75" strokeDasharray="3,4" />
                  <line x1="0" y1="-24" x2="0" y2="24" stroke="var(--color-brand-gold)" strokeWidth="0.5" />
                  <line x1="-24" y1="0" x2="24" y2="0" stroke="var(--color-brand-gold)" strokeWidth="0.5" />
                  
                  {/* Arrow pin needles */}
                  <polygon points="0,-18 -4,0 0,-3" fill="var(--color-brand-gold)" />
                  <polygon points="0,-18 4,0 0,-3" fill="rgba(196, 166, 126, 0.4)" />
                  <polygon points="0,18 -3,0 0,3" fill="rgba(255,255,255,0.15)" />
                  <polygon points="0,18 3,0 0,3" fill="rgba(255,255,255,0.05)" />
                  
                  <text x="0" y="-27" textAnchor="middle" fill="var(--color-brand-gold)" className="font-accent text-[9px] font-bold">N</text>
                  <text x="0" y="32" textAnchor="middle" fill="rgba(255,255,255,0.3)" className="font-accent text-[6px]">S</text>
                </g>

                {/* SCALE MEASURE */}
                <g transform="translate(35, 335)" className="opacity-50">
                  <line x1="0" y1="0" x2="65" y2="0" stroke="var(--color-brand-gold)" strokeWidth="1" />
                  <line x1="0" y1="-3" x2="0" y2="3" stroke="var(--color-brand-gold)" strokeWidth="1" />
                  <line x1="65" y1="-3" x2="65" y2="3" stroke="var(--color-brand-gold)" strokeWidth="1" />
                  <text x="75" y="3" fill="var(--color-brand-gold)" className="font-accent text-[7.5px] tracking-wider uppercase font-semibold">Cerca de 150 metros</text>
                </g>

                {/* INTERACTIVE MARKER 1: Caña Don José Principal */}
                <g
                  onClick={() => setActiveId(1)}
                  className="group cursor-pointer"
                >
                  {/* Base ripple halo if active */}
                  {activeId === 1 && (
                    <circle
                      cx={240}
                      cy={212}
                      r={24}
                      fill="none"
                      stroke="var(--color-brand-gold)"
                      strokeWidth="1.5"
                      className="animate-ping opacity-65"
                      style={{ transformOrigin: "240px 212px" }}
                    />
                  )}
                  {/* Outer static selection boundary */}
                  <circle
                    cx={240}
                    cy={212}
                    r={activeId === 1 ? 16 : 10}
                    className={`fill-none transition-all duration-500 ${
                      activeId === 1 
                        ? "stroke-brand-gold stroke-2 opacity-100" 
                        : "stroke-brand-gold/30 stroke-1 opacity-60 group-hover:opacity-100 group-hover:stroke-brand-gold"
                    }`}
                  />
                  {/* Core Pin Element */}
                  <circle
                    cx={240}
                    cy={212}
                    r={7}
                    className={`transition-all duration-300 ${
                      activeId === 1 
                        ? "fill-brand-gold scale-125" 
                        : "fill-brand-black stroke-brand-gold stroke-2 group-hover:fill-brand-gold/60"
                    }`}
                  />
                  <circle cx={240} cy={212} r={activeId === 1 ? 3 : 1.5} className="fill-brand-cream" />

                  {/* Pointer Line */}
                  <line 
                    x1={240} 
                    y1={212} 
                    x2={240} 
                    y2={165} 
                    stroke={activeId === 1 ? "var(--color-brand-gold)" : "rgba(196, 166, 126, 0.25)"} 
                    strokeWidth="1" 
                    strokeDasharray="2,2"
                    className="transition-colors duration-300"
                  />

                  {/* Styled Stamp Label Above Pin */}
                  <g transform="translate(240, 160)">
                    {/* Backdrop */}
                    <rect
                      x="-70"
                      y="-15"
                      width="140"
                      height="20"
                      rx="2"
                      fill="#0c0c0e"
                      stroke={activeId === 1 ? "var(--color-brand-gold)" : "rgba(255, 255, 255, 0.12)"}
                      strokeWidth="1.25"
                      className="transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                    />
                    {/* Highlighted text indicator */}
                    <text
                      x="0"
                      y="-1"
                      textAnchor="middle"
                      fill={activeId === 1 ? "var(--color-brand-gold)" : "#ffffff"}
                      className="font-accent text-[7.5px] uppercase tracking-[0.2em] font-normal pointer-events-none"
                    >
                      1. Casa Principal
                    </text>
                  </g>
                </g>

                {/* INTERACTIVE MARKER 2: El Despacho Familiar */}
                <g
                  onClick={() => setActiveId(2)}
                  className="group cursor-pointer"
                >
                  {/* Base ripple halo if active */}
                  {activeId === 2 && (
                    <circle
                      cx={390}
                      cy={198}
                      r={24}
                      fill="none"
                      stroke="var(--color-brand-gold)"
                      strokeWidth="1.5"
                      className="animate-ping opacity-65"
                      style={{ transformOrigin: "390px 198px" }}
                    />
                  )}
                  {/* Outer static selection boundary */}
                  <circle
                    cx={390}
                    cy={198}
                    r={activeId === 2 ? 16 : 10}
                    className={`fill-none transition-all duration-500 ${
                      activeId === 2 
                        ? "stroke-brand-gold stroke-2 opacity-100" 
                        : "stroke-brand-gold/30 stroke-1 opacity-60 group-hover:opacity-100 group-hover:stroke-brand-gold"
                    }`}
                  />
                  {/* Core Pin Element */}
                  <circle
                    cx={390}
                    cy={198}
                    r={7}
                    className={`transition-all duration-300 ${
                      activeId === 2 
                        ? "fill-brand-gold scale-125" 
                        : "fill-brand-black stroke-brand-gold stroke-2 group-hover:fill-brand-gold/60"
                    }`}
                  />
                  <circle cx={390} cy={198} r={activeId === 2 ? 3 : 1.5} className="fill-brand-cream" />

                  {/* Pointer Line */}
                  <line 
                    x1={390} 
                    y1={198} 
                    x2={390} 
                    y2={238} 
                    stroke={activeId === 2 ? "var(--color-brand-gold)" : "rgba(196, 166, 126, 0.25)"} 
                    strokeWidth="1" 
                    strokeDasharray="2,2"
                    className="transition-colors duration-300"
                  />

                  {/* Styled Stamp Label Below Pin */}
                  <g transform="translate(390, 248)">
                    {/* Backdrop */}
                    <rect
                      x="-70"
                      y="-13"
                      width="140"
                      height="20"
                      rx="2"
                      fill="#0c0c0e"
                      stroke={activeId === 2 ? "var(--color-brand-gold)" : "rgba(255, 255, 255, 0.12)"}
                      strokeWidth="1.25"
                      className="transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                    />
                    {/* Highlighted text indicator */}
                    <text
                      x="0"
                      y="1"
                      textAnchor="middle"
                      fill={activeId === 2 ? "var(--color-brand-gold)" : "#ffffff"}
                      className="font-accent text-[7.5px] uppercase tracking-[0.2em] font-normal pointer-events-none"
                    >
                      2. El Despacho
                    </text>
                  </g>
                </g>
              </svg>
            </div>

            {/* Micro details panel below the map inside glass */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-brand-brown border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                    <h5 className="font-display text-base text-brand-gold italic">
                      {activeEst.title}
                    </h5>
                  </div>
                  <p className="font-accent text-[11px] text-white/50 leading-tight">
                    Foco activo • {activeEst.address.split("\n")[0]} (Coordenadas: {activeEst.coords})
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto self-stretch md:self-auto">
                  <button
                    onClick={() => handleOpenMap(activeEst.mapLink)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-brand-gold hover:bg-white text-brand-black px-6 py-2.5 font-accent text-[9px] uppercase tracking-widest font-bold transition-all rounded-sm cursor-pointer"
                  >
                    <Navigation size={12} />
                    Abrir en Google Maps
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
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


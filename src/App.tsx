/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CustomizationProvider, useCustomization } from "./components/CustomizationContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import { History } from "./components/History";
import { Location } from "./components/Location";
import { Footer } from "./components/Footer";

function AppContent() {
  const { isEditMode } = useCustomization();

  return (
    <div className="min-h-screen bg-brand-black text-white relative">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Sections */}
      <main>
        {/* Intro Hero */}
        <Hero />
        
        {/* Premium Products Catalog */}
        <Products />

        {/* History / Heritage */}
        <History />

        {/* Our houses / Locations & Contacts */}
        <Location />
      </main>

      {/* Footnote & Policies */}
      <Footer />

      {/* Floating Active Edit Banner */}
      {isEditMode && (
        <div className="fixed bottom-6 left-6 bg-brand-gold text-brand-black px-5 py-3.5 font-accent text-[10px] uppercase tracking-[0.2em] font-bold shadow-2xl rounded-sm z-[90] border border-white/10 flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-black opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-black"></span>
          </span>
          Modo Edición Activo
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CustomizationProvider>
      <AppContent />
    </CustomizationProvider>
  );
}

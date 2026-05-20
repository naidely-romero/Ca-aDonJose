import React, { createContext, useContext, useState, useEffect } from "react";

const DEFAULT_IMAGES = {
  logo: "https://images.unsplash.com/photo-1544022613-e87f17a784d2?q=80&w=200&auto=format&fit=crop",
  hero: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=1200&auto=format&fit=crop", // manual sugarcane harvest workers cutting cane stalks
};

interface CustomizationContextProps {
  images: Record<string, string>;
  updateImage: (id: string, src: string) => void;
  isEditMode: boolean;
  setEditMode: (mode: boolean) => void;
}

const CustomizationContext = createContext<CustomizationContextProps | undefined>(undefined);

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem("canadonjose_images_v5");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Normalize paths or format
        Object.keys(parsed).forEach((key) => {
          if (typeof parsed[key] === "string") {
            if (parsed[key].startsWith("/src/assets/images/")) {
              parsed[key] = parsed[key].replace("/src/assets/images/", "assets/images/");
            }
          }
        });
        // Discard any persistent references to previous hero images
        if (parsed.hero && (
          parsed.hero.includes("1527061011665-3652c757a4d4") ||
          parsed.hero.includes("1571115177098-24ec42ed204d") ||
          parsed.hero.includes("1594026112284-02bb6f3352fe")
        )) {
          delete parsed.hero;
        }
        return { ...DEFAULT_IMAGES, ...parsed };
      } catch {
        return DEFAULT_IMAGES;
      }
    }
    return DEFAULT_IMAGES;
  });

  const [isEditMode, setEditMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("canadonjose_images_v5", JSON.stringify(images));
  }, [images]);

  const updateImage = (id: string, src: string) => {
    setImages((prev) => ({
      ...prev,
      [id]: src,
    }));
  };

  return (
    <CustomizationContext.Provider value={{ images, updateImage, isEditMode, setEditMode }}>
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization() {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error("useCustomization must be used within a CustomizationProvider");
  }
  return context;
}

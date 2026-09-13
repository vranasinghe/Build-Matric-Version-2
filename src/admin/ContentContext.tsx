import React, { createContext, useContext, useState } from "react";
import { SiteContent } from "./types";
import { defaultContent } from "./defaultContent";

const STORAGE_KEY = "buildmetric_site_content_v3";

interface ContentContextType {
  content: SiteContent;
  updateSection: <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => void;
  resetSection: <K extends keyof SiteContent>(section: K) => void;
  resetAll: () => void;
  exportJSON: () => void;
  importJSON: (jsonString: string) => { success: boolean; message: string };
  lastSaved: Date | null;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      let saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        const oldSaved = localStorage.getItem("buildmetric_site_content_v2") || localStorage.getItem("buildmetric_site_content_v1");
        if (oldSaved) {
          const oldParsed = JSON.parse(oldSaved);
          oldParsed.homeCounter = defaultContent.homeCounter;
          saved = JSON.stringify(oldParsed);
          localStorage.setItem(STORAGE_KEY, saved);
        }
      }
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasOldMachinery = parsed.homeCounter?.some((c: any) => 
          c.label?.toLowerCase().includes("machinery")
        );
        // Merge with defaultContent to ensure any newly added keys exist
        return {
          ...defaultContent,
          ...parsed,
          homeCounter: hasOldMachinery ? defaultContent.homeCounter : (parsed.homeCounter || defaultContent.homeCounter),
          header: {
            ...defaultContent.header,
            ...(parsed.header || {}),
            navLinks: parsed.header?.navLinks || defaultContent.header.navLinks,
            languages: parsed.header?.languages || defaultContent.header.languages,
          },
          projectDetails: {
            ...defaultContent.projectDetails,
            ...(parsed.projectDetails || {}),
            specs: parsed.projectDetails?.specs || defaultContent.projectDetails.specs,
          },
        };
      }
    } catch (e) {
      console.error("Failed to load saved site content:", e);
    }
    return defaultContent;
  });

  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const saveToStorage = (updated: SiteContent) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setLastSaved(new Date());
    } catch (e) {
      console.error("Failed to persist content to localStorage:", e);
    }
  };

  const updateSection = <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => {
    setContent((prev) => {
      const updated = {
        ...prev,
        [section]: data,
      };
      saveToStorage(updated);
      return updated;
    });
  };

  const resetSection = <K extends keyof SiteContent>(section: K) => {
    setContent((prev) => {
      const updated = {
        ...prev,
        [section]: defaultContent[section],
      };
      saveToStorage(updated);
      return updated;
    });
  };

  const resetAll = () => {
    setContent(defaultContent);
    try {
      localStorage.removeItem(STORAGE_KEY);
      setLastSaved(new Date());
    } catch (e) {
      console.error("Failed to reset localStorage:", e);
    }
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `buildmetric-content-backup-${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importJSON = (jsonString: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== "object") {
        return { success: false, message: "Invalid JSON format." };
      }
      const merged = { ...defaultContent, ...parsed };
      setContent(merged);
      saveToStorage(merged);
      return { success: true, message: "Content imported successfully!" };
    } catch (e: any) {
      return { success: false, message: e.message || "Failed to parse JSON file." };
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateSection,
        resetSection,
        resetAll,
        exportJSON,
        importJSON,
        lastSaved,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};

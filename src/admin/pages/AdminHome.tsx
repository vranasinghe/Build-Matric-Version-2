import React, { useState } from "react";
import { useContent } from "../ContentContext";
import { HeroSlide, CounterItem, HomeAboutContent, CtaContent } from "../types";

const AdminHome: React.FC = () => {
  const { content, updateSection, resetSection } = useContent();

  const [activeTab, setActiveTab] = useState<"hero" | "counter" | "about" | "cta">("hero");
  const [slides, setSlides] = useState<HeroSlide[]>([...content.homeHero]);
  const [counters, setCounters] = useState<CounterItem[]>([...content.homeCounter]);
  const [homeAbout, setHomeAbout] = useState<HomeAboutContent>({ ...content.homeAbout });
  const [cta, setCta] = useState<CtaContent>({ ...content.ctaFour });
  const [savedNotice, setSavedNotice] = useState(false);

  // Hero Slides CRUD
  const handleSlideChange = (index: number, field: keyof HeroSlide, value: string) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], [field]: value };
    setSlides(updated);
  };

  const addSlide = () => {
    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      subtitle: "Engineering Excellence",
      title: "New High-Impact Construction Project Headline",
      text: "Transforming vision into sustainable reality with certified project commercial and technical excellence.",
      bgImage: "/assets/img/hero/hero_bg_4_1.png",
      btnText: "Discover More",
      btnLink: "/about",
    };
    setSlides([...slides, newSlide]);
  };

  const removeSlide = (index: number) => {
    if (slides.length <= 1) {
      alert("At least one slide must remain in the hero section.");
      return;
    }
    setSlides(slides.filter((_, i) => i !== index));
  };

  // Counter Statistics CRUD
  const handleCounterChange = (index: number, field: keyof CounterItem, value: any) => {
    const updated = [...counters];
    updated[index] = { ...updated[index], [field]: value };
    setCounters(updated);
  };

  const addCounter = () => {
    const newCounter: CounterItem = {
      id: `counter-${Date.now()}`,
      number: 100,
      suffix: "+",
      label: "New Project Metric",
    };
    setCounters([...counters, newCounter]);
  };

  const removeCounter = (index: number) => {
    if (counters.length <= 1) {
      alert("At least one counter item must remain.");
      return;
    }
    setCounters(counters.filter((_, i) => i !== index));
  };

  // About Teaser Checklist CRUD
  const handleChecklistChange = (index: number, value: string) => {
    const updated = [...homeAbout.checklist];
    updated[index] = value;
    setHomeAbout((prev) => ({ ...prev, checklist: updated }));
  };

  const addChecklistItem = () => {
    setHomeAbout((prev) => ({
      ...prev,
      checklist: [...prev.checklist, "New certified engineering milestone or service highlight"],
    }));
  };

  const removeChecklistItem = (index: number) => {
    setHomeAbout((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((_, i) => i !== index),
    }));
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("homeHero", slides);
    updateSection("homeCounter", counters);
    updateSection("homeAbout", homeAbout);
    updateSection("ctaFour", cta);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span style={{ fontSize: "12px", color: "#f15a24", fontWeight: 700, textTransform: "uppercase" }}>
            Header: HOME
          </span>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#001F5B", margin: "4px 0 0 0" }}>
            Home Page Components Editor
          </h2>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Reset all Home Page components to defaults?")) {
                resetSection("homeHero");
                resetSection("homeCounter");
                resetSection("homeAbout");
                resetSection("ctaFour");
                setSlides([...content.homeHero]);
                setCounters([...content.homeCounter]);
                setHomeAbout({ ...content.homeAbout });
                setCta({ ...content.ctaFour });
                setSavedNotice(true);
                setTimeout(() => setSavedNotice(false), 3000);
              }
            }}
            style={{
              padding: "10px 18px",
              background: "#f4f5f7",
              color: "#686e7d",
              border: "1px solid #e7e8ec",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Reset Defaults
          </button>
          <button
            onClick={handleSaveAll}
            style={{
              padding: "10px 24px",
              background: "#001F5B",
              color: "#ffffff",
              border: "none",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <i className="ri-save-line" />
            Save Home Page
          </button>
        </div>
      </div>

      {savedNotice && (
        <div
          style={{
            backgroundColor: "#e3fcef",
            color: "#008060",
            padding: "12px 18px",
            marginBottom: "20px",
            borderLeft: "4px solid #008060",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          ✓ Home components saved successfully! Check the home page to see changes.
        </div>
      )}

      {/* Sub tabs for Home components */}
      <div
        style={{
          display: "flex",
          gap: "2px",
          borderBottom: "2px solid #001F5B",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {[
          { id: "hero", label: `Hero Slider (${slides.length} Slides)`, badge: "CRUD" },
          { id: "counter", label: `Counter Stats (${counters.length} Metrics)`, badge: "CRUD" },
          { id: "about", label: `About Teaser (${homeAbout.checklist.length} Highlights)`, badge: "CRUD" },
          { id: "cta", label: "Renovation CTA Banner", badge: "Live" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: "11px 18px",
              background: activeTab === tab.id ? "#001F5B" : "#f4f5f7",
              color: activeTab === tab.id ? "#ffffff" : "#4a505e",
              border: "none",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            {tab.label}
            <span
              style={{
                fontSize: "10px",
                padding: "2px 5px",
                background: activeTab === tab.id ? "#f15a24" : "#e0e2e8",
                color: activeTab === tab.id ? "#fff" : "#4a505e",
                fontWeight: 700,
              }}
            >
              {tab.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Tab 1: Hero Slides (Full CRUD) */}
      {activeTab === "hero" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <p style={{ fontSize: "14px", color: "#686e7d", margin: 0 }}>
              Manage full slider banner cards displayed on the homepage hero area.
            </p>
            <button
              type="button"
              onClick={addSlide}
              style={{
                padding: "8px 16px",
                background: "#f15a24",
                color: "#ffffff",
                border: "none",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <i className="ri-add-line" /> + Add New Slide [Create]
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e7e8ec",
                  borderLeft: "4px solid #f15a24",
                  padding: "20px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ background: "#001F5B", color: "#ffffff", padding: "3px 8px", fontSize: "11px", fontWeight: 700 }}>
                      Slide #{index + 1}
                    </span>
                    <strong style={{ fontSize: "15px", color: "#001F5B" }}>{slide.title}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSlide(index)}
                    style={{
                      padding: "6px 12px",
                      background: "#feebee",
                      color: "#c62828",
                      border: "1px solid #ffcdd2",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <i className="ri-delete-bin-line" /> Delete Slide [Delete]
                  </button>
                </div>

                <div className="row gy-3">
                  <div className="col-md-4">
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                      Subtitle Badge [Update]
                    </label>
                    <input
                      type="text"
                      value={slide.subtitle}
                      onChange={(e) => handleSlideChange(index, "subtitle", e.target.value)}
                      style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                      Main Headline [Update]
                    </label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => handleSlideChange(index, "title", e.target.value)}
                      style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700 }}
                    />
                  </div>
                  <div className="col-12">
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                      Description Paragraph [Update]
                    </label>
                    <textarea
                      rows={2}
                      value={slide.text}
                      onChange={(e) => handleSlideChange(index, "text", e.target.value)}
                      style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                      Background Image URL [Update]
                    </label>
                    <input
                      type="text"
                      value={slide.bgImage}
                      onChange={(e) => handleSlideChange(index, "bgImage", e.target.value)}
                      style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                    />
                  </div>
                  <div className="col-md-3">
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                      Button Label [Update]
                    </label>
                    <input
                      type="text"
                      value={slide.btnText}
                      onChange={(e) => handleSlideChange(index, "btnText", e.target.value)}
                      style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                    />
                  </div>
                  <div className="col-md-3">
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                      Button Link [Update]
                    </label>
                    <input
                      type="text"
                      value={slide.btnLink}
                      onChange={(e) => handleSlideChange(index, "btnLink", e.target.value)}
                      style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Counter Statistics (Full CRUD) */}
      {activeTab === "counter" && (
        <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px" }}>
            <div>
              <span style={{ background: "#001F5B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
                CRUD
              </span>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", display: "inline-block", margin: 0 }}>
                Home Counter Statistics ({counters.length} Metrics)
              </h3>
            </div>
            <button
              type="button"
              onClick={addCounter}
              style={{
                padding: "7px 15px",
                background: "#f15a24",
                color: "#ffffff",
                border: "none",
                fontWeight: 700,
                fontSize: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <i className="ri-add-line" /> + Add New Metric [Create]
            </button>
          </div>

          <div className="row gy-4">
            {counters.map((c, idx) => (
              <div key={c.id} className="col-md-6">
                <div style={{ background: "#fbfbfc", border: "1px solid #e7e8ec", padding: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#001F5B" }}>
                      Metric #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeCounter(idx)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#c62828",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      <i className="ri-delete-bin-line" /> Delete [Delete]
                    </button>
                  </div>
                  <div className="row gy-2">
                    <div className="col-3">
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                        Prefix (e.g. $)
                      </label>
                      <input
                        type="text"
                        value={c.prefix || ""}
                        placeholder="$"
                        onChange={(e) => handleCounterChange(idx, "prefix", e.target.value)}
                        style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "14px", fontWeight: 700 }}
                      />
                    </div>
                    <div className="col-5">
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                        Number Value [Update]
                      </label>
                      <input
                        type="number"
                        value={c.number}
                        onChange={(e) => handleCounterChange(idx, "number", parseInt(e.target.value) || 0)}
                        style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "14px", fontWeight: 700 }}
                      />
                    </div>
                    <div className="col-4">
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                        Suffix (e.g. +, B+, %)
                      </label>
                      <input
                        type="text"
                        value={c.suffix}
                        onChange={(e) => handleCounterChange(idx, "suffix", e.target.value)}
                        style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "14px", fontWeight: 700 }}
                      />
                    </div>
                    <div className="col-12">
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                        Primary Title / Label [Update]
                      </label>
                      <input
                        type="text"
                        value={c.label}
                        onChange={(e) => handleCounterChange(idx, "label", e.target.value)}
                        style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 600 }}
                      />
                    </div>
                    <div className="col-8">
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                        Consultancy Subtext / Detail
                      </label>
                      <input
                        type="text"
                        value={c.sublabel || ""}
                        placeholder="e.g. Strategic Cost & Commercial Management"
                        onChange={(e) => handleCounterChange(idx, "sublabel", e.target.value)}
                        style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                      />
                    </div>
                    <div className="col-4">
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                        Icon (RemixIcon)
                      </label>
                      <input
                        type="text"
                        value={c.icon || ""}
                        placeholder="ri-funds-line"
                        onChange={(e) => handleCounterChange(idx, "icon", e.target.value)}
                        style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: About Teaser (Full CRUD for Checklist) */}
      {activeTab === "about" && (
        <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
            Homepage About Teaser Section
          </h3>
          <div className="row gy-3 mb-4">
            <div className="col-md-4">
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                Section Tag / Subtitle
              </label>
              <input
                type="text"
                value={homeAbout.subtitle}
                onChange={(e) => setHomeAbout({ ...homeAbout, subtitle: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
              />
            </div>
            <div className="col-md-8">
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                Main Headline
              </label>
              <input
                type="text"
                value={homeAbout.title}
                onChange={(e) => setHomeAbout({ ...homeAbout, title: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700 }}
              />
            </div>
            <div className="col-12">
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                Primary Narrative
              </label>
              <textarea
                rows={3}
                value={homeAbout.desc1}
                onChange={(e) => setHomeAbout({ ...homeAbout, desc1: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
              />
            </div>
            <div className="col-md-6">
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                Years Experience Number
              </label>
              <input
                type="number"
                value={homeAbout.experienceYears}
                onChange={(e) => setHomeAbout({ ...homeAbout, experienceYears: parseInt(e.target.value) || 0 })}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
              />
            </div>
            <div className="col-md-6">
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                Experience Badge Label
              </label>
              <input
                type="text"
                value={homeAbout.experienceLabel}
                onChange={(e) => setHomeAbout({ ...homeAbout, experienceLabel: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
              />
            </div>
          </div>

          {/* Checklist CRUD */}
          <div style={{ borderTop: "1px solid #f0f1f4", paddingTop: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <strong style={{ fontSize: "14px", color: "#001F5B" }}>
                Highlights Checklist ({homeAbout.checklist.length} Points) [CRUD]
              </strong>
              <button
                type="button"
                onClick={addChecklistItem}
                style={{
                  padding: "5px 12px",
                  background: "#001F5B",
                  color: "#fff",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                + Add Point [Create]
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {homeAbout.checklist.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleChecklistChange(i, e.target.value)}
                    style={{ flex: 1, padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                  />
                  <button
                    type="button"
                    onClick={() => removeChecklistItem(i)}
                    style={{
                      padding: "6px 10px",
                      background: "#feebee",
                      color: "#c62828",
                      border: "1px solid #ffcdd2",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    <i className="ri-delete-bin-line" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Renovation CTA */}
      {activeTab === "cta" && (
        <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
            Home Renovation Callout Banner
          </h3>
          <div className="row gy-3">
            <div className="col-md-6">
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                Headline Line 1
              </label>
              <input
                type="text"
                value={cta.title1}
                onChange={(e) => setCta({ ...cta, title1: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700 }}
              />
            </div>
            <div className="col-md-6">
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                Headline Line 2 (Orange Accent)
              </label>
              <input
                type="text"
                value={cta.title2}
                onChange={(e) => setCta({ ...cta, title2: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700, color: "#f15a24" }}
              />
            </div>
            <div className="col-md-6">
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                Button Text
              </label>
              <input
                type="text"
                value={cta.btnText}
                onChange={(e) => setCta({ ...cta, btnText: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
              />
            </div>
            <div className="col-md-6">
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                Button Link
              </label>
              <input
                type="text"
                value={cta.btnLink}
                onChange={(e) => setCta({ ...cta, btnLink: e.target.value })}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;

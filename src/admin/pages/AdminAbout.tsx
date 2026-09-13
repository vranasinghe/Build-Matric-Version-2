import React, { useState } from "react";
import { useContent } from "../ContentContext";
import { AboutPageContent } from "../types";

const AdminAbout: React.FC = () => {
  const { content, updateSection, resetSection } = useContent();
  const [formData, setFormData] = useState<AboutPageContent>({
    ...content.aboutPage,
    whyChooseCards: content.aboutPage.whyChooseCards || [],
    processSteps: content.aboutPage.processSteps || [],
    checklist: content.aboutPage.checklist || [],
  });
  const [savedNotice, setSavedNotice] = useState(false);

  const handleChange = (field: keyof AboutPageContent, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBreadcrumbChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      breadcrumb: {
        ...prev.breadcrumb,
        [field]: value,
      },
    }));
  };

  // Why Choose Us Cards CRUD
  const addWhyChooseCard = () => {
    const newCard = {
      id: `wc-${Date.now()}`,
      title: "Certified Quality Assurance",
      desc: "Comprehensive multi-disciplinary audits and commercial risk mitigations.",
      icon: "/assets/img/icon/about-icon1-1.png",
    };
    setFormData((prev) => ({
      ...prev,
      whyChooseCards: [...prev.whyChooseCards, newCard],
    }));
  };

  const handleWhyChooseChange = (index: number, field: string, value: string) => {
    const updated = [...formData.whyChooseCards];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, whyChooseCards: updated }));
  };

  const removeWhyChooseCard = (index: number) => {
    if (formData.whyChooseCards.length <= 1) {
      alert("At least one Why Choose Us card must remain.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      whyChooseCards: prev.whyChooseCards.filter((_, i) => i !== index),
    }));
  };

  // Checklist CRUD
  const addChecklistItem = () => {
    setFormData((prev) => ({
      ...prev,
      checklist: [...prev.checklist, "New engineering capability point"],
    }));
  };

  const handleChecklistChange = (index: number, value: string) => {
    const updated = [...formData.checklist];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, checklist: updated }));
  };

  const removeChecklistItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((_, i) => i !== index),
    }));
  };

  // Process Steps CRUD
  const addProcessStep = () => {
    const nextNum = (formData.processSteps.length + 1).toString().padStart(2, "0");
    const newStep = {
      id: `step-${Date.now()}`,
      number: nextNum,
      title: "Strategic Milestone Execution",
      desc: "Structured phased delivery adhering strictly to international standards.",
    };
    setFormData((prev) => ({
      ...prev,
      processSteps: [...prev.processSteps, newStep],
    }));
  };

  const handleProcessStepChange = (index: number, field: string, value: string) => {
    const updated = [...formData.processSteps];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, processSteps: updated }));
  };

  const removeProcessStep = (index: number) => {
    if (formData.processSteps.length <= 1) {
      alert("At least one process step must remain.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      processSteps: prev.processSteps.filter((_, i) => i !== index),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("aboutPage", formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Reset About Page to defaults?")) {
      resetSection("aboutPage");
      setFormData({ ...content.aboutPage });
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span style={{ fontSize: "12px", color: "#f15a24", fontWeight: 700, textTransform: "uppercase" }}>
            Header: ABOUT
          </span>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#001F5B", margin: "4px 0 0 0" }}>
            About Page Components Editor
          </h2>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            onClick={handleReset}
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
            type="submit"
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
            Save About Page
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
          ✓ About page components saved successfully! Check the About Us page.
        </div>
      )}

      {/* 1. Breadcrumb */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
          1. Hero Breadcrumb Banner
        </h3>
        <div className="row gy-3">
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Banner Title
            </label>
            <input
              type="text"
              value={formData.breadcrumb.title}
              onChange={(e) => handleBreadcrumbChange("title", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Page Name In Trail
            </label>
            <input
              type="text"
              value={formData.breadcrumb.pageName}
              onChange={(e) => handleBreadcrumbChange("pageName", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
        </div>
      </div>

      {/* 2. Main Company Story */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
          2. Company Story & Experience
        </h3>
        <div className="row gy-3">
          <div className="col-md-4">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Subtitle Tag
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
          <div className="col-md-8">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Headline
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px", fontWeight: 700 }}
            />
          </div>
          <div className="col-12">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Paragraph 1
            </label>
            <textarea
              rows={3}
              value={formData.desc1}
              onChange={(e) => handleChange("desc1", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
          <div className="col-12">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Paragraph 2
            </label>
            <textarea
              rows={3}
              value={formData.desc2}
              onChange={(e) => handleChange("desc2", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Experience Number (e.g. 40)
            </label>
            <input
              type="number"
              value={formData.experienceYears}
              onChange={(e) => handleChange("experienceYears", parseInt(e.target.value) || 0)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Experience Label (e.g. Business Experience)
            </label>
            <input
              type="text"
              value={formData.experienceLabel}
              onChange={(e) => handleChange("experienceLabel", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
        </div>

        {/* Checklist CRUD */}
        <div style={{ borderTop: "1px solid #f0f1f4", paddingTop: "18px", marginTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <strong style={{ fontSize: "14px", color: "#001F5B" }}>
              Key Accomplishments Checklist ({formData.checklist.length} Points) [CRUD]
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
            {formData.checklist.map((item, i) => (
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

      {/* 3. Why Choose Us Section (Full CRUD) */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px" }}>
          <div>
            <span style={{ background: "#001F5B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
              CRUD
            </span>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", display: "inline-block", margin: 0 }}>
              3. Why Choose Us Benefit Cards ({formData.whyChooseCards.length} Cards)
            </h3>
          </div>
          <button
            type="button"
            onClick={addWhyChooseCard}
            style={{
              padding: "7px 15px",
              background: "#f15a24",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <i className="ri-add-line" /> + Add Benefit Card [Create]
          </button>
        </div>

        <div className="row gy-3 mb-4">
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Subtitle
            </label>
            <input
              type="text"
              value={formData.whyChooseSubtitle}
              onChange={(e) => handleChange("whyChooseSubtitle", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Section Title
            </label>
            <input
              type="text"
              value={formData.whyChooseTitle}
              onChange={(e) => handleChange("whyChooseTitle", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px", fontWeight: 700 }}
            />
          </div>
        </div>

        <div className="row gy-3">
          {formData.whyChooseCards.map((card, idx) => (
            <div key={card.id || idx} className="col-md-6">
              <div style={{ background: "#fbfbfc", border: "1px solid #e7e8ec", padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#f15a24" }}>
                    Card #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeWhyChooseCard(idx)}
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
                <div style={{ marginBottom: "8px" }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                    Title [Update]
                  </label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleWhyChooseChange(idx, "title", e.target.value)}
                    style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700 }}
                  />
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                    Icon Asset URL [Update]
                  </label>
                  <input
                    type="text"
                    value={card.icon}
                    onChange={(e) => handleWhyChooseChange(idx, "icon", e.target.value)}
                    style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                    Description [Update]
                  </label>
                  <textarea
                    rows={2}
                    value={card.desc}
                    onChange={(e) => handleWhyChooseChange(idx, "desc", e.target.value)}
                    style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Process Steps (Full CRUD) */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px" }}>
          <div>
            <span style={{ background: "#001F5B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
              CRUD
            </span>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", display: "inline-block", margin: 0 }}>
              4. Working Milestones / Process Steps ({formData.processSteps.length} Steps)
            </h3>
          </div>
          <button
            type="button"
            onClick={addProcessStep}
            style={{
              padding: "7px 15px",
              background: "#001F5B",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <i className="ri-add-line" /> + Add Process Step [Create]
          </button>
        </div>

        <div className="row gy-3">
          {formData.processSteps.map((step, idx) => (
            <div key={step.id || idx} className="col-md-4">
              <div style={{ background: "#fbfbfc", border: "1px solid #e7e8ec", padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#f15a24" }}>
                    Step #{step.number}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeProcessStep(idx)}
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
                <div style={{ marginBottom: "8px" }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                    Number Label [Update]
                  </label>
                  <input
                    type="text"
                    value={step.number}
                    onChange={(e) => handleProcessStepChange(idx, "number", e.target.value)}
                    style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                  />
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                    Step Title [Update]
                  </label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => handleProcessStepChange(idx, "title", e.target.value)}
                    style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700 }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                    Description [Update]
                  </label>
                  <textarea
                    rows={2}
                    value={step.desc}
                    onChange={(e) => handleProcessStepChange(idx, "desc", e.target.value)}
                    style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default AdminAbout;

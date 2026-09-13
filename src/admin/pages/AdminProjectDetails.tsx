import React, { useState } from "react";
import { useContent } from "../ContentContext";
import { ProjectDetailsContent } from "../types";

const AdminProjectDetails: React.FC = () => {
  const { content, updateSection, resetSection } = useContent();
  const [formData, setFormData] = useState<ProjectDetailsContent>({
    ...content.projectDetails,
    specs: content.projectDetails.specs || [
      { id: "spec-1", label: "Client", value: "Rebecca Tylor / Emaar Group" },
      { id: "spec-2", label: "Category", value: "Building & Commercial Infrastructure" },
      { id: "spec-3", label: "Location", value: "Abu Dhabi & Dubai, UAE" },
      { id: "spec-4", label: "Date", value: "12 January, 2024" },
      { id: "spec-5", label: "Status", value: "Completed & Handed Over" },
      { id: "spec-6", label: "Budget", value: "$200,560,000 USD" },
    ],
    featureHighlights: content.projectDetails.featureHighlights || [],
  });
  const [savedNotice, setSavedNotice] = useState(false);

  // Project Specs CRUD
  const addSpec = () => {
    const newSpec = {
      id: `spec-${Date.now()}`,
      label: "New Specification",
      value: "Specification details / parameters",
    };
    setFormData((prev) => ({
      ...prev,
      specs: [...prev.specs, newSpec],
    }));
  };

  const handleSpecChange = (index: number, field: "label" | "value", value: string) => {
    const updated = [...formData.specs];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, specs: updated }));
  };

  const removeSpec = (index: number) => {
    if (formData.specs.length <= 1) {
      alert("At least one specification item must remain.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index),
    }));
  };

  // Feature Highlights CRUD
  const addFeature = () => {
    const newFeature = {
      id: `feat-${Date.now()}`,
      title: "New Technical High-Performance Capability",
      desc: "Robust architectural governance, statutory assurance, and structural engineering integrity.",
      icon: "/assets/img/icon/service-icon1-1.png",
    };
    setFormData((prev) => ({
      ...prev,
      featureHighlights: [...prev.featureHighlights, newFeature],
    }));
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updated = [...formData.featureHighlights];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, featureHighlights: updated }));
  };

  const removeFeature = (index: number) => {
    if (formData.featureHighlights.length <= 1) {
      alert("At least one feature highlight must remain.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      featureHighlights: prev.featureHighlights.filter((_, i) => i !== index),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("projectDetails", formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Reset Project Details to default settings?")) {
      resetSection("projectDetails");
      setFormData({ ...content.projectDetails });
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span style={{ fontSize: "12px", color: "#18A8E0", fontWeight: 700, textTransform: "uppercase" }}>
            Header: PROJECTS &gt; Project Details
          </span>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#101D2B", margin: "4px 0 0 0" }}>
            Project Details Components Editor
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
              background: "#101D2B",
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
            Save Project Details
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
          ✓ Project details updated successfully! Changes are live on the Project Details page.
        </div>
      )}

      {/* 1. Project Specifications Grid (Full CRUD) */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
          <div>
            <span style={{ background: "#101D2B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
              CRUD
            </span>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#101D2B", display: "inline-block", margin: 0 }}>
              1. Project Specifications ({formData.specs.length} Specifications)
            </h3>
          </div>
          <button
            type="button"
            onClick={addSpec}
            style={{
              padding: "7px 15px",
              background: "#18A8E0",
              color: "#fff",
              border: "none",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <i className="ri-add-line" /> + Add Specification [Create]
          </button>
        </div>

        <div className="row gy-3">
          {formData.specs.map((spec, sIdx) => (
            <div key={spec.id || sIdx} className="col-md-6">
              <div style={{ background: "#fbfbfc", border: "1px solid #e7e8ec", padding: "12px 16px", display: "flex", gap: "10px", alignItems: "flex-end" }}>
                <div style={{ width: "130px" }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                    Spec Label [Update]
                  </label>
                  <input
                    type="text"
                    value={spec.label}
                    onChange={(e) => handleSpecChange(sIdx, "label", e.target.value)}
                    style={{ width: "100%", padding: "6px 8px", border: "1px solid #dcdfe5", fontSize: "12px", fontWeight: 700 }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                    Value / Parameter [Update]
                  </label>
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(sIdx, "value", e.target.value)}
                    style={{ width: "100%", padding: "6px 8px", border: "1px solid #dcdfe5", fontSize: "12px" }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeSpec(sIdx)}
                  style={{
                    padding: "7px 10px",
                    background: "#feebee",
                    color: "#c62828",
                    border: "1px solid #ffcdd2",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  title="Remove Spec [Delete]"
                >
                  <i className="ri-delete-bin-line" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Feature Highlights (Full CRUD) */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
          <div>
            <span style={{ background: "#101D2B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
              CRUD
            </span>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#101D2B", display: "inline-block", margin: 0 }}>
              2. Key Feature Highlights ({formData.featureHighlights.length} Highlights)
            </h3>
          </div>
          <button
            type="button"
            onClick={addFeature}
            style={{
              padding: "7px 15px",
              background: "#101D2B",
              color: "#fff",
              border: "none",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <i className="ri-add-line" /> + Add Feature Highlight [Create]
          </button>
        </div>

        <div className="row gy-3">
          {formData.featureHighlights.map((feat, fIdx) => (
            <div key={feat.id || fIdx} className="col-md-6">
              <div style={{ background: "#fbfbfc", border: "1px solid #e7e8ec", padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#18A8E0" }}>
                    Feature #{fIdx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFeature(fIdx)}
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
                    value={feat.title}
                    onChange={(e) => handleFeatureChange(fIdx, "title", e.target.value)}
                    style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700 }}
                  />
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                    Icon Asset URL [Update]
                  </label>
                  <input
                    type="text"
                    value={feat.icon}
                    onChange={(e) => handleFeatureChange(fIdx, "icon", e.target.value)}
                    style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                    Description [Update]
                  </label>
                  <textarea
                    rows={2}
                    value={feat.desc}
                    onChange={(e) => handleFeatureChange(fIdx, "desc", e.target.value)}
                    style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Overview Narrative */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#101D2B", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
          3. Project Narrative & Case Study
        </h3>
        <div className="row gy-3">
          <div className="col-12">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Overview Headline
            </label>
            <input
              type="text"
              value={formData.overviewTitle}
              onChange={(e) => setFormData({ ...formData, overviewTitle: e.target.value })}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px", fontWeight: 700 }}
            />
          </div>
          <div className="col-12">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Overview Text
            </label>
            <textarea
              rows={3}
              value={formData.overviewText}
              onChange={(e) => setFormData({ ...formData, overviewText: e.target.value })}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
          <div className="col-12">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Feature Project Banner Image URL
            </label>
            <input
              type="text"
              value={formData.mainImage}
              onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminProjectDetails;

import React, { useState } from "react";
import { useContent } from "../ContentContext";
import { FooterContent } from "../types";

const AdminFooter: React.FC = () => {
  const { content, updateSection, resetSection } = useContent();
  const [formData, setFormData] = useState<FooterContent>({ ...content.footer });
  const [savedNotice, setSavedNotice] = useState(false);

  const handleChange = (field: keyof FooterContent, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Quick Links CRUD
  const handleLinkChange = (index: number, field: "label" | "url", value: string) => {
    const updated = [...formData.quickLinks];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, quickLinks: updated }));
  };

  const addLink = () => {
    setFormData((prev) => ({
      ...prev,
      quickLinks: [
        ...prev.quickLinks,
        { id: `ql-${Date.now()}`, label: "New Footer Link", url: "/" },
      ],
    }));
  };

  const removeLink = (index: number) => {
    if (formData.quickLinks.length <= 1) {
      alert("At least one footer link must remain.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      quickLinks: prev.quickLinks.filter((_, i) => i !== index),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("footer", formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Reset Footer content to defaults?")) {
      resetSection("footer");
      setFormData({ ...content.footer });
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span style={{ fontSize: "12px", color: "#f15a24", fontWeight: 700, textTransform: "uppercase" }}>
            Footer Section
          </span>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#001F5B", margin: "4px 0 0 0" }}>
            Footer Components Editor
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
            Save Footer
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
          ✓ Footer settings saved successfully! Changes are live across all site footers.
        </div>
      )}

      {/* 1. Quick Navigation Links (Full CRUD) */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
          <div>
            <span style={{ background: "#001F5B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
              CRUD
            </span>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", display: "inline-block", margin: 0 }}>
              1. Footer Navigation Quick Links ({formData.quickLinks.length} Links)
            </h3>
          </div>
          <button
            type="button"
            onClick={addLink}
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
            <i className="ri-add-line" /> + Add Footer Link [Create]
          </button>
        </div>

        <div className="row gy-3">
          {formData.quickLinks.map((link, idx) => (
            <div key={link.id || idx} className="col-md-6">
              <div style={{ background: "#fbfbfc", border: "1px solid #e7e8ec", padding: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#001F5B" }}>
                    Link #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeLink(idx)}
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
                    Link Label [Update]
                  </label>
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => handleLinkChange(idx, "label", e.target.value)}
                    style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                    URL Route [Update]
                  </label>
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => handleLinkChange(idx, "url", e.target.value)}
                    style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Brand Bio & Copyright */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
          2. Bio Summary & Copyright Notice
        </h3>
        <div className="row gy-3">
          <div className="col-12">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Company Bio Summary
            </label>
            <textarea
              rows={3}
              value={formData.aboutText}
              onChange={(e) => handleChange("aboutText", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
          <div className="col-12">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Copyright Notice Text
            </label>
            <input
              type="text"
              value={formData.copyrightText}
              onChange={(e) => handleChange("copyrightText", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
        </div>
      </div>

      {/* 3. Footer Contact Information */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
          3. Footer Direct Contact Info
        </h3>
        <div className="row gy-3">
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Phone
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Working Hours
            </label>
            <input
              type="text"
              value={formData.workingHours}
              onChange={(e) => handleChange("workingHours", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminFooter;

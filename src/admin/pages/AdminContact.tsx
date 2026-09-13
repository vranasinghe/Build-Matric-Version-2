import React, { useState } from "react";
import { useContent } from "../ContentContext";
import { ContactPageContent, OfficeLocation } from "../types";

const AdminContact: React.FC = () => {
  const { content, updateSection, resetSection } = useContent();
  const [formData, setFormData] = useState<ContactPageContent>({ ...content.contactPage });
  const [savedNotice, setSavedNotice] = useState(false);

  // Global Offices CRUD
  const addOffice = () => {
    const newOffice: OfficeLocation = {
      id: `office-${Date.now()}`,
      title: "Singapore Regional Office",
      phone: "+65 6789 0123 / +65 6789 0124",
      email: "singapore@buildmetric.com",
      hours: "Mon - Fri : 8.30am - 6.00pm",
      thumb: "/assets/img/icon/contact-icon1-1.png",
    };
    setFormData((prev) => ({
      ...prev,
      offices: [...prev.offices, newOffice],
    }));
  };

  const handleOfficeChange = (index: number, field: keyof OfficeLocation, value: string) => {
    const updated = [...formData.offices];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, offices: updated }));
  };

  const removeOffice = (index: number) => {
    if (formData.offices.length <= 1) {
      alert("At least one office location must remain.");
      return;
    }
    if (window.confirm(`Delete office "${formData.offices[index].title}"?`)) {
      setFormData((prev) => ({
        ...prev,
        offices: prev.offices.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("contactPage", formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Reset Contact Page to defaults?")) {
      resetSection("contactPage");
      setFormData({ ...content.contactPage });
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span style={{ fontSize: "12px", color: "#f15a24", fontWeight: 700, textTransform: "uppercase" }}>
            Header: CONTACT
          </span>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#001F5B", margin: "4px 0 0 0" }}>
            Contact Page Components Editor
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
            Save Contact Page
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
          ✓ Contact page updated successfully! Check the Contact Us page.
        </div>
      )}

      {/* 1. Global Offices (Full CRUD) */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
          <div>
            <span style={{ background: "#001F5B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
              CRUD
            </span>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", display: "inline-block", margin: 0 }}>
              1. Global Branch Offices ({formData.offices.length} Offices)
            </h3>
          </div>
          <button
            type="button"
            onClick={addOffice}
            style={{
              padding: "7px 15px",
              background: "#f15a24",
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
            <i className="ri-add-line" /> + Add New Office [Create]
          </button>
        </div>

        <div className="row gy-4">
          {formData.offices.map((office, idx) => (
            <div key={office.id || idx} className="col-md-6">
              <div style={{ background: "#fbfbfc", border: "1px solid #e7e8ec", padding: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#001F5B" }}>
                    Office #{idx + 1}: {office.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeOffice(idx)}
                    style={{
                      background: "#feebee",
                      border: "1px solid #ffcdd2",
                      color: "#c62828",
                      padding: "4px 8px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                    title="Delete Office [Delete]"
                  >
                    <i className="ri-delete-bin-line" /> Delete [Delete]
                  </button>
                </div>

                <div className="row gy-2">
                  <div className="col-12">
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                      Office / City Title [Update]
                    </label>
                    <input
                      type="text"
                      value={office.title}
                      onChange={(e) => handleOfficeChange(idx, "title", e.target.value)}
                      style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700 }}
                    />
                  </div>
                  <div className="col-12">
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                      Phone Numbers [Update]
                    </label>
                    <input
                      type="text"
                      value={office.phone}
                      onChange={(e) => handleOfficeChange(idx, "phone", e.target.value)}
                      style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                    />
                  </div>
                  <div className="col-12">
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                      Support Email [Update]
                    </label>
                    <input
                      type="email"
                      value={office.email}
                      onChange={(e) => handleOfficeChange(idx, "email", e.target.value)}
                      style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                    />
                  </div>
                  <div className="col-12">
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                      Working Hours [Update]
                    </label>
                    <input
                      type="text"
                      value={office.hours}
                      onChange={(e) => handleOfficeChange(idx, "hours", e.target.value)}
                      style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Inquiry Form Settings */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
          2. Inquiry Form Content & Map
        </h3>
        <div className="row gy-3">
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Form Subtitle
            </label>
            <input
              type="text"
              value={formData.formSubtitle}
              onChange={(e) => setFormData({ ...formData, formSubtitle: e.target.value })}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Form Main Title
            </label>
            <input
              type="text"
              value={formData.formTitle}
              onChange={(e) => setFormData({ ...formData, formTitle: e.target.value })}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px", fontWeight: 700 }}
            />
          </div>
          <div className="col-12">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Form Description Text
            </label>
            <textarea
              rows={2}
              value={formData.formDesc}
              onChange={(e) => setFormData({ ...formData, formDesc: e.target.value })}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Submit Button Label
            </label>
            <input
              type="text"
              value={formData.submitButtonText}
              onChange={(e) => setFormData({ ...formData, submitButtonText: e.target.value })}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
          <div className="col-12">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Google Maps Iframe Embed URL
            </label>
            <input
              type="text"
              value={formData.mapEmbedUrl}
              onChange={(e) => setFormData({ ...formData, mapEmbedUrl: e.target.value })}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "13px" }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminContact;

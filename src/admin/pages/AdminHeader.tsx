import React, { useState } from "react";
import { useContent } from "../ContentContext";
import { HeaderContent, NavLink, SocialLink, LanguageOption } from "../types";

const AdminHeader: React.FC = () => {
  const { content, updateSection, resetSection } = useContent();
  const [formData, setFormData] = useState<HeaderContent>({
    ...content.header,
    navLinks: content.header.navLinks || [
      { id: "nav-1", label: "Home", url: "/" },
      { id: "nav-2", label: "About Us", url: "/about" },
      { id: "nav-3", label: "Services", url: "/services" },
      { id: "nav-4", label: "Projects", url: "/project" },
      { id: "nav-5", label: "Contact", url: "/contact" },
    ],
    languages: content.header.languages || [
      { id: "lang-en", code: "EN", name: "English" },
      { id: "lang-ar", code: "AR", name: "العربية" },
    ],
  });
  const [savedNotice, setSavedNotice] = useState(false);

  const handleChange = (field: keyof HeaderContent, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Nav Links CRUD
  const addNavLink = () => {
    const newNav: NavLink = {
      id: `nav-${Date.now()}`,
      label: "New Nav Item",
      url: "/",
    };
    setFormData((prev) => ({ ...prev, navLinks: [...prev.navLinks, newNav] }));
  };

  const updateNavLink = (index: number, field: keyof NavLink, value: string) => {
    const updated = [...formData.navLinks];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, navLinks: updated }));
  };

  const deleteNavLink = (index: number) => {
    if (formData.navLinks.length <= 1) {
      alert("At least one navigation link must remain.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      navLinks: prev.navLinks.filter((_, i) => i !== index),
    }));
  };

  // Social Links CRUD
  const addSocial = () => {
    const newSocial: SocialLink = {
      id: `soc-${Date.now()}`,
      icon: "ri-global-line",
      url: "https://",
    };
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, newSocial],
    }));
  };

  const handleSocialChange = (index: number, field: "icon" | "url", value: string) => {
    const updatedSocials = [...formData.socialLinks];
    updatedSocials[index] = { ...updatedSocials[index], [field]: value };
    setFormData((prev) => ({ ...prev, socialLinks: updatedSocials }));
  };

  const removeSocial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  // Languages CRUD
  const addLanguage = () => {
    const newLang: LanguageOption = {
      id: `lang-${Date.now()}`,
      code: "FR",
      name: "Français",
    };
    setFormData((prev) => ({
      ...prev,
      languages: [...prev.languages, newLang],
    }));
  };

  const handleLanguageChange = (index: number, field: keyof LanguageOption, value: string) => {
    const updated = [...formData.languages];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, languages: updated }));
  };

  const removeLanguage = (index: number) => {
    if (formData.languages.length <= 1) {
      alert("At least one language must remain.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("header", formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Reset Header & Topbar to default settings?")) {
      resetSection("header");
      setFormData({
        ...content.header,
        navLinks: content.header.navLinks || [],
        languages: content.header.languages || [],
      });
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span style={{ fontSize: "12px", color: "#f15a24", fontWeight: 700, textTransform: "uppercase" }}>
            Header Section
          </span>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#001F5B", margin: "4px 0 0 0" }}>
            Header & Top Bar Editor
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
            Save Changes
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
          ✓ Header settings saved successfully! Changes are live on the website.
        </div>
      )}

      {/* Group 1: Navigation Menu Items (Full CRUD) */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px" }}>
          <div>
            <span style={{ background: "#001F5B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
              CRUD
            </span>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", display: "inline-block", margin: 0 }}>
              1. Main Navigation Menu Links ({formData.navLinks.length} Items)
            </h3>
          </div>
          <button
            type="button"
            onClick={addNavLink}
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
            <i className="ri-add-line" /> + Add Menu Item [Create]
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {formData.navLinks.map((link, idx) => (
            <div
              key={link.id || idx}
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                background: "#fbfbfc",
                border: "1px solid #e7e8ec",
                padding: "12px 16px",
              }}
            >
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#9aa0ac", width: "25px" }}>
                #{idx + 1}
              </span>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "3px" }}>
                  Menu Label [Update]
                </label>
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => updateNavLink(idx, "label", e.target.value)}
                  style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                />
              </div>
              <div style={{ flex: 2 }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "3px" }}>
                  Destination Route / URL [Update]
                </label>
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => updateNavLink(idx, "url", e.target.value)}
                  style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                />
              </div>
              <div style={{ alignSelf: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => deleteNavLink(idx)}
                  title="Delete Navigation Item [Delete]"
                  style={{
                    padding: "8px 12px",
                    background: "#feebee",
                    color: "#c62828",
                    border: "1px solid #ffcdd2",
                    fontSize: "12px",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  <i className="ri-delete-bin-line" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group 2: Languages Switcher (Full CRUD) */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px" }}>
          <div>
            <span style={{ background: "#001F5B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
              CRUD
            </span>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", display: "inline-block", margin: 0 }}>
              2. Supported Languages Switcher ({formData.languages.length} Languages)
            </h3>
          </div>
          <button
            type="button"
            onClick={addLanguage}
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
            <i className="ri-add-line" /> + Add Language [Create]
          </button>
        </div>

        <div className="row gy-3">
          {formData.languages.map((lang, idx) => (
            <div key={lang.id || idx} className="col-md-6">
              <div style={{ background: "#fbfbfc", border: "1px solid #e7e8ec", padding: "14px", display: "flex", gap: "10px", alignItems: "flex-end" }}>
                <div style={{ width: "80px" }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "3px" }}>
                    Code [Update]
                  </label>
                  <input
                    type="text"
                    value={lang.code}
                    onChange={(e) => handleLanguageChange(idx, "code", e.target.value)}
                    style={{ width: "100%", padding: "7px 8px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700 }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "3px" }}>
                    Display Name [Update]
                  </label>
                  <input
                    type="text"
                    value={lang.name}
                    onChange={(e) => handleLanguageChange(idx, "name", e.target.value)}
                    style={{ width: "100%", padding: "7px 8px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeLanguage(idx)}
                  title="Remove Language [Delete]"
                  style={{
                    padding: "8px 12px",
                    background: "#feebee",
                    color: "#c62828",
                    border: "1px solid #ffcdd2",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  <i className="ri-delete-bin-line" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group 3: Logo & Branding */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
          3. Logo & Branding
        </h3>
        <div className="row gy-3">
          <div className="col-md-8">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Logo Asset Path / URL
            </label>
            <input
              type="text"
              value={formData.logoUrl}
              onChange={(e) => handleChange("logoUrl", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
          <div className="col-md-4">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Logo Preview
            </label>
            <div style={{ background: "#141d30", padding: "10px 15px", display: "inline-block" }}>
              <img src={formData.logoUrl} alt="Logo Preview" style={{ maxHeight: "35px" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Group 4: Top Bar Contact & Location */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
          4. Top Bar Contact & Working Hours
        </h3>
        <div className="row gy-3">
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Working Hours Notice
            </label>
            <input
              type="text"
              value={formData.workingHours}
              onChange={(e) => handleChange("workingHours", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Phone Number
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
              Email Address
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
              Physical Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
        </div>
      </div>

      {/* Group 5: Region Settings */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
          5. Region Settings
        </h3>
        <div className="row gy-3">
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Region Name
            </label>
            <input
              type="text"
              value={formData.regionName}
              onChange={(e) => handleChange("regionName", e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
            />
          </div>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
              Region Flag URL
            </label>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                type="text"
                value={formData.regionFlagUrl}
                onChange={(e) => handleChange("regionFlagUrl", e.target.value)}
                style={{ flex: 1, padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
              />
              <img src={formData.regionFlagUrl} alt="Flag" style={{ width: "24px", height: "auto", border: "1px solid #ccc" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Group 6: Social Media Links (Full CRUD) */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px" }}>
          <div>
            <span style={{ background: "#001F5B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
              CRUD
            </span>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", display: "inline-block", margin: 0 }}>
              6. Social Media Accounts ({formData.socialLinks.length} Platforms)
            </h3>
          </div>
          <button
            type="button"
            onClick={addSocial}
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
            <i className="ri-add-line" /> + Add Platform [Create]
          </button>
        </div>

        <div className="row gy-3">
          {formData.socialLinks.map((soc, idx) => (
            <div key={soc.id || idx} className="col-md-6">
              <div style={{ background: "#fbfbfc", border: "1px solid #e7e8ec", padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <i className={soc.icon} style={{ fontSize: "18px", color: "#f15a24" }} />
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#001F5B" }}>Platform #{idx + 1}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSocial(idx)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#c62828",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    <i className="ri-delete-bin-line" /> Delete
                  </button>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                    Remixicon Icon Class [Update]
                  </label>
                  <input
                    type="text"
                    value={soc.icon}
                    onChange={(e) => handleSocialChange(idx, "icon", e.target.value)}
                    style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                    Target Profile URL [Update]
                  </label>
                  <input
                    type="text"
                    value={soc.url}
                    onChange={(e) => handleSocialChange(idx, "url", e.target.value)}
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

export default AdminHeader;

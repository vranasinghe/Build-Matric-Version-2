import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../ContentContext";
import { ServiceDetailArticle } from "../types";

const AdminServiceDetails: React.FC = () => {
  const { content, updateSection, resetSection } = useContent();
  const [services, setServices] = useState<ServiceDetailArticle[]>([...content.serviceDetailsList]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [savedNotice, setSavedNotice] = useState(false);

  const selectedService = services[selectedIndex] || services[0];

  // Service Articles CRUD
  const addServiceArticle = () => {
    const nextNum = (services.length + 1).toString().padStart(2, "0");
    const newArticle: ServiceDetailArticle = {
      id: `service-tab-${services.length + 1}`,
      num: nextNum,
      tabTitle: `New Advisory Service ${nextNum}`,
      serviceTitle: `Strategic Advisory & Technical Solutions ${nextNum}`,
      thumb: "/assets/img/service/service_details1_1.png",
      desc: "BuildMetric provides multi-disciplinary advisory, precision quantification, and end-to-end commercial governance for complex infrastructure and high-rise developments.",
      subsections: [
        {
          name: "1. Core Strategic Deliverables",
          detail: "Detailed operational framework, baseline scheduling, and statutory compliance protocols.",
        },
        {
          name: "2. Commercial Risk Management",
          detail: "Independent audit governance, risk register compilation, and dispute mitigation strategies.",
        },
      ],
    };
    const updated = [...services, newArticle];
    setServices(updated);
    setSelectedIndex(updated.length - 1);
  };

  const removeServiceArticle = (index: number) => {
    if (services.length <= 1) {
      alert("At least one service detail article must remain.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete service article "${services[index].tabTitle}"?`)) {
      const updated = services.filter((_, i) => i !== index);
      setServices(updated);
      setSelectedIndex(Math.max(0, index - 1));
    }
  };

  const handleFieldChange = (field: keyof ServiceDetailArticle, value: any) => {
    const updated = [...services];
    updated[selectedIndex] = {
      ...updated[selectedIndex],
      [field]: value,
    };
    setServices(updated);
  };

  // Subsections CRUD
  const handleSubsectionChange = (subIndex: number, field: "name" | "detail", value: string) => {
    const updated = [...services];
    const subList = [...updated[selectedIndex].subsections];
    subList[subIndex] = {
      ...subList[subIndex],
      [field]: value,
    };
    updated[selectedIndex].subsections = subList;
    setServices(updated);
  };

  const addSubsection = () => {
    const updated = [...services];
    updated[selectedIndex].subsections.push({
      name: "New Capability or Subsection",
      detail: "Detailed description of this specific technical solution or advisory scope.",
    });
    setServices(updated);
  };

  const removeSubsection = (subIndex: number) => {
    const updated = [...services];
    updated[selectedIndex].subsections = updated[selectedIndex].subsections.filter((_, i) => i !== subIndex);
    setServices(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("serviceDetailsList", services);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Reset all Service Details articles to defaults?")) {
      resetSection("serviceDetailsList");
      setServices([...content.serviceDetailsList]);
      setSelectedIndex(0);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span style={{ fontSize: "12px", color: "#f15a24", fontWeight: 700, textTransform: "uppercase" }}>
            Header: SERVICES &gt; Service Details
          </span>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#001F5B", margin: "4px 0 0 0" }}>
            Service Details Articles Editor
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
            Save All Articles
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
          ✓ Service detail articles updated! Check the live Service Details page.
        </div>
      )}

      {/* Select Service Tab + CRUD Create / Delete Article */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "20px", marginBottom: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <div>
            <span style={{ background: "#001F5B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
              CRUD
            </span>
            <label style={{ fontSize: "14px", fontWeight: 700, color: "#001F5B" }}>
              Select Service Article To Edit ({services.length} Total Articles)
            </label>
          </div>
          <button
            type="button"
            onClick={addServiceArticle}
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
            <i className="ri-add-line" /> + Add New Service Article [Create]
          </button>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "15px" }}>
          {services.map((srv, idx) => (
            <button
              key={srv.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              style={{
                padding: "10px 14px",
                background: selectedIndex === idx ? "#001F5B" : "#f4f5f7",
                color: selectedIndex === idx ? "#ffffff" : "#333333",
                border: selectedIndex === idx ? "2px solid #f15a24" : "1px solid #e0e2e8",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ color: selectedIndex === idx ? "#f15a24" : "#888" }}>{srv.num}</span>
              {srv.tabTitle}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fbfbfc", padding: "10px 15px", border: "1px solid #e7e8ec" }}>
          <span style={{ fontSize: "13px", color: "#686e7d" }}>
            Currently editing Article <strong>#{selectedService.num}: {selectedService.tabTitle}</strong>
          </span>
          <button
            type="button"
            onClick={() => removeServiceArticle(selectedIndex)}
            style={{
              padding: "6px 12px",
              background: "#feebee",
              color: "#c62828",
              border: "1px solid #ffcdd2",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            <i className="ri-delete-bin-line" /> Delete This Article [Delete]
          </button>
        </div>
      </div>

      {/* Editor for Selected Service Article */}
      <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
          Article Details & Content [Update]
        </h3>

        <div className="row gy-3 mb-4">
          <div className="col-md-2">
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
              Number (e.g. 01)
            </label>
            <input
              type="text"
              value={selectedService.num}
              onChange={(e) => handleFieldChange("num", e.target.value)}
              style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700 }}
            />
          </div>
          <div className="col-md-5">
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
              Sidebar Tab Title
            </label>
            <input
              type="text"
              value={selectedService.tabTitle}
              onChange={(e) => handleFieldChange("tabTitle", e.target.value)}
              style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
            />
          </div>
          <div className="col-md-5">
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
              URL Tab Key (e.g. service-tab-1)
            </label>
            <input
              type="text"
              value={selectedService.id}
              onChange={(e) => handleFieldChange("id", e.target.value)}
              style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
            />
          </div>

          <div className="col-md-8">
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
              Main Article Headline
            </label>
            <input
              type="text"
              value={selectedService.serviceTitle}
              onChange={(e) => handleFieldChange("serviceTitle", e.target.value)}
              style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700 }}
            />
          </div>
          <div className="col-md-4">
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
              Feature Image Asset Path
            </label>
            <input
              type="text"
              value={selectedService.thumb}
              onChange={(e) => handleFieldChange("thumb", e.target.value)}
              style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
            />
          </div>

          <div className="col-12">
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
              Executive Overview Paragraph
            </label>
            <textarea
              rows={3}
              value={selectedService.desc}
              onChange={(e) => handleFieldChange("desc", e.target.value)}
              style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
            />
          </div>
        </div>

        {/* Subsections CRUD */}
        <div style={{ borderTop: "1px solid #f0f1f4", paddingTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <div>
              <span style={{ background: "#001F5B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
                CRUD
              </span>
              <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#001F5B", display: "inline-block", margin: 0 }}>
                Subsections & Deliverables ({selectedService.subsections.length} Items)
              </h4>
            </div>
            <button
              type="button"
              onClick={addSubsection}
              style={{
                padding: "6px 14px",
                background: "#001F5B",
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
              <i className="ri-add-line" /> + Add Subsection [Create]
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {selectedService.subsections.map((sub, subIdx) => (
              <div
                key={subIdx}
                style={{
                  background: "#fbfbfc",
                  border: "1px solid #e7e8ec",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#f15a24" }}>
                    Subsection #{subIdx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSubsection(subIdx)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#c62828",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    <i className="ri-delete-bin-line" /> Delete Subsection [Delete]
                  </button>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                    Heading / Title [Update]
                  </label>
                  <input
                    type="text"
                    value={sub.name}
                    onChange={(e) => handleSubsectionChange(subIdx, "name", e.target.value)}
                    style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700 }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                    Detailed Text [Update]
                  </label>
                  <textarea
                    rows={2}
                    value={sub.detail}
                    onChange={(e) => handleSubsectionChange(subIdx, "detail", e.target.value)}
                    style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "#f8f9fa", border: "1px solid #e7e8ec", padding: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "13px", color: "#686e7d" }}>
          Want to test how this service appears on the public website?
        </span>
        <Link
          to={`/service-details?tab=${selectedService.id}`}
          target="_blank"
          style={{
            padding: "8px 16px",
            background: "#f15a24",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "12px",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          View On Public Site <i className="ri-external-link-line" />
        </Link>
      </div>
    </form>
  );
};

export default AdminServiceDetails;

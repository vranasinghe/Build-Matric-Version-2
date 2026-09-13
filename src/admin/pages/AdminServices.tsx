import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useContent } from "../ContentContext";
import { ServicesPageContent, ServiceCardItem, BenefitItem, ServiceDetailArticle } from "../types";

const AdminServices: React.FC = () => {
  const { content, updateSection, resetSection } = useContent();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSubTab = (searchParams.get("subtab") as "main" | "details") || "main";

  const setSubTab = (tab: "main" | "details") => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("subtab", tab);
      return next;
    });
  };

  // State for Main Services Page
  const [pageData, setPageData] = useState<ServicesPageContent>({ ...content.servicesPage });

  // State for Service Details Articles
  const [detailArticles, setDetailArticles] = useState<ServiceDetailArticle[]>([...content.serviceDetailsList]);
  const [selectedDetailIndex, setSelectedDetailIndex] = useState<number>(0);

  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const selectedArticle = detailArticles[selectedDetailIndex] || detailArticles[0];

  // --- Main Services Page Handlers ---
  const handleBreadcrumbChange = (field: string, value: string) => {
    setPageData((prev) => ({
      ...prev,
      breadcrumb: {
        ...prev.breadcrumb,
        [field]: value,
      },
    }));
  };

  const addServiceCard = () => {
    const nextNum = (pageData.services.length + 1).toString().padStart(2, "0");
    const newService: ServiceCardItem = {
      id: `service-${Date.now()}`,
      num: nextNum,
      title: "New Strategic Consultancy Service",
      icon: "/assets/img/icon/service-icon1-1.png",
      items: [
        "Comprehensive preliminary feasibility analysis",
        "Cost baseline development & statutory benchmarking",
        "Risk mitigation and contract administration support",
      ],
    };
    setPageData((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }));
  };

  const handleServiceCardChange = (index: number, field: keyof ServiceCardItem, value: any) => {
    const updated = [...pageData.services];
    updated[index] = { ...updated[index], [field]: value };
    setPageData((prev) => ({ ...prev, services: updated }));
  };

  const removeServiceCard = (index: number) => {
    if (pageData.services.length <= 1) {
      alert("At least one service card must remain.");
      return;
    }
    setPageData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const handleDeliverableChange = (serviceIndex: number, itemIndex: number, value: string) => {
    const updated = [...pageData.services];
    const items = [...updated[serviceIndex].items];
    items[itemIndex] = value;
    updated[serviceIndex].items = items;
    setPageData((prev) => ({ ...prev, services: updated }));
  };

  const addDeliverable = (serviceIndex: number) => {
    const updated = [...pageData.services];
    updated[serviceIndex].items.push("New specialized deliverable item");
    setPageData((prev) => ({ ...prev, services: updated }));
  };

  const removeDeliverable = (serviceIndex: number, itemIndex: number) => {
    const updated = [...pageData.services];
    updated[serviceIndex].items = updated[serviceIndex].items.filter((_, i) => i !== itemIndex);
    setPageData((prev) => ({ ...prev, services: updated }));
  };

  const addBenefit = () => {
    const nextNum = (pageData.benefitsList.length + 1).toString().padStart(2, "0");
    const newBenefit: BenefitItem = {
      id: `benefit-${Date.now()}`,
      number: nextNum,
      title: "Advanced Engineering Delivery",
      desc: "Delivering unparalleled precision through structured commercial governance and certified cost planning.",
    };
    setPageData((prev) => ({
      ...prev,
      benefitsList: [...prev.benefitsList, newBenefit],
    }));
  };

  const handleBenefitChange = (index: number, field: keyof BenefitItem, value: string) => {
    const updated = [...pageData.benefitsList];
    updated[index] = { ...updated[index], [field]: value };
    setPageData((prev) => ({ ...prev, benefitsList: updated }));
  };

  const removeBenefit = (index: number) => {
    if (pageData.benefitsList.length <= 1) {
      alert("At least one benefit item must remain.");
      return;
    }
    setPageData((prev) => ({
      ...prev,
      benefitsList: prev.benefitsList.filter((_, i) => i !== index),
    }));
  };

  // --- Service Details Articles Handlers ---
  const addDetailArticle = () => {
    const nextNum = (detailArticles.length + 1).toString().padStart(2, "0");
    const newArticle: ServiceDetailArticle = {
      id: `service-tab-${detailArticles.length + 1}`,
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
    const updated = [...detailArticles, newArticle];
    setDetailArticles(updated);
    setSelectedDetailIndex(updated.length - 1);
  };

  const removeDetailArticle = (index: number) => {
    if (detailArticles.length <= 1) {
      alert("At least one service detail article must remain.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete service article "${detailArticles[index].tabTitle}"?`)) {
      const updated = detailArticles.filter((_, i) => i !== index);
      setDetailArticles(updated);
      setSelectedDetailIndex(Math.max(0, index - 1));
    }
  };

  const handleDetailFieldChange = (field: keyof ServiceDetailArticle, value: any) => {
    const updated = [...detailArticles];
    updated[selectedDetailIndex] = {
      ...updated[selectedDetailIndex],
      [field]: value,
    };
    setDetailArticles(updated);
  };

  const handleSubsectionChange = (subIndex: number, field: "name" | "detail", value: string) => {
    const updated = [...detailArticles];
    const subList = [...updated[selectedDetailIndex].subsections];
    subList[subIndex] = {
      ...subList[subIndex],
      [field]: value,
    };
    updated[selectedDetailIndex].subsections = subList;
    setDetailArticles(updated);
  };

  const addSubsection = () => {
    const updated = [...detailArticles];
    updated[selectedDetailIndex].subsections.push({
      name: "New Capability or Subsection",
      detail: "Detailed description of this specific technical solution or advisory scope.",
    });
    setDetailArticles(updated);
  };

  const removeSubsection = (subIndex: number) => {
    const updated = [...detailArticles];
    updated[selectedDetailIndex].subsections = updated[selectedDetailIndex].subsections.filter((_, i) => i !== subIndex);
    setDetailArticles(updated);
  };

  // --- Save & Reset ---
  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("servicesPage", pageData);
    updateSection("serviceDetailsList", detailArticles);
    setSavedNotice("✓ Services settings and detail articles saved successfully! Changes are live on the website.");
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Reset all Services components to defaults?")) {
      resetSection("servicesPage");
      resetSection("serviceDetailsList");
      setPageData({ ...content.servicesPage });
      setDetailArticles([...content.serviceDetailsList]);
      setSelectedDetailIndex(0);
      setSavedNotice("✓ Services reset to default content.");
      setTimeout(() => setSavedNotice(null), 3000);
    }
  };

  return (
    <form onSubmit={handleSaveAll}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span style={{ fontSize: "12px", color: "#18A8E0", fontWeight: 700, textTransform: "uppercase" }}>
            Header Section
          </span>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#101D2B", margin: "4px 0 0 0" }}>
            Services Management
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
            Save Services
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
          {savedNotice}
        </div>
      )}

      {/* Internal Sub-Tabs for Services Section */}
      <div
        style={{
          display: "flex",
          gap: "2px",
          borderBottom: "2px solid #101D2B",
          marginBottom: "25px",
        }}
      >
        <button
          type="button"
          onClick={() => setSubTab("main")}
          style={{
            padding: "12px 24px",
            background: activeSubTab === "main" ? "#101D2B" : "#f4f5f7",
            color: activeSubTab === "main" ? "#ffffff" : "#4a505e",
            border: "none",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="ri-tools-line" />
          1. Services Overview & Cards ({pageData.services.length} Cards)
        </button>
        <button
          type="button"
          onClick={() => setSubTab("details")}
          style={{
            padding: "12px 24px",
            background: activeSubTab === "details" ? "#101D2B" : "#f4f5f7",
            color: activeSubTab === "details" ? "#ffffff" : "#4a505e",
            border: "none",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="ri-file-list-3-line" />
          2. Service Details Articles ({detailArticles.length} In-Depth Articles)
        </button>
      </div>

      {/* --- SUB-TAB 1: MAIN SERVICES PAGE --- */}
      {activeSubTab === "main" && (
        <div>
          {/* Breadcrumb Banner */}
          <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#101D2B", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
              Hero Breadcrumb Banner
            </h3>
            <div className="row gy-3">
              <div className="col-md-6">
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Banner Title
                </label>
                <input
                  type="text"
                  value={pageData.breadcrumb.title}
                  onChange={(e) => handleBreadcrumbChange("title", e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
                />
              </div>
              <div className="col-md-6">
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Trail Page Name
                </label>
                <input
                  type="text"
                  value={pageData.breadcrumb.pageName}
                  onChange={(e) => handleBreadcrumbChange("pageName", e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
                />
              </div>
            </div>
          </div>

          {/* Intro Section */}
          <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#101D2B", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
              Section Intro
            </h3>
            <div className="row gy-3">
              <div className="col-md-4">
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Subtitle
                </label>
                <input
                  type="text"
                  value={pageData.subtitle}
                  onChange={(e) => setPageData({ ...pageData, subtitle: e.target.value })}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
                />
              </div>
              <div className="col-md-8">
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Title
                </label>
                <input
                  type="text"
                  value={pageData.title}
                  onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px", fontWeight: 700 }}
                />
              </div>
              <div className="col-12">
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Description Paragraph
                </label>
                <textarea
                  rows={2}
                  value={pageData.description}
                  onChange={(e) => setPageData({ ...pageData, description: e.target.value })}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
                />
              </div>
            </div>
          </div>

          {/* Service Cards (Full CRUD) */}
          <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px" }}>
              <div>
                <span style={{ background: "#101D2B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
                  CRUD
                </span>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#101D2B", display: "inline-block", margin: 0 }}>
                  Service Cards ({pageData.services.length} Cards)
                </h3>
              </div>
              <button
                type="button"
                onClick={addServiceCard}
                style={{
                  padding: "7px 15px",
                  background: "#18A8E0",
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
                <i className="ri-add-line" /> + Add New Service Card [Create]
              </button>
            </div>

            <div className="row gy-4">
              {pageData.services.map((service, sIndex) => (
                <div key={service.id} className="col-md-6">
                  <div
                    style={{
                      background: "#fbfbfc",
                      border: "1px solid #e7e8ec",
                      padding: "18px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span
                            style={{
                              fontFamily: "var(--title-font)",
                              fontSize: "18px",
                              fontWeight: 700,
                              color: "#18A8E0",
                            }}
                          >
                            {service.num}
                          </span>
                          <strong style={{ fontSize: "14px", color: "#101D2B" }}>Card #{sIndex + 1}</strong>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeServiceCard(sIndex)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "#c62828",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          <i className="ri-delete-bin-line" /> Delete Card [Delete]
                        </button>
                      </div>

                      <div className="mb-3">
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                          Service Title [Update]
                        </label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => handleServiceCardChange(sIndex, "title", e.target.value)}
                          style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700 }}
                        />
                      </div>

                      <div className="mb-3">
                        <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                          Icon Asset URL [Update]
                        </label>
                        <input
                          type="text"
                          value={service.icon}
                          onChange={(e) => handleServiceCardChange(sIndex, "icon", e.target.value)}
                          style={{ width: "100%", padding: "7px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                        />
                      </div>

                      {/* Deliverables List CRUD */}
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#101D2B" }}>
                            Deliverables / Scopes ({service.items.length}) [CRUD]
                          </span>
                          <button
                            type="button"
                            onClick={() => addDeliverable(sIndex)}
                            style={{
                              padding: "3px 8px",
                              background: "#101D2B",
                              color: "#ffffff",
                              border: "none",
                              fontSize: "11px",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            + Add [Create]
                          </button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          {service.items.map((item, iIndex) => (
                            <div key={iIndex} style={{ display: "flex", gap: "6px" }}>
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => handleDeliverableChange(sIndex, iIndex, e.target.value)}
                                style={{ flex: 1, padding: "5px 8px", border: "1px solid #dcdfe5", fontSize: "12px" }}
                              />
                              <button
                                type="button"
                                onClick={() => removeDeliverable(sIndex, iIndex)}
                                style={{
                                  padding: "4px 8px",
                                  background: "#feebee",
                                  color: "#c62828",
                                  border: "1px solid #ffcdd2",
                                  cursor: "pointer",
                                  fontSize: "11px",
                                }}
                              >
                                <i className="ri-delete-bin-line" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits (01-04) (Full CRUD) */}
          <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px" }}>
              <div>
                <span style={{ background: "#101D2B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
                  CRUD
                </span>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#101D2B", display: "inline-block", margin: 0 }}>
                  Key Process Benefits ({pageData.benefitsList.length} Steps)
                </h3>
              </div>
              <button
                type="button"
                onClick={addBenefit}
                style={{
                  padding: "7px 15px",
                  background: "#101D2B",
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
                <i className="ri-add-line" /> + Add Benefit Step [Create]
              </button>
            </div>

            <div className="row gy-3 mb-4">
              <div className="col-md-6">
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Benefits Section Subtitle
                </label>
                <input
                  type="text"
                  value={pageData.benefitsSubtitle}
                  onChange={(e) => setPageData({ ...pageData, benefitsSubtitle: e.target.value })}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
                />
              </div>
              <div className="col-md-6">
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Benefits Section Title
                </label>
                <input
                  type="text"
                  value={pageData.benefitsTitle}
                  onChange={(e) => setPageData({ ...pageData, benefitsTitle: e.target.value })}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px", fontWeight: 700 }}
                />
              </div>
            </div>

            <div className="row gy-3">
              {pageData.benefitsList.map((benefit, bIndex) => (
                <div key={benefit.id} className="col-md-6">
                  <div style={{ background: "#fbfbfc", border: "1px solid #e7e8ec", padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span
                        style={{
                          fontFamily: "var(--title-font)",
                          fontSize: "20px",
                          fontWeight: 700,
                          color: "#18A8E0",
                        }}
                      >
                        {benefit.number}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeBenefit(bIndex)}
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
                        Number (e.g. 01, 02) [Update]
                      </label>
                      <input
                        type="text"
                        value={benefit.number}
                        onChange={(e) => handleBenefitChange(bIndex, "number", e.target.value)}
                        style={{ width: "100%", padding: "6px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                      />
                    </div>
                    <div style={{ marginBottom: "8px" }}>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                        Title [Update]
                      </label>
                      <input
                        type="text"
                        value={benefit.title}
                        onChange={(e) => handleBenefitChange(bIndex, "title", e.target.value)}
                        style={{ width: "100%", padding: "6px 10px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700 }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                        Description [Update]
                      </label>
                      <textarea
                        rows={2}
                        value={benefit.desc}
                        onChange={(e) => handleBenefitChange(bIndex, "desc", e.target.value)}
                        style={{ width: "100%", padding: "6px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- SUB-TAB 2: SERVICE DETAILS IN-DEPTH ARTICLES --- */}
      {activeSubTab === "details" && (
        <div>
          {/* Article Selector & Create / Delete Article */}
          <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "20px", marginBottom: "25px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <div>
                <span style={{ background: "#101D2B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
                  CRUD
                </span>
                <label style={{ fontSize: "14px", fontWeight: 700, color: "#101D2B" }}>
                  Select Service Article To Edit ({detailArticles.length} Total Articles)
                </label>
              </div>
              <button
                type="button"
                onClick={addDetailArticle}
                style={{
                  padding: "7px 15px",
                  background: "#18A8E0",
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
              {detailArticles.map((srv, idx) => (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => setSelectedDetailIndex(idx)}
                  style={{
                    padding: "10px 14px",
                    background: selectedDetailIndex === idx ? "#101D2B" : "#f4f5f7",
                    color: selectedDetailIndex === idx ? "#ffffff" : "#333333",
                    border: selectedDetailIndex === idx ? "2px solid #18A8E0" : "1px solid #e0e2e8",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={{ color: selectedDetailIndex === idx ? "#18A8E0" : "#888" }}>{srv.num}</span>
                  {srv.tabTitle}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fbfbfc", padding: "10px 15px", border: "1px solid #e7e8ec" }}>
              <span style={{ fontSize: "13px", color: "#686e7d" }}>
                Currently editing Article <strong>#{selectedArticle.num}: {selectedArticle.tabTitle}</strong>
              </span>
              <button
                type="button"
                onClick={() => removeDetailArticle(selectedDetailIndex)}
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
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#101D2B", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
              Article Details & Content [Update]
            </h3>

            <div className="row gy-3 mb-4">
              <div className="col-md-2">
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                  Number (e.g. 01)
                </label>
                <input
                  type="text"
                  value={selectedArticle.num}
                  onChange={(e) => handleDetailFieldChange("num", e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700 }}
                />
              </div>
              <div className="col-md-5">
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                  Sidebar Tab Title
                </label>
                <input
                  type="text"
                  value={selectedArticle.tabTitle}
                  onChange={(e) => handleDetailFieldChange("tabTitle", e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                />
              </div>
              <div className="col-md-5">
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                  URL Tab Key (e.g. service-tab-1)
                </label>
                <input
                  type="text"
                  value={selectedArticle.id}
                  onChange={(e) => handleDetailFieldChange("id", e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                />
              </div>

              <div className="col-md-8">
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                  Main Article Headline
                </label>
                <input
                  type="text"
                  value={selectedArticle.serviceTitle}
                  onChange={(e) => handleDetailFieldChange("serviceTitle", e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700 }}
                />
              </div>
              <div className="col-md-4">
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                  Feature Image Asset Path
                </label>
                <input
                  type="text"
                  value={selectedArticle.thumb}
                  onChange={(e) => handleDetailFieldChange("thumb", e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                />
              </div>

              <div className="col-12">
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                  Executive Overview Paragraph
                </label>
                <textarea
                  rows={3}
                  value={selectedArticle.desc}
                  onChange={(e) => handleDetailFieldChange("desc", e.target.value)}
                  style={{ width: "100%", padding: "8px 10px", border: "1px solid #dcdfe5", fontSize: "13px" }}
                />
              </div>
            </div>

            {/* Subsections CRUD */}
            <div style={{ borderTop: "1px solid #f0f1f4", paddingTop: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <div>
                  <span style={{ background: "#101D2B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
                    CRUD
                  </span>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#101D2B", display: "inline-block", margin: 0 }}>
                    Subsections & Deliverables ({selectedArticle.subsections.length} Items)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={addSubsection}
                  style={{
                    padding: "6px 14px",
                    background: "#101D2B",
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
                {selectedArticle.subsections.map((sub, subIdx) => (
                  <div
                    key={subIdx}
                    style={{
                      background: "#fbfbfc",
                      border: "1px solid #e7e8ec",
                      padding: "16px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#18A8E0" }}>
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
              to={`/service-details?tab=${selectedArticle.id}`}
              target="_blank"
              style={{
                padding: "8px 16px",
                background: "#18A8E0",
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
        </div>
      )}
    </form>
  );
};

export default AdminServices;

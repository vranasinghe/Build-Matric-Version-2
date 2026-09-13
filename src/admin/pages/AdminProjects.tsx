import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useContent } from "../ContentContext";
import { ProjectsPageContent, ProjectItem, ProjectDetailsContent } from "../types";

const AdminProjects: React.FC = () => {
  const { content, updateSection, resetSection } = useContent();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSubTab = (searchParams.get("subtab") as "showcase" | "details") || "showcase";

  const setSubTab = (tab: "showcase" | "details") => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("subtab", tab);
      return next;
    });
  };

  // State for Projects Showcase Page
  const [projectsData, setProjectsData] = useState<ProjectsPageContent>({ ...content.projectsPage });

  // State for Project Details
  const [detailsData, setDetailsData] = useState<ProjectDetailsContent>({
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

  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // --- Showcase Projects Handlers ---
  const handleBreadcrumbChange = (field: string, value: string) => {
    setProjectsData((prev) => ({
      ...prev,
      breadcrumb: {
        ...prev.breadcrumb,
        [field]: value,
      },
    }));
  };

  const handleProjectChange = (index: number, field: keyof ProjectItem, value: string) => {
    const updated = [...projectsData.projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjectsData((prev) => ({ ...prev, projects: updated }));
  };

  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: "New Landmark Infrastructure / Building Project",
      location: "Abu Dhabi / Dubai, UAE",
      image: "/assets/img/project/project2_1.png",
    };
    setProjectsData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProj],
    }));
  };

  const removeProject = (index: number) => {
    if (projectsData.projects.length <= 1) {
      alert("At least one project should remain.");
      return;
    }
    if (window.confirm(`Delete project "${projectsData.projects[index].title}"?`)) {
      setProjectsData((prev) => ({
        ...prev,
        projects: prev.projects.filter((_, i) => i !== index),
      }));
    }
  };

  // --- Project Details Handlers ---
  const addSpec = () => {
    const newSpec = {
      id: `spec-${Date.now()}`,
      label: "New Specification",
      value: "Specification details / parameters",
    };
    setDetailsData((prev) => ({
      ...prev,
      specs: [...prev.specs, newSpec],
    }));
  };

  const handleSpecChange = (index: number, field: "label" | "value", value: string) => {
    const updated = [...detailsData.specs];
    updated[index] = { ...updated[index], [field]: value };
    setDetailsData((prev) => ({ ...prev, specs: updated }));
  };

  const removeSpec = (index: number) => {
    if (detailsData.specs.length <= 1) {
      alert("At least one specification item must remain.");
      return;
    }
    setDetailsData((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index),
    }));
  };

  const addFeature = () => {
    const newFeature = {
      id: `feat-${Date.now()}`,
      title: "New Technical High-Performance Capability",
      desc: "Robust architectural governance, statutory assurance, and structural engineering integrity.",
      icon: "/assets/img/icon/service-icon1-1.png",
    };
    setDetailsData((prev) => ({
      ...prev,
      featureHighlights: [...prev.featureHighlights, newFeature],
    }));
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updated = [...detailsData.featureHighlights];
    updated[index] = { ...updated[index], [field]: value };
    setDetailsData((prev) => ({ ...prev, featureHighlights: updated }));
  };

  const removeFeature = (index: number) => {
    if (detailsData.featureHighlights.length <= 1) {
      alert("At least one feature highlight must remain.");
      return;
    }
    setDetailsData((prev) => ({
      ...prev,
      featureHighlights: prev.featureHighlights.filter((_, i) => i !== index),
    }));
  };

  // --- Save & Reset ---
  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection("projectsPage", projectsData);
    updateSection("projectDetails", detailsData);
    setSavedNotice("✓ Projects showcase and details updated successfully! Changes are live on the website.");
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Reset all Projects components to defaults?")) {
      resetSection("projectsPage");
      resetSection("projectDetails");
      setProjectsData({ ...content.projectsPage });
      setDetailsData({ ...content.projectDetails });
      setSavedNotice("✓ Projects reset to default content.");
      setTimeout(() => setSavedNotice(null), 3000);
    }
  };

  return (
    <form onSubmit={handleSaveAll}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <span style={{ fontSize: "12px", color: "#f15a24", fontWeight: 700, textTransform: "uppercase" }}>
            Header Section
          </span>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#001F5B", margin: "4px 0 0 0" }}>
            Projects Management
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
            Save Projects
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

      {/* Internal Sub-Tabs for Projects Section */}
      <div
        style={{
          display: "flex",
          gap: "2px",
          borderBottom: "2px solid #001F5B",
          marginBottom: "25px",
        }}
      >
        <button
          type="button"
          onClick={() => setSubTab("showcase")}
          style={{
            padding: "12px 24px",
            background: activeSubTab === "showcase" ? "#001F5B" : "#f4f5f7",
            color: activeSubTab === "showcase" ? "#ffffff" : "#4a505e",
            border: "none",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="ri-building-line" />
          1. Projects Showcase ({projectsData.projects.length} Projects)
        </button>
        <button
          type="button"
          onClick={() => setSubTab("details")}
          style={{
            padding: "12px 24px",
            background: activeSubTab === "details" ? "#001F5B" : "#f4f5f7",
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
          <i className="ri-article-line" />
          2. Project Details & Specs ({detailsData.specs.length} Specs, {detailsData.featureHighlights.length} Features)
        </button>
      </div>

      {/* --- SUB-TAB 1: PROJECTS SHOWCASE --- */}
      {activeSubTab === "showcase" && (
        <div>
          {/* Breadcrumb Banner */}
          <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
              Page Header Banner
            </h3>
            <div className="row gy-3">
              <div className="col-md-6">
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Page Title
                </label>
                <input
                  type="text"
                  value={projectsData.breadcrumb.title}
                  onChange={(e) => handleBreadcrumbChange("title", e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
                />
              </div>
              <div className="col-md-6">
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Banner Background Image URL
                </label>
                <input
                  type="text"
                  value={projectsData.breadcrumb.bgImage}
                  onChange={(e) => handleBreadcrumbChange("bgImage", e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
                />
              </div>
            </div>
          </div>

          {/* Projects Showcase List (Full CRUD) */}
          <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f1f4", paddingBottom: "12px", marginBottom: "18px" }}>
              <div>
                <span style={{ background: "#001F5B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
                  CRUD
                </span>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", display: "inline-block", margin: 0 }}>
                  Showcase Projects Portfolio ({projectsData.projects.length} Projects)
                </h3>
              </div>
              <button
                type="button"
                onClick={addProject}
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
                <i className="ri-add-line" /> + Add New Project [Create]
              </button>
            </div>

            <div className="row gy-4">
              {projectsData.projects.map((proj, index) => (
                <div key={proj.id || index} className="col-lg-6">
                  <div style={{ background: "#fbfbfc", border: "1px solid #e7e8ec", borderLeft: "4px solid #001F5B", padding: "18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ background: "#001F5B", color: "#fff", padding: "2px 6px", fontSize: "11px", fontWeight: 700 }}>
                          #{index + 1}
                        </span>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#001F5B" }}>
                          {proj.title}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeProject(index)}
                        style={{
                          background: "#feebee",
                          border: "1px solid #ffcdd2",
                          color: "#c62828",
                          padding: "4px 8px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                        title="Delete Project [Delete]"
                      >
                        <i className="ri-delete-bin-line" /> Delete [Delete]
                      </button>
                    </div>

                    <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                      <div style={{ width: "90px", height: "70px", overflow: "hidden", background: "#eee", flexShrink: 0, border: "1px solid #ccc" }}>
                        <img src={proj.image} alt={proj.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: "8px" }}>
                          <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                            Project Title [Update]
                          </label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                            style={{ width: "100%", padding: "6px 8px", border: "1px solid #dcdfe5", fontSize: "13px", fontWeight: 700 }}
                          />
                        </div>
                        <div className="row gy-2">
                          <div className="col-6">
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                              Location [Update]
                            </label>
                            <input
                              type="text"
                              value={proj.location}
                              onChange={(e) => handleProjectChange(index, "location", e.target.value)}
                              style={{ width: "100%", padding: "6px 8px", border: "1px solid #dcdfe5", fontSize: "12px" }}
                            />
                          </div>
                          <div className="col-6">
                            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "#686e7d", marginBottom: "2px" }}>
                              Image Asset URL [Update]
                            </label>
                            <input
                              type="text"
                              value={proj.image}
                              onChange={(e) => handleProjectChange(index, "image", e.target.value)}
                              style={{ width: "100%", padding: "6px 8px", border: "1px solid #dcdfe5", fontSize: "12px" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- SUB-TAB 2: PROJECT DETAILS & SPECS --- */}
      {activeSubTab === "details" && (
        <div>
          {/* Specifications Grid (Full CRUD) */}
          <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
              <div>
                <span style={{ background: "#001F5B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
                  CRUD
                </span>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", display: "inline-block", margin: 0 }}>
                  Project Specifications ({detailsData.specs.length} Specifications)
                </h3>
              </div>
              <button
                type="button"
                onClick={addSpec}
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
                <i className="ri-add-line" /> + Add Specification [Create]
              </button>
            </div>

            <div className="row gy-3">
              {detailsData.specs.map((spec, sIdx) => (
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

          {/* Feature Highlights (Full CRUD) */}
          <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
              <div>
                <span style={{ background: "#001F5B", color: "#fff", padding: "3px 8px", fontSize: "11px", fontWeight: 700, marginRight: "8px" }}>
                  CRUD
                </span>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", display: "inline-block", margin: 0 }}>
                  Key Feature Highlights ({detailsData.featureHighlights.length} Highlights)
                </h3>
              </div>
              <button
                type="button"
                onClick={addFeature}
                style={{
                  padding: "7px 15px",
                  background: "#001F5B",
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
              {detailsData.featureHighlights.map((feat, fIdx) => (
                <div key={feat.id || fIdx} className="col-md-6">
                  <div style={{ background: "#fbfbfc", border: "1px solid #e7e8ec", padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#f15a24" }}>
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

          {/* Overview Narrative & Banner */}
          <div style={{ background: "#ffffff", border: "1px solid #e7e8ec", padding: "25px", marginBottom: "25px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#001F5B", borderBottom: "1px solid #f0f1f4", paddingBottom: "10px", marginBottom: "18px" }}>
              Project Narrative & Banner
            </h3>
            <div className="row gy-3">
              <div className="col-12">
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Overview Headline
                </label>
                <input
                  type="text"
                  value={detailsData.overviewTitle}
                  onChange={(e) => setDetailsData({ ...detailsData, overviewTitle: e.target.value })}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px", fontWeight: 700 }}
                />
              </div>
              <div className="col-12">
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Overview Text
                </label>
                <textarea
                  rows={3}
                  value={detailsData.overviewText}
                  onChange={(e) => setDetailsData({ ...detailsData, overviewText: e.target.value })}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
                />
              </div>
              <div className="col-12">
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "5px" }}>
                  Feature Project Banner Image URL
                </label>
                <input
                  type="text"
                  value={detailsData.mainImage}
                  onChange={(e) => setDetailsData({ ...detailsData, mainImage: e.target.value })}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #dcdfe5", fontSize: "14px" }}
                />
              </div>
            </div>
          </div>

          <div style={{ background: "#f8f9fa", border: "1px solid #e7e8ec", padding: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "#686e7d" }}>
              Want to see how project details appear on the public website?
            </span>
            <Link
              to="/project-details"
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
        </div>
      )}
    </form>
  );
};

export default AdminProjects;

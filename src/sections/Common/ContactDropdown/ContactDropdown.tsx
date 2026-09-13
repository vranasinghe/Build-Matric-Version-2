 

import { useState, useEffect, useRef } from "react";

const ContactDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Your Inquiry");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "Quantity Surveying", label: "Quantity Surveying" },
    { value: "Commercial Management", label: "Commercial Management" },
    { value: "Claims & Dispute Support", label: "Claims & Dispute Support" },
    { value: "Project Management / PMC", label: "Project Management / PMC" },
    { value: "Development Advisory", label: "Development Advisory" },
    { value: "Digital Cost Management", label: "Digital Cost Management" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="col-md-6">
      <div className="form-group custom-form-design" ref={dropdownRef}>
        <div
          className={`nice-select wide ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="current">{selected}</span>
          <ul className="list">
            <li
              className={`option ${selected === "Your Inquiry" ? "selected focus" : ""}`}
              onClick={() => setSelected("Your Inquiry")}
            >
              Your Inquiry
            </li>
            {options.map((option, index) => (
              <li
                key={index}
                className={`option ${selected === option.label ? "selected focus" : ""}`}
                onClick={() => setSelected(option.label)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactDropdown;

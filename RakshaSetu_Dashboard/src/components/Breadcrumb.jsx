// src/components/Breadcrumb.jsx
import React from "react";

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav aria-label="breadcrumb" className="mb-3">
      <ol className="breadcrumb">
        {items.map((item, idx) => (
          <li
            key={idx}
            className={`breadcrumb-item ${item.active ? "active" : ""}`}
            aria-current={item.active ? "page" : undefined}
          >
            {item.active ? (
              item.label
            ) : (
              <a href={item.href} className="text-decoration-none">
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

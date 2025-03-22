// src/components/CardStats.jsx
import React from "react";
import {
  HiOutlineBellAlert,
  HiOutlineCheckCircle,
  HiOutlineUsers,
  HiOutlineExclamationCircle,
} from "react-icons/hi2";

const icons = {
  bell: <HiOutlineBellAlert size={24} />,
  check: <HiOutlineCheckCircle size={24} />,
  users: <HiOutlineUsers size={24} />,
  exclamation: <HiOutlineExclamationCircle size={24} />,
};

const CardStats = ({ title, value, percentage, status, iconColor, icon }) => {
  // Determine text color for percentage (red if negative, green if positive)
  const isNegative = percentage.trim().startsWith("-");
  const percentColor = isNegative ? "text-danger" : "text-success";

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        {/* Top: Title + Icon */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{title}</h5>
          <div
            className={`d-inline-flex align-items-center justify-content-center rounded-circle ${iconColor}`}
            style={{ width: "40px", height: "40px" }}
          >
            {icons[icon] || icons["exclamation"]}
          </div>
        </div>
        {/* Value & Percentage */}
        <div className="d-flex align-items-baseline gap-2">
          <span className="h4 mb-0">{value}</span>
          <span className={`${percentColor} fw-semibold`}>{percentage}</span>
          <small className="text-muted">{status}</small>
        </div>
        {/* Placeholder for a small “sparkline” */}
        <div className="progress mt-3" style={{ height: "4px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: "50%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CardStats;

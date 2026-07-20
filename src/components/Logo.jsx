import React from "react";

const Logo = ({ className = "" }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <svg width="34" height="34" viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="16" fill="#142B20" />
      <path
        d="M18 46c0-11 6.5-17 14-17s14 6 14 17"
        stroke="#FAF9F6"
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="32" cy="20" r="5.5" fill="#C59B27" />
    </svg>
    <span className="font-display font-semibold text-2xl tracking-tight text-paper">
      Egoto
    </span>
  </div>
);

export default Logo;

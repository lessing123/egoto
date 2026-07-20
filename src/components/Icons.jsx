import React from "react";

const baseClass = "inline-block w-4 h-4 stroke-current";

export const ChatBubbleIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={`${baseClass} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 9H16M8 13H13" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 5H5C4.44772 5 4 5.44772 4 6V17C4 17.5523 4.44772 18 5 18H7V21L11 18H19C19.5523 18 20 17.5523 20 17V6C20 5.44772 19.5523 5 19 5Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MobileAppIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={`${baseClass} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="3" width="10" height="18" rx="2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 18.5H12.01" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const UssdIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={`${baseClass} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 6H19" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M5 12H19" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M5 18H14" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="17" cy="18" r="1.5" fill="currentColor" />
  </svg>
);

export const CheckIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={`${baseClass} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.5 12.5L11 15L16 9.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChartIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={`${baseClass} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19H20" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M7 15L11 11L14 14L17 9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 3V15" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const SparkleIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={`${baseClass} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3.5L13.5 7.5L17.5 8.5L14.5 11.5L15.5 15.5L12 13.5L8.5 15.5L9.5 11.5L6.5 8.5L10.5 7.5L12 3.5Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MailIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={`${baseClass} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 6L12 13L21 6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LocationIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={`${baseClass} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C12 21 7 14.5 7 10.5C7 7.18629 9.68629 4.5 13 4.5C16.3137 4.5 19 7.18629 19 10.5C19 14.5 14 21 14 21H12Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="13" cy="10.5" r="2.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DocumentIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={`${baseClass} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 3H14L18 7V21H6V3Z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 3V7H18" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const HandshakeIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={`${baseClass} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12L7 16L12 12" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12L17 16L12 12" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 16V20H12" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 16V20H12" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DownloadIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={`${baseClass} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3V15" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 11L12 15L16 11" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 19H19" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const LanguageIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={`${baseClass} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" strokeWidth="1.8" />
    <path d="M2 12h20" strokeWidth="1.8" />
  </svg>
);

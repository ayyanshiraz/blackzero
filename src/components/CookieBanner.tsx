'use client';

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const cookieName = 'blackzeroCookieConsent';
  const expires = 150;
  const mobileBreakpoint = 768; // md breakpoint

  useEffect(() => {
    const consentValue = Cookies.get(cookieName);
    if (consentValue === undefined) {
      setIsVisible(true);
    }

    const checkSize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const handleAccept = () => {
    Cookies.set(cookieName, 'true', { expires });
    setIsVisible(false);
    console.log("Cookie consent accepted.");
  };

  const handleDecline = () => {
    Cookies.set(cookieName, 'false', { expires });
    setIsVisible(false);
    console.log("Cookie consent declined (or banner closed).");
  };

  if (!isVisible) {
    return null;
  }
  
  // --- Dynamic Styles ---

  const bannerStyle: React.CSSProperties = {
    background: "#000000",
    color: "#FFFFFF",
    // More padding top/bottom on mobile for new layout
    paddingTop: isMobile ? "45px" : "18px",
    paddingBottom: isMobile ? "20px" : "18px",
    paddingLeft: isMobile ? "20px" : "25px",
    paddingRight: isMobile ? "20px" : "25px",
    fontSize: "15px",
    zIndex: 1000,
    boxSizing: "border-box",
    lineHeight: "1.4",
    borderTop: "1px solid #333",
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
  };
  
  const contentStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: isMobile ? "center" : "space-between",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? "18px" : "20px", // Gap between text and button group
    margin: "0 auto",
    padding: 0,
    width: "100%",
    maxWidth: "1200px", // Max width for wide screens
    boxSizing: "border-box",
  };

  const textStyle: React.CSSProperties = {
    margin: 0,
    whiteSpace: isMobile ? "normal" : "nowrap",
    overflow: "hidden",
    textOverflow: isMobile ? "clip" : "ellipsis",
    textAlign: isMobile ? "center" : "left",
  };

  // Style for the container of the main "Accept" / "Necessary" buttons
  const buttonGroupStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    flexShrink: 0,
    // Stack buttons vertically and stretch them on mobile
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: isMobile ? 'stretch' : 'center',
    width: isMobile ? '100%' : 'auto',
    justifyContent: 'center',
  };

  // Reusable style for the main CTA buttons
  const mainButtonStyle: React.CSSProperties = {
    background: "#fff",
    color: "#000",
    fontSize: "14px",
    fontWeight: "bold",
    borderRadius: "4px",
    padding: "10px 14px", // Better tap target
    cursor: "pointer",
    border: "none",
    whiteSpace: 'nowrap',
    boxSizing: 'border-box', // Ensure padding doesn't break 100% width
    width: isMobile ? '100%' : 'auto',
  };

  // Style for the "X" close button on DESKTOP
  const desktopCloseButtonStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "28px",
    fontWeight: "bold",
    padding: "0 5px",
    lineHeight: "1",
  };

  // Style for the "X" close button on MOBILE (positioned top-right)
  const mobileCloseButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '12px',
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "24px",
    fontWeight: "bold",
    padding: "5px",
    lineHeight: "1",
    zIndex: 1001, // Ensure it's on top
  };

  return (
    <div style={bannerStyle}>

      {/* --- Mobile-Only Absolute Close Button --- */}
      {isMobile && (
        <button
          onClick={handleDecline}
          aria-label="Close cookie banner"
          style={mobileCloseButtonStyle}
        >
          &times;
        </button>
      )}
      
      <div style={contentStyle}>
        {/* --- Left Block (Text Only) --- */}
        <div style={{ flexGrow: 1, minWidth: 0, overflow: 'hidden' }}>
          <p style={textStyle}>
            We use cookies to enhance your browsing experience and analyze our traffic. Read our{' '}
            <a href="/privacy-policy" style={{ color: "#A0D2DB", textDecoration: 'underline', fontWeight: 'bold' }}>
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* --- Right Block (Main Buttons) --- */}
        <div style={buttonGroupStyle}>
          <button
            onClick={handleAccept}
            style={mainButtonStyle}
          >
            Accept All Cookies
          </button>
          <button
            onClick={handleDecline}
            style={mainButtonStyle}
          >
            Necessary Cookies Only
          </button>
        </div>

        {/* --- Desktop-Only Close Button (in-flow) --- */}
        {!isMobile && (
          <div style={{ flexShrink: 0 }}>
            <button
              onClick={handleDecline}
              aria-label="Close cookie banner"
              style={desktopCloseButtonStyle}
            >
              &times;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
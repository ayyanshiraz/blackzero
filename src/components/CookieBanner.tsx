// src/components/CookieBanner.tsx
'use client';

import React, { useState, useEffect } from 'react';
import CookieConsent from "react-cookie-consent";
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const cookieName = 'blackzeroCookieConsent';
  const expires = 150;

  useEffect(() => {
    const consentValue = Cookies.get(cookieName);
    if (consentValue === undefined) {
      setIsVisible(true);
    }
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

  return (
    <CookieConsent
      location="bottom"
      cookieName={cookieName}
      expires={expires}
      
      // --- Style for the MAIN BANNER (outer container) ---
      style={{
        background: "#000000",
        color: "#FFFFFF",
        paddingTop: "18px",
        paddingBottom: "18px",
        paddingLeft: "25px",
        paddingRight: "25px",
        fontSize: "15px",
        zIndex: 1000,
        boxSizing: "border-box",
        minHeight: "auto", 
        lineHeight: "1.4",
        borderTop: "1px solid #333",
        width: "100%",
      }}
      
      // --- Style for the CONTENT (inner container) ---
      contentStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        gap: "20px", // This gap is now between the text and the button group
        margin: 0,
        padding: 0,
        width: "100%",
        boxSizing: "border-box",
      }}
      
      // Hide library's buttons
      buttonText=""
      buttonStyle={{ display: 'none' }}
      declineButtonStyle={{ display: 'none' }}
      enableDeclineButton={false}
    >
      {/* NOTE: The 'X' button block was removed from here.
      */}

      {/* --- Left Block (Text Only) --- */}
      <div style={{ flexGrow: 1, minWidth: 0, overflow: 'hidden' }}>
        <p style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          We use cookies to enhance your browsing experience and analyze our traffic. Read our{' '}
          <Link href="/privacy-policy" style={{ color: "#A0D2DB", textDecoration: 'underline', fontWeight: 'bold' }}>
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      {/* --- Right Block (All Buttons) --- */}
      <div style={{
        display: 'flex',
        gap: '12px', // This gap will apply between all 3 items
        flexShrink: 0,
        alignItems: 'center'
      }}>
        {/* --- Accept All Button --- */}
        <button
          onClick={handleAccept}
          style={{
            background: "#fff",
            color: "#000",
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "4px",
            padding: "8px 14px",
            cursor: "pointer",
            border: "none",
            whiteSpace: 'nowrap'
          }}
        >
          Accept All Cookies
        </button>

        {/* --- Necessary Only Button --- */}
        <button
          onClick={handleDecline}
          style={{
            background: "#fff",
            color: "#000",
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "4px",
            padding: "8px 14px",
            cursor: "pointer",
            border: "none",
            whiteSpace: 'nowrap'
          }}
        >
          Necessary Cookies Only
        </button>

        {/* --- Close Button (Cross Sign) --- */}
        {/* This was moved here */}
        <div style={{ flexShrink: 0 }}>
          <button
            onClick={handleDecline}
            aria-label="Close cookie banner"
            style={{
              background: "transparent",
              border: "none",
              color: "#fff", // Visible against the black banner
              cursor: "pointer",
              fontSize: "28px",
              fontWeight: "bold",
              padding: "0 5px", // Add a little horizontal padding
              lineHeight: "1",
            }}
          >
            &times;
          </button>
        </div>
        
      </div>
    </CookieConsent>
  );
}
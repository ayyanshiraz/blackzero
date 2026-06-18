<<<<<<< HEAD
// src/components/CookieBanner.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const cookieConsent = localStorage.getItem('cookie_consent');
      // Show banner only if consent has not been recorded yet
      if (cookieConsent === null) {
        setShowBanner(true);
      }
    } catch (error) {
      console.error("Could not access localStorage:", error);
      // Optionally show banner even if localStorage fails, depending on requirements
      // setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('cookie_consent', 'true');
      setShowBanner(false);
    } catch (error) {
       console.error("Could not set item in localStorage:", error);
       // Hide banner anyway for user experience, although consent isn't stored
       setShowBanner(false);
    }
  };

  const handleDismiss = () => {
    try {
      // Store 'false' or another indicator that consent wasn't given or banner was dismissed
      localStorage.setItem('cookie_consent', 'dismissed'); // Changed from 'false'
      setShowBanner(false);
      // Optional: Disable non-essential cookies/scripts here if consent is implicitly denied by dismissal
    } catch (error) {
       console.error("Could not set item in localStorage:", error);
        // Hide banner anyway for user experience
       setShowBanner(false);
    }
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }} // Start fully below
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }} // Exit fully below
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#1E4137] text-white shadow-lg"
          role="region" // Added role for accessibility
          aria-label="Cookie Consent Banner"
        >
           {/* Adjusted padding for responsiveness */}
          <div className="container mx-auto px-4 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 relative">
             {/* Adjusted text size and alignment */}
            <p className="text-xs sm:text-sm text-center sm:text-left flex-grow mb-2 sm:mb-0">
              We use cookies to enhance your browsing experience and analyze our traffic. By clicking “Accept”, you consent to our use of cookies. Read our{' '}
              <a href="/privacy-policy" className="font-semibold underline hover:text-teal-300 transition-colors">
                Privacy Policy
              </a>.
            </p>
            {/* Flex container for button(s) */}
            <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto justify-center sm:justify-end">
              <button
                onClick={handleAccept}
                // Adjusted padding and text size
                className="px-4 py-1.5 sm:px-6 sm:py-2 bg-[#FF6900] text-white text-sm sm:text-base font-bold rounded-lg shadow-md hover:brightness-90 transition-all duration-300"
              >
                Accept
              </button>
               {/* Dismiss button - positioned absolutely within the relative parent */}
              <button
                onClick={handleDismiss}
                aria-label="Dismiss cookie notice"
                 // Adjusted positioning and padding
                className="absolute top-1 right-1 sm:static sm:ml-2 p-1.5 text-gray-300 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/10"
              >
                <X size={18} /> {/* Adjusted icon size */}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
=======
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
>>>>>>> aa0485d (Fix hero section layout and padding)

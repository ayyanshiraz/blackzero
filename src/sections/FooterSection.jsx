"use client";
import { useMediaQuery } from "react-responsive";

const FooterSection = () => {
  const isMobile = useMediaQuery({
    query: `(max-width: 768px)`,
  });

  return (
    <section className={`footer-section`}>
      {/* FIX 1: Replaced fixed height with 'min-h-screen h-auto' so content can breathe */}
      <div className={`min-h-screen h-auto relative md:pt-[15vh] pt-[10vh] flex flex-col justify-between`}>
        
        <div className={`relative z-10 w-full`}>
          <h1 className={`general-title text-center text-white pt-5 pb-10`}>
            BUILDING THE FUTURE
          </h1>
        </div>

        <div className={`flex-center gap-5 relative z-10 md:mt-10 mt-5`}>
          <a href={`https://www.facebook.com/profile.php?id=61560559093444&mibextid=ZbWKwL`} className={`social-btn`}>
            <img src={`/images/facebook.svg`} alt={`Facebook`} />
          </a>
          <a href={`https://www.instagram.com/blackzerofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D`} className={`social-btn`}>
            <img src={`/images/insta2.svg`} alt={`Instagram`} />
          </a>
          <a href={`https://www.linkedin.com/company/black-zerofficial/posts/?feedView=all&viewAsMember=true`} className={`social-btn`}>
            <img src={`/images/linkedin.svg`} alt={`LinkedIn`} />
          </a>
        </div>

        {/* Increased bottom padding slightly to keep it away from the copyright box */}
        <div className={`mt-20 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-white font-paragraph md:text-lg font-medium pb-24`}>
          
          <div className={`flex items-start md:gap-24 gap-10 flex-wrap`}>
            <div className={`flex flex-col`}>
              <p className={`text-light-brown mb-4 font-bold uppercase tracking-wider`}>Services</p>
              <a href={`/services/ai-software-hub`} className={`mb-2 hover:text-light-brown transition-colors`}>AI and Software Hub</a>
              <a href={`/services/data-analytics`} className={`mb-2 hover:text-light-brown transition-colors`}>Data Analytics</a>
              <a href={`/services/advanced-websites`} className={`mb-2 hover:text-light-brown transition-colors`}>Advanced Website and Portal Systems</a>
              <a href={`/services/hybrid-seo`} className={`mb-2 hover:text-light-brown transition-colors`}>Hybrid SEO Services (Traditional + AI)</a>
              <a href={`/services/marketing`} className={`mb-2 hover:text-light-brown transition-colors`}>Marketing</a>
              <a href={`/services/creative-design-and-animation-studio`} className={`mb-2 hover:text-light-brown transition-colors`}>Creative Design and Animation Studio</a>
            </div>

            <div className={`flex flex-col`}>
              <p className={`text-light-brown mb-4 font-bold uppercase tracking-wider`}>Company</p>
              <a href={`/blogs`} className={`mb-2 hover:text-light-brown transition-colors`}>Blogs</a>
              <a href={`/careers`} className={`mb-2 hover:text-light-brown transition-colors`}>Careers</a>
              <a href={`/privacy-policy`} className={`mb-2 hover:text-light-brown transition-colors`}>Privacy Policy</a>
            </div>
          </div>

          <div className={`md:max-w-lg`}>
            <p className={`text-white/80 leading-relaxed`}>
              Subscribe to our newsletter for the latest insights in AI development scalable software and tech industry trends.
            </p>
            <div className={`flex justify-between items-center border-b border-white/30 py-5 md:mt-10`}>
              <input
                type={`email`}
                placeholder={`Enter your work email`}
                className={`w-full placeholder:font-sans placeholder:text-white/40 bg-transparent outline-none`}
              />
              <button>
                <img src={`/images/arrow.svg`} alt={`arrow`} className={`cursor-pointer hover:opacity-70 transition-opacity`} />
              </button>
            </div>
          </div>

        </div>

        {/* FIX 2 & 3: Forced centering with '!justify-center' and removed the Privacy Policy link */}
        <div className={`copyright-box !justify-center w-full mt-auto relative z-20`}>
          <p className={`text-center`}>Copyright © 2026 Black Zero IT Solutions - All Rights Reserved</p>
        </div>

      </div>
    </section>
  );
};

export default FooterSection;
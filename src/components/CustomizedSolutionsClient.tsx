"use client";

import React, { useState, useEffect, useRef } from "react";
import { submitServiceForm } from "@/lib/formSubmissionHelper";

const countryCodes = [
    { iso: `pk`, dial: `+92` },
    { iso: `af`, dial: `+93` }, { iso: `al`, dial: `+355` }, { iso: `dz`, dial: `+213` }, { iso: `ad`, dial: `+376` },
    { iso: `ao`, dial: `+244` }, { iso: `ag`, dial: `+1` }, { iso: `ar`, dial: `+54` }, { iso: `am`, dial: `+374` },
    { iso: `au`, dial: `+61` }, { iso: `at`, dial: `+43` }, { iso: `az`, dial: `+994` }, { iso: `bs`, dial: `+1` },
    { iso: `bh`, dial: `+973` }, { iso: `bd`, dial: `+880` }, { iso: `bb`, dial: `+1` }, { iso: `by`, dial: `+375` },
    { iso: `be`, dial: `+32` }, { iso: `bz`, dial: `+501` }, { iso: `bj`, dial: `+229` }, { iso: `bt`, dial: `+975` },
    { iso: `bo`, dial: `+591` }, { iso: `ba`, dial: `+387` }, { iso: `bw`, dial: `+267` }, { iso: `br`, dial: `+55` },
    { iso: `bn`, dial: `+673` }, { iso: `bg`, dial: `+359` }, { iso: `bf`, dial: `+226` }, { iso: `bi`, dial: `+257` },
    { iso: `kh`, dial: `+855` }, { iso: `cm`, dial: `+237` }, { iso: `ca`, dial: `+1` }, { iso: `cv`, dial: `+238` },
    { iso: `cf`, dial: `+236` }, { iso: `td`, dial: `+235` }, { iso: `cl`, dial: `+56` }, { iso: `cn`, dial: `+86` },
    { iso: `co`, dial: `+57` }, { iso: `km`, dial: `+269` }, { iso: `cg`, dial: `+242` }, { iso: `cd`, dial: `+243` },
    { iso: `cr`, dial: `+506` }, { iso: `hr`, dial: `+385` }, { iso: `cu`, dial: `+53` }, { iso: `cy`, dial: `+357` },
    { iso: `cz`, dial: `+420` }, { iso: `dk`, dial: `+45` }, { iso: `dj`, dial: `+253` }, { iso: `dm`, dial: `+1` },
    { iso: `do`, dial: `+1` }, { iso: `ec`, dial: `+593` }, { iso: `eg`, dial: `+20` }, { iso: `sv`, dial: `+503` },
    { iso: `gq`, dial: `+240` }, { iso: `er`, dial: `+291` }, { iso: `ee`, dial: `+372` }, { iso: `sz`, dial: `+268` },
    { iso: `et`, dial: `+251` }, { iso: `fj`, dial: `+679` }, { iso: `fi`, dial: `+358` }, { iso: `fr`, dial: `+33` },
    { iso: `ga`, dial: `+241` }, { iso: `gm`, dial: `+220` }, { iso: `ge`, dial: `+995` }, { iso: `de`, dial: `+49` },
    { iso: `gh`, dial: `+233` }, { iso: `gr`, dial: `+30` }, { iso: `gd`, dial: `+1` }, { iso: `gt`, dial: `+502` },
    { iso: `gn`, dial: `+224` }, { iso: `gw`, dial: `+245` }, { iso: `gy`, dial: `+592` }, { iso: `ht`, dial: `+509` },
    { iso: `hn`, dial: `+504` }, { iso: `hu`, dial: `+36` }, { iso: `is`, dial: `+354` }, { iso: `in`, dial: `+91` },
    { iso: `id`, dial: `+62` }, { iso: `ir`, dial: `+98` }, { iso: `iq`, dial: `+964` }, { iso: `ie`, dial: `+353` },
    { iso: `il`, dial: `+972` }, { iso: `it`, dial: `+39` }, { iso: `jm`, dial: `+1` }, { iso: `jp`, dial: `+81` },
    { iso: `jo`, dial: `+962` }, { iso: `kz`, dial: `+7` }, { iso: `ke`, dial: `+254` }, { iso: `ki`, dial: `+686` },
    { iso: `kp`, dial: `+850` }, { iso: `kr`, dial: `+82` }, { iso: `kw`, dial: `+965` }, { iso: `kg`, dial: `+996` },
    { iso: `la`, dial: `+856` }, { iso: `lv`, dial: `+371` }, { iso: `lb`, dial: `+961` }, { iso: `ls`, dial: `+266` },
    { iso: `lr`, dial: `+231` }, { iso: `ly`, dial: `+218` }, { iso: `li`, dial: `+423` }, { iso: `lt`, dial: `+370` },
    { iso: `lu`, dial: `+352` }, { iso: `mg`, dial: `+261` }, { iso: `mw`, dial: `+265` }, { iso: `my`, dial: `+60` },
    { iso: `mv`, dial: `+960` }, { iso: `ml`, dial: `+223` }, { iso: `mt`, dial: `+356` }, { iso: `mh`, dial: `+692` },
    { iso: `mr`, dial: `+222` }, { iso: `mu`, dial: `+230` }, { iso: `mx`, dial: `+52` }, { iso: `fm`, dial: `+691` },
    { iso: `md`, dial: `+373` }, { iso: `mc`, dial: `+377` }, { iso: `mn`, dial: `+976` }, { iso: `me`, dial: `+382` },
    { iso: `ma`, dial: `+212` }, { iso: `mz`, dial: `+258` }, { iso: `mm`, dial: `+95` }, { iso: `na`, dial: `+264` },
    { iso: `nr`, dial: `+674` }, { iso: `np`, dial: `+977` }, { iso: `nl`, dial: `+31` }, { iso: `nz`, dial: `+64` },
    { iso: `ni`, dial: `+505` }, { iso: `ne`, dial: `+227` }, { iso: `ng`, dial: `+234` }, { iso: `mk`, dial: `+389` },
    { iso: `no`, dial: `+47` }, { iso: `om`, dial: `+968` }, { iso: `pw`, dial: `+680` }, { iso: `pa`, dial: `+507` }, 
    { iso: `pg`, dial: `+675` }, { iso: `py`, dial: `+595` }, { iso: `pe`, dial: `+51` }, { iso: `ph`, dial: `+63` },
    { iso: `pl`, dial: `+48` }, { iso: `pt`, dial: `+351` }, { iso: `qa`, dial: `+974` }, { iso: `ro`, dial: `+40` },
    { iso: `ru`, dial: `+7` }, { iso: `rw`, dial: `+250` }, { iso: `kn`, dial: `+1` }, { iso: `lc`, dial: `+1` },
    { iso: `vc`, dial: `+1` }, { iso: `ws`, dial: `+685` }, { iso: `sm`, dial: `+378` }, { iso: `st`, dial: `+239` },
    { iso: `sa`, dial: `+966` }, { iso: `sn`, dial: `+221` }, { iso: `rs`, dial: `+381` }, { iso: `sc`, dial: `+248` },
    { iso: `sl`, dial: `+232` }, { iso: `sg`, dial: `+65` }, { iso: `sk`, dial: `+421` }, { iso: `si`, dial: `+386` },
    { iso: `sb`, dial: `+677` }, { iso: `so`, dial: `+252` }, { iso: `za`, dial: `+27` }, { iso: `ss`, dial: `+211` },
    { iso: `es`, dial: `+34` }, { iso: `lk`, dial: `+94` }, { iso: `sd`, dial: `+249` }, { iso: `sr`, dial: `+597` },
    { iso: `se`, dial: `+46` }, { iso: `ch`, dial: `+41` }, { iso: `sy`, dial: `+963` }, { iso: `tj`, dial: `+992` },
    { iso: `tz`, dial: `+255` }, { iso: `th`, dial: `+66` }, { iso: `tl`, dial: `+670` }, { iso: `tg`, dial: `+228` },
    { iso: `to`, dial: `+676` }, { iso: `tt`, dial: `+1` }, { iso: `tn`, dial: `+216` }, { iso: `tr`, dial: `+90` },
    { iso: `tm`, dial: `+993` }, { iso: `tv`, dial: `+688` }, { iso: `ug`, dial: `+256` }, { iso: `ua`, dial: `+380` },
    { iso: `ae`, dial: `+971` }, { iso: `gb`, dial: `+44` }, { iso: `us`, dial: `+1` }, { iso: `uy`, dial: `+598` },
    { iso: `uz`, dial: `+998` }, { iso: `vu`, dial: `+678` }, { iso: `va`, dial: `+379` }, { iso: `ve`, dial: `+58` },
    { iso: `vn`, dial: `+84` }, { iso: `ye`, dial: `+967` }, { iso: `zm`, dial: `+260` }, { iso: `zw`, dial: `+263` }
];

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function CustomizedSolutionsClient() {
  const [formData, setFormData] = useState({
    fullName: ``,
    email: ``,
    phone: ``,
    companyName: ``,
    businessType: ``,
    needs: ``,
    budget: ``,
    timeline: ``,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: ``, text: `` });

  // CTA Typing Animation States
  const fullCtaText = `Let us Build Something That Does Not Exist Yet`;
  const [displayedText, setDisplayedText] = useState(``);
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  const ctaRef = useRef<HTMLHeadingElement>(null);
  
  // Video Ref
  const videoRef = useRef<HTMLVideoElement>(null);

  // Observer for Build Cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(`animate-in`);
          } else {
            entry.target.classList.remove(`animate-in`);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll(`.build-card`);
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  // Observer for CTA Typing Effect
  useEffect(() => {
    const ctaObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsCtaVisible(true);
        } else {
          setIsCtaVisible(false);
          setDisplayedText(``); // Reset text when scrolled out of view
        }
      },
      { threshold: 0.5 }
    );

    if (ctaRef.current) {
      ctaObserver.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) ctaObserver.unobserve(ctaRef.current);
    };
  }, []);

  // Observer for Video Autoplay
  useEffect(() => {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch((error) => {
              console.log(`Autoplay prevented: `, error);
            });
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.5 } // Plays when 50% of the video is visible
    );

    if (videoRef.current) {
      videoObserver.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) videoObserver.unobserve(videoRef.current);
    };
  }, []);

  // Typing Interval Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isCtaVisible) {
      let i = 0;
      interval = setInterval(() => {
        if (i <= fullCtaText.length) {
          setDisplayedText(fullCtaText.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Adjust speed here (lower is faster)
    }
    return () => clearInterval(interval);
  }, [isCtaVisible, fullCtaText]);

  // Click outside listener for phone dropdown
  useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
              setIsDropdownOpen(false);
          }
      }
      document.addEventListener(`mousedown`, handleClickOutside);
      return () => document.removeEventListener(`mousedown`, handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof formData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.fullName) newErrors.fullName = `Full name is required`;
    if (!formData.email) newErrors.email = `Email is required`;
    else if (!validateEmail(formData.email)) newErrors.email = `Email is invalid`;
    if (!formData.companyName) newErrors.companyName = `Company name is required`;
    if (!formData.businessType) newErrors.businessType = `Business type is required`;
    if (!formData.needs) newErrors.needs = `Please describe your needs`;
    if (!formData.budget) newErrors.budget = `Budget range is required`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatusMessage({ type: ``, text: `` });

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        subject: `Custom Solutions Request - ${formData.companyName}`,
        message: `
Company: ${formData.companyName}
Phone: ${formData.phone ? `${selectedCountry.dial} ${formData.phone}` : `Not provided`}
Business Type: ${formData.businessType}
Budget: ${formData.budget}
Timeline: ${formData.timeline || `Not specified`}

Requirements:
${formData.needs}
        `.trim(),
        serviceName: `Customized Solutions`,
      };

      const result = await submitServiceForm(payload);

      if (!result.success) {
        setStatusMessage({ type: `error`, text: result.message });
        return;
      }

      setStatusMessage({ type: `success`, text: `Your request has been sent successfully! We will contact you shortly.` });
      setFormData({
        fullName: ``,
        email: ``,
        phone: ``,
        companyName: ``,
        businessType: ``,
        needs: ``,
        budget: ``,
        timeline: ``,
      });
    } catch (error) {
      if (error instanceof Error) {
        setStatusMessage({ type: `error`, text: error.message });
      } else {
        setStatusMessage({ type: `error`, text: `An unknown error occurred.` });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 w-full max-w-[100vw] overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 px-4 md:px-8 lg:px-20">
        <img 
          src="/customized-solutions-hero.webp" 
          alt="Customized Solutions Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-6 animate-fade-in drop-shadow-2xl">
            <div className="inline-block">
              <div className="px-4 py-2 border border-gray-700 rounded-full text-sm font-light tracking-widest text-gray-300">
                PREMIUM SOLUTIONS
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight break-words">
              Customized
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">
                Solutions
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-2xl text-gray-400 font-light max-w-3xl mx-auto mt-4">
              Built specifically for your business. No templates. No limits. Only pure, elite engineering.
            </p>
            
            <div className="pt-8">
              <a href="#request-form" className="inline-block px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95">
                Request a Custom Build
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE BUILD ===== */}
      <section className="py-28 px-4 md:px-8 lg:px-20 border-t border-gray-200 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-20 text-center tracking-tighter text-black">
            What We Build
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: `Custom Digital Systems`,
                description: `Bespoke software solutions engineered from the ground up for your unique workflow and business logic.`,
              },
              {
                title: `Business Automation`,
                description: `Streamline operations, eliminate manual tasks, and scale efficiency with intelligent automation layers.`,
              },
              {
                title: `Smart Operations Setup`,
                description: `Infrastructure designed for precision: dashboards, analytics, and real-time insights tailored to your metrics.`,
              },
              {
                title: `Scalable Infrastructure`,
                description: `Enterprise-grade systems built to grow with your business, handling complexity without compromise.`,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group p-8 bg-black border border-gray-800 rounded-lg card-hover-effect build-card"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="text-4xl font-black text-gray-700 mb-4 transition-colors">
                  0{idx + 1}
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight text-white">{item.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section className="py-28 px-4 md:px-8 lg:px-20 border-t border-gray-800 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-20 text-center tracking-tighter">
            The Process
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[`Discovery`, `Strategy`, `Execution`].map((step, idx) => (
              <div key={idx} className="relative process-step">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full border-2 border-gray-700 flex items-center justify-center font-bold text-lg shrink-0">
                      {idx + 1}
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight relative whitespace-nowrap">
                      {step}
                      {idx < 2 && (
                        <div className="hidden md:block absolute top-1/2 left-full w-24 lg:w-32 h-0.5 bg-gradient-to-r from-gray-700 to-transparent transform -translate-y-1/2 ml-6"></div>
                      )}
                    </h3>
                  </div>
                  <p className="text-gray-400 font-light ml-20">
                    {idx === 0 && `Deep dive into your business goals, challenges, and vision for the future.`}
                    {idx === 1 && `Architect the perfect solution with precision planning and technical roadmapping.`}
                    {idx === 2 && `Build, test, and deploy with excellence. We ship it right, every time.`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VIDEO SECTION ===== */}
      <section className="py-28 px-4 md:px-8 lg:px-20 border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black">
                Future of Digital Growth
              </h2>
              <p className="text-gray-600 font-light text-lg">
                A world where technology powers every move
              </p>
            </div>
            
            <div className="relative group rounded-2xl overflow-hidden border border-gray-300 hover:border-gray-400 transition-all duration-300 max-w-3xl mx-auto shadow-2xl">
              <video 
                ref={videoRef}
                className="w-full h-auto object-contain bg-black" 
                controls
                muted
                playsInline
                poster="/video-poster.jpg"
              >
                <source src="/custom-build-process.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            <p className="text-center text-gray-600 text-sm font-light">
              Featuring AI-powered SEO and Interactive 3D Solutions
            </p>
          </div>
        </div>
      </section>

      {/* ===== CUSTOM REQUEST FORM SECTION ===== */}
      <section id="request-form" className="py-28 px-4 md:px-8 lg:px-20 border-t border-gray-800">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter shimmer-text">
              Request Your Custom Build
            </h2>
            <p className="text-gray-400 font-light text-lg">
              Tell us about your vision. We will craft the perfect solution.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Name & Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`w-full px-4 py-3 bg-white border rounded-lg transition-all duration-200 text-black placeholder-gray-400 focus:outline-none ${
                    errors.fullName
                      ? `border-red-500 focus:border-red-600`
                      : `border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-200`
                  }`}
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className={`w-full px-4 py-3 bg-white border rounded-lg transition-all duration-200 text-black placeholder-gray-400 focus:outline-none ${
                    errors.email
                      ? `border-red-500 focus:border-red-600`
                      : `border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-200`
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>
            </div>

            {/* Row 1.5: Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Phone Number
              </label>
              <div ref={dropdownRef} className={`flex w-full bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-1 focus-within:ring-gray-400 focus-within:border-gray-400 relative`}>
                <div
                    className={`flex items-center pl-3 pr-3 py-3 bg-transparent text-black border-r border-gray-300 cursor-pointer sm:text-sm hover:bg-gray-50 transition-colors`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <img src={`https://flagcdn.com/w20/${selectedCountry.iso}.png`} alt={selectedCountry.iso} className={`w-5 h-auto mr-2 shadow-sm`} />
                    <span className={`mr-2 font-medium text-black`}>{selectedCountry.dial}</span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}><path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={`2`} d={`M19 9l-7 7-7-7`}></path></svg>
                </div>

                {isDropdownOpen && (
                    <ul className={`absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-xl z-50 py-1`}>
                        {countryCodes.map((c, i) => (
                            <li
                                key={i}
                                className={`flex items-center px-4 py-2.5 cursor-pointer hover:bg-gray-50 text-black sm:text-sm transition-colors`}
                                onClick={() => {
                                    setSelectedCountry(c);
                                    setIsDropdownOpen(false);
                                }}
                            >
                                <img src={`https://flagcdn.com/w20/${c.iso}.png`} alt={c.iso} className={`w-5 h-auto mr-3 shadow-sm`} />
                                <span className={`font-medium w-12 text-black`}>{c.dial}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <input
                    type={`tel`}
                    name={`phone`}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={`Enter your phone number`}
                    className={`block w-full px-3 py-3 bg-transparent outline-none text-black placeholder-gray-400 sm:text-sm rounded-r-lg`}
                />
              </div>
            </div>

            {/* Row 2: Company & Business Type */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your company"
                  className={`w-full px-4 py-3 bg-white border rounded-lg transition-all duration-200 text-black placeholder-gray-400 focus:outline-none ${
                    errors.companyName
                      ? `border-red-500 focus:border-red-600`
                      : `border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-200`
                  }`}
                />
                {errors.companyName && <p className="mt-1 text-sm text-red-400">{errors.companyName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                  Business Type *
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border rounded-lg transition-all duration-200 text-black placeholder-gray-400 focus:outline-none ${
                    errors.businessType
                      ? `border-red-500 focus:border-red-600`
                      : `border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-200`
                  }`}
                >
                  <option value="">Select an option</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
                {errors.businessType && <p className="mt-1 text-sm text-red-400">{errors.businessType}</p>}
              </div>
            </div>

            {/* Row 3: Needs (textarea) */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                What Do You Need? *
              </label>
              <textarea
                name="needs"
                value={formData.needs}
                onChange={handleChange}
                placeholder="Describe your project, challenges, and goals..."
                rows={5}
                className={`w-full px-4 py-3 bg-white border rounded-lg transition-all duration-200 text-black placeholder-gray-400 focus:outline-none resize-none ${
                  errors.needs
                    ? `border-red-500 focus:border-red-600`
                    : `border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-200`
                }`}
              />
              {errors.needs && <p className="mt-1 text-sm text-red-400">{errors.needs}</p>}
            </div>

            {/* Row 4: Budget & Timeline */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                  Budget Range *
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border rounded-lg transition-all duration-200 text-black placeholder-gray-400 focus:outline-none ${
                    errors.budget
                      ? `border-red-500 focus:border-red-600`
                      : `border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-200`
                  }`}
                >
                  <option value="">Select a range</option>
                  <option value="$500 – $1,000">$500 – $1,000</option>
                  <option value="$1,000 – $5,000">$1,000 – $5,000</option>
                  <option value="$5,000 – $10,000">$5,000 – $10,000</option>
                  <option value="$10,000+">$10,000+</option>
                </select>
                {errors.budget && <p className="mt-1 text-sm text-red-400">{errors.budget}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                  Timeline
                </label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  placeholder="e.g., ASAP, 3 months, flexible"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg transition-all duration-200 text-black placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                />
              </div>
            </div>

            {/* Status Message */}
            {statusMessage.text && (
              <div
                className={`p-4 rounded-lg font-medium text-center ${
                  statusMessage.type === `success`
                    ? `bg-green-950 text-green-300 border border-green-800`
                    : `bg-red-950 text-red-300 border border-red-800`
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 uppercase tracking-wider"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="inline-block animate-spin mr-2">⟳</span>
                  Submitting...
                </span>
              ) : (
                `Submit Request`
              )}
            </button>
          </form>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="py-28 px-4 md:px-8 lg:px-20 border-t border-gray-200 bg-gradient-to-b from-white to-gray-100 pulse-section">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <h2 ref={ctaRef} className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-tight text-black min-h-[100px] sm:min-h-[140px] md:min-h-[180px]">
            {displayedText}
            <span className="inline-block w-[4px] h-[0.9em] bg-black ml-1 align-baseline animate-pulse"></span>
          </h2>
          
          <p className="text-xl text-gray-700 font-light">
            Your vision. Our expertise. Infinite possibilities.
          </p>
          
          <a href="#request-form" className="inline-block px-10 py-5 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95 text-lg uppercase tracking-wider">
            Start Your Project
          </a>
        </div>
      </section>

      {/* CSS Animation & Global Scrollbar Hiding */}
      <style jsx global>{`
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }
        /* Hide scrollbar for the entire page */
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .build-card {
          opacity: 0;
          transform: translateY(80px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .build-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes border-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.05); border-color: #1f2937; }
          50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.3); border-color: rgba(255, 255, 255, 0.8); }
        }
        .card-hover-effect:hover {
          animation: border-glow 1.5s infinite;
          transform: translateY(-8px);
        }

        @keyframes float-process {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .process-step {
          animation: float-process 4s ease-in-out infinite;
        }
        .process-step:nth-child(2) { animation-delay: 1s; }
        .process-step:nth-child(3) { animation-delay: 2s; }
        
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          background-image: linear-gradient(90deg, #ffffff 0%, #666666 50%, #ffffff 100%);
          animation: text-shimmer 4s linear infinite;
        }

        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .pulse-section {
          animation: pulse-scale 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
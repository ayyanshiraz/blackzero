"use client";

import React, { useState, useEffect, useRef } from "react";

const mainCategories = [
  { id: "1", title: "Services" },
  { id: "2", title: "Products" },
  { id: "3", title: "Customized Solutions" },
  { id: "4", title: "Speak to an Agent" }
];

const servicesList = [
  {
    id: "1",
    title: "AI and Software Hub",
    subServices: [
      "Custom Software Development",
      "Artificial Intelligence Solutions",
      "Comprehensive ERP Implementation",
      "Individual Module Integration",
      "Intelligent System Architecture",
      "Explainable Artificial Intelligence (XAI)",
      "Machine Learning Models",
      "AI Content"
    ]
  },
  {
    id: "2",
    title: "Data Analytics",
    subServices: [
      "Dashboard Building",
      "Automations",
      "Excel / Sheetbots",
      "Big Data Handling",
      "Software Development Life Cycle",
      "Database Systems",
      "Python Programming",
      "Research Analysis",
      "Econometrics",
      "Advance Data Analysis",
      "Decision Making For Businesses",
      "Business Consultancy"
    ]
  },
  {
    id: "3",
    title: "Advanced Website and Portal Systems",
    subServices: [
      "Custom Websites and Advanced Portals",
      "UI/UX and 3D Interactive Platforms",
      "App Development",
      "Wordpress / Shopify"
    ]
  },
  {
    id: "4",
    title: "Hybrid SEO Services (Traditional + AI)",
    subServices: [
      "Search Engine Optimization (SEO)",
      "Traditional SEO Meets AI-Powered Growth",
      "Rank Higher with Smart SEO + AI",
      "Data-Driven SEO for the Modern Web",
      "Smarter Rankings. Faster Results."
    ]
  },
  {
    id: "5",
    title: "Marketing",
    subServices: [
      "Digital Marketing",
      "Social Media Marketing",
      "Social Media Handling",
      "Google Ads",
      "Content Calendar",
      "Pinterest Marketing",
      "TikTok Marketing",
      "Design and Branding",
      "PR Campaigns",
      "Traditional Marketing",
      "Data-Driven Ads"
    ]
  },
  {
    id: "6",
    title: "Creative Design and Animation Studio",
    subServices: [
      "Bringing Ideas to Life in 2D and 3D",
      "Creative Designs and Stunning Animations",
      "From Graphics to Motion We Create It All",
      "Visual Stories, Perfectly Animated",
      "2D Animation",
      "3D Animation",
      "Scroll Stoppers",
      "Explanatory Videos",
      "Animes",
      "Metaverse Characters",
      "Photography and Videography"
    ]
  },
  {
    id: "7",
    title: "Speak to an Agent",
    subServices: []
  }
];

const productsList = [
  { id: "1", title: "Application Tracking System" },
  { id: "2", title: "Company Invoicer" },
  { id: "3", title: "SEO Auditor" },
  { id: "4", title: "Lead Generation Software" },
  { id: "5", title: "Laplace Mathematics Equation Solver" },
  { id: "6", title: "Future Stocks Prediction" },
  { id: "7", title: "Email Finder" },
  { id: "8", title: "Phone Number Finder" },
  { id: "9", title: "Customized Solutions" },
  { id: "10", title: "Speak to an Agent" }
];

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentMenu, setCurrentMenu] = useState("main");
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);

  const [userSelection, setUserSelection] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientCountryCity, setClientCountryCity] = useState("");
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [sessionId, setSessionId] = useState("");
  
  const messagesEndRef = useRef(null);

  // Load Session ID and Chat History
  useEffect(() => {
    let savedSession = localStorage.getItem("blackzero_session_id");
    if (!savedSession) {
      savedSession = "session-" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("blackzero_session_id", savedSession);
    }
    setSessionId(savedSession);

    const savedChat = localStorage.getItem("blackzero_chat_history");
    if (savedChat) {
      try {
        const parsed = JSON.parse(savedChat);
        setMessages(parsed.messages || []);
        setCurrentMenu(parsed.currentMenu || "main");
        setSelectedServiceIndex(parsed.selectedServiceIndex || null);
        setUserSelection(parsed.userSelection || "");
        setClientName(parsed.clientName || "");
        setClientCountryCity(parsed.clientCountryCity || "");
      } catch (error) {
        console.error("Failed to parse chat history:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const chatData = {
        messages,
        currentMenu,
        selectedServiceIndex,
        userSelection,
        clientName,
        clientCountryCity
      };
      localStorage.setItem("blackzero_chat_history", JSON.stringify(chatData));
    }
  }, [messages, currentMenu, selectedServiceIndex, userSelection, clientName, clientCountryCity, isLoaded]);

  // Backend Poll: Include the unique sessionId in the request URL
  useEffect(() => {
    let interval;
    if (isOpen && sessionId) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/get-messages?sessionId=${sessionId}`);
          const data = await res.json();
          if (data.success && data.messages.length > 0) {
            setMessages(prev => {
              const newAgentMessages = data.messages.map(msgText => ({
                sender: "system",
                text: `👨‍💼 Agent: ${msgText}`
              }));
              return [...prev, ...newAgentMessages];
            });
          }
        } catch (error) {
          console.error("Failed to fetch agent messages:", error);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isOpen, sessionId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const showMainMenu = () => {
    setCurrentMenu("main");
    setSelectedServiceIndex(null);
    setUserSelection("");
    setClientName("");
    setClientCountryCity("");

    const menuText = mainCategories.map(item => `${item.id} - ${item.title}`).join("\n");
    setMessages(prev => [
      ...prev,
      {
        sender: "system",
        text: `👋 Welcome to Black Zero!\n\nYour trusted partner for advanced IT consulting and digital solutions\n\nPlease select an option:\n\n${menuText}\n\nReply with a number (1-4)`
      }
    ]);
  };

  const finalizeLeadAndSend = async (phoneInput, finalActionType) => {
    const payloadMessage = `🚨 *New Lead / Agent Request from Website!* 🚨\n\n*ID:* [#${sessionId}]\n*Selected Interest:* ${userSelection}\n*Full Name:* ${clientName}\n*Country / City:* ${clientCountryCity}\n*Contact Number:* ${phoneInput}\n*Action Type:* ${finalActionType}`;

    setMessages(prev => [
      ...prev,
      { 
        sender: "system", 
        text: `✅ Thank you!\n\nYour inquiry has been received. One of our team members will contact you within 24 hours.\n\nIs there anything else we can help you with?\n\n1 - Go back to Main Menu\n2 - Speak to an Agent now` 
      }
    ]);

    try {
      await fetch("http://localhost:5000/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: payloadMessage })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async () => {
    if (!text.trim()) return;

    const userMsg = text.trim();
    const isFirstMessage = messages.length === 0;
    
    const newMessages = [...messages, { sender: "user", text: userMsg }];
    setMessages(newMessages);
    setText("");

    if (currentMenu === "live_chat" && userMsg.toLowerCase() !== "menu") {
      try {
        await fetch("http://localhost:5000/api/send-message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: `💬 Client (${clientName || "Guest"}) [#${sessionId}]: ${userMsg}` })
        });
      } catch (err) {
        console.error("Failed to forward live chat message", err);
      }
      return; 
    }

    setTimeout(async () => {
      if (isFirstMessage) {
        showMainMenu();
        return;
      }

      if (userMsg.toLowerCase() === "menu" || userMsg.toLowerCase() === "hi") {
        showMainMenu();
        return;
      }

      if (currentMenu === "post_submission") {
        if (userMsg === "1") {
          showMainMenu();
        } else if (userMsg === "2") {
          setCurrentMenu("live_chat");
          setMessages(prev => [
            ...prev,
            { sender: "system", text: `👤 Connecting you to an agent...\n\nOne of our team members will be with you shortly. Our team is available Monday to Friday, 10am - 6pm (Pakistan time).\n\nIf it is outside office hours, we will respond first thing in the morning. Thank you for your patience! 🙏\n\n(Type "menu" to return to the main options)` }
          ]);
          try {
            await fetch("http://localhost:5000/api/send-message", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message: `⚠️ User (${clientName || "Guest"}) [#${sessionId}] clicked Speak to an Agent now from post-submission menu. They are now in live chat mode.` })
            });
          } catch (err) {
            console.error(err);
          }
        } else {
          setMessages(prev => [
            ...prev,
            { sender: "system", text: `Please reply with 1 or 2.` }
          ]);
        }
        return;
      }

      if (currentMenu === "ask_phone") {
        const contactNumber = userMsg;
        setCurrentMenu("post_submission");
        await finalizeLeadAndSend(contactNumber, "Completed Form & Submitted");
        return;
      }

      if (currentMenu === "ask_country_city") {
        setClientCountryCity(userMsg);
        setCurrentMenu("ask_phone");
        setMessages(prev => [
          ...prev,
          { sender: "system", text: `📞 What is your best contact number?\n\n(Include country code, e.g. +92 300 1234567)` }
        ]);
        return;
      }

      if (currentMenu === "ask_name") {
        setClientName(userMsg);
        setCurrentMenu("ask_country_city");
        setMessages(prev => [
          ...prev,
          { sender: "system", text: `🌍 What is your Country / City?\n\n(e.g. Lahore, Pakistan)` }
        ]);
        return;
      }

      if (currentMenu === "main") {
        if (userMsg === "1") {
          setCurrentMenu("services");
          const listText = servicesList.map(item => `${item.id} - ${item.title}`).join("\n");
          setMessages(prev => [
            ...prev,
            { sender: "system", text: `📁 Services and Hubs\n\nWhat do you need?\n\n${listText}\n\n0 - Back to Main Menu\n\nReply with a number (1-7)` }
          ]);
        } else if (userMsg === "2") {
          setCurrentMenu("products");
          const listText = productsList.map(item => `${item.id} - ${item.title}`).join("\n");
          setMessages(prev => [
            ...prev,
            { sender: "system", text: `📦 Products Suite\n\nWhat do you need?\n\n${listText}\n\n0 - Back to Main Menu\n\nReply with a number (1-10)` }
          ]);
        } else if (userMsg === "3") {
          setUserSelection("Customized Solutions");
          setCurrentMenu("ask_name");
          setMessages(prev => [
            ...prev,
            { sender: "system", text: `✅ Great choice!\n\nTo get started with Customized Solutions, please share your full name:` }
          ]);
        } else if (userMsg === "4") {
          setUserSelection("Direct Speak to an Agent");
          setCurrentMenu("ask_name");
          setMessages(prev => [
            ...prev,
            { sender: "system", text: `✅ Great choice!\n\nTo connect with an agent, please share your full name:` }
          ]);
        } else {
          setMessages(prev => [
            ...prev,
            { sender: "system", text: `❌ I did not understand that. Please reply with a number from the menu (1-4).` }
          ]);
        }
      } 
      else if (currentMenu === "services") {
        if (userMsg === "0") {
          showMainMenu();
        } else if (userMsg === "7") {
          setUserSelection("Speak to an Agent (from Services)");
          setCurrentMenu("ask_name");
          setMessages(prev => [
            ...prev,
            { sender: "system", text: `✅ Great choice!\n\nTo connect with an agent, please share your full name:` }
          ]);
        } else {
          const sIndex = servicesList.findIndex(item => item.id === userMsg);
          if (sIndex !== -1 && sIndex < 6) {
            setSelectedServiceIndex(sIndex);
            setCurrentMenu("sub_service");
            const activeService = servicesList[sIndex];
            const subText = activeService.subServices.map((sub, idx) => `${idx + 1} - ${sub}`).join("\n");
            setMessages(prev => [
              ...prev,
              { sender: "system", text: `📁 ${activeService.title}\n\nWhat do you need?\n\n${subText}\n\n0 - Back to Main Menu` }
            ]);
          } else {
            setMessages(prev => [
              ...prev,
              { sender: "system", text: `❌ Invalid option. Please select from the list (1-7) or press 0 for Main Menu.` }
            ]);
          }
        }
      }
      else if (currentMenu === "sub_service") {
        if (userMsg === "0") {
          showMainMenu();
        } else {
          const activeService = servicesList[selectedServiceIndex];
          const subIdx = parseInt(userMsg, 10) - 1;
          if (subIdx >= 0 && subIdx < activeService.subServices.length) {
            const chosenSub = activeService.subServices[subIdx];
            setUserSelection(`${activeService.title} -> ${chosenSub}`);
            setCurrentMenu("ask_name");
            setMessages(prev => [
              ...prev,
              { sender: "system", text: `✅ Great choice!\n\nTo get started, please share your full name:` }
            ]);
          } else {
            setMessages(prev => [
              ...prev,
              { sender: "system", text: `❌ Invalid sub-service option. Please reply with a valid number from the list or press 0 for Main Menu.` }
            ]);
          }
        }
      }
      else if (currentMenu === "products") {
        if (userMsg === "0") {
          showMainMenu();
        } else if (userMsg === "10") {
          setUserSelection("Speak to an Agent (from Products)");
          setCurrentMenu("ask_name");
          setMessages(prev => [
            ...prev,
            { sender: "system", text: `✅ Great choice!\n\nTo connect with an agent, please share your full name:` }
          ]);
        } else {
          const selected = productsList.find(item => item.id === userMsg);
          if (selected) {
            setUserSelection(`Product: ${selected.title}`);
            setCurrentMenu("ask_name");
            setMessages(prev => [
              ...prev,
              { sender: "system", text: `✅ Great choice!\n\nTo get started, please share your full name:` }
            ]);
          } else {
            setMessages(prev => [
              ...prev,
              { sender: "system", text: `❌ Invalid option. Please select from the list (1-10) or press 0 for Main Menu.` }
            ]);
          }
        }
      }
    }, 500);
  };

  if (!isLoaded) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen ? (
        <div className="w-[350px] h-[520px] bg-[#f9fafb] shadow-2xl rounded-2xl flex flex-col border border-gray-200 overflow-hidden">
          
          <div className="bg-black text-white p-4 flex justify-between items-center z-10 shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-bold text-sm tracking-wide">Black Zero Support</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 text-sm scroll-smooth">
            {messages.length === 0 ? (
              <div className="text-gray-400 text-center my-auto flex flex-col items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 opacity-50">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                <span>Type a message or say hi to start...</span>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`p-3 text-[14px] leading-relaxed shadow-sm whitespace-pre-line max-w-[85%] ${
                    msg.sender === "user" 
                      ? "bg-black text-white self-end rounded-2xl rounded-tr-sm" 
                      : "bg-white border border-gray-200 text-gray-800 self-start rounded-2xl rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <input 
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-black border border-transparent"
            />
            <button 
              onClick={handleSend} 
              className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shrink-0 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1">
                <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 relative">
          <div className="relative flex items-center justify-center">
            
            <div 
              className="absolute right-full mr-5 w-56 bg-white border border-gray-200 shadow-xl rounded-lg p-3 text-sm text-black font-semibold animate-pulse cursor-pointer z-20" 
              onClick={() => setIsOpen(true)}
            >
              👋 Hi there! How may we help you today?
              <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-r border-t border-gray-200"></div>
            </div>

            <div className="absolute inset-0 bg-black rounded-full animate-ping opacity-60 z-0"></div>
            <button 
              onClick={() => setIsOpen(true)}
              className="relative w-14 h-14 bg-white rounded-full shadow-2xl border-2 border-gray-300 flex items-center justify-center hover:scale-110 transition-transform z-10 overflow-hidden"
            >
              <img src="/logo.png" alt="Black Zero Logo" className="w-9 h-9 object-contain" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
// src/components/Chatbot.js
import React, { useState, useRef, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  TextField,
  IconButton,
  Tooltip,
  Fab,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";

// ✅ All your broadband, FAQ, and terms data
const dnadata = {
  dnagoa_broadband_plans: [
    { duration: "1 Month", speed: "100 Mbps", benefits: ["Data limit 500 GB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "Normal Plan", price: "₹677*" },{ label: "1 Month Plan + OTT", price: "₹889*" }], plan_name: "Goa Basic" },
    { duration: "3 Months", speed: "100 Mbps", benefits: ["Data limit 1.50 GB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "Normal Plan", price: "₹1948*" },{ label: "3 Months Plan + OTT", price: "₹2584*" }], plan_name: "Goa Basic" },
    { duration: "6 Months", speed: "100 Mbps", benefits: ["Data limit 3.5 TB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "Normal Plan", price: "₹3219*" },{ label: "6 Months Plan + OTT", price: "₹4364*" }], plan_name: "Goa Basic" },
    { duration: "12 Months", speed: "100 Mbps", benefits: ["Data limit 8 TB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "Normal Plan", price: "₹6440*" },{ label: "12 Months Plan + OTT", price: "₹8135*" }], plan_name: "Goa Basic" },
    { duration: "1 Month", speed: "150 Mbps", benefits: ["Data limit 1 TB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "Normal Plan", price: "₹1016*" },{ label: "1 Month Plan + OTT", price: "₹1270*" }], plan_name: "Goa Standard" },
    { duration: "3 Months", speed: "150 Mbps", benefits: ["Data limit 3 TB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "Normal Plan", price: "₹3008*" },{ label: "3 Months Plan + OTT", price: "₹3643*" }], plan_name: "Goa Standard" },
    { duration: "6 Months", speed: "150 Mbps", benefits: ["Data limit 7 TB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "Normal Plan", price: "₹4914*" },{ label: "6 Months Plan + OTT", price: "₹6059*" }], plan_name: "Goa Standard" },
    { duration: "12 Months", speed: "150 Mbps", benefits: ["Data limit 18 TB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "Normal Plan", price: "₹9830*" },{ label: "12 Months Plan + OTT", price: "₹11524*" }], plan_name: "Goa Standard" },
    { duration: "1 Month", speed: "300 Mbps", benefits: ["Data limit 2 TB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "Normal Plan", price: "₹1482*" },{ label: "1 Month Plan + OTT", price: "₹1694*" }], plan_name: "Goa Premium" },
    { duration: "3 Months", speed: "300 Mbps", benefits: ["Data limit 6 TB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "Normal Plan", price: "₹4194*" },{ label: "3 Months Plan + OTT", price: "₹4830*" }], plan_name: "Goa Premium" },
    { duration: "6 Months", speed: "300 Mbps", benefits: ["Data limit 18 TB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "Normal Plan", price: "₹7287*" },{ label: "6 Months Plan + OTT", price: "₹8431*" }], plan_name: "Goa Premium" },
    { duration: "12 Months", speed: "300 Mbps", benefits: ["Data limit 40 TB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "Normal Plan", price: "₹14575*" },{ label: "12 Months Plan + OTT", price: "₹16270*" }], plan_name: "Goa Premium" },
    { duration: "1 Month", speed: "500 Mbps", benefits: ["Data limit 4 TB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "Normal Plan", price: "₹2033*" },{ label: "1 Month Plan + OTT", price: "₹2245*" }], plan_name: "Goa Ultra" },
    { duration: "3 Months", speed: "500 Mbps", benefits: ["Data limit 12 TB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "Normal Plan", price: "₹5084*" },{ label: "3 Months Plan + OTT", price: "₹5720*" }], plan_name: "Goa Ultra" },
    { duration: "6 Months", speed: "500 Mbps", benefits: ["Data limit 40 TB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "Normal Plan", price: "₹11313*" },{ label: "6 Months Plan + OTT", price: "₹20338*" }], plan_name: "Goa Ultra" },
    { duration: "12 Months", speed: "500 Mbps", benefits: ["Data limit 90 TB","Post FUP Upto 100 MBPS","20 OTT's and 300 + TV channels"], prices: [{ label: "Normal Plan", price: "₹20338*" },{ label: "12 Months Plan + OTT", price: "₹22033*" }], plan_name: "Goa Ultra" },
    { duration: "1 Month", speed: "1 Gbps", benefits: ["Data limit 6 TB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "1 Month Plan + OTT", price: "₹3982*" }], plan_name: "Goa Prime" },
    { duration: "3 Months", speed: "1 Gbps", benefits: ["Data limit 25 TB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "3 Month Plan + OTT", price: "₹11864*" }], plan_name: "Goa Prime" },
    { duration: "6 Months", speed: "1 Gbps", benefits: ["Data limit 70 TB","Post FUP Upto 100 MBPS","Free 20 OTT's and 300 + TV channels*only for new subscribers"], prices: [{ label: "6 Month Plan + OTT", price: "₹19491*" }], plan_name: "Goa Prime" },
    { duration: "12 Months", speed: "1 Gbps", benefits: ["Data limit 150 TB","Post FUP Upto 100 MBPS","20 OTT's and 300 + TV channels"], prices: [{ label: "12 Month Plan + OTT", price: "₹39830*" }], plan_name: "Goa Prime" }
  ],
  enterprise_broadband_plans: [
    { plan_name: "20 Mbps", speed: "20 Mbps", duration: "1 Month", prices: [{ label: "Normal Plan", price: "₹599*" }] },
    { plan_name: "20 Mbps", speed: "20 Mbps", duration: "3 Months", prices: [{ label: "Normal Plan", price: "₹1707*" }] },
    { plan_name: "20 Mbps", speed: "20 Mbps", duration: "6 Months", prices: [{ label: "Normal Plan", price: "₹3307*" }] },
    { plan_name: "20 Mbps", speed: "20 Mbps", duration: "12 Months", prices: [{ label: "Normal Plan", price: "₹6614*" }] },
    { plan_name: "30 Mbps", speed: "30 Mbps", duration: "1 Month", prices: [{ label: "Normal Plan", price: "₹636*" },{ label: "1 Month Plan + OTT", price: "₹848*" }] },
    { plan_name: "30 Mbps", speed: "30 Mbps", duration: "3 Months", prices: [{ label: "Normal Plan", price: "₹1811*" },{ label: "3 Months Plan + OTT", price: "₹2449*" }] },
    { plan_name: "30 Mbps", speed: "30 Mbps", duration: "6 Months", prices: [{ label: "Normal Plan", price: "₹3509*" },{ label: "6 Months Plan + OTT", price: "₹4654*" }] },
    { plan_name: "30 Mbps", speed: "30 Mbps", duration: "12 Months", prices: [{ label: "Normal Plan", price: "₹7018*" },{ label: "12 Months Plan + OTT", price: "₹8713*" }] },
    { plan_name: "40 Mbps", speed: "40 Mbps", duration: "1 Month", prices: [{ label: "Normal Plan", price: "₹718*" },{ label: "1 Month Plan + OTT", price: "₹930*" }] },
    { plan_name: "40 Mbps", speed: "40 Mbps", duration: "3 Months", prices: [{ label: "Normal Plan", price: "₹2046*" },{ label: "3 Months Plan + OTT", price: "₹2796*" }] },
    { plan_name: "40 Mbps", speed: "40 Mbps", duration: "6 Months", prices: [{ label: "Normal Plan", price: "₹3963*" },{ label: "6 Months Plan + OTT", price: "₹5108*" }] },
    { plan_name: "40 Mbps", speed: "40 Mbps", duration: "12 Months", prices: [{ label: "Normal Plan", price: "₹7926*" },{ label: "12 Months Plan + OTT", price: "₹9621*" }] },
    { plan_name: "50 Mbps", speed: "50 Mbps", duration: "1 Month", prices: [{ label: "Normal Plan", price: "₹1099*" },{ label: "1 Month Plan + OTT", price: "₹1311*" }] },
    { plan_name: "50 Mbps", speed: "50 Mbps", duration: "3 Months", prices: [{ label: "Normal Plan", price: "₹3132*" },{ label: "3 Months Plan + OTT", price: "₹3770*" }] },
    { plan_name: "50 Mbps", speed: "50 Mbps", duration: "6 Months", prices: [{ label: "Normal Plan", price: "₹6067*" },{ label: "6 Months Plan + OTT", price: "₹7212*" }] },
    { plan_name: "50 Mbps", speed: "50 Mbps", duration: "12 Months", prices: [{ label: "Normal Plan", price: "₹12134*" },{ label: "12 Months Plan + OTT", price: "₹13829*" }] },
    { plan_name: "75 Mbps", speed: "75 Mbps", duration: "1 Month", prices: [{ label: "Normal Plan", price: "₹1599*" },{ label: "1 Month Plan + OTT", price: "₹1811*" }] },
    { plan_name: "75 Mbps", speed: "75 Mbps", duration: "3 Months", prices: [{ label: "Normal Plan", price: "₹4557*" },{ label: "3 Months Plan + OTT", price: "₹5195*" }] },
    { plan_name: "75 Mbps", speed: "75 Mbps", duration: "6 Months", prices: [{ label: "Normal Plan", price: "₹8827*" },{ label: "6 Months Plan + OTT", price: "₹9972*" }] },
    { plan_name: "75 Mbps", speed: "75 Mbps", duration: "12 Months", prices: [{ label: "Normal Plan", price: "₹17654*" },{ label: "12 Months Plan + OTT", price: "₹19349*" }] },
    { plan_name: "100 Mbps", speed: "100 Mbps", duration: "1 Month", prices: [{ label: "Normal Plan", price: "1999*" },{ label: "1 Month Plan + OTT", price: "2211*" }] },
    { plan_name: "100 Mbps", speed: "100 Mbps", duration: "3 Months", prices: [{ label: "Normal Plan", price: "5697*" },{ label: "3 Months Plan + OTT", price: "6335*" }] },
    { plan_name: "100 Mbps", speed: "100 Mbps", duration: "6 Months", prices: [{ label: "Normal Plan", price: "11034*" },{ label: "6 Months Plan + OTT", price: "12179*" }] },
    { plan_name: "100 Mbps", speed: "100 Mbps", duration: "12 Months", prices: [{ label: "Normal Plan", price: "22068*" },{ label: "12 Months Plan + OTT", price: "23763*" }] }
  ],
  faq_data: {
    faqs: [
      { question: "How to apply for a new broadband connection?", answer: "For a new Broadband Connection, you can call us at 0832-6747575 or contact us here: https://dnagoa.com/contact/" },
      { question: "How do I test my internet speed?", answer: "You can test your Internet Speed by clicking here: https://www.google.com/search?q=internet+speed+test" },
      { question: "Is DNA Goa a secured ISP?", answer: "DNA Goa is a 100% secured internet service provider with the vision of connecting every Goan with high-speed internet." },
      { question: "How to make a payment while applying for a DNA Goa?", answer: "You can pay online by logging in with your registered user id and password on the DNA Broadband internet connection site." },
      { question: "My internet connection is not working?", answer: "If you are having network issues, try resetting your WiFi router. If the problem persists, contact us at 0832-6747575." },
      { question: "What is full form of DNA goa?", answer: "DNA Goa stands for Digital Networks Associates Goa" }
    ],
    common_queries: [
      { question: "Why is my internet slow?", answer: "Check for multiple devices using bandwidth, restart your router, and contact support if the issue persists." },
      { question: "How do I change my WiFi password?", answer: "Login to your router admin page (usually 192.168.0.1 or 192.168.1.1), go to Wireless Settings, and update the password." }
    ],
    router_setup_steps: [
      "Connect the router to power and your modem.",
      "Open a browser and go to the router's admin page (e.g., 192.168.0.1).",
      "Login with default credentials (check router label).",
      "Set up your WiFi name (SSID) and password.",
      "Save settings and restart the router."
    ],
    router_types: [
      { type: "Single-band Router", description: "Supports only 2.4GHz frequency, suitable for basic usage." },
      { type: "Dual-band Router", description: "Supports both 2.4GHz and 5GHz frequencies, better for streaming and gaming." },
      { type: "Mesh Router", description: "Multiple units for whole-home coverage, ideal for large spaces." }
    ]
  },
  terms_and_conditions: [
    "All plans are prepaid in nature.",
    "ONU Security Deposit Rs. 1000/- (Refundable). ONT Device (2 Antenna & 4 Antenna) will be provided on a security deposit of Rs. 2,000/- & Rs. 2,500/- respectively (Refundable).",
    "Package amount is not refundable.",
    "Power supply, LAN & internal concealing of wiring will be taken care of by customers (if required).",
    "Cheque return charges of Rs. 350/- will be applicable for any reason whatsoever.",
    "DNA-GOA will not accept any claims for damage of computer, laptops, television or any other equipment connected to DNA-GOA internet connection due to electrical problems, lightning and other calamities.",
    "All equipment connected in your premises (CPE) (e.g. modem, router, switch, Cat5/Cat6 cable, fiber optic cable) will be the sole property of DNA-GOA and shall be handed over to DNA-GOA in working condition at the time of disconnection. If the same is lost/misplaced/damaged, the customer shall pay an amount of up to Rs. 4500/- towards the cost of the same.",
    "Customers shall carry ONU device (in working condition with power adapter) along with them while shifting to the new location or else Rs. 1,000/- (if ONU), Rs. 4,000/- (if 2 Antenna ONT), Rs. 4,500/- (if 4 Antenna ONT) will be charged against the misplaced/damaged device.",
    "Internet connection is for the use of subscriber who has purchased the connection. Sharing of internet connection is a criminal offense. DNA-GOA will not be responsible for usage of internet service by non-paying users violating the law.",
    "DNA-GOA will not be responsible for purchase of any additional materials (such as Wi-Fi router, extender, etc.) from DNA-GOA employees personally.",
    "Post FUP speeds up to 100 Mbps is applicable over associated servers, otherwise post FUP speeds are capped at 10 Mbps, 15 Mbps, 30 Mbps, 60 Mbps and 90 Mbps respectively.",
    "All devices provided on security deposit are to be returned in working condition along with the respective charger to DNA GOA Head Office. If failed to provide in working condition then security deposit will be adjusted or forfeited.",
    "Refundable deposit will be refunded to the customers upon successful submission of devices in working condition within 15–20 working days.",
    "OTT & TV Channels plans once activated, cannot be transferred, upgraded, or refunded.",
    "2 screens shall be available with our OTT & TV Channels plans (e.g., 2 smartphones / 1 smartphone and 1 smart TV). 3rd device once logged in, 1st device will be logged out automatically.",
    "OTT & TV Channels will be logged in through the registered primary contact number attached with the particular user-id of the DNA GOA account only.",
    "OTT & TV Channels content will be available through Playbox TV APP available on the Play Store and App Store, in collaboration with the DNA GOA user account.",
    "Our OTT & TV Channels plan will give access to 350+ TV channels and 19 OTT platforms, and the company reserves the right to add or delete any OTT service or TV channel without any prior intimation."
  ]
};

// Async Gemini API function (matches your given structure)
const askGemini = async (userText) => {
        // The API key will be handled by the Canvas environment automatically.
        // We leave it as a blank string as a placeholder.
        const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
        
        // The correct Gemini API endpoint for gemini-2.5-flash-preview-05-20
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        // Construct the prompt with the user's question and the provided context
        const prompt = `
            You are a helpful cybersecurity assistant for DNA Goa broadband. Your purpose is to provide accurate and helpful information based on the provided data.
            
            Here is the complete data about the company's plans, FAQs, and terms:
            \`\`\`json
            ${JSON.stringify(dnadata, null, 2)}
            \`\`\`
            
            In addition to this data, you are aware of the following components on our website:
            - *BentoGrid*: This section showcases our key services and products.
            - *NewsSection*: This component provides the latest news and articles on cybersecurity.
            - *ThreatMap*: This section visualizes real-time global cybersecurity threats.
            
            Based on the provided data and your knowledge of the app components, answer the user question. If the answer is not in the data, try to be as helpful as possible without inventing information. For example, if the user asks about general cybersecurity, you can provide a high-level, helpful answer.
            
            User question: "${userText}"
        `;

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: prompt }]
                        }
                    ]
                })
            });

            // Check if the response is successful
            if (!res.ok) {
                // Throw an error if the response status is not OK (e.g., 400, 500)
                const errorData = await res.json();
                throw new Error(errorData.error.message || `API error with status: ${res.status}`);
            }

            const data = await res.json();
            
            // Correctly parse the response to get the text content.
            // The text is an item inside the 'parts' array.
            const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
                "Sorry, I couldn't find an answer. Please try rephrasing your question.";

            return reply;
        } catch (err) {
            console.error("Gemini API error:", err);
            return "I’m sorry, but I’m having trouble connecting right now. Please try again later.";
        }
    };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Quick Ask Handler
  const quickAsk = (type) => {
    if (type === "home plans") {
      showPlans("Home Plans", dnadata.dnagoa_broadband_plans);
    } else if (type === "enterprise plans") {
      showPlans("Enterprise Plans", dnadata.enterprise_broadband_plans);
    }
  };

  // Show Plans in Cards
  const showPlans = (title, plans) => {
    setMessages((prev) => [...prev, { sender: "bot", type: "plans", title, plans }]);
  };

  // Send, using the new askGemini function
  const send = async () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setLoading(true);

    // Quick asks
    if (text.toLowerCase().includes("home plan")) {
      showPlans("Home Plans", dnadata.dnagoa_broadband_plans);
      setLoading(false);
      return;
    }
    if (text.toLowerCase().includes("enterprise plan")) {
      showPlans("Enterprise Plans", dnadata.enterprise_broadband_plans);
      setLoading(false);
      return;
    }

    // Otherwise, Gemini API prompt
    const reply = await askGemini(text);
    setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    setLoading(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {!open && (
        <Tooltip title="Chatbot">
          <Fab
            color="secondary"
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 1500,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease-in-out",
              "&:hover": { transform: "scale(1.1)" },
            }}
            onClick={() => setOpen(true)}
          >
            <SmartToyIcon />
          </Fab>
        </Tooltip>
      )}

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, sm: "12px 0 0 12px" },
            boxShadow: "-4px 0 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        <Box
          sx={{
            width: { xs: "95vw", sm: 460, md: 520 },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.default",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              background: "linear-gradient(135deg, #1565c0, #42a5f5)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "1.3rem", letterSpacing: 0.5 }}
            >
              Cyber Chatbot
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "0.85rem",
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: process.env.REACT_APP_GEMINI_API_KEY ? "limegreen" : "red",
                  boxShadow: process.env.REACT_APP_GEMINI_API_KEY
                    ? "0 0 6px limegreen"
                    : "0 0 6px red",
                }}
              />
              {process.env.REACT_APP_GEMINI_API_KEY ? "Online" : "Offline"}
            </Box>
          </Box>

          {/* Quick Tools */}
          <Box
            sx={{
              p: 1.5,
              display: "flex",
              gap: 1,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {["Home Plans", "Enterprise Plans"].map((label) => (
              <button
                key={label}
                onClick={() => quickAsk(label.toLowerCase())}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  border: "none",
                  background: "#1565c0",
                  color: "white",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  transition: "all 0.2s",
                }}
              >
                {label}
              </button>
            ))}
          </Box>

          <Divider />

          {/* Chat Messages */}
          <Box
            ref={listRef}
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              bgcolor: "background.default",
              scrollBehavior: "smooth",
            }}
          >
            {messages.map((m, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: m.sender === "user" ? "flex-end" : "flex-start",
                  mb: 1.5,
                }}
              >
                {m.type === "plans" ? (
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      {m.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "grid",
                        gap: 1.5,
                        gridTemplateColumns: "1fr 1fr",
                      }}
                    >
                      {m.plans.map((plan, idx) => (
                        <Card
                          key={idx}
                          sx={{ boxShadow: 2, borderRadius: 2, bgcolor: "background.paper" }}
                        >
                          <CardContent>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {plan.duration}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Speed: {plan.speed}
                            </Typography>
                            {plan.benefits && (
                              <ul style={{ paddingLeft: 16, margin: "6px 0" }}>
                                {plan.benefits.map((b, j) => (
                                  <li key={j}>
                                    <Typography variant="body2">{b}</Typography>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {/* Price display */}
                            {plan.prices && (
                              <Box sx={{ mt: 1 }}>
                                <Typography variant="body2" fontWeight="bold">
                                  Price{plan.prices.length > 1 ? "s" : ""}:
                                </Typography>
                                <ul style={{ paddingLeft: 16, margin: "4px 0" }}>
                                  {plan.prices.map((p, pidx) => (
                                    <li key={pidx}>
                                      <Typography variant="body2">
                                        {p.label ? `${p.label}: ` : ""}{p.price}
                                      </Typography>
                                    </li>
                                  ))}
                                </ul>
                              </Box>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  </Box>
                ) : (
                  <Card
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      maxWidth: "75%",
                      bgcolor: m.sender === "user" ? "primary.main" : "background.paper",
                      color: m.sender === "user" ? "white" : "text.primary",
                      boxShadow: 2,
                      fontSize: "0.9rem",
                      whiteSpace: "pre-line",
                    }}
                  >
                    <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
                      {m.text}
                    </CardContent>
                  </Card>
                )}
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 1 }}>
                <CircularProgress size={20} />
              </Box>
            )}
          </Box>

          <Divider />

          {/* Input */}
          <Box
            sx={{
              p: 1.5,
              display: "flex",
              gap: 1,
              alignItems: "center",
              borderTop: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            <TextField
              size="small"
              fullWidth
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              InputProps={{ sx: { bgcolor: "background.paper" } }}
            />
            <IconButton
              color="primary"
              onClick={send}
              aria-label="send"
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": { bgcolor: "primary.dark" },
                boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

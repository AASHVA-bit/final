import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { keyframes } from "@mui/system";
import { styled } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PasswordChecker from "./PasswordChecker";
import SMSDetector from "./SMSDetector";
import SeniorSafety from "./SeniorSafety";
import ChildSafety from "./ChildSafety";



// Add these new icon imports
import SecurityIcon from "@mui/icons-material/Security";
import ReportIcon from "@mui/icons-material/Report";
import PolicyIcon from "@mui/icons-material/Policy";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ArticleIcon from "@mui/icons-material/Article";
import CampaignIcon from "@mui/icons-material/Campaign";


// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

// Keyframe animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(108, 92, 231, 0.3); }
  50% { box-shadow: 0 0 20px rgba(108, 92, 231, 0.5); }
  100% { box-shadow: 0 0 5px rgba(108, 92, 231, 0.3); }
`;

const borderGlow = keyframes`
  0% { border-color: rgba(108, 92, 231, 0.3); }
  50% { border-color: rgba(108, 92, 231, 0.8); }
  100% { border-color: rgba(108, 92, 231, 0.3); }
`;

const shine = keyframes`
  0% { left: -100%; }
  100% { left: 200%; }
`;

// Styled components
const AnimatedCard = styled(Card)({
  height: "100%",
  background:
    "linear-gradient(145deg, rgba(26,32,54,0.95) 0%, rgba(30,37,61,0.95) 100%)",
  borderRadius: 16,
  overflow: "hidden",
  position: "relative",
  transition: "all 0.4s ease",
  border: "1px solid rgba(108, 92, 231, 0.2)",
  animation: `${float} 8s ease-in-out infinite`,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #6c5ce7, #00cec9)",
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.4s ease",
    zIndex: 2,
  },
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    border: "1px solid rgba(108, 92, 231, 0.5)",
    animation: `${glow} 2s ease-in-out infinite, ${borderGlow} 2s ease-in-out infinite`,
    "&::before": { transform: "scaleX(1)" },
    "& .card-image": { transform: "scale(1.08)" },
    "& .shine-overlay": { animation: `${shine} 1.5s ease` },
  },
});

const ImageContainer = styled(Box)({
  height: 160,
  borderRadius: "12px 12px 0 0",
  overflow: "hidden",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
    zIndex: 1,
  },
});

const ShineOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  height: "100%",
  width: "50%",
  background:
    "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
  zIndex: 1,
  opacity: 0,
  transition: "opacity 0.3s ease",
});

const CenteredSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  marginBottom: "4rem",
});

const SectionHeader = styled(Typography)({
  position: "relative",
  display: "inline-block",
  marginBottom: "1.5rem",
  paddingBottom: "0.5rem",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "80px",
    height: "4px",
    background: "linear-gradient(90deg, #6c5ce7, #00cec9)",
    borderRadius: 2,
  },
});

const StyledDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    backgroundColor: "rgba(26,32,54,0.98)",
    backdropFilter: "blur(12px)",
    borderRadius: 20,
    overflow: "hidden",
    border: "1px solid rgba(108, 92, 231, 0.3)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  },
});

const LinkCard = styled(Card)({
  height: "100%",
  background: "linear-gradient(145deg, rgba(26,32,54,0.95) 0%, rgba(30,37,61,0.95) 100%)",
  borderRadius: 16,
  overflow: "hidden",
  position: "relative",
  transition: "all 0.4s ease",
  border: "1px solid rgba(108, 92, 231, 0.2)",
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    border: "1px solid rgba(108, 92, 231, 0.5)",
    boxShadow: "0 10px 20px rgba(108, 92, 231, 0.3)",
  },
});

function BentoGrid() {
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleOpen = (img) => {
    setSelectedImg(img);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setSelectedImg(null);
  };

  const handleVideoOpen = (url) => {
    setSelectedVideo(url);
    setVideoOpen(true);
  };
  
  const handleVideoClose = () => {
    setVideoOpen(false);
    setSelectedVideo(null);
  };

  // ORIGINAL DATA (unchanged)
  const attacks = [
    { title: "Phishing", desc: "Tricking users into giving up sensitive info.", img: "imgs/phishing.png", wiki: "https://en.wikipedia.org/wiki/Phishing" },
    { title: "Malware", desc: "Malicious software that damages or disables systems.", img: "imgs/malware.png", wiki: "https://en.wikipedia.org/wiki/Malware" },
    { title: "Ransomware", desc: "Encrypts files and demands payment for decryption.", img: "imgs/ransomware.png", wiki: "https://en.wikipedia.org/wiki/Ransomware" },
    { title: "DDoS Attack", desc: "Overwhelms a system with traffic to disrupt service.", img: "imgs/ddos.jpeg", wiki: "https://en.wikipedia.org/wiki/Denial-of-service_attack" },
    { title: "Man-in-the-Middle", desc: "Intercepts communication between two parties.", img: "imgs/mitm.jpg", wiki: "https://en.wikipedia.org/wiki/Man-in-the-middle_attack" },
    { title: "SQL Injection", desc: "Injects malicious SQL queries into databases.", img: "imgs/sqlinjection.jpg", wiki: "https://en.wikipedia.org/wiki/SQL_injection" },
    { title: "Zero-Day Exploit", desc: "Targets vulnerabilities before they are patched.", img: "imgs/zeroday.jpg", wiki: "https://en.wikipedia.org/wiki/Zero-day_(computing)" },
    { title: "Password Attack", desc: "Attempts to crack or steal passwords.", img: "imgs/passwordattack.jpg", wiki: "https://en.wikipedia.org/wiki/Password_cracking" },
    { title: "Drive-By Download", desc: "Downloads malware without user consent.", img: "imgs/dbd.jpg", wiki: "https://en.wikipedia.org/wiki/Drive-by_download" },
    { title: "Cross-Site Scripting (XSS)", desc: "Injects malicious scripts into trusted websites.", img: "imgs/xss.jpg", wiki: "https://en.wikipedia.org/wiki/Cross-site_scripting" },
    { title: "Social Engineering", desc: "Manipulates people into revealing confidential info.", img: "imgs/socialengineering.svg", wiki: "https://en.wikipedia.org/wiki/Social_engineering_(security)" },
    { title: "Spyware", desc: "Secretly monitors user activity.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlLcm9WigouOyLIjWkk72yyl0LNZBgvFpd2Q&s", wiki: "https://en.wikipedia.org/wiki/Spyware" },
    { title: "Adware", desc: "Displays unwanted advertisements.", img: "https://www.medirect.com.mt/wp-content/uploads/What-is-adware-Header.jpg", wiki: "https://en.wikipedia.org/wiki/Adware" },
    { title: "Trojan Horse", desc: "Disguises as legitimate software.", img: "imgs/trojan.png", wiki: "https://en.wikipedia.org/wiki/Trojan_horse_(computing)" },
    { title: "Rootkit", desc: "Hides malicious processes from detection.", img: "https://home.sophos.com/sites/default/files/2021-09/what-is-a-rootkit.jpeg", wiki: "https://en.wikipedia.org/wiki/Rootkit" },
    { title: "Session Hijacking", desc: "Takes over a user session.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThv4ljokjDxcft6i99N1jrgILbA8AebYVnyQ&s", wiki: "https://en.wikipedia.org/wiki/Session_hijacking" }
  ];

  const tips = [
    { img: "https://cdnbbsr.s3waas.gov.in/s3dcf6070a4ab7f3afbfd2809173e0824b/uploads/2025/06/20250606131298449.jpg" },
    { img: "https://cdnbbsr.s3waas.gov.in/s3dcf6070a4ab7f3afbfd2809173e0824b/uploads/2025/06/202506061905714583.jpg" },
    { img: "https://cdnbbsr.s3waas.gov.in/s3dcf6070a4ab7f3afbfd2809173e0824b/uploads/2025/06/20250606695410773.jpg" },
    { img: "https://cdnbbsr.s3waas.gov.in/s3dcf6070a4ab7f3afbfd2809173e0824b/uploads/2025/06/202506061444135532.jpg" },
    { img: "https://cdnbbsr.s3waas.gov.in/s3dcf6070a4ab7f3afbfd2809173e0824b/uploads/2025/06/20250606300963759.jpg" },
    { img: "https://cdnbbsr.s3waas.gov.in/s3dcf6070a4ab7f3afbfd2809173e0824b/uploads/2025/06/20250606774889926.jpg" },
    { img: "https://cdnbbsr.s3waas.gov.in/s3dcf6070a4ab7f3afbfd2809173e0824b/uploads/2025/06/202506061917168516.jpg" },
    { img: "https://cdnbbsr.s3waas.gov.in/s3dcf6070a4ab7f3afbfd2809173e0824b/uploads/2025/06/20250606250158044.jpg" },
    { img: "https://cdnbbsr.s3waas.gov.in/s3dcf6070a4ab7f3afbfd2809173e0824b/uploads/2025/06/2025060670433041.jpg" },
    { img: "https://cdnbbsr.s3waas.gov.in/s3dcf6070a4ab7f3afbfd2809173e0824b/uploads/2025/06/20250606328824219.jpg" },
    { img: "imgs/tip11.jpg" },
    { img: "imgs/tip12.jpg" },
    { img: "imgs/tip13.jpg" },
    { img: "imgs/tip14.jpg" },
    { img: "imgs/tip15.jpg" },
    { img: "imgs/tip16.jpg" }
  ];

  // Useful links data with icons
  const usefulLinks = [
    {
      title: "Goa Cyber Crime",
      description: "Official Goa Cyber Crime portal for reporting incidents",
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      url: "https://citizen.goapolice.gov.in/web/guest/cyber-crime-police-station",
      color: "#6c5ce7"
    },
    {
      title: "Report Cyber Crime",
      description: "File a complaint with Indian Cyber Crime Coordination Centre",
      icon: <ReportIcon sx={{ fontSize: 40 }} />,
      url: "https://www.cybercrime.gov.in/Webform/Crime_AuthoLogin.aspx",
      color: "#e74c3c"
    },
    {
      title: "Cyber Safety Tips",
      description: "Government guidelines for online safety",
      icon: <PolicyIcon sx={{ fontSize: 40 }} />,
      url: "https://www.cert-in.org.in/",
      color: "#3498db"
    },
    {
      title: "National Cyber Security",
      description: "India's national cybersecurity organization",
      icon: <PublicIcon sx={{ fontSize: 40 }} />,
      url: "https://www.ncsai.in/",
      color: "#2ecc71"
    },
    {
      title: "Cyber Crime Helpline",
      description: "National cyber crime helpline: 1930",
      icon: <PhoneIcon sx={{ fontSize: 40 }} />,
      url: "tel:1930",
      color: "#f39c12"
    },
    {
      title: "Register Complaints",
      description: "Email for cyber crime complaints",
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      url: "https://cybercrime.gov.in/Webform/Index.aspx",
      color: "#9b59b6"
    },
    {
      title: "Cyber Awareness",
      description: "Educational resources on cyber security",
      icon: <ArticleIcon sx={{ fontSize: 40 }} />,
      url: "https://cybercrime.gov.in/Webform/CyberAware.aspx",
      color: "#1abc9c"
    },
    {
      title: "Awareness Campaigns",
      description: "Latest cyber security awareness initiatives",
      icon: <CampaignIcon sx={{ fontSize: 40 }} />,
      url: "https://www.mygov.in/staysafeonline",
      color: "#d35400"
    }
  ];

  // Shared slider styles to make center big & sides blended
  const sliderStyles = {
    width: "100%",
    maxWidth: 1400,
    "--swiper-navigation-size": "24px",
  };

  return (
    <>
      {/* Global background + no horizontal overscroll (fixes white background on drag) */}
      <GlobalStyles
        styles={{
          "html, body, #root": {
            backgroundColor: "#0a0f1c",
            margin: 0,
            height: "100%",
            overflowX: "hidden",
            overscrollBehaviorX: "none",
          },
        }}
      />

      <Box
        sx={{
          px: { xs: 2, md: 8 },
          py: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        {/* Attacks Section */}
        <CenteredSection>
          <SectionHeader id="attacks" variant="h3" sx={{ fontWeight: 800, color: "primary.main" }}>
            Cyber Attacks
          </SectionHeader>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mb: 4 }}>
            Explore different types of cyber threats and learn how to protect yourself
          </Typography>
        </CenteredSection>

        {/* Wrapper clips any edge overflow so no white shows */}
        <Box
          sx={{
            mb: "5rem",
            width: "100%",
            maxWidth: 1400,
            overflow: "hidden",
            "& .swiper": { overflow: "visible" },
            "& .swiper-slide": {
              transition: "transform 0.5s ease, filter 0.5s ease, opacity 0.5s ease",
              filter: "brightness(0.85)",
              opacity: 0.85,
            },
            "& .swiper-slide-active": {
              zIndex: 3,
              filter: "brightness(1)",
              opacity: 1,
              transform: "scale(1.04)",
            },
            "& .swiper-button-prev, & .swiper-button-next": {
              color: "#fff",
              background: "rgba(0,0,0,0.35)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              backdropFilter: "blur(4px)",
            },
            "& .swiper-button-prev:hover, & .swiper-button-next:hover": {
              background: "rgba(0,0,0,0.6)",
            },
            "& .swiper-pagination-bullet": {
              background: "rgba(255,255,255,0.4)",
              opacity: 1,
            },
            "& .swiper-pagination-bullet-active": { background: "#6c5ce7" },
          }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            centeredSlides
            loop
            slidesPerView={3}
            speed={800}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            coverflowEffect={{
              rotate: 0,
              stretch: -30,
              depth: 220,
              modifier: 1.2,
              slideShadows: false,
            }}
            resistanceRatio={0}
            style={sliderStyles}
            breakpoints={{
              0: { slidesPerView: 1.2, centeredSlides: true },
              900: { slidesPerView: 3, centeredSlides: true },
            }}
          >
            {attacks.map((item, idx) => (
              <SwiperSlide key={idx}>
                <a href={item.wiki} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <AnimatedCard className="animated-card">
                    <ShineOverlay className="shine-overlay" />
                    <ImageContainer sx={{ height: { xs: 240, md: 340, lg: 420 } }}>
                      <img
                        src={item.img}
                        alt={item.title}
                        className="card-image"
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                      />
                    </ImageContainer>
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </AnimatedCard>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* Recent Scams in Goa Section */}
        <CenteredSection>
          <SectionHeader id="scams" variant="h3" sx={{ fontWeight: 800, color: "error.main" }}>
            Recent Scams in Goa
          </SectionHeader>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mb: 4 }}>
            Stay alert! These scams have been reported in Goa recently.
          </Typography>
        </CenteredSection>

        <Box
          sx={{
            mb: "5rem",
            width: "100%",
            maxWidth: 1400,
            overflow: "hidden",
            "& .swiper": { overflow: "visible" },
            "& .swiper-slide": {
              transition: "transform 0.5s ease, filter 0.5s ease, opacity 0.5s ease",
              filter: "brightness(0.85)",
              opacity: 0.85,
            },
            "& .swiper-slide-active": {
              zIndex: 3,
              filter: "brightness(1)",
              opacity: 1,
              transform: "scale(1.04)",
            },
            "& .swiper-button-prev, & .swiper-button-next": {
              color: "#fff",
              background: "rgba(0,0,0,0.35)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              backdropFilter: "blur(4px)",
            },
            "& .swiper-button-prev:hover, & .swiper-button-next:hover": {
              background: "rgba(0,0,0,0.6)",
            },
            "& .swiper-pagination-bullet": {
              background: "rgba(255,255,255,0.4)",
              opacity: 1,
            },
            "& .swiper-pagination-bullet-active": { background: "#e53935" },
          }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            centeredSlides
            loop
            slidesPerView={3}
            speed={800}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            coverflowEffect={{
              rotate: 0,
              stretch: -30,
              depth: 220,
              modifier: 1.2,
              slideShadows: false,
            }}
            resistanceRatio={0}
            style={sliderStyles}
            breakpoints={{
              0: { slidesPerView: 1.2, centeredSlides: true },
              900: { slidesPerView: 3, centeredSlides: true },
            }}
          >
            {[
              { 
                title: "Fake Loan Apps", 
                desc: "Fraud apps offering instant loans with high-interest & data theft.", 
                img: "imgs/loanFrauds.jpg", 
                link: "https://warangalpolice.telangana.gov.in/online-loan-app-frauds" 
              },
              { 
                title: "UPI Scam Calls", 
                desc: "Fraudsters posing as bank officials to trick you into sharing OTP/UPI PIN.", 
                img: "imgs/upi.png", 
                link: "https://razorpay.com/blog/upi-frauds-types-tactics/" 
              },
              { 
                title: "Job Fraud", 
                desc: "Fake job offers on social media asking for upfront registration fees.", 
                img: "imgs/job.png", 
                link: "https://www.scamwatch.gov.au/types-of-scams/jobs-and-employment-scams" 
              },
              { 
                title: "Tourist Rental Scam", 
                desc: "Fake villa/hotel listings in Goa asking for advance payments.", 
                img: "imgs/rental.jpeg", 
                link: "https://www.cnb.com/personal-banking/insights/vacation-rental-scams.html" 
              },
              { 
                title: "Online Gambling Scam", 
                desc: "Fraudulent gambling sites trick users into betting money with no chance of winning or withdrawing funds.", 
                img: "imgs/gambling.png", 
                link: "https://seon.io/resources/online-gambling-fraud/" 
              },
              { 
                title: "Cyberstalking", 
                desc: "The use of the internet, email, or social media to harass, intimidate, or monitor someone repeatedly.",
                img: "imgs/cyberstalking.png", 
                link: "https://www.esafety.gov.au/key-topics/staying-safe/cyberstalking#:~:text=Real%20stories-,What%20is%20cyberstalking?,and%20off%20within%20their%20home." 
              },
              { 
                title: "Cyberbullying", 
                desc: "The use of technology to harass, threaten, embarrass, or target another person.",
                img: "imgs/cyberbullying.png", 
                link: "https://www.stopbullying.gov/cyberbullying/what-is-it" 
              },
              { 
                title: "Cybergrooming", 
                desc: "Cyber grooming is when someone (often an adult) befriends a child online and builds an emotional connection with future intentions of sexual abuse.",
                img: "imgs/cybergrooming.jpg", 
                link: "https://www.childsafenet.org/cyber-grooming" 
              },
               { 
                title: "Vishing Scam", 
                desc: "voice phishing, is a fraudulent phone call or voice message designed to trick people into revealing sensitive information, such as bank details, login credentials, or personal data",
                img: "imgs/vishing.png", 
                link: "https://www.sainthelenabank.com/cybercrime-and-fraud-information/vishing/" 
              },
            ].map((scam, idx) => (
              <SwiperSlide key={idx}>
                <a href={scam.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <AnimatedCard className="animated-card">
                    <ShineOverlay className="shine-overlay" />
                    <ImageContainer sx={{ height: { xs: 240, md: 340, lg: 420 } }}>
                      <img
                        src={scam.img}
                        alt={scam.title}
                        className="card-image"
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                      />
                    </ImageContainer>
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}>
                        {scam.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                        {scam.desc}
                      </Typography>
                    </CardContent>
                  </AnimatedCard>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* Goa Scam Awareness Videos Section */}
        <CenteredSection>
          <SectionHeader id="videos" variant="h3" sx={{ fontWeight: 800, color: "info.main" }}>
            Goa Scam Awareness Videos
          </SectionHeader>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mb: 4 }}>
            Watch awareness videos to stay protected from the latest scams in Goa.
          </Typography>
        </CenteredSection>

        <Box
          sx={{
            mb: "5rem",
            width: "100%",
            maxWidth: 1400,
            overflow: "hidden",
            "& .swiper": { overflow: "visible" },
            "& .swiper-slide": {
              transition: "transform 0.5s ease, filter 0.5s ease, opacity 0.5s ease",
              filter: "brightness(0.85)",
              opacity: 0.85,
            },
            "& .swiper-slide-active": {
              zIndex: 3,
              filter: "brightness(1)",
              opacity: 1,
              transform: "scale(1.04)",
            },
            "& .swiper-button-prev, & .swiper-button-next": {
              color: "#fff",
              background: "rgba(0,0,0,0.35)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              backdropFilter: "blur(4px)",
            },
            "& .swiper-button-prev:hover, & .swiper-button-next:hover": {
              background: "rgba(0,0,0,0.6)",
            },
            "& .swiper-pagination-bullet": {
              background: "rgba(255,255,255,0.4)",
              opacity: 1,
            },
            "& .swiper-pagination-bullet-active": { background: "#00cec9" },
          }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            centeredSlides
            loop
            slidesPerView={3}
            speed={800}
            autoplay={{ delay: 3200, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            coverflowEffect={{
              rotate: 0,
              stretch: -30,
              depth: 220,
              modifier: 1.2,
              slideShadows: false,
            }}
            resistanceRatio={0}
            style={sliderStyles}
            breakpoints={{
              0: { slidesPerView: 1.2, centeredSlides: true },
              900: { slidesPerView: 3, centeredSlides: true },
            }}
          >
            {[
              { title: "Goa Online Scam Awareness", url: "https://www.youtube.com/embed/llBcs4sGcZw", thumb: "imgs/safety1.png" },
              { title: "Protect Yourself from Cyber Frauds", url: "https://www.youtube.com/embed/gpjtMuxqzOQ", thumb: "imgs/safety2.jpg" },
              { title: "Goa Police Cyber Safety Tips", url: "https://www.youtube.com/embed/-ZtN5nSY2PA?start=19", thumb: "imgs/police2.png" },
              {title: "Goa Police Cyber Safety Tips", url: "https://www.youtube.com/embed/jIuVy80ygWg", thumb: "imgs/police1.png" },
              {title: "Cyber Safety", url: "https://www.youtube.com/embed/QwMAwP6oUJE", thumb: "imgs/safety3.png" },
            ].map((video, idx) => (
              <SwiperSlide key={idx}>
                <AnimatedCard
                  className="animated-card"
                  onClick={() => handleVideoOpen(video.url)}
                  sx={{ cursor: "pointer", position: "relative" }}
                >
                  <ShineOverlay className="shine-overlay" />
                  <ImageContainer sx={{ height: { xs: 240, md: 340, lg: 420 } }}>
                    <img
                      src={video.thumb}
                      alt={video.title}
                      className="card-image"
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                    />
                    <PlayCircleIcon
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: 64,
                        color: "white",
                        opacity: 0.85,
                      }}
                    />
                  </ImageContainer>
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}>
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                      Click to watch
                    </Typography>
                  </CardContent>
                </AnimatedCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

      <StyledDialog
  open={videoOpen}
  onClose={handleVideoClose}
  maxWidth="md"
  fullWidth
  sx={{
    "& .MuiDialog-paper": {
      width: "100%",
      maxWidth: "600px",  // square size (adjust as you like)
      borderRadius: "12px",
    },
  }}
>
  <Box sx={{ position: "relative" }}>
    <IconButton
      onClick={handleVideoClose}
      sx={{
        position: "absolute",
        top: 12,
        right: 12,
        color: "#fff",
        backgroundColor: "rgba(0,0,0,0.4)",
        "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        zIndex: 10,
      }}
    >
      <CloseIcon />
    </IconButton>

    {/* Square container for video */}
    <Box
      sx={{
        width: "100%",
        aspectRatio: "1 / 1",  // square ratio
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {selectedVideo && (
        <Box
          component="iframe"
          src={selectedVideo}
          width="100%"
          height="100%"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sx={{ border: "none" }}
        />
      )}
    </Box>
  </Box>
</StyledDialog>


{/* Password Checker and SMS Detector Section - REMOVE THE DUPLICATE */}

<Box
  sx={{
    gridColumn: "1 / -1",
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "1fr",
      md: "1fr 1fr"
    },
    gap: 2,
    mt: 3,
  }}
>
  <PasswordChecker />
  <SMSDetector />
  <SeniorSafety /> {/* Add this line */}
  <ChildSafety />
  
</Box>

        {/* Tips Section */}
<CenteredSection sx={{ mt: 10 }}>
  <SectionHeader
    id="tips"
    variant="h3"
    sx={{ fontWeight: 800, color: "secondary.main" }}
  >
    Security Tips
  </SectionHeader>
  <Typography
    variant="h6"
    color="text.secondary"
    sx={{ maxWidth: 600, mb: 4 }}
  >
    Essential cybersecurity practices to keep your data safe
  </Typography>
</CenteredSection>

        <Box
          sx={{
            width: "100%",
            maxWidth: 1400,
            overflow: "hidden",
            "& .swiper": { overflow: "visible" },
            "& .swiper-slide": {
              transition: "transform 0.5s ease, filter 0.5s ease, opacity 0.5s ease",
              filter: "brightness(0.85)",
              opacity: 0.85,
            },
            "& .swiper-slide-active": {
              zIndex: 3,
              filter: "brightness(1)",
              opacity: 1,
              transform: "scale(1.04)",
            },
            "& .swiper-button-prev, & .swiper-button-next": {
              color: "#fff",
              background: "rgba(0,0,0,0.35)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              backdropFilter: "blur(4px)",
            },
            "& .swiper-button-prev:hover, & .swiper-button-next:hover": {
              background: "rgba(0,0,0,0.6)",
            },
            "& .swiper-pagination-bullet": {
              background: "rgba(255,255,255,0.4)",
              opacity: 1,
            },
            "& .swiper-pagination-bullet-active": { background: "#00cec9" },
          }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            centeredSlides
            loop
            slidesPerView={3}
            speed={800}
            autoplay={{ delay: 2800, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            coverflowEffect={{
              rotate: 0,
              stretch: -30,
              depth: 220,
              modifier: 1.2,
              slideShadows: false,
            }}
            resistanceRatio={0}
            style={sliderStyles}
            breakpoints={{
              0: { slidesPerView: 1.2, centeredSlides: true },
              900: { slidesPerView: 3, centeredSlides: true },
            }}
          >
            {tips.map((item, idx) => (
              <SwiperSlide key={idx}>
                <AnimatedCard className="animated-card" onClick={() => handleOpen(item.img)} sx={{ cursor: "pointer" }}>
                  <ShineOverlay className="shine-overlay" />
                  <ImageContainer sx={{ height: { xs: 240, md: 340, lg: 420 } }}>
                    <img
                      src={item.img}
                      alt={`Tip ${idx + 1}`}
                      className="card-image"
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                    />
                  </ImageContainer>
                  <CardContent sx={{ p: 2.5, textAlign: "center" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Security Tip #{idx + 1}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Click to view full size
                    </Typography>
                  </CardContent>
                </AnimatedCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        

        {/* Dialog (popup for image) */}
        <StyledDialog open={open} onClose={handleClose} maxWidth="md">
          <Box sx={{ position: "relative" }}>
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                color: "#fff",
                backgroundColor: "rgba(0,0,0,0.4)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedImg && (
              <img
                src={selectedImg}
                alt="Security Tip"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "80vh",
                  objectFit: "contain",
                }}
              />
            )}
          </Box>
        </StyledDialog>

        {/* Useful Links Section */}
        <CenteredSection sx={{ mt: 10 }}>
          <SectionHeader
            id="links"
            variant="h3"
            sx={{ fontWeight: 800, color: "warning.main" }}
          >
            Useful Links
          </SectionHeader>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mb: 4 }}
          >
            Important resources for cyber security and reporting
          </Typography>
        </CenteredSection>

        <Box
          sx={{
            width: "100%",
            maxWidth: 1200,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
            mb: 10,
          }}
        >
          {usefulLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <LinkCard
                sx={{
                  "&:hover": {
                    boxShadow: `0 10px 20px ${link.color}40`,
                    border: `1px solid ${link.color}`,
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      color: link.color,
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {link.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 1, color: "white" }}
                  >
                    {link.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flexGrow: 1 }}
                  >
                    {link.description}
                  </Typography>
                </CardContent>
              </LinkCard>
            </a>
          ))}
        </Box>
      </Box>
      
    </>
  );
}

export default BentoGrid;
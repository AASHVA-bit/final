import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";
import { styled } from "@mui/material/styles";
import Fade from "@mui/material/Fade";

// Keyframe animations
const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(0, 206, 201, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 206, 201, 0.6);
  }
  100% {
    box-shadow: 0 0 5px rgba(0, 206, 201, 0.3);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const scan = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`;

// Styled components
const ThreatContainer = styled(Box)({
  position: "relative",
  borderRadius: 16,
  overflow: "hidden",
  border: "1px solid rgba(108, 92, 231, 0.3)",
  animation: `${glow} 3s ease-in-out infinite`,
});

const CornerOrnament = styled(Box)(({ position }) => ({
  position: "absolute",
  width: 30,
  height: 30,
  [position]: 0,
  border: `2px solid rgba(0, 206, 201, 0.5)`,
  zIndex: 5,
  ...(position.includes('top') && { borderBottom: 'none' }),
  ...(position.includes('bottom') && { borderTop: 'none' }),
  ...(position.includes('left') && { borderRight: 'none' }),
  ...(position.includes('right') && { borderLeft: 'none' }),
}));

const LiveIndicator = styled(Box)({
  position: "absolute",
  top: 16,
  right: 16,
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgba(255, 82, 82, 0.9)",
  padding: "4px 12px",
  borderRadius: 20,
  zIndex: 5,
  animation: `${pulse} 2s ease-in-out infinite`,
});

const StatBadge = styled(Box)(({ top, left, delay }) => ({
  position: "absolute",
  top: top,
  left: left,
  background: "linear-gradient(145deg, rgba(26,32,54,0.9) 0%, rgba(30,37,61,0.9) 100%)",
  border: "1px solid rgba(108, 92, 231, 0.3)",
  borderRadius: 12,
  padding: "8px 12px",
  display: "flex",
  alignItems: "center",
  zIndex: 5,
  animation: `${float} 4s ease-in-out infinite`,
  animationDelay: delay,
  backdropFilter: "blur(4px)",
}));

const SectionHeader = styled(Typography)({
  position: "relative",
  display: "inline-block",
  paddingBottom: "8px",
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

const ScanLine = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "2px",
  background: "linear-gradient(90deg, transparent, rgba(0, 206, 201, 0.8), transparent)",
  zIndex: 4,
  animation: `${scan} 3s linear infinite`,
});

function ThreatMap() {
  const [stats, setStats] = useState({
    attacks: 1247,
    countries: 86,
    malware: 342,
    phishing: 589
  });

  // Update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        attacks: prev.attacks + Math.floor(Math.random() * 10),
        countries: prev.countries,
        malware: prev.malware + Math.floor(Math.random() * 3),
        phishing: prev.phishing + Math.floor(Math.random() * 5)
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Fade in timeout={1000}>
      <Box id="threatmap" sx={{ px: { xs: 2, md: 8 }, pt: -2, pb: 4 }}>
  <Box sx={{ textAlign: "center", mb: 2 }}>
          <SectionHeader variant="h3" sx={{ 
            fontWeight: 800, 
            mb: 1, 
            color: "primary.main",
          }}>
            Live Threat Map
          </SectionHeader>
          <Typography variant="h6" sx={{ color: "text.secondary", maxWidth: 600, mx: "auto", mt: 2 }}>
            Real-time visualization of global cyber threats and attack patterns
          </Typography>
        </Box>
        
        <ThreatContainer sx={{ 
          width: "100%", 
          height: { xs: 300, md: 500 },
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
        }}>
          {/* Corner ornaments */}
          <CornerOrnament position="top left" />
          <CornerOrnament position="top right" />
          <CornerOrnament position="bottom left" />
          <CornerOrnament position="bottom right" />
          
          {/* Scanning line effect */}
          <ScanLine />
          
          {/* Live indicator */}
          <LiveIndicator>
            <Box sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#fff",
              mr: 1,
              animation: `${pulse} 1s ease-in-out infinite`
            }} />
            <Typography variant="caption" sx={{ color: "#fff", fontWeight: 600 }}>
              LIVE
            </Typography>
          </LiveIndicator>
          
         
          {/* The original iframe */}
          <Box sx={{ 
            width: "100%", 
            height: "100%", 
            borderRadius: 3, 
            overflow: "hidden", 
            position: "relative",
            zIndex: 2
          }}>
            <iframe
              src="https://threatmap.checkpoint.com/"
              title="Live Threat Map"
              width="100%"
              height="100%"
              style={{ border: "none" }}
              allowFullScreen
            />
          </Box>
        </ThreatContainer>
        
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          mt: 3, 
          gap: 3,
          flexWrap: "wrap" 
        }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: "50%", 
              backgroundColor: "#ff5252", 
              mr: 1,
              animation: `${pulse} 2s ease-in-out infinite` 
            }} />
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
              High Severity
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: "50%", 
              backgroundColor: "#ffb142", 
              mr: 1,
              animation: `${pulse} 2s ease-in-out infinite`,
              animationDelay: "0.5s"
            }} />
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
              Medium Severity
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: "50%", 
              backgroundColor: "#1e90ff", 
              mr: 1,
              animation: `${pulse} 2s ease-in-out infinite`,
              animationDelay: "1s"
            }} />
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
              Low Severity
            </Typography>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}

export default ThreatMap;
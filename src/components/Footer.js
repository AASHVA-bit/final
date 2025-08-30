import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { keyframes } from "@mui/system";
import { styled } from "@mui/material/styles";
import GitHubIcon from '@mui/icons-material/GitHub';
import SecurityIcon from '@mui/icons-material/Security';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';


// Keyframe animations
const glow = keyframes`
  0% {
    text-shadow: 0 0 5px rgba(0, 206, 201, 0.5);
  }
  50% {
    text-shadow: 0 0 15px rgba(0, 206, 201, 0.8);
  }
  100% {
    text-shadow: 0 0 5px rgba(0, 206, 201, 0.5);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
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

// Styled components
const AnimatedFooter = styled(Box)({
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(0, 206, 201, 0.5), transparent)",
  },
});

const ContributorLink = styled(Link)({
  display: "inline-flex",
  alignItems: "center",
  position: "relative",
  transition: "all 0.3s ease",
  padding: "6px 12px",
  borderRadius: "8px",
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    width: "0",
    height: "2px",
    background: "linear-gradient(90deg, transparent, #00cec9, transparent)",
    transition: "all 0.3s ease",
    transform: "translateX(-50%)",
  },
  "&:hover": {
    backgroundColor: "rgba(0, 206, 201, 0.1)",
    transform: "translateY(-2px)",
    "&::before": {
      width: "100%",
    },
  },
});

const CyberPattern = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundImage: `
    linear-gradient(rgba(108, 92, 231, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(108, 92, 231, 0.05) 1px, transparent 1px)
  `,
  backgroundSize: "20px 20px",
  pointerEvents: "none",
  zIndex: 0,
});

const OrnamentDot = styled(Box)(({ position, size, delay }) => ({
  position: "absolute",
  [position]: "20px",
  width: size,
  height: size,
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(0, 206, 201, 0.3) 0%, transparent 70%)",
  animation: `${pulse} 3s ease-in-out infinite`,
  animationDelay: delay,
  zIndex: 0,
}));

function Footer() {
  const contributors = [
    { name: "Rohan", url: "https://github.com/Rohan-Zara" },
    { name: "Nirbhay", url: "https://github.com/24nirbhay" },
   /* { name: "Akash", url: "https://github.com/akash-0304" }*/,
    { name: "Aashva", url: "https://github.com/AASHVA-bit" }
  ];

  return (
    <AnimatedFooter
      component="footer"
      sx={{
        mt: "auto",
        py: 5,
        textAlign: "center",
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        position: "relative",
      }}
    >
      <CyberPattern />
      
      {/* Decorative elements */}
      <OrnamentDot position="top" size="60px" delay="0s" />
      <OrnamentDot position="bottom" size="40px" delay="1s" />
      <OrnamentDot position="left" size="50px" delay="0.5s" />
      <OrnamentDot position="right" size="30px" delay="1.5s" />
      
      {/* Main footer content */}
      <Box position="relative" zIndex={1}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
          
          <LocationOnIcon sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }} />
          <a href="https://maps.app.goo.gl/DAVaXU9CmCZoYYrbA">
          <Typography variant="body2" color="text.secondary">
            DNA GOA
          </Typography> </a> 
        </Box>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
      <CallIcon sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }} />
      <Typography variant="body2" color="text.secondary">
        08326747575
      </Typography>
    </Box>

        {/* Contributors section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2, fontWeight: 600 }}>
            DEVELOPED BY
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1.5 }}>
            {contributors.map((contributor, index) => (
              <ContributorLink
                key={contributor.name}
                href={contributor.url}
                target="_blank"
                rel="noopener noreferrer"
                color="text.secondary"
                sx={{ 
                  animation: `${float} 4s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <GitHubIcon sx={{ fontSize: 20, mr: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {contributor.name}
                </Typography>
              </ContributorLink>
            ))}
          </Box>
        </Box>
      </Box>
    </AnimatedFooter>
  );
}

export default Footer;
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import { useTheme } from "@mui/system";
import { motion } from "framer-motion";

function Hero() {
  const theme = useTheme();

  return (
    <Fade in timeout={800}>
      <Box
        id="home"
        sx={{
          position: "relative",
          overflow: "hidden",
          minHeight: "90vh", // Bigger hero
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: theme.palette.text.primary,
          background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.background.default} 100%)`,
          zIndex: 1,
        }}
      >
        {/* Background overlay grid */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(${theme.palette.secondary.main} 1px, transparent 1px),
              linear-gradient(90deg, ${theme.palette.secondary.main} 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            opacity: 0.15,
            zIndex: 0,
          }}
        />

        {/* Gradient fade bottom to blend with next container */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "120px",
            background: `linear-gradient(180deg, transparent, ${theme.palette.background.default})`,
            zIndex: 2,
          }}
        />

        {/* Floating orb accents */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          style={{
            position: "absolute",
            top: "20%",
            left: "15%",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.palette.secondary.light} 0%, transparent 70%)`,
            boxShadow: `0 0 15px ${theme.palette.secondary.main}`,
          }}
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "70%",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.palette.primary.light} 0%, transparent 70%)`,
            boxShadow: `0 0 15px ${theme.palette.primary.main}`,
          }}
        />

        {/* Hero Content */}
        <Box position="relative" zIndex={3} px={2}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              color: theme.palette.common.white,
              textShadow: `0px 2px 8px rgba(0,0,0,0.4)`, // professional subtle shadow
            }}
          >
            Stay Ahead of Cyber Threats
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              opacity: 0.9,
              color: theme.palette.grey[200],
            }}
          >
            Learn, Protect, and Respond with Confidence.
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
}

export default Hero;

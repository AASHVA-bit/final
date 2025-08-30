import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";
import NewsSection from "./components/NewsSection";
import PasswordChecker from "./components/PasswordChecker";
import SMSDetector from "./components/SMSDetector";
import ThreatMap from "./components/ThreatMap";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { 
      main: "#6c5ce7",       // Vibrant purple
      light: "#837dff",
      dark: "#4e3fb4"
    },
    secondary: { 
      main: "#00cec9",       // Teal accent
      light: "#5efff5",
      dark: "#009d97"
    },
    error: { main: "#ff5252" },
    warning: { main: "#ffb142" },
    info: { main: "#3498db" },
    success: { main: "#2ed573" },
    background: { 
      default: "#0f1423",    // Deep blue-black
      paper: "#1a2036"       // Slightly lighter blue
    },
    text: {
      primary: "#ffffff",
      secondary: "#b2bec3"
    }
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    fontWeightBold: 800,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'linear-gradient(to bottom right, #1a2036, #1e253d)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: "100vh", 
        bgcolor: "background.default",
        backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(108, 92, 231, 0.1) 0%, transparent 25%), radial-gradient(circle at 85% 30%, rgba(0, 206, 201, 0.08) 0%, transparent 25%)',
        backgroundAttachment: 'fixed'
      }}>
        <Navbar />
        <Hero />
        <BentoGrid />
        <ThreatMap />
        <NewsSection />
        <Chatbot />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
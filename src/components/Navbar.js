import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";

// Styled components for enhanced visuals
const GlowButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  fontSize: "1rem",   // 🔥 increased font size for desktop
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '0%',
    height: '2px',
    backgroundColor: theme.palette.secondary.main,
    transition: 'all 0.3s ease',
    transform: 'translateX(-50%)',
  },
  '&:hover::after': {
    width: '80%',
  },
  margin: '0 6px',
  borderRadius: '20px',
  padding: '6px 18px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 206, 201, 0.1)',
    transform: 'translateY(-2px)',
  }
}));

const AnimatedAppBar = styled(AppBar)({
  background: 'linear-gradient(90deg, rgba(26,32,54,0.95) 0%, rgba(26,32,54,0.98) 100%)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(108, 92, 231, 0.3)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
});

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = ["Home", "Attacks", "Tips", "News", "Threat Map"];

  return (
    <AnimatedAppBar position="sticky" elevation={0}>
      <Toolbar>
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
  <img 
    src="imgs/logo.jpg"
    alt="Company Logo"
    style={{ 
      height: 52, 
      marginRight: 12, 
      borderRadius: 12,
      padding: "4px",                     // gives a little breathing space
      background: "rgba(255,255,255,0.05)", // faint background so it melts into navbar
      boxShadow: "0 0 2px rgba(108,92,231,0.3)", // subtle purple glow
      backdropFilter: "blur(8px)",        // smooth blend
    }}
  />
</Box>


        {/* Mobile menu (visible on extra-small screens) */}
        <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            sx={{
              border: '1px solid rgba(108, 92, 231, 0.3)',
              borderRadius: '8px'
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
              '& .MuiPaper-root': {
                backgroundColor: 'background.paper',
                backgroundImage: 'none',
                borderRadius: '12px',
                marginTop: '8px',
                border: '1px solid rgba(108, 92, 231, 0.2)',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            {pages.map((page) => (
              <MenuItem 
                key={page} 
                onClick={handleCloseNavMenu}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(108, 92, 231, 0.1)'
                  }
                }}
              >
                <Button 
                  color="inherit" 
                  component="a" 
                  href={`#${page.toLowerCase().replace(' ', '')}`}
                  fullWidth
                  sx={{ 
                    justifyContent: 'flex-start',
                    color: 'text.primary',
                    fontSize: "1rem" // 🔥 increased font size in mobile menu
                  }}
                >
                  {page}
                </Button>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Desktop navigation links (visible on medium and up screens) */}
        <Box sx={{ 
          display: { xs: "none", md: "flex" },
          alignItems: 'center'
        }}>
          {pages.map((page) => (
            <GlowButton
              key={page}
              color="inherit"
              component="a"
              href={`#${page.toLowerCase().replace(' ', '')}`}
            >
              {page}
            </GlowButton>
          ))}
        </Box>
      </Toolbar>
    </AnimatedAppBar>
  );
}

export default Navbar;

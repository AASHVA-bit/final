// src/components/PasswordChecker.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  LinearProgress,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { keyframes, styled } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 206, 201, 0.3); }
  50% { box-shadow: 0 0 20px rgba(0, 206, 201, 0.6); }
  100% { box-shadow: 0 0 5px rgba(0, 206, 201, 0.3); }
`;

const AnimatedPaper = styled(Paper)({
  padding: "28px",
  background: "linear-gradient(145deg, rgba(26,32,54,0.95), rgba(30,37,61,0.95))",
  border: "1px solid rgba(108, 92, 231, 0.3)",
  animation: `${glow} 3s ease-in-out infinite`,
  borderRadius: "18px",
  maxWidth: "100%",
});

const StrengthBar = styled(LinearProgress)(({ strength }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: "rgba(255,255,255,0.1)",
  "& .MuiLinearProgress-bar": {
    transition: "all 0.5s ease",
    backgroundColor:
      strength === "weak"
        ? "#ff4757"
        : strength === "medium"
        ? "#ffa502"
        : strength === "strong"
        ? "#2ed573"
        : strength === "very_strong"
        ? "#00cec9"
        : "#1e90ff",
    boxShadow: "0 0 8px rgba(0, 206, 201, 0.6)",
  },
}));

function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({ score: 0, feedback: [] });
  const [showPassword, setShowPassword] = useState(false);

  const checkPasswordStrength = (value) => {
    let score = 0;
    const feedback = [];

    if (value.length >= 8) score += 1;
    else feedback.push("Use at least 8 characters");

    if (/[A-Z]/.test(value)) score += 1;
    else feedback.push("Include uppercase letters");

    if (/[0-9]/.test(value)) score += 1;
    else feedback.push("Include numbers");

    if (/[^A-Za-z0-9]/.test(value)) score += 1;
    else feedback.push("Include special characters");

    if (value.length >= 12) score += 1;

    setStrength({ score, feedback });
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    checkPasswordStrength(value);
  };

  const getStrengthLabel = () => {
    if (password.length === 0) return "Enter a password";
    if (strength.score <= 1) return "Weak";
    if (strength.score <= 3) return "Medium";
    if (strength.score === 4) return "Strong";
    return "Very Strong";
  };

  const getStrengthValue = () => (strength.score / 5) * 100;
  const getStrengthKey = () => getStrengthLabel().toLowerCase().replace(" ", "_");

  return (
    <AnimatedPaper elevation={3}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 900,
          color: "primary.main",
          textAlign: "center",
          mb: 4,
          letterSpacing: "0.5px",
        }}
      >
        🔐 Password Strength Checker
      </Typography>

      {/* Input */}
      <TextField
        fullWidth
        type={showPassword ? "text" : "password"}
        label="Enter your password"
        value={password}
        onChange={handlePasswordChange}
        variant="outlined"
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            fontSize: "1rem",
            borderRadius: "10px",
            "& fieldset": {
              borderColor: "rgba(108, 92, 231, 0.3)",
            },
            "&:hover fieldset": {
              borderColor: "#6c5ce7",
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                sx={{
                  color: "#00cec9",
                  "&:hover": { color: "#6c5ce7" },
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Strength Indicator */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Strength: {getStrengthLabel()}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {Math.round(getStrengthValue())}%
          </Typography>
        </Box>
        <StrengthBar
          variant="determinate"
          value={getStrengthValue()}
          strength={getStrengthKey()}
        />
      </Box>

      {/* Suggestions */}
      {strength.feedback.length > 0 && (
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ mb: 1, fontWeight: 700, color: "secondary.main" }}
          >
            Suggestions:
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              color: "text.secondary",
              lineHeight: 1.6,
              fontSize: "0.95rem",
            }}
          >
            {strength.feedback.map((item, index) => (
              <li key={index}>
                <Typography variant="body2">{item}</Typography>
              </li>
            ))}
          </Box>
        </Box>
      )}

      {/* Success Message */}
      {strength.score >= 4 && (
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: "rgba(46, 213, 115, 0.1)",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: strength.score === 5 ? "#00cec9" : "#2ed573",
              fontWeight: 700,
              textShadow:
                strength.score === 5
                  ? "0 0 10px rgba(0,206,201,0.8)"
                  : "0 0 6px rgba(46,213,115,0.5)",
            }}
          >
            ✓ {strength.score === 5
              ? "Excellent! Very strong password"
              : "Great! Secure password"}
          </Typography>
        </Box>
      )}
    </AnimatedPaper>
  );
}

export default PasswordChecker;

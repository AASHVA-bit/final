// src/components/SMSDetector.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Collapse,
  Grid,
} from "@mui/material";
import {
  Security as SecurityIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";

const SMSDetector = () => {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const fraudPatterns = {
    financial: {
      keywords: ["bank", "account", "card", "payment", "transaction", "suspended", "frozen", "refund", "tax", "irs"],
      weight: 3,
      description: "Financial scam indicators",
    },
    urgency: {
      keywords: ["urgent", "immediate", "expires", "act now", "limited time", "hurry", "asap", "emergency"],
      weight: 2,
      description: "Urgency tactics",
    },
    prizes: {
      keywords: ["win", "won", "winner", "lottery", "prize", "congratulations", "selected", "lucky", "reward"],
      weight: 3,
      description: "Prize/lottery scams",
    },
    personal: {
      keywords: ["password", "pin", "ssn", "social security", "verify", "confirm", "update", "details"],
      weight: 4,
      description: "Personal information requests",
    },
    links: {
      keywords: ["click here", "link", "www", "http", "bit.ly", "tinyurl", "download"],
      weight: 2,
      description: "Suspicious links",
    },
    authority: {
      keywords: ["police", "government", "court", "legal", "arrest", "lawsuit", "fine", "penalty"],
      weight: 3,
      description: "Fake authority claims",
    },
  };

  const suspiciousPatterns = [
    /\b\d{4}\s*-?\s*\d{4}\s*-?\s*\d{4}\s*-?\s*\d{4}\b/, // Credit card
    /\b\d{3}\s*-?\s*\d{2}\s*-?\s*\d{4}\b/, // SSN
    /call\s+\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/i, // Phone number
    /reply\s+(stop|yes|y)\s+to/i, // Reply traps
    /\$\d+/g, // Money
  ];

  const checkFraud = async () => {
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const lowerMessage = message.toLowerCase();
    let riskScore = 0;
    let foundIssues = [];
    let patternMatches = [];

    Object.entries(fraudPatterns).forEach(([_, pattern]) => {
      const foundWords = pattern.keywords.filter((word) => lowerMessage.includes(word.toLowerCase()));
      if (foundWords.length > 0) {
        riskScore += pattern.weight * foundWords.length;
        foundIssues.push({
          category: pattern.description,
          words: foundWords,
          severity: pattern.weight,
        });
      }
    });

    suspiciousPatterns.forEach((pattern, index) => {
      if (pattern.test(message)) {
        riskScore += 2;
        const patternNames = [
          "Credit card number detected",
          "SSN pattern detected",
          "Suspicious phone number",
          "Reply trap detected",
          "Money amount mentioned",
        ];
        patternMatches.push(patternNames[index]);
      }
    });

    if (message.length < 50) riskScore += 1;
    if (/[A-Z]{5,}/.test(message)) riskScore += 1;
    if ((message.match(/!/g) || []).length > 2) riskScore += 1;

    setResult({
      score: riskScore,
      issues: foundIssues,
      patterns: patternMatches,
      level: riskScore >= 8 ? "high" : riskScore >= 4 ? "medium" : riskScore >= 1 ? "low" : "safe",
    });

    setIsAnalyzing(false);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "info";
      default:
        return "success";
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case "high":
        return <WarningIcon />;
      case "medium":
        return <WarningIcon />;
      case "low":
        return <VisibilityIcon />;
      default:
        return <CheckCircleIcon />;
    }
  };

  const getRiskMessage = (level, score) => {
    switch (level) {
      case "high":
        return `HIGH RISK - Strong fraud indicators (Risk Score: ${score})`;
      case "medium":
        return `MEDIUM RISK - Suspicious elements (Risk Score: ${score})`;
      case "low":
        return `LOW RISK - Minor concerns (Risk Score: ${score})`;
      default:
        return `SAFE - No fraud indicators detected`;
    }
  };

  const exampleMessages = [
    "CONGRATULATIONS! You've WON $5000! Click here to claim your prize now!",
    "Your bank account has been suspended. Verify your details immediately.",
    "Hey, are we still meeting for lunch tomorrow?",
  ];

  return (
    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        SMS Fraud Detector
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Protect yourself from SMS scams with AI-powered detection
      </Typography>

      {/* Input */}
      <TextField
        multiline
        rows={4}
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter SMS to analyze..."
        sx={{ mb: 2 }}
      />
      <Button
        onClick={checkFraud}
        disabled={!message.trim() || isAnalyzing}
        variant="contained"
        fullWidth
        startIcon={<SecurityIcon />}
      >
        {isAnalyzing ? "Analyzing..." : "Analyze Message"}
      </Button>

      {/* Results */}
      {result && (
        <Collapse in={true} sx={{ mt: 3, mb: 3 }}>
          <Alert severity={getRiskColor(result.level)} icon={getRiskIcon(result.level)} sx={{ alignItems: "center" }}>
            <Box>
              <Typography variant="body1" fontWeight="bold">
                {getRiskMessage(result.level, result.score)}
              </Typography>
            </Box>
          </Alert>
        </Collapse>
      )}

      {/* Example Messages */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Try These Examples:
        </Typography>
        <Grid container spacing={2}>
          {exampleMessages.map((example, index) => (
            <Grid item xs={12} key={index}>
              <Paper
                onClick={() => setMessage(example)}
                sx={{
                  p: 2,
                  cursor: "pointer",
                  "&:hover": { borderColor: "primary.main", boxShadow: 2 },
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Example {index + 1}:
                </Typography>
                <Typography variant="body1">{example}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default SMSDetector;

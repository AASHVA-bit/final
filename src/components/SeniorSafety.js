import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Fade,
  Zoom,
  Slide
} from "@mui/material";
import {
  Phone,
  Warning,
  Security,
  Help,
  Close,
  VolunteerActivism,
  Shield,
  Report,
  CheckCircle,
   ChildCare // 👶 for Child Safety
} from "@mui/icons-material";
import ElderlyIcon from "@mui/icons-material/Elderly";
import { keyframes, styled } from "@mui/material/styles";

// Animation keyframes
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(59, 89, 152, 0.5); }
  50% { box-shadow: 0 0 20px rgba(59, 89, 152, 0.8); }
  100% { box-shadow: 0 0 5px rgba(59, 89, 152, 0.5); }
`;

// Styled components
const SeniorCard = styled(Card)({
  background:
    "linear-gradient(145deg, rgba(59, 89, 152, 0.95) 0%, rgba(66, 103, 178, 0.95) 100%)",
  borderRadius: 16,
  border: "2px solid rgba(255, 255, 255, 0.3)",
  color: "white",
  animation: `${glow} 3s ease-in-out infinite`,
  "& .MuiTypography-h5": {
    fontSize: "1.5rem",
    fontWeight: 700
  },
  "& .MuiTypography-body1": {
    fontSize: "1.1rem"
  },
  "& .MuiButton-root": {
    fontSize: "1.1rem",
    padding: "10px 20px",
    borderRadius: 10,
    transition: "all 0.3s ease",
    "&:hover": {
      animation: `${pulse} 0.5s ease-in-out`
    }
  }
});

const BigButton = styled(Button)({
  fontSize: "1.2rem !important",
  padding: "12px 24px !important",
  margin: "8px !important",
  minWidth: "200px !important",
  animation: `${float} 3s ease-in-out infinite`
});

const AnimatedIcon = styled(Box)({
  animation: `${pulse} 2s ease-in-out infinite`,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center"
});

function SeniorSafetyContent() {
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [preventionDialogOpen, setPreventionDialogOpen] = useState(false);

  const commonScams = [
    {
      title: "Tech Support Scams",
      description:
        "Fake calls claiming your computer has viruses and requesting remote access or payment.",
      icon: <Warning color="error" />
    },
    {
      title: "Grandparent Scams",
      description:
        "Callers pretending to be grandchildren in emergency situations needing money immediately.",
      icon: <VolunteerActivism color="warning" />
    },
    {
      title: "Lottery/Prize Scams",
      description:
        "Notifications that you've won a prize but need to pay fees or taxes to claim it.",
      icon: <Report color="info" />
    },
    {
      title: "Romance Scams",
      description:
        "Online relationships where the person eventually asks for money for emergencies or travel.",
      icon: <VolunteerActivism color="secondary" />
    },
    {
      title: "Government Impersonation",
      description:
        "Callers pretending to be from government agencies demanding immediate payment or personal information.",
      icon: <Security color="error" />
    }
  ];

  const preventionTips = [
    "Never share personal information, passwords, or banking details with unknown callers",
    "Verify any emergency situation by calling family members directly using known numbers",
    "Remember: legitimate organizations never demand immediate payment via gift cards or wire transfers",
    "If something sounds too good to be true, it probably is",
    "Register your number on the National Do Not Call Registry",
    "Set up call screening features on your phone",
    "Talk to family members before making large financial decisions",
    "Keep your computer and phone software updated regularly"
  ];

  return (
    <SeniorCard>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
  <AnimatedIcon>
    <ElderlyIcon sx={{ fontSize: 36, mr: 1.5, color: "gold" }} />
  </AnimatedIcon>
  <Typography variant="h5" gutterBottom>
    Senior Safety Assistant
  </Typography>
</Box>


        <Fade in={true} timeout={1500}>
          <Typography variant="body1" paragraph>
            Specialized information and resources to help seniors stay safe from
            online threats and scams.
          </Typography>
        </Fade>

        <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
          <Slide direction="right" in={true} timeout={800}>
            <BigButton
              variant="contained"
              color="primary"
              startIcon={<Help />}
              onClick={() => setHelpDialogOpen(true)}
              sx={{ mb: 2 }}
            >
              Common Scams
            </BigButton>
          </Slide>

          <Slide direction="right" in={true} timeout={1000}>
            <BigButton
              variant="contained"
              color="secondary"
              startIcon={<Shield />}
              onClick={() => setPreventionDialogOpen(true)}
              sx={{ mb: 2 }}
            >
              Prevention Tips
            </BigButton>
          </Slide>

          <Slide direction="right" in={true} timeout={1200}>
            <BigButton
              variant="contained"
              color="success"
              startIcon={<Phone />}
              onClick={() => window.open("tel:1930")}
            >
              Emergency Helpline: 1930
            </BigButton>
          </Slide>
        </Box>

        <Fade in={true} timeout={2000}>
          <Box
            mt={3}
            p={2}
            sx={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 2
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              Important Contacts:
            </Typography>
            <Typography variant="body2">
              • National Cyber Crime Helpline: <strong>1930</strong>
              <br />
              • Police: <strong>100</strong>
              <br />
              • Senior Citizen Helpline: <strong>1090</strong>
              <br />
              • Cyber Crime Portal: <strong>cybercrime.gov.in</strong>
            </Typography>
          </Box>
        </Fade>
      </CardContent>

      {/* Common Scams Dialog */}
      <Dialog
        open={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Fade}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Warning color="warning" sx={{ mr: 1 }} />
            Common Scams Targeting Seniors
            <IconButton
              aria-label="close"
              onClick={() => setHelpDialogOpen(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <List>
            {commonScams.map((scam, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>{scam.icon}</ListItemIcon>
                  <ListItemText
                    primary={scam.title}
                    secondary={scam.description}
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
                {index < commonScams.length - 1 && (
                  <Divider variant="inset" />
                )}
              </React.Fragment>
            ))}
          </List>
          <Alert severity="info" sx={{ mt: 2 }}>
            <strong>Remember:</strong> Always verify unexpected requests for
            money or information by contacting the organization directly using
            official phone numbers from their website.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHelpDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Prevention Tips Dialog */}
      <Dialog
        open={preventionDialogOpen}
        onClose={() => setPreventionDialogOpen(false)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Fade}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Shield color="success" sx={{ mr: 1 }} />
            Prevention Tips for Seniors
            <IconButton
              aria-label="close"
              onClick={() => setPreventionDialogOpen(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <List>
            {preventionTips.map((tip, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary={tip} />
                </ListItem>
                {index < preventionTips.length - 1 && (
                  <Divider variant="inset" />
                )}
              </React.Fragment>
            ))}
          </List>
          <Alert severity="success" sx={{ mt: 2 }}>
            <strong>Stay protected:</strong> Share this information with friends
            and family. Awareness is the best defense against scams.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreventionDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </SeniorCard>
  );
}

// Wrapper with button to open the card
export default function SeniorSafety() {
  const [open, setOpen] = useState(false);

  return (
    <Box textAlign="center" mt={5}>
      <Button
  variant="contained"
  size="large"
  startIcon={<ElderlyIcon />}   // 👴 Senior citizen icon
  onClick={() => setOpen(true)}
>
  Senior Safety Assistant
</Button>


      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Zoom}
      >
        <DialogContent sx={{ p: 0 }}>
          <SeniorSafetyContent />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

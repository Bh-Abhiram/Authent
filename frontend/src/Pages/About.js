import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Cyber Security Dashboard
          </Typography>
          <Button
            component={Link}
            to="/dashboard"
            color={location.pathname === "/dashboard" ? "secondary" : "inherit"}
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/learn"
            color={location.pathname === "/learn" ? "secondary" : "inherit"}
          >
            Learn
          </Button>
          <Button
            component={Link}
            to="/news"
            color={location.pathname === "/news" ? "secondary" : "inherit"}
          >
            News
          </Button>
          <Button
            component={Link}
            to="/about"
            color={location.pathname === "/about" ? "secondary" : "inherit"}
          >
            About
          </Button>
          <Button
            component={Link}
            to="/contact"
            color={location.pathname === "/contact" ? "secondary" : "inherit"}
          >
            Contact
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            sx={{ ml: 2 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* About Content */}
      <Container maxWidth="md">
        <Box mt={5} mb={3} textAlign="center">
          <Typography variant="h4" gutterBottom>
            About Cyber Security Dashboard
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Empowering learners to master cybersecurity concepts, attacks, and defenses.
          </Typography>
        </Box>

        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 4,
            p: 3,
            mb: 5,
            background:
              "linear-gradient(135deg, #E0F7FA, #E1BEE7)"
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🚀 Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              The Cyber Security Dashboard is designed for students, professionals, and enthusiasts who want to stay informed about the latest cybersecurity attacks, breaches, protocols, and defensive techniques.
            </Typography>
            <Typography variant="body1" paragraph>
              Learn through curated content, interactive tools, and real-world news updates to strengthen your knowledge and protect digital assets.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

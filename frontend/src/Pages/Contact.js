import React, { useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  TextField,
  Card,
  CardContent
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.message) {
    toast.error("Please fill out all fields!");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/contact", form);
    toast.success(res.data.message);
    setForm({ name: "", email: "", message: "" });
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Failed to send message.");
  }
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

      {/* Contact Content */}
      <Container maxWidth="sm">
        <Box mt={5} mb={3} textAlign="center">
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Have questions or suggestions? We’d love to hear from you!
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 3, boxShadow: 4, p: 3 }}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Your Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                type="submit"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

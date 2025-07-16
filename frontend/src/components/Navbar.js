import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation(); // to get current path
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Cyber Security Dashboard
        </Typography>

        {/* Dashboard */}
        <Button
          component={Link}
          to="/dashboard"
          color={location.pathname === "/dashboard" ? "secondary" : "inherit"}
        >
          Dashboard
        </Button>

        {/* Learn */}
        <Button
          component={Link}
          to="/learn"
          color={location.pathname === "/learn" ? "secondary" : "inherit"}
        >
          Learn
        </Button>

        {/* News (missing earlier) */}
        <Button
          component={Link}
          to="/news"
          color={location.pathname === "/news" ? "secondary" : "inherit"}
        >
          News
        </Button>

        {/* About */}
        <Button
          component={Link}
          to="/about"
          color={location.pathname === "/about" ? "secondary" : "inherit"}
        >
          About
        </Button>
        {/*Contact */}
        <Button
          component={Link}
          to="/contact"
          color={location.pathname === "/contact" ? "secondary" : "inherit"}
        >
          Contact
        </Button>
        {/* Logout */}
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
  );
}

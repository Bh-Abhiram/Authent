import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const protocolData = [
  {
    name: "HTTP",
    fullForm: "HyperText Transfer Protocol",
    ports: "80",
    tcpUdp: "TCP",
    usage: "Web browsing (unencrypted)",
    category: "Web Protocol"
  },
  {
    name: "HTTPS",
    fullForm: "HyperText Transfer Protocol Secure",
    ports: "443",
    tcpUdp: "TCP",
    usage: "Secure web browsing",
    category: "Web Protocol"
  },
  {
    name: "FTP",
    fullForm: "File Transfer Protocol",
    ports: "20, 21",
    tcpUdp: "TCP",
    usage: "File transfers between systems",
    category: "File Transfer"
  },
  {
    name: "SFTP",
    fullForm: "SSH File Transfer Protocol",
    ports: "22",
    tcpUdp: "TCP",
    usage: "Secure file transfers over SSH",
    category: "File Transfer"
  },
  {
    name: "DNS",
    fullForm: "Domain Name System",
    ports: "53",
    tcpUdp: "TCP/UDP",
    usage: "Resolves domain names to IP addresses",
    category: "Networking"
  },
  {
    name: "DHCP",
    fullForm: "Dynamic Host Configuration Protocol",
    ports: "67, 68",
    tcpUdp: "UDP",
    usage: "Assigns IP addresses to devices",
    category: "Networking"
  },
  {
    name: "SSH",
    fullForm: "Secure Shell",
    ports: "22",
    tcpUdp: "TCP",
    usage: "Secure remote login",
    category: "Security"
  },
  {
    name: "Telnet",
    fullForm: "Teletype Network",
    ports: "23",
    tcpUdp: "TCP",
    usage: "Unsecure remote login",
    category: "Security"
  },
  {
    name: "SMTP",
    fullForm: "Simple Mail Transfer Protocol",
    ports: "25, 587, 465",
    tcpUdp: "TCP",
    usage: "Sending emails",
    category: "Email Protocol"
  },
  {
    name: "IMAP",
    fullForm: "Internet Message Access Protocol",
    ports: "143, 993",
    tcpUdp: "TCP",
    usage: "Retrieving emails from server",
    category: "Email Protocol"
  },
  {
    name: "POP3",
    fullForm: "Post Office Protocol v3",
    ports: "110, 995",
    tcpUdp: "TCP",
    usage: "Downloading emails from server",
    category: "Email Protocol"
  },
  {
    name: "SNMP",
    fullForm: "Simple Network Management Protocol",
    ports: "161, 162",
    tcpUdp: "UDP",
    usage: "Network device monitoring",
    category: "Networking"
  },
  {
    name: "NTP",
    fullForm: "Network Time Protocol",
    ports: "123",
    tcpUdp: "UDP",
    usage: "Synchronizing clocks across networks",
    category: "Networking"
  },
  {
    name: "RDP",
    fullForm: "Remote Desktop Protocol",
    ports: "3389",
    tcpUdp: "TCP",
    usage: "Access Windows desktops remotely",
    category: "Remote Access"
  },
  {
    name: "LDAP",
    fullForm: "Lightweight Directory Access Protocol",
    ports: "389, 636",
    tcpUdp: "TCP/UDP",
    usage: "Directory service access",
    category: "Networking"
  },
  {
    name: "SMB",
    fullForm: "Server Message Block",
    ports: "445",
    tcpUdp: "TCP",
    usage: "File and printer sharing",
    category: "File Sharing"
  },
  {
    name: "ICMP",
    fullForm: "Internet Control Message Protocol",
    ports: "N/A",
    tcpUdp: "N/A",
    usage: "Diagnostics and error reporting",
    category: "Networking"
  },
  {
    name: "TFTP",
    fullForm: "Trivial File Transfer Protocol",
    ports: "69",
    tcpUdp: "UDP",
    usage: "Simple, unsecure file transfers",
    category: "File Transfer"
  },
  {
    name: "Kerberos",
    fullForm: "Kerberos Authentication Protocol",
    ports: "88",
    tcpUdp: "TCP/UDP",
    usage: "Network authentication",
    category: "Security"
  }
];

export default function Learn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredData = protocolData.filter((protocol) =>
    protocol.name.toLowerCase().includes(search.toLowerCase()) ||
    protocol.fullForm.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Cyber Security Dashboard
          </Typography>
          <Button
            color={location.pathname === "/dashboard" ? "secondary" : "inherit"}
            component={Link}
            to="/dashboard"
          >
            Dashboard
          </Button>
          <Button
            color={location.pathname === "/learn" ? "secondary" : "inherit"}
            component={Link}
            to="/learn"
          >
            Learn
          </Button>
          <Button            
            color={location.pathname === "/news" ? "secondary" : "inherit"}
            component={Link}
            to="/news"
        >
            News
          </Button>
          <Button
            color={location.pathname === "/about" ? "secondary" : "inherit"}
            component={Link}
            to="/about"
        >
            About
        </Button>
        <Button
            color={location.pathname === "/contact" ? "secondary" : "inherit"}
            component={Link}
            to="/contact"
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

      {/* Search and Table */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box mb={3} textAlign="center">
          <Typography variant="h4" gutterBottom>
            📖 Network Protocols & Ports Cheat Sheet
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Quick reference for cybersecurity, VAPT, and networking exams.
          </Typography>
          <TextField
            label="Search Protocol..."
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <TableContainer component={Paper} elevation={4}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#1976d2" }}>
                <TableCell sx={{ color: "white" }}>Protocol</TableCell>
                <TableCell sx={{ color: "white" }}>Full Form</TableCell>
                <TableCell sx={{ color: "white" }}>Port(s)</TableCell>
                <TableCell sx={{ color: "white" }}>TCP/UDP</TableCell>
                <TableCell sx={{ color: "white" }}>Usage</TableCell>
                <TableCell sx={{ color: "white" }}>Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((protocol, index) => (
                <TableRow key={index}>
                  <TableCell>{protocol.name}</TableCell>
                  <TableCell>{protocol.fullForm}</TableCell>
                  <TableCell>{protocol.ports}</TableCell>
                  <TableCell>
                    <Chip
                      label={protocol.tcpUdp}
                      color={protocol.tcpUdp.includes("TCP") ? "primary" : "success"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{protocol.usage}</TableCell>
                  <TableCell>
                    <Chip label={protocol.category} color="secondary" size="small" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Container, Box,
  CircularProgress, Grid, Card, CardContent, Chip
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function Dashboard() {
  const [name, setName] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    fetch('http://localhost:5000/api/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

   const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem('token');
      navigate('/login');
    }, 1200);
  };

  const cyberAttacks = [
    {
      category: 'Network',
      title: 'DDoS (Distributed Denial of Service)',
      description: 'Overwhelms network resources to make services unavailable.',
      vulnerabilities: 'Poor rate limiting, unpatched servers.',
      mitigation: 'Implement firewalls, use CDNs, enable rate limiting.'
    },
    {
      category: 'Network',
      title: 'MITM (Man-in-the-Middle)',
      description: 'Intercepts communication between two systems.',
      vulnerabilities: 'Unencrypted data, weak Wi-Fi security.',
      mitigation: 'Use HTTPS/TLS, VPNs, secure DNS.'
    },
    {
      category: 'Network',
      title: 'ARP Spoofing',
      description: 'Sends fake ARP messages to link attacker’s MAC with IP.',
      vulnerabilities: 'Lack of ARP validation.',
      mitigation: 'Use static ARP tables, packet inspection.'
    },
    {
      category: 'Network',
      title: 'DNS Poisoning',
      description: 'Redirects traffic to malicious websites by corrupting DNS cache.',
      vulnerabilities: 'Unsecured DNS resolvers.',
      mitigation: 'Enable DNSSEC, monitor DNS traffic.'
    },
    {
      category: 'Network',
      title: 'Sniffing',
      description: 'Captures packets flowing through a network.',
      vulnerabilities: 'Unencrypted communications.',
      mitigation: 'Use encryption protocols (SSL/TLS), switch to secure networks.'
    },
    {
      category: 'Web',
      title: 'SQL Injection',
      description: 'Injects malicious SQL queries into database via input fields.',
      vulnerabilities: 'Unsanitized inputs.',
      mitigation: 'Use parameterized queries, validate user input.'
    },
    {
      category: 'Web',
      title: 'Cross-Site Scripting (XSS)',
      description: 'Injects malicious scripts into trusted websites.',
      vulnerabilities: 'Improper input/output encoding.',
      mitigation: 'Escape user input, use Content Security Policy (CSP).'
    },
    {
      category: 'Web',
      title: 'Cross-Site Request Forgery (CSRF)',
      description: 'Forces users to execute unwanted actions on a web app.',
      vulnerabilities: 'Missing anti-CSRF tokens.',
      mitigation: 'Implement CSRF tokens, check referrers.'
    },
    {
      category: 'Web',
      title: 'Clickjacking',
      description: 'Tricks users into clicking on malicious links masked as legitimate.',
      vulnerabilities: 'Lack of frame-busting techniques.',
      mitigation: 'Use X-Frame-Options header.'
    },
    {
      category: 'Web',
      title: 'Remote Code Execution (RCE)',
      description: 'Executes arbitrary code on server.',
      vulnerabilities: 'Unsafe deserialization, unpatched software.',
      mitigation: 'Keep software updated, validate inputs.'
    },
    {
      category: 'Web',
      title: 'Directory Traversal',
      description: 'Accesses files outside web root folder.',
      vulnerabilities: 'Improper sanitization of file paths.',
      mitigation: 'Sanitize inputs, enforce proper access controls.'
    },
    {
      category: 'Network',
      title: 'Port Scanning',
      description: 'Discovers open ports and services.',
      vulnerabilities: 'Exposed services.',
      mitigation: 'Use firewalls, close unused ports.'
    },
    {
      category: 'Network',
      title: 'Eavesdropping',
      description: 'Listens to private communication without consent.',
      vulnerabilities: 'Plaintext data transmission.',
      mitigation: 'Encrypt traffic using VPNs and TLS.'
    },
    {
      category: 'Web',
      title: 'File Inclusion (LFI/RFI)',
      description: 'Includes unauthorized files in web app execution.',
      vulnerabilities: 'Improper file handling.',
      mitigation: 'Whitelist allowed files, sanitize paths.'
    },
    {
      category: 'Web',
      title: 'Broken Authentication',
      description: 'Allows attackers to compromise passwords or session tokens.',
      vulnerabilities: 'Weak credentials, improper session management.',
      mitigation: 'Use multi-factor authentication, secure cookies.'
    }
  ];

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
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
            disabled={loggingOut}
          >
            {loggingOut ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Logout'
            )}
          </Button>
        </Toolbar>
      </AppBar>

      {/* Welcome Section */}
      <Container maxWidth="lg">
        <Box mt={5} p={3} boxShadow={3} borderRadius={2} textAlign="center">
          <Typography variant="h4" gutterBottom>
            Welcome, {name} 👋
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Learn & stay safe with these cybersecurity attack insights!
          </Typography>
        </Box>

        {/* Cyber Attacks Grid */}
        <Grid container spacing={3} mt={3}>
          {cyberAttacks.map((attack, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  background: attack.category === 'Network'
                    ? 'linear-gradient(135deg, #89F7FE, #66A6FF)'
                    : 'linear-gradient(135deg, #FDCBFF, #90F7EC)',
                  color: '#333',
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 8
                  }
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" gutterBottom>{attack.title}</Typography>
                    <Chip
                      label={attack.category}
                      color={attack.category === 'Network' ? 'primary' : 'secondary'}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" gutterBottom>
                    <strong>Description:</strong> {attack.description}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Vulnerabilities:</strong> {attack.vulnerabilities}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Mitigation:</strong> {attack.mitigation}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

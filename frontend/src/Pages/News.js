import React, { useEffect, useState } from "react";
import {
  AppBar, Toolbar, Typography, Button,
  Container, Box, CircularProgress, Card, CardContent, Chip
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const realArticles = [
      {
        id: 18,
        category: "Attack",
        title: "UK arrests four over cyber‑attacks on M&S, Co‑op & Harrods",
        summary:
          "Four suspects, aged 17–20, arrested over coordinated retail cyber‑attacks costing ~£300M disruption to Marks & Spencer, Co‑op, and Harrods systems.",
        link: "https://apnews.com/article/9f9ea474a42acd147b81c5a7ff3ff05d",
        date: "July 10, 2025",
      },
      {
        id: 21,
        category: "Attack",
        title: "Surge in phishing via .es domains: 19× increase",
        summary:
          "Cofense reports .es domains used 19× more often in credential‑phishing and RAT distribution campaigns from Jan–May 2025.",
        link: "https://www.techradar.com/pro/security/experts-flag-a-huge-amount-of-cyberattacks-coming-from-this-unexpected-domain",
        date: "July 8, 2025",
      },
      {
        id: 26,
        category: "Attack",
        title:
          "M&S boss: Other big UK firms suffered unreported cyber‑attacks",
        summary:
          "M&S chair reveals two more large UK firms hit unreported; calls for mandatory breach disclosure laws.",
        link: "https://www.theguardian.com/business/2025/jul/08/m-and-s-boss-cyber-attacks-archie-norman",
        date: "July 8, 2025",
      },
      {
        id: 24,
        category: "Attack",
        title:
          "DragonForce vs RansomHub turf war: ransomware groups collide",
        summary:
          "Conflict between RaaS gangs DragonForce and RansomHub could raise risk of double‑extortion and wider attacks.",
        link: "https://www.ft.com/content/22cb54ef-1611-4aef-b671-16316280e3fb",
        date: "July 6, 2025",
      },
      {
        id: 29,
        category: "Breach",
        title:
          "Qantas data breach exposes 1M+ via third‑party call‑centre",
        summary:
          "Scattered Spider exploit in third‑party CRM leaked frequent‑flyer and personal details of over a million customers.",
        link: "https://www.news.com.au/technology/online/hacking/disappointing-frustrating-how-qantas-data-breach-exposes-deep-flaws-in-australias-cyber-defences/news-story/5cf98c27fafe39f5ba228eb6eb909964",
        date: "June 30, 2025",
      },
      {
        id: 0,
        category: "Attack",
        title:
          "June 2025 saw major ransomware & data breaches (UNFI, Cartier, Kettering Health…) ",
        summary:
          "June saw attacks on UNFI, North Face, Cartier, OH gov, Zoomcar—emphasizing need for incident response plans.",
        link: "https://www.cm-alliance.com/cybersecurity-blog/major-cyber-attacks-ransomware-attacks-and-data-breaches-of-june-2025",
        date: "July 1, 2025",
      },
      {
        id: 10,
        category: "Attack",
        title: "5 biggest cyber‑attacks of 2025 (UNFI, Sepah bank, etc.)",
        summary:
          "UNFI food‑chain outage; Iran's Sepah bank breach (42M records); TeleMessage app leak gov user metadata.",
        link: "https://insights.integrity360.com/5-of-the-biggest-cyber-attacks-of-2025-so-far",
        date: "June 25, 2025",
      },
      {
        id: 30,
        category: "Attack",
        title:
          "2024 Kadokawa & Niconico ransomware hit 254K users in Japan",
        summary:
          "Ransomware from BlackSuit hit Japanese platforms, leaking data of 254K users mid‑2024.",
        link: "https://en.wikipedia.org/wiki/2024_cyberattack_on_Kadokawa_and_Niconico",
        date: "June 2024",
      },
      {
        id: 31,
        category: "Breach",
        title:
          "Snowflake data breach – 2024 attack exposed 160 cloud‑customer records",
        summary:
          "2024 compromise of 160 Snowflake environments affected major brands via stolen credentials.",
        link: "https://en.wikipedia.org/wiki/Snowflake_data_breach",
        date: "June 2024",
      },
      {
        id: 35,
        category: "Attack",
        title:
          "Recent Dyn DDoS attacks leveraged Mirai‑infected IoT botnets",
        summary:
          "US DHS investigates complex Dyn outages via IoT‑based botnet using Mirai malware.",
        link: "https://en.wikipedia.org/wiki/DDoS_attacks_on_Dyn",
        date: "July 2025",
      },
      {
        id: 32,
        category: "Attack",
        title:
          "2023 Kyivstar telecom cyberattack disrupted Ukrainian services",
        summary:
          "December 2023 Sandworm/GRU attack disrupted telecom and air‑raid warning systems in Ukraine.",
        link: "https://en.wikipedia.org/wiki/2023_Kyivstar_cyberattack",
        date: "Dec 2023",
      },
      {
        id: 33,
        category: "Breach",
        title:
          "British Library ransomware by Rhysida – 600 GB leak",
        summary:
          "Oct 2023 Rhysida hack crippled systems, leaked 600 GB, recovery cost £6–7M.",
        link: "https://en.wikipedia.org/wiki/British_Library_cyberattack",
        date: "Oct 2023",
      },
      {
        id: 34,
        category: "Breach",
        title: "Evide (charity) ransomware exposed survivors’ data, April 2023",
        summary:
          "Evide ransomware breach compromised sensitive records of abuse survivors in 2023.",
        link: "https://en.wikipedia.org/wiki/Evide_data_breach",
        date: "Apr 2023",
      },
    ];
    setArticles(realArticles);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Cyber Security News
          </Typography>
          <Button component={Link} to="/dashboard" color={location.pathname === "/dashboard" ? "secondary" : "inherit"}>Dashboard</Button>
          <Button component={Link} to="/learn" color={location.pathname === "/learn" ? "secondary" : "inherit"}>Learn</Button>
          <Button component={Link} to="/news" color={location.pathname === "/news" ? "secondary" : "inherit"}>News</Button>
          <Button component={Link} to="/about" color={location.pathname === "/about" ? "secondary" : "inherit"}>About</Button>
          <Button component={Link} to="/contact" color={location.pathname === "/contact" ? "secondary" : "inherit"}>Contact</Button>
          <Button variant="contained" color="error" startIcon={<LogoutIcon />} sx={{ ml: 2 }} onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box mt={5} mb={3} textAlign="center">
          <Typography variant="h4" gutterBottom>📰 Cybersecurity News & Breaches</Typography>
          <Typography variant="subtitle1" color="textSecondary">Benefit from real-world attack analyses and past breaches.</Typography>
        </Box>

        {loading ? (
          <Box textAlign="center" mt={5}><CircularProgress /></Box>
        ) : (
          articles.map((a) => (
            <Card key={a.id} sx={{ mb: 3, p: 2, borderRadius: 3, background: "#f5f7fa", "&:hover": { transform: "translateY(-3px)", boxShadow: 6 } }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Chip label={a.category} color={a.category === "Attack" ? "error" : a.category === "Breach" ? "warning" : "primary"} size="small" />
                  <Typography variant="caption" color="textSecondary">{a.date}</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#1976d2" }}>
                    {a.title}
                  </a>
                </Typography>
                <Typography variant="body2" color="textSecondary">{a.summary}</Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </>
  );
}

// file: src/components/NewsSection.js

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // ✅ Make sure you have set this in Vercel dashboard:
        // KEY must start with REACT_APP_ (for CRA) or VITE_ (for Vite)
        const apiKey = process.env.REACT_APP_SERPAPI_KEY;

        if (!apiKey) {
          throw new Error("API key is missing! Check your Vercel env settings.");
        }

        const query = {
          api_key: apiKey,
          engine: "google_news",
          q: "cybersecurity news",
          google_domain: "google.com",
          gl: "in",
          hl: "en",
        };

        const params = new URLSearchParams(query).toString();
        const targetUrl = `https://serpapi.com/search.json?${params}`;

        // ⚡️ Direct call (SerpAPI supports CORS)
        const response = await fetch(targetUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const limitedNews = (data.news_results || []).slice(0, 15);
        setNews(limitedNews);
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <LinearProgress sx={{ width: "100%" }} />
        </Box>
      );
    }
    if (error) {
      return (
        <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
          {error}
        </Typography>
      );
    }
    if (news.length === 0) {
      return (
        <Typography color="text.secondary" sx={{ mt: 2, textAlign: "center" }}>
          No news articles found.
        </Typography>
      );
    }

    return (
      <Grid container spacing={3}>
        {news.map((article, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.paper",
                borderRadius: 3,
                boxShadow: 3,
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardActionArea
                component="a"
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: "flex", flexDirection: "column", height: "100%" }}
              >
                <Box
                  component="img"
                  src={
                    article.thumbnail ||
                    "https://via.placeholder.com/400x200?text=No+Image"
                  }
                  alt={article.title}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderRadius: "12px 12px 0 0",
                  }}
                />

                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {article.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {article.snippet}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: "auto" }}
                  >
                    {article.source?.name} • {article.date}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box
      id="news"
      sx={{ px: { xs: 2, md: 8 }, py: 6, bgcolor: "background.default" }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 3, color: "primary.main" }}
      >
        Latest Cybersecurity News
      </Typography>
      {renderContent()}
    </Box>
  );
}

export default NewsSection;

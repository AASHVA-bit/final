// pages/api/news.js
import { getJson } from "serpapi";

export default async function handler(req, res) {
  try {
    const SerpApiKey = process.env.SERPAPI_KEY;

    if (!SerpApiKey) {
      return res.status(500).json({ error: "API key missing." });
    }

    const json = await new Promise((resolve, reject) => {
      getJson(
        {
          api_key: SerpApiKey,
          engine: "google_news",
          q: "cybersecurity news",
          google_domain: "google.com",
          gl: "in",
          hl: "en",
        },
        (data) => {
          if (data) resolve(data);
          else reject(new Error("No data returned"));
        }
      );
    });

    res.status(200).json(json.news_results || []);
  } catch (error) {
    console.error("News fetch failed:", error);
    res.status(500).json({ error: "Failed to fetch news." });
  }
}

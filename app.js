import { SiteMapParser } from "./site-map-parser.js";

import express from "express";
const app = express();

// basic route
app.get("/", async function (req, res) {
  const url = req.query.url;

  if (!url) return res.status(400).send("url not found");

  try {
    const parser = new SiteMapParser(url);
    const result = await parser.getSiteMap();

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => console.log("Listening on port 3000..."));

const shortid = require("shortid");
const URL = require("../models/url");
async function handleGenerateNewUrl(req, res) {
  const body = req.body;
  if (!body.url)return res.render("home"); //return res.status(400).json({ error: "url not provided" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy:req.user._id,
  });
  return res.render("home", { id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalCliks: result.visitHistory.length,
    analytics: result.redirectUrlc,
  });
}

module.exports = {
  handleGenerateNewUrl,
  handleGetAnalytics,
};

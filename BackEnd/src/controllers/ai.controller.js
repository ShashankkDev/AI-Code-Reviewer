const { generateContent } = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  console.log("Received request body:", req.body);

  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: "Code is required." });
  }

  try {
    const review = await generateContent(code);
    res.json({ review });
  } catch (error) {
    console.error("Error in getReview:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

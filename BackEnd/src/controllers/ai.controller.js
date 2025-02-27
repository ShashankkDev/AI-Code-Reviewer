const generateContent = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  console.log("Received request body:", req.body);
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const response = await generateContent(code);

    res.status(200).json({ review: response });
  } catch (error) {
    console.error("Error in getReview:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

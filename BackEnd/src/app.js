const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["https://code-expert-lac.vercel.app", "http://localhost:5173/"],
    methods: "GET, POST",
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/ai", aiRoutes);

module.exports = app;

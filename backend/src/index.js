require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

// =======================
// APP INIT (MUST BE FIRST)
// =======================
const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use(cors({
  origin: [
    "https://smartbiz-psi.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// =======================
// ROUTES
// =======================
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/sales", require("./routes/sales.routes"));
app.use("/api/ai", require("./routes/ai.routes"));
app.use("/api/customers", require("./routes/customers.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));

// =======================
// HEALTH CHECK
// =======================
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "SmartBiz-SL API",
    time: new Date().toISOString(),
  });
});

// =======================
// SERVER
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 SmartBiz API running on port ${PORT}`);
});

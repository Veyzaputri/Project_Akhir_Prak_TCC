import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import PasienRoute from "./routes/PasienRoute.js";
import DokterRoute from "./routes/DokterRoute.js";
import PeriksaRoute from "./routes/PeriksaRoute.js";
import ObatRoute from "./routes/ObatRoute.js";
import StrukRoute from "./routes/StrukRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import sequelize from "./config/Database.js";

dotenv.config();
const app = express();

// ✅ Middleware manual untuk CORS & preflight
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://final-project-prak-tcc-dot-e-13-450704.uc.r.appspot.com");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // Cegah error preflight di Cloud Run
  }

  next();
});

app.use(cookieParser());

// Konfigurasi CORS tambahan (opsional, tetap bisa digunakan)
const corsOptions = {
  origin: 'https://final-project-prak-tcc-dot-e-13-450704.uc.r.appspot.com',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(UserRoute);
app.use(PasienRoute);
app.use(DokterRoute);
app.use(PeriksaRoute);
app.use(ObatRoute);
app.use(StrukRoute);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync();

    const port = process.env.PORT || 5000;
    app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();

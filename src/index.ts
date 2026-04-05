import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./db/db.js";

import authRoute from "./routes/auth.route.js";
import providerRoute from "./routes/provider.route.js";
import appointmentRoute from "./routes/appointment.route.js";

const app = express();
app.use(express.json());


app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/provider", providerRoute);
app.use("/api/v1/appointment", appointmentRoute);





const port = process.env.PORT || 3000;

let server: ReturnType<typeof app.listen> | null = null;
const startServer = async () => {
  try {
    await connectToDatabase();
    server = app.listen(port, () => {
      console.log(`Server running at http://localhost:${port} `);
    });
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
};

startServer();
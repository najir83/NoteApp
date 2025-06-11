import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import UserRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import checkAuthentication from "./authService/checkauth.middlewire.js";
import cors from "cors";
import notesRouter from "./routes/notesRoute.js";
import { authRequire } from "./authService/authRequired.middlewire.js";

dotenv.config();
console.log(process.env.ORIGIN);
const app = express();
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

const port = process.env.PORT || 3000;
connectDB(process.env.MONGO_URL);

app.use(express.json());
app.use(cookieParser());
app.use(checkAuthentication("token"));

app.use("/user", UserRouter);
app.use("/notes", authRequire, notesRouter);
app.get("/", (req, res) => {
  res.send("WelCome to Notiq web server");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


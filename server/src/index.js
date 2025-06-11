import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import UserRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import checkAuthentication from "./authService/checkauth.middlewire.js";
import cors from 'cors'
import notesRouter from "./routes/notesRoute.js";
import { authRequire } from "./authService/authRequired.middlewire.js";



dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,               
}));

const port = process.env.PORT || 3000;
connectDB(process.env.MONGO_URL);
console.log(process.env.JWT_SECRET);

app.use(express.json());
app.use(cookieParser());
app.use(checkAuthentication("token"));

app.use("/user", UserRouter);
app.use("/notes",authRequire,notesRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});








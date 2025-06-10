import express from "express";
import User from "../authService/users.model.js";
import { authRequire } from "../authService/authRequired.middlewire.js";

const UserRouter = express.Router();
UserRouter.post("/signup", async (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const user = await User.findOne({ email });
  if (user) return res.status(400).json({ Error: "User is already present" });
  await User.create({
    name,
    email,
    password,
  });
  return res.status(201).json({ message: "user created successfully" });
});
UserRouter.get("/", authRequire, (req, res) => {
  return res.json({
    user: req.user || null,
  });
});

UserRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndAuthenticate(email, password);
    // console.log(token);
    return res
      .cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 7 })
      .json({ message: "Login Successful" });
  } catch (e) {
    return res
      .status(e.statusCode || 500)
      .json({ message: e.message || "Internal Server Error" });
  }
});
UserRouter.post("/logout", authRequire, (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
});
UserRouter.post("/updatePassword", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email,name });

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  user.password = password;
  await user.save();
  return res.status(200).json({ message: "password update successful" });
});
export default UserRouter;

import express from "express";
import Notes from "../models/notes.model.js";

const notesRouter = express.Router();

notesRouter.get("/", async (req, res) => {
  const userId = req.user?._id;
  const notes = await Notes.find({ userId }).select("-__v -userId");
  //   console.log(notes);
  return res.status(200).json({ data: notes });
});
notesRouter.post("/", async (req, res) => {
  const { title, Content, Tag } = req.body;
  const userId = req.user?._id;
  if (!title || !Content || !Tag) {
    return res.status(400).json({ massage: "All feild required" });
  }

  try {
    const notes = await Notes.create({
      title,
      Content,
      Tag,
      userId,
    });
     const noteObj = notes.toObject();
    delete noteObj.__v;
    delete noteObj.userId;

    return res
      .status(201)
      .json({ message: "Note created", data: noteObj});
  } catch {
    return res.status(400).json({ message: "Internal Server Error" });
  }
});
notesRouter.post("/update", async (req, res) => {
  const { id, title, Content, Tag } = req.body;

  if (!title || !Content || !Tag || !id) {
    return res.status(400).json({ massage: "All feild required" });
  }

  try {
    const note = await Notes.findOne({ _id: id });
    // console.log(note);
    if (!note) {
      return res.status(400).json({ message: "Invalid Id" });
    }
    note.title = title;
    note.Content = Content;
    note.Tag = Tag;
    await note.save();

    return res.status(200).json({ message: "update successful" });
  } catch (e) {
    return res.status(400).json({ message: "Internal Server Error" });
  }
});

notesRouter.post("/delete", async (req, res) => {
  const { _id } = req.body;
//   console.log(_id);
  try {
    await Notes.findOneAndDelete({ _id });

    return res.status(200).json({ message: "delete successful" });
  } catch (e) {
    return res.status(400).json({ message: "Internal Server Error" });
  }
});

export default notesRouter;

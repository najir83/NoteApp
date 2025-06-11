import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true,
  },
  Tag: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},{timestamps:true});


const Notes = mongoose.model("note", noteSchema);
export default Notes;

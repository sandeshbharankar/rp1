import mongoose from "mongoose";

const hobbySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
});

const Hobby = mongoose.model("Hobby", hobbySchema);

export default Hobby;

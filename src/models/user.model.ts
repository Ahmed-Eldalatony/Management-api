import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
      default: "",
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;

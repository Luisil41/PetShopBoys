const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    birthdate: { type: Date, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    phone: { type: Number, required: true },
    province: { type: Number, required: true },
    interests: { type: Array, required: false },
    verified: {
      type: Boolean,
      required: true,
      enum: ["dog", "cat", "others"],
      default: "dog",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

module.exports = User;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    birthdate: { type: Date, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    phone: { type: String, required: true },
    province: { type: String, required: true },
    interest: {
      type: String,
      enum: ['adoption', 'both', 'hosting'] // definir las opciones de status
  },
    verified: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

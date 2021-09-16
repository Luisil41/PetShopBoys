const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    role: { type: String, default: 'user' },
    fullName: { type: String, required: true },
    birthdate: { type: Date, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    phone: { type: String, required: true },
    province: { type: String, required: true },
    interest: {
      type: String,
      enum: ['adopción', 'ambas', 'casa de acogida'] // definir las opciones de status
  },
    verified: {
      type: Boolean, default: false
    },
    form: { type: mongoose.Types.ObjectId, ref: 'Form' },
    requests: [{ type: mongoose.Types.ObjectId, ref: 'Request' }]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

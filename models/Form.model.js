const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const formSchema = new Schema(
    {
     
    },
    { timestamps: true }
  );
  
  const Form = mongoose.model("Form", userSchema);
  
  module.exports = Form;
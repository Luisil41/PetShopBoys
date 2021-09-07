const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongodb = process.env.MONGODB_URL;

const connect = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const { name, host } = db.connection;
    console.log(`Conectado correctamente a la DB ${name}, en el host ${host}`);
  } catch (error) {
    console.log("No se pudo conectar a la DB");
  }
};

module.exports = { connect };

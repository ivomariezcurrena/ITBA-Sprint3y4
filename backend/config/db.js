const mongoose = require("mongoose");
const chalk = require("chalk");

async function connect(mongoUri) {
  if (!mongoUri) {
    throw new Error("MONGO_URI no definido");
  }
  try {
    mongoose.set("strictQuery", false);
    
    await mongoose.connect(mongoUri);
    console.log(chalk.green("MongoDB conectado"));
  } catch (err) {
    console.error(chalk.red("Error conectando a MongoDB:"), err);
    throw err;
  }
}

async function disconnect() {
  try {
    await mongoose.disconnect();
    console.log(chalk.blue("MongoDB desconectado"));
  } catch (err) {
    console.error(chalk.red("Error desconectando MongoDB:"), err);
    throw err;
  }
}

module.exports = { connect, disconnect, mongoose };
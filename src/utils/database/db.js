const mongoose = require('mongoose');
const DB_URL = "mongodb://localhost:27017/friendsDatabase";

const dotenv = require("dotenv");

dotenv.config();


const bdConnect = async () => {
    try {
        const dbConnection = await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
      );
        const {host, port, name} = dbConnection.connection;
        console.log(`Connected with db name: ${name} in: ${host} port: ${port}`);
    } catch (error) {
        console.error("Error accediendo a la base de datos", error)
    }
}

module.exports = {bdConnect};
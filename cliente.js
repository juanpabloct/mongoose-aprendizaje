const mongoose = require("mongoose")
const { PASSWORD, USER, NAMEDB } = process.env
const uri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.214kevq.mongodb.net/${NAMEDB}?retryWrites=true&w=majority`


const connectionMongoose = async () => await mongoose.connect(uri).
    then((res) => "conectado correctamente").catch(() => "error de conexion")

module.exports = connectionMongoose
const mongoose = require('mongoose')
const connectionMongoose = require('../cliente')
connectionMongoose()
mongoose.set('strictQuery', true)
const RegistroPersonaSchema = new mongoose.Schema(
    { nombre: String, apellido: String, edad: String, email: String, password: String })

const RegistroPersona = new mongoose.model("nombres", RegistroPersonaSchema)
module.exports = RegistroPersona
const connection = require("../cliente")
const encripting = require("bcryptjs")
const RegistroPersona = require("./schema")
const jwt = require("jsonwebtoken")
const getUsers = async (req, res) => {
    const nombrePersona = req.body
    const registros = await RegistroPersona.find().then((res => res))
    return res.json(registros)
}
const getUser = async ({ _id }) => {
    if (_id) {
        const person = await RegistroPersona.findOne({ _id })
        return person
    }
    else {
        throw new Error('Not found')
    }
}
const agregar = async (req, res) => {
    const { nombre, apellido, edad, email, password } = req.body
    if (nombre && edad && email && password) {
        const salt = encripting.genSaltSync()
        const encriptPassword = encripting.hashSync(password, salt)
        const newRegister = await RegistroPersona.create({ nombre, apellido, edad, email, password: encriptPassword })
        return req.body ? res.json(`hola ${nombre} tienes ${edad} años`) : res.status(403).json("Error, no enviaste datos")
    } else { return res.json("Error") }
}
const deleteUser = async (req, res) => {
    const { _id } = req.body
    if (_id) {
        try {
            const deleteUser = await RegistroPersona.deleteOne({ _id })
            return res.status(200).json("Dato eliminado correctamente")
        }
        catch {
            res.status(500).json({ "error": "Error", causa: "Elemento faltante en el body" })
        }
    }
    else {
        res.status("403").json({ "error": "No se ha podido responder por parametros faltantes" })
    }
}
const authUser = async (req, res) => {
    const { _id } = req.body
    const dataAuth = await RegistroPersona.findOne({
        _id
    })
    const validPaswword = await encripting.compare("1234567890", dataAuth.password)
    if (validPaswword) {
        const payload = dataAuth._id
        const generateToken = jwt.sign({ dataAuth }, process.env.JWTFIRMA, { expiresIn: "6h" }, (error, token) => {
            if (error) {
                return res.status(500)
            }
            else {
                return res.status(200).json({ res: "usuario accedido correctamente", dataUser: dataAuth, token })

            }
        })
    }
    else {
        res.status(400).json({ "res": "error al acceder al usuario" })
    }
}
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]
        const comprobacion = jwt.verify(token, process.env.JWTFIRMA)
        if (comprobacion) {
            next()
            return res.status(200).json("Accedio correctamente")
        }
    } catch (error) {
        res.status(403).json({ error: "Token Expired" })
    }
}
module.exports = { getUsers, agregar, getUser, deleteUser, authUser, verifyToken }

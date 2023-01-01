const { request, response } = require("express")
const Usuario = require("../models/Usuario")
const bcryptjs = require('bcryptjs')



const traerUsuarios = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json(usuarios)
}

const traerUsuario = async (req = request, res = response) => {
    const { id } = req.params
    const usuario = await Usuario.findById(id)
    res.json(usuario)
}

const crearUser = async (req = request, res = response) => {
    const { nombre, email, password } = req.body
    const existeEmail = await Usuario.findOne({ email })
    if (existeEmail) {
        return res.status(400).json({ msg: 'El email ya esta registrado' })
    }

    // si no esta registrado el email, entonces crear usuario
    const usuario = new Usuario({
        nombre, email, password
    })

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save()
    res.json(usuario)
}

const actualizarUser = async (req = request, res = response) => {
    const { id } = req.params
    const { _id, password, google, email, ...resto } = req.body
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true })
    res.json({ message: 'Usuario actualizado con exito', usuario })
}

const borrarUser = async (req = request, res = response) => {
    const { id } = req.params
    const usuario = await Usuario.findByIdAndDelete(id, { new: true })
    res.json({ message: 'Usuario borrado con exito', usuario })
}



module.exports = {
    traerUsuarios,
    traerUsuario,
    crearUser, actualizarUser, borrarUser
};

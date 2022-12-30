const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')

const verificarJWT = async (req, res, next) => {
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const usuario = await Usuario.findById(id)
        req.usuario = usuario
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}


module.exports = {
    verificarJWT
}
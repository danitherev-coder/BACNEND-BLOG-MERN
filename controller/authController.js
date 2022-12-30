const { request, response } = require("express");
const Usuario = require("../models/Usuario");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req = request, res = response) => {
    try {
        const { email, password } = req.body
        const usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.status(400).json({ message: 'El email no existe' })
        }

        const validarPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validarPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta' })
        }

        const token = await generarJWT(usuario.id)
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error inesperado' })
    }
}

const googleSignIn = async (req = request, res = response) => {

}

const logout = async (req = request, res = response) => {
    
}

module.exports = {
    login,
    googleSignIn,
    logout
};

const Usuario = require("../models/Usuario")
const Post = require("../models/Post")

const existeIDUSER = async (id) => {
    const existeID = await Usuario.findById(id)
    if (!existeID) {
        throw new Error(`El id ${id} no existe`)
    }
}

const existeIDPOST = async (id) => {
    const existeID = await Post.findById(id)
    if (!existeID) {
        throw new Error(`El id ${id} no existe`)
    }
}

module.exports = {
    existeIDUSER,
    existeIDPOST
};

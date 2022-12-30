const { Schema, model } = require('mongoose')

const Usuario = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: String
    },
    google: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

Usuario.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject()
    return usuario
}

module.exports = model('Usuario', Usuario)
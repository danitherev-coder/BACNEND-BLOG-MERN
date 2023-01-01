const { Schema, model } = require('mongoose')

const Post = new Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    cat: {
        type: String,
        required: true
    },
    img: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = model('Post', Post)
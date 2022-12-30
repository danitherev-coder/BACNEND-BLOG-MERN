const { request, response } = require("express")
const Post = require("../models/Post")


const posts = async (req = request, res = response) => {
    const { desde = 0, limite = 5 } = req.query
    const [total, posts] = await Promise.all([
        Post.countDocuments(),
        Post.find()
            .populate('autor')
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        posts
    })
}

const post = async (req = request, res = response) => {
    const { id } = req.params
    const post = await Post.findById(id).populate('autor')
    res.json({
        msg: 'Post',
        post
    })
}

const createPost = async (req = request, res = response) => {
    const { titulo, desc, img, categoria } = req.body
    const { id } = req.usuario
    const post = new Post({
        titulo,
        desc,
        img,
        categoria,
        autor: id
    })
    await post.save()
    res.json({
        msg: 'Post creado',
        post
    })
}

const editPost = async (req = request, res = response) => {
    const { id } = req.params
    const { titulo, desc, img, categoria } = req.body
    const post = await Post.findById(id)
    // si el usuario que quiere editar el post no es el mismo que lo creo no puede editar
    if (post.autor.toString() !== req.usuario.id) {
        return res.status(401).json({
            msg: 'No tienes permiso para editar este post'
        })
    } else {
        post.updateOne({
            titulo,
            desc,
            img: img || post.img,
            categoria,
            autor: req.usuario.id
        }, { new: true })
        res.json({
            msg: 'Post editado',
            post
        })
    }

}

const deletePost = async (req = request, res = response) => {
    const { id } = req.params

    // si el usuario que quiere eliminar el post no es el mismo que lo creo no puede eliminarlo
    const postAutor = await Post.findById(id)
    if (postAutor.autor.toString() !== req.usuario.id) {
        return res.status(401).json({
            msg: 'No tienes permiso para eliminar este post'
        })
    } else {
        // si es el mismo usuario que lo creo puede eliminarlo
        const eliminar = await Post.findByIdAndDelete(id)
        return res.json({
            msg: 'Post eliminado'
        })
    }
}



module.exports = {
    posts,
    post,
    createPost,
    editPost,
    deletePost
};

const express = require('express')
const { config } = require('dotenv')
config()
const authRoutes = require('../routes/authRoutes')
const postRoutes = require('../routes/postsRoutes')
const userRoutes = require('../routes/usersRoutes')
const uploadRoutes = require('../routes/uploadRoutes')
const cors = require('cors')
const dbConnection = require('../config/db')
const maxRequestSize = "50mb"


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8080
        this.paths = {
            auth: '/api/auth',
            posts: '/api/posts',
            users: '/api/users',
            upload: '/api/upload'
        }
        this.conexion()
        this.middlewares()
        this.routes()
    }
    async conexion() {
        await dbConnection()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.urlencoded({ limit: maxRequestSize, extended: true }));
        this.app.use(express.json({ limit: maxRequestSize }));
    }
    routes() {
        this.app.use(this.paths.auth, authRoutes)
        this.app.use(this.paths.posts, postRoutes)
        this.app.use(this.paths.users, userRoutes)
        this.app.use(this.paths.upload, uploadRoutes)
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }
}

module.exports = Server
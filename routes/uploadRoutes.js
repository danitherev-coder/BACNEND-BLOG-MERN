
const multer = require('multer');
const router = require('express').Router();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});
const upload = multer({ storage })

router.post('/', upload.single('file'), async (req, res) => {
    if (!req.file || !req.file.path) {
        return res.status(400).json({ msg: "No se ha subido ningún archivo o ha ocurrido un error al subir el archivo." });
    }
    
    
    try {
        console.log(req.file.path);
        const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
            folder: 'blog-mongo',
            q_auto: "good",
            public_id: Math.random() + "_image"
        });

        res.json({ msg: "File uploaded", uploadResponse, url: uploadResponse.public_id });

    } catch (error) {
        // Maneja el error aquí
        console.error(error);
        res.status(500).json({ msg: "Error uploading file" });
    }
})


module.exports = router
const { body, param } = require('express-validator');
const { posts, post, createPost, editPost, deletePost } = require('../controller/postsController');
const { verificarJWT } = require('../middlewares/verificarJWT');
const validarCampos = require('../middlewares/validarCampos');
const { existeIDPOST } = require('../helpers/validar-db');
const router = require('express').Router();


router.get('/', posts)
router.get('/:id', [
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(existeIDPOST),
    validarCampos
], post)
router.post('/crear-post', [
    verificarJWT,
    body('titulo', 'El titulo es obligatorio').not().isEmpty(),
    body('desc', 'El contenido es obligatorio').not().isEmpty(),
    body('img', 'La imagen es obligatoria').not().isEmpty(),
    body('categoria', 'La categoria es obligatoria').not().isEmpty(),
    validarCampos
], createPost)
router.put('/editar-post/:id', [
    verificarJWT,
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(existeIDPOST),
    body('titulo', 'El titulo es obligatorio').not().isEmpty(),
    body('desc', 'El contenido es obligatorio').not().isEmpty(),
    // body('img', 'La imagen es obligatoria').not().isEmpty(),
    body('categoria', 'La categoria es obligatoria').not().isEmpty(),
    validarCampos
], editPost)
router.delete('/eliminar-post/:id', [
    verificarJWT,
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(existeIDPOST),
    validarCampos
], deletePost)

module.exports = router;
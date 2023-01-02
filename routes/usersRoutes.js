const { body, param } = require('express-validator');
const { traerUsuarios, traerUsuario, crearUser, actualizarUser, borrarUser } = require('../controller/usersControllers');
const { existeIDUSER } = require('../helpers/validar-db');
const validarCampos = require('../middlewares/validarCampos');

const router = require('express').Router();

router.get('/', traerUsuarios)
router.get('/:id', [
    param('id', 'El id no parece ser un ID de mongo valido').isMongoId(),
    param('id').custom(existeIDUSER),
    validarCampos
], traerUsuario)
router.post('/crear-user', [
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('email', 'El email no parece valido').isEmail(),
    body('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], crearUser)
router.put('/actualizar-user/:id', [
    param('id', 'El id no parece ser un ID de mongo valido').isMongoId(),
    param('id').custom(existeIDUSER),
    body('nombre', 'El nombre no debe estar vacio').not().isEmpty(),
    body('email', 'El email no parece valido').isEmail(),
    // body('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], actualizarUser)
router.delete('/borrar-user/:id', [
    param('id', 'El id no parece ser un ID de mongo valido').isMongoId(),
    param('id').custom(existeIDUSER),
    validarCampos
], borrarUser)


module.exports = router;
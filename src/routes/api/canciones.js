const express = require('express');
const router = express.Router();

const cancionesController = require('../../controllers/api/cancionesController');

router.get('/', cancionesController.all);
router.post('/', cancionesController.create);

router.get('/:id/', cancionesController.show);
router.put('/:id/', cancionesController.edit);
router.delete('/:id/', cancionesController.destroy);

module.exports = router;
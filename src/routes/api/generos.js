const express = require('express');
const router = express.Router();

const generosController = require('../../controllers/api/generosController');

router.get('/', generosController.list);

module.exports = router;
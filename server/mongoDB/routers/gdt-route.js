const express = require('express');

const GDTCtrl = require('../controllers/gdt-ctrl');

const router = express.Router();

router.post('/gdts', GDTCtrl.createGDT);
router.put('/gdts/:id', GDTCtrl.updateGDT);
router.delete('/gdts/:id', GDTCtrl.deleteGDT);
router.get('/gdts/:id', GDTCtrl.getGDTById);
router.get('/gdts', GDTCtrl.getGDTs);

module.exports = router;
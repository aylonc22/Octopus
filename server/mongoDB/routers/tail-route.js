const express = require('express');

const TailCtrl = require('../controllers/tail-ctlr');

const router = express.Router();

router.post('/tail', TailCtrl.createTail);
router.put('/tail/:id', TailCtrl.updateTail);
router.delete('/tail/:id', TailCtrl.deleteTail);
router.get('/tail/:id', TailCtrl.getTailById);
router.get('/tail', TailCtrl.getTails);

module.exports = router;
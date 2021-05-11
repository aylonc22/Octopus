const express = require('express');

const TailCtrl = require('../controllers/tail-ctlr');

const router = express.Router();

router.post('/tails', TailCtrl.createTail);
router.put('/tails/:id', TailCtrl.updateTail);
router.delete('/tails/:id', TailCtrl.deleteTail);
router.get('/tails/:id', TailCtrl.getTailById);
router.get('/tails', TailCtrl.getTails);

module.exports = router;
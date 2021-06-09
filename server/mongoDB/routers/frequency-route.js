const express = require('express');

const FrequencyCtrl = require('../controllers/frequency-ctrl');

const router = express.Router();

router.post('/frequencies', FrequencyCtrl.createFrequency);
router.put('/frequencies/:id', FrequencyCtrl.updateFrequency);
router.delete('/frequencies/:id', FrequencyCtrl.deleteFrequency);
router.get('/frequencies/:id', FrequencyCtrl.getFrequencyById);
router.get('/frequencies', FrequencyCtrl.getFrequencies);
router.get('/frequencies/:from/:to',FrequencyCtrl.getFrequenciesFromTo);

module.exports = router;
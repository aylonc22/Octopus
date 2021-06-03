const express = require('express');

const StationCtrl = require('../controllers/station-ctrl');

const router = express.Router();

router.post('/stations', StationCtrl.createStation);
router.put('/stations/:id', StationCtrl.updateStation);
router.delete('/stations/:id', StationCtrl.deleteStation);
router.get('/stations/:id', StationCtrl.getStationById);
router.get('/stations', StationCtrl.getStations);

module.exports = router;
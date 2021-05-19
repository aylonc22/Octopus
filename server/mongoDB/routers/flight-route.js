const express = require('express');

const FlightCtrl = require('../controllers/gdt-ctrl');

const router = express.Router();

router.post('/flights', FlightCtrl.createFlight);
router.put('/flights/:id', FlightCtrl.updateFlight);
router.delete('/flights/:id', FlightCtrl.deleteFlight);
router.get('/flights/:id', FlightCtrl.getFlightById);
router.get('/flights', FlightCtrl.getFlights);

module.exports = router;
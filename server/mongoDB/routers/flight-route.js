const express = require('express');

const FlightCtrl = require('../controllers/flight-ctrl');

const router = express.Router();

router.post('/flights', FlightCtrl.createFlight);
router.put('/flights/:id', FlightCtrl.updateFlight);
router.delete('/flights/:id', FlightCtrl.deleteFlight);
router.get('/flights/:id', FlightCtrl.getFlightById);
router.get('/flights', FlightCtrl.getFlights);
router.get('/flights/:from/:to',FlightCtrl.getFlightsFromTo);

module.exports = router;
const Flight = require('../models/flight-model')

createFlight = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Flight',
        });
    }

    const flight = new Flight(body);

    if (!flight) {
        return res.status(400).json({ success: false, error: err });
    }

    flight
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: flight._id,
                message: 'Flight created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Flight not created!',
            })
        });
};

updateFlight = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    Flight.findOne({ _id: req.params.id }, (err, flight) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Flight not found!',
            });
        }
        flight.name = body.ID;
        flight
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: flight._id,
                    message: 'Flight updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Flight not updated!',
                });
            });
    });
};

deleteFlight = async (req, res) => {
    await Flight.findOneAndDelete({ _id: req.params.id }, (err, flight) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!flight) {
            return res
                .status(404)
                .json({ success: false, error: `Flight not found` });
        }

        return res.status(200).json({ success: true, data: flight });
    }).catch(err => console.log(err));
};

getFlightById = async (req, res) => {
    await Flight.findOne({ _id: req.params.id }, (err, flight) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!flight) {
            return res
                .status(404)
                .json({ success: false, error: `Flight not found` });
        }
        return res.status(200).json({ success: true, data: flight });
    }).catch(err => console.log(err));
};

getFlights = async (req, res) => {
    await Flight.find({}, (err, flights) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!flights.length) {
            return res
                .status(200)
                .json({ success: true,data:[] ,error: `Flight not found` });
        }
        return res.status(200).json({ success: true, data: flights });
    }).catch(err => console.log(err));
};

module.exports = {
    createFlight,
    updateFlight,
    deleteFlight,
    getFlights,
    getFlightById,
};
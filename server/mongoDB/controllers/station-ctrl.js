const Station = require('../models/station-model')

createStation = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Station',
        });
    }

    const station = new Station(body);

    if (!station) {
        return res.status(400).json({ success: false, error: err });
    }

    station
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: station._id,
                message: 'Station created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Station not created!',
            })
        });
};

updateStation = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    Station.findOne({ _id: req.params.id }, (err, station) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Station not found!',
            });
        }
        station.name = body.ID;
        station
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: tail._id,
                    message: 'Station updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Station not updated!',
                });
            });
    });
};

deleteStation = async (req, res) => {
    await Station.findOneAndDelete({ _id: req.params.id }, (err, station) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!station) {
            return res
                .status(404)
                .json({ success: false, error: `Station not found` });
        }

        return res.status(200).json({ success: true, data: station });
    }).catch(err => console.log(err));
};

getStationById = async (req, res) => {
    await Station.findOne({ _id: req.params.id }, (err, station) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!station) {
            return res
                .status(404)
                .json({ success: false, error: `Station not found` });
        }
        return res.status(200).json({ success: true, data: station });
    }).catch(err => console.log(err));
};

getStations = async (req, res) => {
    await Station.find({}, (err, stations) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!stations.length) {
            return res
                .status(200)
                .json({ success: true,error: `Stations not found` });
        }
        return res.status(200).json({ success: true, data: stations });
    }).catch(err => console.log(err));
};

module.exports = {
    createStation,
    updateStation,
    deleteStation,
    getStations,
    getStationById,
};
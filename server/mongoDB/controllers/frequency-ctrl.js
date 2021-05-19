const Frequency = require('../models/frequency-model')

createFrequency = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Frequency',
        });
    }

    const frequency = new Frequency(body);

    if (!frequency) {
        return res.status(400).json({ success: false, error: err });
    }

    frequency
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: frequency._id,
                message: 'Frequency created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Frequency not created!',
            })
        });
};

updateFrequency = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    Frequency.findOne({ _id: req.params.id }, (err, frequency) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Frequency not found!',
            });
        }
        frequency.name = body.ID;
        frequency
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: frequency._id,
                    message: 'Frequency updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Frequency not updated!',
                });
            });
    });
};

deleteFrequency = async (req, res) => {
    await Frequency.findOneAndDelete({ _id: req.params.id }, (err, frequency) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!frequency) {
            return res
                .status(404)
                .json({ success: false, error: `Frequency not found` });
        }

        return res.status(200).json({ success: true, data: Frequency });
    }).catch(err => console.log(err));
};

getFrequencyById = async (req, res) => {
    await Frequency.findOne({ _id: req.params.id }, (err, frequency) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!frequency) {
            return res
                .status(404)
                .json({ success: false, error: `Frequency not found` });
        }
        return res.status(200).json({ success: true, data: frequency });
    }).catch(err => console.log(err));
};

getFrequencies = async (req, res) => {
    await Frequency.find({}, (err, frequencies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!frequencies.length) {
            return res
                .status(200)
                .json({ success: true,error: `Frequency not found` });
        }
        return res.status(200).json({ success: true, data: frequencies });
    }).catch(err => console.log(err));
};

module.exports = {
    createFrequency,
    updateFrequency,
    deleteFrequency,
    getFrequencies,
    getFrequencyById,
};
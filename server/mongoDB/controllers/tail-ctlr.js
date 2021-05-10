const Tail = require('../models/tail-model')

createTail = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Tail',
        });
    }

    const tail = new Tail(body);

    if (!tail) {
        return res.status(400).json({ success: false, error: err });
    }

    tail
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: tail._id,
                message: 'Tail created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Tail not created!',
            })
        });
};

updateTail = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    Tail.findOne({ _id: req.params.id }, (err, tail) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'tail not found!',
            });
        }
        tail.name = body.ID;
        tail
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: tail._id,
                    message: 'tail updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Tail not updated!',
                });
            });
    });
};

deletetail = async (req, res) => {
    await Tail.findOneAndDelete({ _id: req.params.id }, (err, tail) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!tail) {
            return res
                .status(404)
                .json({ success: false, error: `Tail not found` });
        }

        return res.status(200).json({ success: true, data: tail });
    }).catch(err => console.log(err));
};

getTailById = async (req, res) => {
    await Tail.findOne({ _id: req.params.id }, (err, tail) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!tail) {
            return res
                .status(404)
                .json({ success: false, error: `Tail not found` });
        }
        return res.status(200).json({ success: true, data: tail });
    }).catch(err => console.log(err));
};

getTails = async (req, res) => {
    await Tail.find({}, (err, tails) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!tails.length) {
            return res
                .status(404)
                .json({ success: false, error: `Tail not found` });
        }
        return res.status(200).json({ success: true, data: tails });
    }).catch(err => console.log(err));
};

module.exports = {
    createTail,
    updateTail,
    deleteTail,
    getTails,
    getTailById,
};
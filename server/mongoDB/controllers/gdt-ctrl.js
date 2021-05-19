const GDT = require('../models/gdt-model')

createGDT = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a GDT',
        });
    }

    const Gdt = new GDT(body);

    if (!Gdt) {
        return res.status(400).json({ success: false, error: err });
    }

    Gdt
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: Gdt._id,
                message: 'GDT created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'GDT not created!',
            })
        });
};

updateGDT = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    GDT.findOne({ _id: req.params.id }, (err, Gdt) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'GDT not found!',
            });
        }
        Gdt.name = body.ID;
        Gdt
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: Gdt._id,
                    message: 'GDT updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'GDT not updated!',
                });
            });
    });
};

deleteGDT = async (req, res) => {
    await GDT.findOneAndDelete({ _id: req.params.id }, (err, Gdt) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!Gdt) {
            return res
                .status(404)
                .json({ success: false, error: `GDT not found` });
        }

        return res.status(200).json({ success: true, data: Gdt });
    }).catch(err => console.log(err));
};

getGDTById = async (req, res) => {
    await GDT.findOne({ _id: req.params.id }, (err, Gdt) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!Gdt) {
            return res
                .status(404)
                .json({ success: false, error: `GDT not found` });
        }
        return res.status(200).json({ success: true, data: Gdt });
    }).catch(err => console.log(err));
};

getGDTs = async (req, res) => {
    await GDT.find({}, (err, Gdts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!Gdts.length) {
            return res
                .status(200)
                .json({ success: true,error: `GDT not found` });
        }
        return res.status(200).json({ success: true, data: Gdts });
    }).catch(err => console.log(err));
};

module.exports = {
    createGDT,
    updateGDT,
    deleteGDT,
    getGDTs,
    getGDTById,
};
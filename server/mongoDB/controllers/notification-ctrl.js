const Notification = require('../models/notification-model.js');

createNotification = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Notification',
        });
    }

    const notification = new Notification(body);

    if (!notification) {
        return res.status(400).json({ success: false, error: err });
    }

    notification
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: notification._id,
                message: 'Notification created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Notification not created!',
            })
        });
};

updateNotification = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    Notification.findOne({ _id: req.params.id }, (err, notification) => {
        if (err) {
            console.log("ERROR")
            return res.status(404).json({
                err,
                message: 'Notification not found!',
            });
        }
        notification.name = body.ID;
        notification
            .save()
            .then(() => {
                console.log(body);
                return res.status(200).json({
                    success: true,
                    id: notification._id,
                    message: 'Notification updated!',
                });
            })
            .catch(error => {
                console.log("ERROR")
                return res.status(404).json({
                    error,
                    message: 'Notification not updated!',
                });
            });
    });
};

deleteNotification = async (req, res) => {
    await Notification.findOneAndDelete({ _id: req.params.id }, (err, notification) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!notification) {
            return res
                .status(404)
                .json({ success: false, error: `Notification not found` });
        }

        return res.status(200).json({ success: true, data: Notification });
    }).catch(err => console.log(err));
};

getNotificationById = async (req, res) => {
    await Notification.findOne({ _id: req.params.id }, (err, notification) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!notification) {
            return res
                .status(404)
                .json({ success: false, error: `Notification not found` });
        }
        return res.status(200).json({ success: true, data: notification });
    }).catch(err => console.log(err));
};

getNotifications = async (req, res) => {
    await Notification.find({}, (err, notifications) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!notifications.length) {
            return res
                .status(200)
                .json({ success: true,data:[],error: `Notification not found` });
        }
        return res.status(200).json({ success: true, data: notifications });
    }).catch(err => console.log(err));
};

getOpenNotification = async (req, res) => {
    await Notification.find({Close:"1970-01-01T00:00:00.000Z"}, (err, notifications) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!notifications.length) {
            return res
                .status(200)
                .json({ success: true,data:[],error: `Open Notification not found` });
        }
        return res.status(200).json({ success: true, data: notifications });
    }).catch(err => console.log(err));
};

module.exports = {
    createNotification,
    updateNotification,
    deleteNotification,
    getNotifications,
    getNotificationById,
    getOpenNotification,
};
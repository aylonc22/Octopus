const Notification = require('../models/notification-model.js');
const socket = require('../../index.js');
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

    await Notification.findOneAndUpdate({ _id: req.params.id }, (err, notification) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!notification) {
            return res
                .status(404)
                .json({ success: false, error: `Notification not found` });
        }

        return res.status(200).json({ success: true, data: Notification });
    },{useFindAndModify: true, new:true}).catch(err => console.log(err));
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
    },{useFindAndModify: false}).catch(err => console.log(err));
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

getNotificationsFromTo = async (req, res) => {
    await Notification.find({}).sort({createdAt:-1}).skip(req.params.from*1).limit(req.params.to-req.params.from+1).exec((err, notifications) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!notifications.length) {
            return res
                .status(200)
                .json({ success: true,data:[],error: `Open Notification not found` });
        }
        return res.status(200).json({ success: true, data: notifications });
    });
};


getOpenNotificationFromTo = async (req, res) => {
    await Notification.find({Close:"1970-01-01T00:00:00.000Z"}).sort({createdAt:-1})
    .skip(req.params.from*1).limit(req.params.to-req.params.from+1).exec((err, notifications) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!notifications.length) {
            return res
                .status(200)
                .json({ success: true,data:[],error: `Open Notification not found` });
        }
        return res.status(200).json({ success: true, data: notifications });
    });
};
const updateNotificationClients = async(req,res)=> {
    await Notification.findOneAndUpdate({_id:req.id},{$set:{Clients:[...Clients,req.client]}},
    {useFindAndModify: false, new:true},err=>{
        if(err)
        console.log(`[Mongo]  Failed to update ${req.id} --->\n ${err}`);

        console.log(`[Mongo] Updated Successfuly ${req.id}`)
    },{new:true})
  }

module.exports = {
    createNotification,
    updateNotification,
    deleteNotification,
    getNotifications,
    getNotificationById,
    getOpenNotification,
    getNotificationsFromTo,
    getOpenNotificationFromTo,
    updateNotificationClients
};
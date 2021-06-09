const express = require('express');

const NotificationCtrl = require('../controllers/notification-ctrl');

const router = express.Router();

router.post('/notifications', NotificationCtrl.createNotification);
router.put('/notifications/:id', NotificationCtrl.updateNotification);
router.delete('/notifications/:id', NotificationCtrl.deleteNotification);
router.get('/notifications/:id', NotificationCtrl.getNotificationById);
router.get('/notifications', NotificationCtrl.getNotifications);
router.get('/opennotifications', NotificationCtrl.getOpenNotification);
router.get('/notifications/:from/:to',NotificationCtrl.getNotificationsFromTo);
module.exports = router;
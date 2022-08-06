const router = require('express').Router()

const { getFriends, messageToDB, getMessage, sendImages, messageSeen, deliveredMessage } = require('../controllers/messengerController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/get-friends',authMiddleware, getFriends);
router.post('/send-message',authMiddleware, messageToDB);
router.get('/get-message/:id',authMiddleware, getMessage);
router.post('/send-image-message',authMiddleware, sendImages);
router.post('/seen-message',authMiddleware, messageSeen);
router.put('/delivered-message',authMiddleware, deliveredMessage);


module.exports = router;
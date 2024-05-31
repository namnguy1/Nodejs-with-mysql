const express = require('express');
const friendController = require('../controllers/friendController');
const router = express.Router();
    
// Gửi yêu cầu kết bạn
router.post('/send-request', friendController.sendFriendRequest);

// Chấp nhận yêu cầu kết bạn
router.put('/accept-request/:requestId', friendController.acceptFriendRequest);

// Từ chối hoặc hủy yêu cầu kết bạn
router.delete('/decline-request/:requestId', friendController.declineFriendRequest);

// Lấy danh sách bạn bè
router.get('/friends/:userId', friendController.getFriends);

module.exports = router;

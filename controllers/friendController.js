const { User, Friend } = require('../models');
const { Op } = require('sequelize');
class FriendController {
    // Gửi yêu cầu kết bạn
    sendFriendRequest = async (req, res, next) => {
        try {
            const { userId, friendId } = req.body;

            // Kiểm tra xem yêu cầu đã tồn tại chưa
            const existingRequest = await Friend.findOne({
                where: {
                    user_id: userId,
                    friend_id: friendId
                }
            });

            if (existingRequest) {
                return res.status(400).json({ message: 'Friend request already sent or already friends!' });
            }

            const friendRequest = await Friend.create({
                user_id: userId,
                friend_id: friendId,
                status: 'pending'
            });

            res.status(201).json(friendRequest);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    };

    // Chấp nhận yêu cầu kết bạn
    acceptFriendRequest = async (req, res, next) => {
        try {
            const { requestId } = req.params;

            const friendRequest = await Friend.findOne({
                where: {
                    friendship_id: requestId
                }
            });

            if (!friendRequest) {
                return res.status(404).json({ message: 'Friend request not found!' });
            }

            friendRequest.status = 'accepted';
            await friendRequest.save();

            res.status(200).json(friendRequest);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    };

    // Từ chối hoặc hủy kết bạn
    declineFriendRequest = async (req, res, next) => {
        try {
            const { requestId } = req.params;

            const friendRequest = await Friend.findOne({
                where: {
                    friendship_id: requestId
                }
            });

            if (!friendRequest) {
                return res.status(404).json({ message: 'Friend request not found!' });
            }

            await friendRequest.destroy();

            res.status(200).json({ message: 'Friend request declined or canceled' });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    };

    // Lấy danh sách bạn bè
    getFriends = async (req, res, next) => {
        try {
            const { userId } = req.params;

            // Tìm tất cả các bản ghi Friend nơi user_id hoặc friend_id là userId và status là 'accepted'
            const friends = await Friend.findAll({
                where: {
                    [Op.or]: [
                        { user_id: userId, status: 'accepted' },
                        { friend_id: userId, status: 'accepted' }
                    ]
                },
                include: [
                    {
                        model: User,
                        as: 'User',
                        attributes: ['user_id', 'username', 'email', 'full_name'] // Chỉ lấy các thuộc tính cần thiết
                    },
                    {
                        model: User,
                        as: 'FriendUser',
                        attributes: ['user_id', 'username', 'email', 'full_name'] // Chỉ lấy các thuộc tính cần thiết
                    }
                ]
            });

            // Tạo danh sách bạn bè từ kết quả tìm kiếm
            const friendList = friends.map(friend => {
                if (friend.user_id === parseInt(userId, 10)) {
                    return friend.FriendUser;
                } else {
                    return friend.User;
                }
            });

            res.status(200).json(friends);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = new FriendController();

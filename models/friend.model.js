const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/config.js');
const User = require('../models/user.model');
const Friend = sequelize.define('Friend', {
  friendship_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  friend_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'declined'),
    defaultValue: 'pending'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Friends',
  timestamps: false
});
// Định nghĩa mối quan hệ giữa các model
User.hasMany(Friend, { foreignKey: 'user_id', as: 'Friends' });
User.hasMany(Friend, { foreignKey: 'friend_id', as: 'UserFriends' });
Friend.belongsTo(User, { foreignKey: 'user_id', as: 'User' });
Friend.belongsTo(User, { foreignKey: 'friend_id', as: 'FriendUser' });
module.exports = Friend;
const { Friend } = require('../models');

async function seedFriends() {
  const friendRequests = [
    { user_id: 1, friend_id: 2, status: 'accepted' },
    { user_id: 1, friend_id: 3, status: 'pending' },
    { user_id: 2, friend_id: 3, status: 'accepted' },
    { user_id: 3, friend_id: 4, status: 'pending' }
  ];

  for (const request of friendRequests) {
    await Friend.create(request);
  }

  console.log('Friend requests seeded successfully');
}

seedFriends().catch(err => {
  console.error('Error seeding friend requests:', err);
});

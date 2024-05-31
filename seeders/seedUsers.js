const { User } = require('../models');
const bcrypt = require('bcrypt');

async function seedUsers() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = [
    { username: 'john_doe', password: hashedPassword, email: 'john@example.com', full_name: 'John Doe' },
    { username: 'jane_smith', password: hashedPassword, email: 'jane@example.com', full_name: 'Jane Smith' },
    { username: 'alice_wonder', password: hashedPassword, email: 'alice@example.com', full_name: 'Alice Wonder' },
    { username: 'bob_builder', password: hashedPassword, email: 'bob@example.com', full_name: 'Bob Builder' }
  ];

  for (const user of users) {
    await User.create(user);
  }

  console.log('Users seeded successfully');
}

seedUsers().catch(err => {
  console.error('Error seeding users:', err);
});

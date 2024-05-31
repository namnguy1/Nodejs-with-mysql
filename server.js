// index.js
const express = require('express');
const dbConfig = require('./config/config');
const User = require('./models/User');
const { sequelize } = require('./config/config');
const userRoutes = require('./routes/userRoutes');


const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);


// Tạo các model khác (Friends, Messages, VideoCalls, Posts, Reactions, Comments, Settings, Notifications, Media, Blocks) theo cấu trúc tương tự

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

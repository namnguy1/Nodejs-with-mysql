const { User } = require('../models');

class UserController {
  register = async (req, res, next) => {
    try {
      const alreadyExistUser = await User.findOne({ where: { email: req.body.email }})
      if (alreadyExistUser) 
          return res.status(400).json({ Message: "Email is already existed!" })
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
const { User } = require('../models');
const bcrypt = require('bcrypt')
class UserController {
  register = async (req, res, next) => {
    try {
      const { username, password, confirm_password, email } = req.body
      const alreadyExistUser = await User.findOne({ where: { email } })
      if (alreadyExistUser)
        return res.status(400).json({ Message: "Email is already existed!" })
      if (req.body.password.length < 6)
        return res.status(400).json({ Message: "Password is weak!" })
      if (req.body.password !== confirm_password)
        return res.status(400).json({ Message: "Password is not matched!" })
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await User.create({ ...req.body, password: hashedPassword });
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
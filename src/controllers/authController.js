
const { User } = require('../models');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, userType } = req.body;
    const user = await User.create({ name, email, password, userType });

    const token = jwt.sign({ id: user.id, userType: user.userType }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.validPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, userType: user.userType }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

// login up form component //
const Login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    try {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result === true) {
        // console.log(user._id);
        const token = await Jwt.sign(
          {
            id: user._id,
          },
          process.env.SECRET_KEY
        );
        res.status(200).json({
          token: token,
          message: "Successful",
          userid: user._id,
          username: user.username,
        });
      } else {
        return res.status(200).json({ message: "Invalid Credentials" });
      }
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  } else {
    return res.status(200).json({ message: "No such user exit" });
  }
};

// Sign Up form ........//
const SignUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const check = await User.findOne({ email: email });
    if (check) {
      return res.status(200).send({ message: "User already exist" });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        const newuser = await User.create({ username, email, password: hash });
        res.status(200).send({ message: "User created Successfully" });
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  SignUp,
  Login,
};

//  if (!mongoose.Types.ObjectId.isValid(id)) {
//    return res.status(404).json({ error: "No such workout" });
//  }

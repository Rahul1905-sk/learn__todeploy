const express = require("express");
const { UserModel } = require("../model/User.model");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, pass, name, age } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        res.send({ err: "something went wrong" });
      }

      const user = new UserModel({ email, name, age, pass: hash });
      await user.save();
      res.status(200).send({ msg: "New User has been registered" });
    });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    // console.log({pass});
    if (user) {
      // const userPass = user.pass
      bcrypt.compare(pass, user.pass, function (err, result) {
        // result == true
        // console.log({pass, userPass});
        if (result) {
          const token = jwt.sign({ authorID:user._id, author: user.name }, "masai", {expiresIn: "3h"});
          res.status(200).send({ msg: "Login Successfull", token: token });
        } else {
          res.status(200).send({ err: "wrong Credentials!!!" });
        }
      });
    } else {
      res.status(200).send({ err: "wrong Credentials!!!" });
    }
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

module.exports = {
  userRouter,
};

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user-model.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    //Email Validation
    const email_exist = await User.findOne({ email: email });
    if (email_exist) {
      return res
        .status(400)
        .json({ status: 0, msg: `Email is Already in Use.` });
    }

    //Hashing Password
    bcrypt
      .hash(password, 10)
      .then((HashedPassword) => {
        const newUser = new User({
          name,
          email,
          password: HashedPassword,
        });
        newUser
          .save()
          .then((user) => {
            const token = jwt.sign(
              { user_id: user._id },
              process.env.SECRET_KEY,
              { expiresIn: "24h" }
            );
            const refreshToken = jwt.sign(
              { user_id: user._id },
              process.env.SECRET_KEY,
              { expiresIn: "1y" }
            );
            return res
              .status(201)
              .json({
                status: 1,
                msg: "Registerd Successfully.",
                token,
                refreshToken,
              });
          })
          .catch((err) =>
            res
              .status(500)
              .json({
                status: 0,
                msg: "Failed while registering User",
                err: err.message,
              })
          );
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ status: 0, msg: "Unable to Hash Password." });
      });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, msg: "Failed while registering User" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ status: 0, msg: "User Not Found" });

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched)
      return res.status(401).json({ status: 0, msg: "Invalid Password" });

    const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24s",
    });
    const refreshToken = jwt.sign(
      { user_id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1y" }
    );

    return res
      .status(200)
      .json({ status: 1, msg: "Login Successfull.", token, refreshToken });
  } catch (error) {
    return res.status(500).json({ status: 0, msg: error.message });
  }
}

export async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token not provided" });
    }

    jwt.verify(refreshToken, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid refresh token" });
      }

      const token = jwt.sign(
        { user_id: decoded.user_id },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );
      const refreshToken = jwt.sign(
        { user_id: decoded.user_id },
        process.env.SECRET_KEY,
        { expiresIn: "1y" }
      );

      // Send the new access token to the client
      res.json({ token, refreshToken });
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
}

export async function getUserName(req, res) {
  try {
    User.findOne({ _id: req.user_id }, (err, data) => {
      if (err) throw err;
      if (!data)
        return res.status(404).json({ status: 0, msg: "User Not Found." });
      const { password, _id, tasks, email, ...user } = Object.assign(
        {},
        data.toJSON()
      );
      return res
        .status(200)
        .json({ status: 1, msg: "User Found.", user: user });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, msg: `Server Error : ${error.message}` });
  }
}

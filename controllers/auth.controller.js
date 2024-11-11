import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    username === "" ||
    email === "" ||
    password === "" ||
    !username ||
    !email ||
    !password
  ) {
    return next(errorHandler(400, "all fields are required"));
  }

  const hashpassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });

  try {
    await newUser.save();
    res.status(200).json("sign up success");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "" || !email || !password) {
    return next(errorHandler(400, "all fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler("400", "User not found!"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler("400", "Invalid Password"));
    }

    const { password: pass, ...rest } = validUser._doc;

    const token = jwt.sign(
      {
        id: validUser._id,
        isAdmin: validUser.isAdmin,
      },
      process.env.JWT_SECRET
    );

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

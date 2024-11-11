import User from "../models/user.model.js";

export const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { username, email, phoneNo, city, profilePicture } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
        phoneNo,
        city,
        profilePicture,
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return next(errorHandler("404", "User Not Found!"));
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("Signed Out Succesfully!");
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json("User Deleted Succesfully!");
  } catch (error) {
    next(error);
  }
};

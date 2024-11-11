import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    phoneNo: {
      type: String,
      default: null,
      length: 10,
    },
    city: {
      type: String,
      default: null,
    },
    profilePicture: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

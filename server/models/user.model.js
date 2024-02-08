const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      ref: "User",
    },
    email: {
      type: String,
      require: true,
      unique: true,
      min: 5,
    },
    password: {
      type: String,
      require: true,
      length: 6,
    },
    gender: {
      type: String,
      enum: ["Nam", "Nữ"],
      require: true,
    },
    avatar: {
      type: String,
    },
    friendList: {
      type: [Schema.ObjectId],
      ref: "User",
    },
    postsList: {
      type: [Schema.ObjectId],
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);

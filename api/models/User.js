const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    kecamatan: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("User", UserSchema);

module.exports = user;

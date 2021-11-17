const mongoose = require("mongoose");
const crypto = require("crypto");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  encry_password: {
    type: String,
    required: true,
  },
  salt: String,
});

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uid.randomUUID(6);
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};
module.exports = mongoose.model("User", userSchema);

import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrpt from "bcrypt";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary service to store files
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// middleWare for password encryption
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrpt.hash(this.password, 10);
  }
  next();
});

//method boolean return check password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrpt.compare(password, this.password);
};

// tokens jwt
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const UserSchema = mongoose.model("User", userSchema);

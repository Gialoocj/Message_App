const User = require("../models/user.model");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  const { username, email, password, gender, avatar } = req.body;
  const _username = await User.findOne({ username });
  const _email = await User.findOne({ email });
  const regexPassword = /^[a-zA-Z0-9]{6,8}$/;

  if (!username || !email || !password || !gender) {
    return res
      .status(400)
      .json({ message: "Vui lòng nhập đủ dữ liệu", success: false });
  }

  if (_username) {
    return res
      .status(400)
      .json({ message: "tên người dùng đã tồn tại", success: false });
  }

  if (_email) {
    return res
      .status(400)
      .json({ message: "Email đã được sử dụng", success: false });
  }

  if (regexPassword.test(password)) {
    return res
      .status(400)
      .json({ message: "Mật khẩu không đúng định dạng", success: false });
  }

  const hashPassword = await bcrypt.hash(password, 8);

  const _user = new User({
    username,
    email,
    password: hashPassword,
    gender,
    avatar,
  });

  await _user.save();

  const _authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.AUTHENTICATE_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  return res.status(200).json({
    message: "Tạo tài khoản thành công",
    success: true,
    _user,
    _authenticateToken,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Tài khoản không tồn tại", success: false });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res
        .status(400)
        .json({ message: "Mật khẩu không chính xác", success: false });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.AUTHENTICATE_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Đăng nhập thành công",
      success: true,
      user,
      token: token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi", success: false });
  }
};
module.exports = { createUser, login };

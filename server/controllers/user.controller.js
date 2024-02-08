const user = require("../models/user.model");

const getUser = async (req, res, next) => {
  const { userId } = req.params;
  const _user = await user.findOne({ userId });
  if (!_user) {
    return res
      .status(400)
      .json({ message: "Không tìm thấy người dùng", success: false });
  }
  return res
    .status(200)
    .json({ message: "Lấy thông tin thành công", success: true, _user });
};

const getAllUsers = async (req, res, next) => {
  const _users = await user.find();

  try {
    return res.status(200).json({
      message: "Lấy thông tin người dùng thành công",
      success: true,
      _users,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Có lỗi trong quá trình xử lý dữ liệu", error });
  }
};

module.exports = { getUser, getAllUsers };

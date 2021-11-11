const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const redis_client = require("../redis_connect");

async function Register(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  try {
    const saved_user = await user.save();
    res.json({
      status: true,
      message: "Registered successfully.",
      data: saved_user,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: false, message: "Something went wrong.", data: error });
  }
}

async function Login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({
      email: email,
      password: password,
    }).exec();

    if (user === null)
      res
        .status(401)
        .json({ status: false, message: "username or password is not valid." });
    const access_token = jwt.sign(
      { sub: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_TIME }
    );
    const refresh_token = GenerateRefreshToken(user._id);
    return res.json({
      status: true,
      message: "login success",
      data: { access_token, refresh_token, email },
    });
  } catch (error) {
    return res
      .status(401)
      .json({ status: true, message: "login fail", data: error });
  }
}

async function Logout(req, res) {
  const user_id = req.userData.sub;
  const token = req.token;

  await redis_client.del(user_id.toString());

  await redis_client.set("BL_" + user_id.toString(), token);

  return res.json({ status: true, message: "success." });
}

function GetAccessToken(req, res) {
  const user_id = req.userData.sub;
  const access_token = jwt.sign(
    { sub: user_id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_TIME }
  );
  const refresh_token = GenerateRefreshToken(user_id);
  return res.json({
    status: true,
    message: "success",
    data: { access_token, refresh_token },
  });
}

function GenerateRefreshToken(user_id) {
  const refresh_token = jwt.sign(
    { sub: user_id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_TIME }
  );

  redis_client.get(user_id.toString(), (err, data) => {
    if (err) throw err;

    redis_client.set(
      user_id.toString(),
      JSON.stringify({ token: refresh_token })
    );
  });

  return refresh_token;
}

async function GetUserLoginList(req, res) {
  try {
    const users = await User.find({}).exec();

    if (users === null)
      res.status(401).json({ status: false, message: "No users found" });
    return res.json({
      status: true,
      users: users,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ status: true, message: "Users fetch failed", data: error });
  }
}

async function GetUserDetails(req, res) {
  const email = req.body.email;
  try {
    const userDetail = await User.findOne({
      email: email,
    }).exec();

    if (userDetail === null)
      res.status(401).json({ status: false, message: "Details Not Found" });
    return res.json({
      status: true,
      data: userDetail,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ status: true, message: "User detail fetch failed", data: error });
  }
}

module.exports = {
  Register,
  Login,
  Logout,
  GetAccessToken,
  GenerateRefreshToken,
  GetUserLoginList,
  GetUserDetails,
};

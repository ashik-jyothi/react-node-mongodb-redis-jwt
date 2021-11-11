const route = require("express").Router();
const auth_middleware = require("../middlewares/auth.middleware");
const user_controller = require("../controllers/user.controller");

route.get(
  "/login_list",
  auth_middleware.verifyToken,
  user_controller.GetUserLoginList
);

route.get(
  "/user_details",
  auth_middleware.verifyToken,
  user_controller.GetUserDetails
);

route.get("/", auth_middleware.verifyToken, (req, res) => {
  return res.json({ status: true, message: "You have been successfully signed in" });
});

module.exports = route;

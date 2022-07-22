const express = require("express");
const router = express.Router();
const { SignUp, Login } = require("../controller/BeforeLogin");
const {
  ADD,
  Data,
  DeleteTask,
  UpdateTask,
} = require("../controller/AfterLogin");
const checkAuth = require("../auth/auth");

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/addtask", checkAuth, ADD);
router.post("/item", checkAuth, Data);
router.post("/delete", checkAuth, DeleteTask);
router.post("/updatetask", checkAuth, UpdateTask);

module.exports = router;

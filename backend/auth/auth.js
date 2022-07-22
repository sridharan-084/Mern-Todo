const Jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = checkAuth = async (req, res, next) => {
  //console.log(req.headers);
  const token = req.headers["auth"];
  // console.log(token);
  //console.log("token => " + token);

  if (token) {
    try {
      const success = await Jwt.verify(token, process.env.SECRET_KEY);
      if (success) next();
    } catch (err) {
      res.status(404).json({
        message: "invalid token",
        result: err,
      });
    }
  } else {
    res.status(401).send({
      result: "invalid credentials",
    });
  }
};

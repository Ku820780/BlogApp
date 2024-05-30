const config = require("../Util/Config");
const jwt = require("jsonwebtoken");
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: "Token not found, Please login !",
      status: false,
      data: null,
    });
  } else {
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
          status: false,
          data: null,
        });
      } else {
        req.email = decoded.email;
        req.name = decoded.name;
        req.id = decoded.id;
        next();
      }
    });
  }
};

module.exports = verifyUser;

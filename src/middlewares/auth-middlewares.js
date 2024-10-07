import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  const tokenJwt = req.get("token");

  if (!tokenJwt) {
    return res.status(401).json({
      msg: "Token required",
    });
  }

  jwt.verify(tokenJwt, process.env.APIBOOK_JWT_PASSWORD, (error, decode) => {
    if (error) {
      return res.status(401).json({
        msg: "Token not valid",
      });
    }
    req.usuario = decode.email;
    next();
  });
};

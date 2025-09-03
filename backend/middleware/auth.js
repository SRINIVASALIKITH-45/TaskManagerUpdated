import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message); // meaningful handling
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;

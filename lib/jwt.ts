import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (payload: object, expiresIn: string = "4h") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (paswword: string) => {
  return bcrypt.hash(paswword, 5);
};

export const createJWT = (user: { id: string; username: string }) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET as string
  );
  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "Not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "Not a valid token" });
    return;
  }

  try {
    const user: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401);
    res.json({ message: "Not a valid token" });
    return;
  }
};

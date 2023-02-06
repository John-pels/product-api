import { Request, Response } from "express";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signin = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isPasswordValid = await comparePasswords(
    req.body.password,
    user!.password
  );

  if (!isPasswordValid) {
    res.status(401);
    res.json({ message: "Incorrect password" });
    return;
  }

  const token = createJWT(user!);
  res.json({ token });
};

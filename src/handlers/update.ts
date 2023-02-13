import { Request, Response } from "express";
import prisma from "../db";

export const getOneUpdate = async (req: Request, res: Response) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: update });
};

export const getUpdates = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      Update: true,
    },
  });
  const updates = products.reduce((allUpdates: any, product) => {
    return [...allUpdates, ...product.Update];
  }, []);
  res.json({ data: updates });
};
export const createUpdate = async (req: Request, res: Response) => {};
export const updateUpdate = async (req: Request, res: Response) => {};
export const deleteUpdate = async (req: Request, res: Response) => {};

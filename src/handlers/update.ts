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
export const createUpdate = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });
  if (!product) {
    //doest not belong to the user
    return res.json({ message: "It does not belong to the user" });
  }
  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: { id: product.id } },
    },
  });
  res.json({ data: update });
};
export const updateUpdate = async (req: Request, res: Response) => {
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
  const match = updates.find((update: any) => update.id === req.params.id);
  if (!match) {
    res.json({ message: "Not found" });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
};

export const deleteUpdate = async (req: Request, res: Response) => {
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

  const match = updates.find((update: any) => update.id === req.params.id);

  if (!match) {
    res.json({ message: "Not found" });
  }
  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: deleted });
};

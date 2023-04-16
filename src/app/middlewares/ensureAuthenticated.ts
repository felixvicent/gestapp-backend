import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const prisma = new PrismaClient();

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: "Not authenticated" });
  }

  const [, token] = authHeader.split(" ");

  const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "";

  try {
    const { sub: user_id } = verify(token, ENCRYPTION_KEY) as IPayload;

    const user = await prisma.user.findUnique({ where: { id: user_id } });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    return response.status(500);
  }
}

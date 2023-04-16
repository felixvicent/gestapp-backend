import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function registerUser(request: Request, response: Response) {
  try {
    const registerUserSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = registerUserSchema.parse(request.body);

    const passwordHash = bcrypt.hashSync(password, 8);

    await prisma.user.create({
      data: { name, email, password: passwordHash },
    });

    return response.status(201).send();
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
}

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { RegisterUserInput } from "../../../validations/registerUserValidation";

const prisma = new PrismaClient();

export async function registerUser(request: Request, response: Response) {
  try {
    const { name, email, password }: RegisterUserInput = request.body;

    const userAlreadyExists = await prisma.user.findFirst({ where: { email } });

    if (userAlreadyExists) {
      return response.status(400).json({ error: "User already exists" });
    }

    const passwordHash = bcrypt.hashSync(password, 8);

    await prisma.user.create({
      data: { name, email, password: passwordHash },
    });

    return response.status(201).send();
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
}

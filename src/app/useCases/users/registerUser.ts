import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { RegisterUserInput } from "../../../validations/users/registerUserValidation";

export async function registerUser(request: Request, response: Response) {
  try {
    const prisma = new PrismaClient();
    const { name, email, password }: RegisterUserInput = request.body;

    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

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

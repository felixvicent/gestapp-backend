import { Request, Response } from "express";
import { AuthenticateUserInput } from "../../../validations/users/authenticateUserValidation";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export async function authenticateUser(request: Request, response: Response) {
  try {
    const prisma = new PrismaClient();
    const { email, password }: AuthenticateUserInput = request.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return response
        .status(401)
        .json({ error: "Email or Password incorrect" });
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      return response
        .status(401)
        .json({ error: "Email or Password incorrect" });
    }

    const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "";

    const token = sign({}, ENCRYPTION_KEY, {
      subject: user.id,
      expiresIn: "7d",
    });

    const tokenToReturn = {
      token,
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    };

    return response.json(tokenToReturn);
  } catch (error) {
    console.log(error);
    response.status(500);
  }
}

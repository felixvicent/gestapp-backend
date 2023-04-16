import { Request, Response, NextFunction } from "express";
import { AuthenticateUserSchema } from "../../../validations/users/authenticateUserValidation";

export async function authenticateUserValidation(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    AuthenticateUserSchema.parse(request.body);

    return next();
  } catch (error) {
    return response.status(400).json(error);
  }
}

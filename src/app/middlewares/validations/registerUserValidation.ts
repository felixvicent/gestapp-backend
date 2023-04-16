import { Request, Response, NextFunction } from "express";
import { RegisterUserSchema } from "../../../validations/registerUserValidation";

export async function registerUserValidation(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    RegisterUserSchema.parse(request.body);

    return next();
  } catch (error) {
    return response.status(400).json(error);
  }
}

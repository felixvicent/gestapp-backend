import { Router } from "express";

import { registerUser } from "../app/useCases/users/registerUser";

import { registerUserValidation } from "../app/middlewares/validations/registerUserValidation";

export const userRoutes = Router();

userRoutes.post("/register", registerUserValidation, registerUser);

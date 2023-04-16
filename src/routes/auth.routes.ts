import { Router } from "express";

import { authenticateUser } from "../app/useCases/auth/authenticateUser";

import { authenticateUserValidation } from "../app/middlewares/validations/authenticateUserValidation";

export const authRoutes = Router();

authRoutes.post("/", authenticateUserValidation, authenticateUser);

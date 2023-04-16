import { Router } from "express";

import { registerUser } from "../app/useCases/users/registerUser";

export const userRoutes = Router();

userRoutes.post("/register", registerUser);

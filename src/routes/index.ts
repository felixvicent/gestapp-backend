import { Router } from "express";

import { userRoutes } from "./users.routes";

export const router = Router();

router.use("/users", userRoutes);

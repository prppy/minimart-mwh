import { Router } from "express";
const router = Router();

// define routes
import authenticationRoute from "./authenticationRoute.js";

// use routes
router.use("/authentication", authenticationRoute);

export default router;
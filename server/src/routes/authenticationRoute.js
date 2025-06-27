// INCLUDES
import { Router } from "express";
const router = Router();
import * as authenticationController from "../controllers/authenticationController.js";
import * as argonMiddleware from "../middlewares/argonMiddleware.js";
import * as jwtMiddleware from "../middlewares/jwtMiddleware.js";

// CONTROLLERS

// register user
router.post("/register", authenticationController.checkUserExists, argonMiddleware.generateHashedPassword, authenticationController.createUser, jwtMiddleware.generateAccessToken, jwtMiddleware.generateRefreshToken, authenticationController.sendAuthResponse);

// login user
router.post("/login", authenticationController.validateUserCredentials, argonMiddleware.verifyHashedPassword, jwtMiddleware.generateAccessToken, jwtMiddleware.generateRefreshToken, authenticationController.sendAuthResponse)

// generate new access token
router.post("/refresh", jwtMiddleware.verifyRefreshToken, jwtMiddleware.generateAccessToken, jwtMiddleware.handleAccessToken)

export default router;
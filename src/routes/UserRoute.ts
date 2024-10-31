import express from "express";
import {
  createCurrentUser,
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/UserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateUserRequest } from "../middleware/validation";

const userRouter = express.Router();

// /api/my/user -> to create a new user
userRouter.post("/", jwtCheck, createCurrentUser as express.RequestHandler);

// /api/my/user -> to get user information
userRouter.get(
  "/",
  jwtCheck,
  jwtParse as express.Handler,
  getCurrentUser as express.RequestHandler
);

// /api/my/user -> to update user information
userRouter.put(
  "/",
  jwtCheck,
  jwtParse as express.Handler,
  validateUserRequest,
  updateCurrentUser as express.RequestHandler
);

export default userRouter;

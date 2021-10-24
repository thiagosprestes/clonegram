import { Router } from "express";
import { SessionController } from "./controllers/SessionController";
import { UserController } from "./controllers/UserController";
import { sessionMiddleware } from "./middlewares/SessionMiddleware";

export const router = Router();

router.post("/users", new UserController().create);
router.post("/login", new SessionController().create);
router.post("/refresh-token", new SessionController().refreshToken);
router.get("/users", sessionMiddleware, new UserController().index);

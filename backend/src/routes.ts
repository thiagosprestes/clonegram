import { Router } from "express";
import { upload } from "./config/multer";
import { SessionController } from "./controllers/SessionController";
import { UserController } from "./controllers/UserController";
import { sessionMiddleware } from "./middlewares/SessionMiddleware";

export const router = Router();

router.post(
  "/users",
  upload.single("profile_picture"),
  new UserController().create
);
router.post("/login", new SessionController().create);
router.post("/refresh-token", new SessionController().refreshToken);
router.get("/users", sessionMiddleware, new UserController().index);

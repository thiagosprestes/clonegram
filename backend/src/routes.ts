import { Router } from "express";
import { upload } from "./config/multer";
import { PostController } from "./controllers/PostController";
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

router.post(
  "/posts",
  sessionMiddleware,
  upload.array("files"),
  new PostController().create
);
router.get("/posts/:userId", sessionMiddleware, new PostController().index);
router.put("/posts/:postId", sessionMiddleware, new PostController().update);
router.delete("/posts/:postId", sessionMiddleware, new PostController().delete);

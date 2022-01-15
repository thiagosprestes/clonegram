import { Router } from "express";
import { upload } from "./config/multer";
import { PostCommentController } from "./controllers/PostCommentController";
import { PostController } from "./controllers/PostController";
import { PostLikeController } from "./controllers/PostLikeController";
import { SessionController } from "./controllers/SessionController";
import { UserController } from "./controllers/UserController";
import { UserFollowersController } from "./controllers/UserFollowersController";
import { UserFollowsController } from "./controllers/UserFollowsController";
import { sessionMiddleware } from "./middlewares/SessionMiddleware";

export const router = Router();

router.post(
  "/users",
  upload.single("profile_picture"),
  new UserController().create
);
router.post("/login", new SessionController().create);
router.post("/refresh-token", new SessionController().refreshToken);

router.post(
  "/posts",
  sessionMiddleware,
  upload.array("files"),
  new PostController().create
);
router.get("/users", sessionMiddleware, new UserController().index);
router.get("/user/:id", sessionMiddleware, new UserController().show);

router.get("/feed/:userId", sessionMiddleware, new PostController().index);
router.get("/post/:postId", sessionMiddleware, new PostController().show);
router.put("/posts/:postId", sessionMiddleware, new PostController().update);
router.delete("/posts/:postId", sessionMiddleware, new PostController().delete);

router.post(
  "/posts/:postId",
  sessionMiddleware,
  new PostCommentController().create
);
router.get(
  "/posts/:postId/comments",
  sessionMiddleware,
  new PostCommentController().index
);
router.delete(
  "/posts/comments/:postCommentId",
  sessionMiddleware,
  new PostCommentController().delete
);

router.post(
  "/posts/:postId/like",
  sessionMiddleware,
  new PostLikeController().create
);
router.get(
  "/posts/:postId/likes",
  sessionMiddleware,
  new PostLikeController().index
);
router.delete(
  "/posts/likes/:postLikeId",
  sessionMiddleware,
  new PostLikeController().delete
);

router.post(
  "/users/:userFollowId",
  sessionMiddleware,
  new UserFollowsController().create
);
router.get(
  "/users/:userId/follows",
  sessionMiddleware,
  new UserFollowsController().index
);
router.get(
  "/users/follows/:userId",
  sessionMiddleware,
  new UserFollowsController().show
);
router.delete(
  "/users/:userId/follows",
  sessionMiddleware,
  new UserFollowsController().delete
);

router.get(
  "/users/:userId/followers",
  sessionMiddleware,
  new UserFollowersController().index
);

import prismaClient from "@src/config/prisma";
import { Request, Response } from "express";
import * as yup from "yup";

class PostLikeController {
  async create(request: Request, response: Response) {
    try {
      const postModel = prismaClient.post;
      const postLikeModel = prismaClient.postLike;

      const { userId } = request.body;
      const { postId } = request.params;

      const isPostExists = await postModel.findFirst({
        where: { id: postId },
      });

      if (!isPostExists)
        return response.status(400).json({ message: "Post not exists" });

      const schema = yup.object().shape({
        userId: yup.string().required(),
      });

      await schema.validate(request.body, {
        abortEarly: false,
      });

      const result = await postLikeModel.create({
        data: {
          postId,
          userId,
        },
      });

      return response.json(result);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ message: "Error when like post" });
    }
  }

  async index(request: Request, response: Response) {
    const postModel = prismaClient.post;
    const postLikeModel = prismaClient.postLike;

    const { postId } = request.params;

    const params = request.query;

    const isPostExists = await postModel.findFirst({
      where: { id: postId },
    });

    if (!isPostExists)
      return response.status(400).json({ message: "Post not exists" });

    const postlikes = await postLikeModel.findMany({
      where: {
        postId,
        user: {
          username: {
            mode: "insensitive",
            contains: params.username as string,
          },
        },
      },
      include: {
        user: {
          select: {
            username: true,
            profile: {
              select: {
                profile_picture: true,
              },
            },
          },
        },
      },
    });

    return response.json(postlikes);
  }

  async delete(request: Request, response: Response) {
    try {
      const postLikeModel = prismaClient.postLike;

      const { postLikeId } = request.params;

      const isPostLikeExists = await postLikeModel.findFirst({
        where: { id: postLikeId },
      });

      if (!isPostLikeExists)
        return response.status(400).json({ message: "Post like not exists" });

      await postLikeModel.delete({
        where: { id: postLikeId },
      });

      return response.status(204).json();
    } catch (error) {
      console.log(error);

      return response
        .status(400)
        .json({ message: "Error when delete post like" });
    }
  }
}

export { PostLikeController };

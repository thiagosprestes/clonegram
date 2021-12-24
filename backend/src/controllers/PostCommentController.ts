import prismaClient from "@src/config/prisma";
import { Request, Response } from "express";
import * as yup from "yup";

class PostCommentController {
  async create(request: Request, response: Response) {
    try {
      const postModel = prismaClient.post;
      const postCommentModel = prismaClient.postComment;

      const { userId, comment } = request.body;
      const { postId } = request.params;

      const isPostExists = await postModel.findFirst({
        where: { id: postId },
      });

      if (!isPostExists)
        return response.status(400).json({ message: "Post not exists" });

      const schema = yup.object().shape({
        userId: yup.string().required(),
        comment: yup.string().required(),
      });

      await schema.validate(request.body, {
        abortEarly: false,
      });

      const createComment = await postCommentModel.create({
        data: {
          postId,
          userId,
          comment,
        },
      });

      const newComment = await postCommentModel.findFirst({
        where: {
          id: createComment.id,
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

      return response.json(newComment);
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ message: "Error when create post comment" });
    }
  }

  async index(request: Request, response: Response) {
    const postModel = prismaClient.post;
    const postCommentModel = prismaClient.postComment;

    const { postId } = request.params;

    const isPostExists = await postModel.findFirst({
      where: { id: postId },
    });

    if (!isPostExists)
      return response.status(400).json({ message: "Post not exists" });

    const postComments = await postCommentModel.findMany({
      where: {
        postId,
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

    return response.json(postComments);
  }

  async delete(request: Request, response: Response) {
    try {
      const postCommentModel = prismaClient.postComment;

      const { postCommentId } = request.params;

      const isPostCommentExists = await postCommentModel.findFirst({
        where: { id: postCommentId },
      });

      if (!isPostCommentExists)
        return response
          .status(400)
          .json({ message: "Post comment not exists" });

      await postCommentModel.delete({
        where: { id: postCommentId },
      });

      return response.status(204).json();
    } catch (error) {
      console.log(error);

      return response
        .status(400)
        .json({ message: "Error when delete post comment" });
    }
  }
}

export { PostCommentController };

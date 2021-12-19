import prismaClient from "@src/config/prisma";
import { Request, Response } from "express";
import * as yup from "yup";

class PostController {
  async create(request: Request, response: Response) {
    try {
      const postModel = prismaClient.post;

      const { userId, location, description } = request.body;

      const requestFiles = request.files as Express.Multer.File[];

      const files = requestFiles.map((file) => {
        return {
          path: file.filename,
        };
      });

      const data = {
        userId,
        location,
        description,
        files,
      };

      const schema = yup.object().shape({
        userId: yup.string().required(),
        location: yup.string(),
        description: yup.string(),
        files: yup.array(
          yup.object().shape({
            path: yup.string().required(),
          })
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const result = await postModel.create({
        data: {
          userId,
          location,
          description,
          PostFile: {
            create: files.map((file) => ({
              filename: file.path,
            })),
          },
        },
      });

      return response.json(result);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ message: "Error when create post" });
    }
  }

  async index(request: Request, response: Response) {
    const postModel = prismaClient.post;
    const userModel = prismaClient.user;

    const { userId } = request.params;

    const isUserExists = await userModel.findFirst({
      where: { id: userId },
    });

    if (!isUserExists)
      return response.status(400).json({ message: "User not exists" });

    const posts = await postModel.findMany({
      where: {
        OR: [
          {
            user: {
              UserFollows: {
                some: {
                  userId,
                },
              },
            },
          },
          {
            userId,
          },
        ],
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
        PostFile: true,
        PostLike: true,
        PostComment: {
          select: {
            comment: true,
          },
        },
      },
    });

    return response.json(posts);
  }

  async show(request: Request, response: Response) {
    const postModel = prismaClient.post;
    const userModel = prismaClient.user;

    const { userId } = request.params;

    const isUserExists = await userModel.findFirst({
      where: { id: userId },
    });

    if (!isUserExists)
      return response.status(400).json({ message: "User not exists" });

    const posts = await postModel.findMany({
      where: {
        userId,
      },
    });

    return response.json(posts);
  }

  async update(request: Request, response: Response) {
    try {
      const postModel = prismaClient.post;

      const { postId } = request.params;

      const isPostExists = await postModel.findFirst({
        where: { id: postId },
      });

      if (!isPostExists)
        return response.status(400).json({ message: "Post not exists" });

      const { location, description } = request.body;

      const schema = yup.object().shape({
        location: yup.string(),
        description: yup.string(),
      });

      await schema.validate(request.body, {
        abortEarly: false,
      });

      const post = await postModel.update({
        where: {
          id: postId,
        },
        data: {
          location,
          description,
        },
      });

      return response.json(post);
    } catch (error) {
      console.log(error);

      return response.status(400).json({ message: "Error when update post" });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const postModel = prismaClient.post;

      const { postId } = request.params;

      const isPostExists = await postModel.findFirst({
        where: { id: postId },
      });

      if (!isPostExists)
        return response.status(400).json({ message: "Post not exists" });

      const post = await postModel.delete({ where: { id: postId } });

      return response.status(204).json(post);
    } catch (error) {
      console.log(error);

      return response.status(400).json({ message: "Error when delete post" });
    }
  }
}

export { PostController };

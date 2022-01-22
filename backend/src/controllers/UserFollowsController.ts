import prismaClient from "@src/config/prisma";
import { Request, Response } from "express";
import * as yup from "yup";

class UserFollowsController {
  async create(request: Request, response: Response) {
    try {
      const userFollowsModel = prismaClient.userFollows;
      const userModel = prismaClient.user;

      const { userFollowId } = request.params;
      const { userId } = request.body;

      const isUserExists = await userModel.findFirst({
        where: { id: userId },
      });

      if (!isUserExists)
        return response.status(400).json({ message: "User not exists" });

      const isUserIdEquals = userFollowId === userId;

      if (isUserIdEquals) {
        return response
          .status(400)
          .json({ message: "You cannot folow yourself" });
      }

      const isAlreadyFollow = await userFollowsModel.findFirst({
        where: {
          userFollowId,
          userId,
        },
      });

      if (isAlreadyFollow) {
        return response
          .status(400)
          .json({ message: "You already follow this user" });
      }

      const schema = yup.object().shape({
        userId: yup.string().required(),
      });

      await schema.validate(request.body, {
        abortEarly: false,
      });

      const result = await userFollowsModel.create({
        data: {
          userId,
          userFollowId,
        },
      });

      return response.json(result);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ message: "Error when follow user" });
    }
  }

  async index(request: Request, response: Response) {
    const userFollowsModel = prismaClient.userFollows;
    const userModel = prismaClient.user;

    const { page, username } = request.query;
    const { userId } = request.params;

    const isUserExists = await userModel.findFirst({
      where: { id: userId },
    });

    if (!isUserExists)
      return response.status(400).json({ message: "User not exists" });

    const userFollows = await userFollowsModel.findMany({
      where: {
        userFollowId: userId,
        followingUser: {
          username: {
            contains: username as string,
            mode: "insensitive",
          },
        },
      },
      include: {
        followingUser: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                profile_picture: true,
              },
            },
          },
        },
      },
      take: 20,
      skip: page ? (Number(page) - 1) * 2 : 0,
    });

    return response.json(userFollows);
  }

  async show(request: Request, response: Response) {
    const userFollowsModel = prismaClient.userFollows;
    const userModel = prismaClient.user;

    const { userId } = request.params;
    const { page, username, authUserId } = request.query;

    const isUserExists = await userModel.findFirst({
      where: { id: userId },
    });

    const isAuthUserExists = await userModel.findFirst({
      where: { id: authUserId as string },
    });

    if (!isUserExists || !isAuthUserExists)
      return response.status(400).json({ message: "User not exists" });

    const authUserFollows = await userFollowsModel.findFirst({
      where: {
        userFollowId: userId,
        followingUser: {
          username: {
            contains: username as string,
            mode: "insensitive",
          },
        },
      },
      include: {
        followingUser: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                profile_picture: true,
              },
            },
          },
        },
      },
      take: 20,
      skip: page ? (Number(page) - 1) * 2 : 0,
    });

    return response.json({ isUserFollow: Boolean(authUserFollows) });
  }

  async delete(request: Request, response: Response) {
    try {
      const userFollowsModel = prismaClient.userFollows;
      const userModel = prismaClient.user;

      const { userId } = request.params;
      const { userFollowId } = request.body;

      const isUserExists = await userModel.findFirst({
        where: { id: userId },
      });

      if (!isUserExists)
        return response.status(400).json({ message: "User not exists" });

      const userFollowsItem = await userFollowsModel.findFirst({
        where: { userFollowId },
      });

      const isUserFollows = await userFollowsModel.findFirst({
        where: {
          userFollowId,
          userId,
        },
      });

      if (!isUserFollows) {
        return response
          .status(400)
          .json({ message: "You not follow this user" });
      }

      await userFollowsModel.delete({
        where: { id: userFollowsItem.id },
      });

      return response.status(204).json();
    } catch (error) {
      console.log(error);

      return response.status(400).json({ message: "Error when unfollow user" });
    }
  }
}

export { UserFollowsController };

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

    const { userId } = request.params;

    const isUserExists = await userModel.findFirst({
      where: { id: userId },
    });

    if (!isUserExists)
      return response.status(400).json({ message: "User not exists" });

    const userFollows = await userFollowsModel.findMany({
      where: {
        userId,
      },
    });

    return response.json(userFollows);
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

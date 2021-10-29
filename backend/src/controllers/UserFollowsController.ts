import prismaClient from "@src/config/prisma";
import { Request, Response } from "express";
import * as yup from "yup";

class UserFollowsController {
  async create(request: Request, response: Response) {
    try {
      const userFollowsModel = prismaClient.userFollows;
      const userModel = prismaClient.user;

      const { userFollowId } = request.body;
      const { userId } = request.params;

      const isUserExists = await userModel.findFirst({
        where: { id: userId },
      });

      if (!isUserExists)
        return response.status(400).json({ message: "User not exists" });

      const schema = yup.object().shape({
        userFollowId: yup.string().required(),
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

      await userFollowsModel.delete({
        where: { id: userFollowId },
      });

      return response.status(204).json();
    } catch (error) {
      console.log(error);

      return response.status(400).json({ message: "Error when unfollow user" });
    }
  }
}

export { UserFollowsController };

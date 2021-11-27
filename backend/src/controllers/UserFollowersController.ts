import prismaClient from "@src/config/prisma";
import { Request, Response } from "express";
import * as yup from "yup";

class UserFollowersController {
  async index(request: Request, response: Response) {
    const userFollowsModel = prismaClient.userFollows;
    const userModel = prismaClient.user;

    const { userId } = request.params;

    const isUserExists = await userModel.findFirst({
      where: { id: userId },
    });

    if (!isUserExists)
      return response.status(400).json({ message: "User not exists" });

    const userFollowers = await userFollowsModel.findMany({
      where: {
        userId,
      },
    });

    return response.json(userFollowers);
  }
}

export { UserFollowersController };

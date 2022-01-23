import prismaClient from "@src/config/prisma";
import { Request, Response } from "express";
import * as yup from "yup";

class UserFollowersController {
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

    const userFollowers = await userFollowsModel.findMany({
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

    return response.json(userFollowers);
  }
}

export { UserFollowersController };

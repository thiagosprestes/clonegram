import prismaClient from "@src/config/prisma";
import { Request, Response } from "express";
import * as yup from "yup";
import bcrypt from "bcrypt";

class UserController {
  async create(request: Request, response: Response) {
    try {
      const userModel = prismaClient.user;

      const { username, email, password, bio } = request.body;

      const profile_picture = request.file && request.file.filename;

      const data = {
        username,
        email,
        password,
        profile_picture,
        bio,
      };

      const isEmailExists = await userModel.findFirst({
        where: {
          email,
        },
      });

      const isUsernameExists = await userModel.findFirst({
        where: {
          username,
        },
      });

      if (isEmailExists || isUsernameExists)
        return response.status(409).json({ message: "User already exists" });

      const schema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        profile_picture: yup.string(),
        bio: yup.string(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const encryptedPassword = await bcrypt.hash(password, 10);

      const result = await userModel.create({
        data: {
          email,
          password: encryptedPassword,
          username,
          profile: {
            create: {
              bio,
              profile_picture,
            },
          },
        },
      });

      return response.json(result);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ message: "Error when create user" });
    }
  }

  async index(request: Request, response: Response) {
    const userModel = prismaClient.user;

    const { username, page } = request.query;

    const users = await userModel.findMany({
      where: {
        username: {
          contains: username as string,
          mode: "insensitive",
        },
      },
      take: 2,
      skip: page ? (Number(page) - 1) * 2 : 0,
    });

    return response.json(users);
  }

  async show(request: Request, response: Response) {
    const userModel = prismaClient.user;

    const { id } = request.params;

    const user = await userModel.findFirst({
      where: {
        id,
      },
      include: {
        profile: {
          select: {
            profile_picture: true,
            bio: true,
            followers: true,
            following: true,
          },
        },
        Post: {
          select: {
            id: true,
            PostFile: {
              select: {
                id: true,
                filename: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) return response.status(404).json({ message: "User not exists" });

    return response.send(user);
  }

  async update(request: Request, response: Response) {
    try {
      const userModel = prismaClient.user;

      const { id } = request.params;
      const { username, email, password, bio } = request.body;

      const profile_picture = request.file && request.file.filename;

      const data = {
        username,
        email,
        password,
        profile_picture,
        bio,
      };

      const isUserExists = await userModel.findFirst({
        where: {
          id,
        },
      });

      if (!isUserExists)
        return response.status(404).json({ message: "User not found" });

      const schema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        profile_picture: yup.string(),
        bio: yup.string(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const encryptedPassword = await bcrypt.hash(password, 10);

      const result = await userModel.update({
        where: {
          email,
        },
        data: {
          email,
          password: encryptedPassword,
          username,
          profile: {
            create: {
              bio,
              profile_picture,
            },
          },
        },
      });

      return response.json(result);
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ message: "Error when update user", error });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const userModel = prismaClient.user;

      const { id } = request.params;

      const isUserExists = await userModel.findFirst({
        where: {
          id,
        },
      });

      if (!isUserExists)
        return response.status(404).json({ message: "User not found" });

      const authenticatedUserId = request.cookies["@clonegram:userId"];

      if (authenticatedUserId !== id)
        return response.status(401).json({ message: "Unauthorized" });

      const result = await userModel.delete({
        where: {
          id,
        },
      });

      return response.status(204).json(result);
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ message: "Error when delete user", error });
    }
  }
}

export { UserController };

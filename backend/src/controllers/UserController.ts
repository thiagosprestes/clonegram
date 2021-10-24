import prismaClient from "@src/config/prisma";
import { Request, Response } from "express";
import * as yup from "yup";
import bcrypt from "bcrypt";

class UserController {
  async create(request: Request, response: Response) {
    try {
      const userModel = prismaClient.user;

      const { username, email, password, profile_picture, bio } = request.body;

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
        return response.status(400).json({ message: "User already exists" });

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

    const users = await userModel.findMany();

    return response.json(users);
  }
}

export { UserController };

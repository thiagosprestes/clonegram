import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "@src/config/prisma";
import bcrypt from "bcrypt";
import { handleGenerateTokens } from "@src/utils/generateToken";

class SessionController {
  async create(request: Request, response: Response) {
    try {
      const userModel = prismaClient.user;

      const { username, password } = request.body;

      const isUserExists = await userModel.findFirst({
        where: {
          username,
        },
      });

      if (!isUserExists)
        return response.status(404).json({ message: "User not found" });

      const isPasswordEqual = await bcrypt.compare(
        password,
        isUserExists.password
      );

      if (!isPasswordEqual)
        return response
          .status(404)
          .json({ message: "Username or password was incorrect" });

      const { authToken, refreshToken } = handleGenerateTokens(username);

      response.cookie("@clonegram:refresh_token", refreshToken);

      return response.json({
        username,
        token: authToken,
      });
    } catch (error) {
      console.log(error);

      return response
        .status(400)
        .json({ message: "Error on authenticate user" });
    }
  }

  async refreshToken(request: Request, response: Response) {
    try {
      const { username } = request.body;

      const token = request.cookies["@clonegram:refresh_token"];

      verify(token, process.env.REFRESH_TOKEN_SECRET);

      const { authToken, refreshToken } = handleGenerateTokens(username);

      response.cookie("@clonegram:refresh_token", refreshToken);

      return response.json({
        token: authToken,
      });
    } catch (error) {
      console.log(error);

      return response.json(400).json({ message: "Error when generate tokens" });
    }
  }
}

export { SessionController };

import { sign } from "jsonwebtoken";

const handleGenerateRefreshToken = (payload: string) => {
  const token = sign({ payload }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

const handleGenerateTokens = (payload: string) => {
  const authToken = sign({ payload }, process.env.AUTH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  const refreshToken = handleGenerateRefreshToken(payload);

  return { authToken, refreshToken };
};

export { handleGenerateTokens, handleGenerateRefreshToken };

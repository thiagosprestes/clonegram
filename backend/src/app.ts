import express from "express";
import "dotenv/config";
import { router } from "@src/routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(router);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`server is running on ${process.env.SERVER_PORT}`)
);

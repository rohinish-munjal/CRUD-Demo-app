import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import responseTime from "response-time";
import connect from "./utils/connect";
import logger from "./utils/logger";
import deserializeUser from "./middleware/deserializeUser";
import routes from "./routes";

const port = config.get<number>("port");

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

   await connect();

  routes(app);



});

import { Request, Response } from "express";
import { omit } from "lodash";
import User from "../models/user.model";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler( req: Request<{}, {}, CreateUserInput["body"]>,res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
export async function getUsersHandler(req: Request, res: Response) {
  try {
    const user = await User.find();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(404).send({ message: error });
  }
}

export async function getUserHandler(req: Request, res: Response) {
  try {
    const user = await User.find({ _id: req.params.id });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(404).send({ message: "no user under this id" });
  }
}


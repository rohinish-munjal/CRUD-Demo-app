import { Express, Request, Response } from "express";
import {
  createProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "./controller/product.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import { createUserHandler, getUserHandler, getUsersHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  
  

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.get("/api/users", getUsersHandler);
  app.get("/api/users/:id", getUserHandler);


  app.post("/api/sessions",validateResource(createSessionSchema),createUserSessionHandler);

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.post("/api/products",[requireUser, validateResource(createProductSchema)],createProductHandler);

  
  app.put("/api/products/:productId",[requireUser, validateResource(updateProductSchema)],updateProductHandler);

  app.get("/api/products/:productId",validateResource(getProductSchema),getProductHandler);

  app.delete( "/api/products/:productId",[requireUser, validateResource(deleteProductSchema)], deleteProductHandler);
}

export default routes;

import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { User } from "./entity/User";
// var cors = require("cors");

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());
    // app.use(
    //   cors({
    //     credentials: true,
    //   })
    // );

    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    app.listen(3050);

    await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
        firstName: "Talha",
        lastName: "Seven",
        age: 27,
        phone: "123456789",
        city: "Afyonkarahisar",
      })
    );

    await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
        firstName: "Cemile Nur",
        lastName: "Seven",
        age: 24,
        phone: "123456789",
        city: "Manisa",
      })
    );

  })
  .catch((error) => console.log(error));

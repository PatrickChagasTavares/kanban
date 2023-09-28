import express from "express"
import { config } from "dotenv"
import 'express-async-errors';

import { initRoutes } from '@routes/routes';
import middlewares from '@middlewares';
import { initControllers } from '@controllers';
import { initRepositories } from "@repositories";

function main(): void {
  config()

  const app = express()
  const repo = initRepositories({
    databaseName: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER
  })

  const controller = initControllers(
    {
      login: process.env.AUTH_USER,
      password: process.env.AUTH_PASS,
      jwtSecret: process.env.JWT_SECRET,
      jwtExpirate: process.env.JWT_EXPIRATION,
    },
    repo
  )
  const middleware = new middlewares(process.env.JWT_SECRET)

  app.use(express.json())

  initRoutes(app, controller, middleware)

  app.listen(process.env.PORT, () => {
    console.log(`API listening on port ${process.env.PORT}`)
  })
}

main();

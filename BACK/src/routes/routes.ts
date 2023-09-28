import { Express } from 'express';
import { Controllers } from '@controllers';
import { Imiddlewares } from '@middlewares';

export const initRoutes = (app: Express, controllers: Controllers, middleware: Imiddlewares) => {
  // Rotas para autenticação
  app.post("/login", controllers.auth.Sign)

  app.use(middleware.authorization)
  app.use(middleware.logger)

  // Rotas para cards
  app.post('/cards', controllers.card.Create);
  app.get('/cards', controllers.card.Find);
  app.put('/cards/:id', controllers.card.Update);
  app.delete('/cards/:id', controllers.card.Delete);

  app.use(middleware.handlerError)
}


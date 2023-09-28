import { Auth } from "@models/config";
import AuthController, { Iauth } from "./authController";
import CardController, { Icard } from "./cardController";
import { IRepository } from "@repositories";

export interface Controllers {
  auth: Iauth
  card: Icard
}

export function initControllers(auth: Auth, repo: IRepository): Controllers {
  const authController = new AuthController(
    auth.login, auth.password,
    auth.jwtSecret, auth.jwtExpirate)

  const cardController = new CardController(repo)


  return { auth: authController, card: cardController }

}

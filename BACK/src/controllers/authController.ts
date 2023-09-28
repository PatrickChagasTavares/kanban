import { Request, Response } from "express"
import jwt from "jsonwebtoken"

export interface Iauth {
  Sign(req: Request, res: Response): Promise<void>
}

class AuthController implements Iauth {
  private login: string;
  private password: string;
  private jwtSecret: string;
  private jwtExpirate: string;

  constructor(login: string, password: string, secretJWT: string, timeExpirateJwt: string) {
    this.login = login;
    this.password = password;
    this.jwtSecret = secretJWT;
    this.jwtExpirate = timeExpirateJwt
  }


  private generateToken(username: string): string {
    return jwt.sign({ username: username }, this.jwtSecret, { expiresIn: this.jwtExpirate });
  }

  public Sign = async (req: Request, res: Response): Promise<void> => {
    const { login, senha } = req.body;

    if (login !== this.login && senha !== this.password) {
      res.status(403).json({ message: "Credenciais inválidas" })
      return
    }

    const token = this.generateToken(login)
    res.status(200).json({ token })
    return
  }

}

export default AuthController;

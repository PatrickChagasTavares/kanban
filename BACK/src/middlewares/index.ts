import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken"

import AppError from '@models/error';

export interface Imiddlewares {
  handlerError(err: Error, req: Request, res: Response, next: NextFunction): void
  logger(req: Request, res: Response, next: NextFunction): void
  authorization(req: Request, res: Response, next: NextFunction): void
}

class middleware implements Imiddlewares {
  private jwtSecret: string
  constructor(jwtSecret: string) {
    this.jwtSecret = jwtSecret
  }

  public handlerError(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ error: err.message, details: err.details });
      next();
      return
    }

    res.status(500).json({ error: 'Internal Server Error' });
    next();
    return
  }


  public logger(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    if (!url.includes("/card")) {
      next();
      return
    }

    if (method !== 'PUT' && method !== 'DELETE') {
      next();
      return
    }


    next();
    console.log(`${timestamp} - ${method} ${url} - Card ${req.params.id} - ${req.body.titulo} - ${method === 'PUT' ? 'Alterado' : 'Removido'}`);
  }


  public authorization = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization');

    if (!token) {
      res.status(401).json({ message: 'Token de autenticação não fornecido' });
      return
    }
    const tokenSplit = token.split(" ")

    if (tokenSplit.length < 1) {
      res.status(403).json({ message: 'Token inválido' });
      return
    }

    jwt.verify(tokenSplit[1], this.jwtSecret, (err) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido' });
      }
      next(); // Continue o fluxo da requisição
    });
  }
}


export default middleware;

import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { UnauthorizedError } from "../erros";

export class Autenticar {
  autenticar(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        throw new UnauthorizedError("Não autenticado");
      }

      const token = authorization.split(" ")[1];

      jwt.verify(token, `${process.env.JWT_SECRET}`);

      next();
    } catch (erro) {
      if (erro instanceof TokenExpiredError) {
        res.status(401).json({ mensagem: "Token expirado" });
      }

      if (erro instanceof JsonWebTokenError) {
        res.status(401).json({ mensagem: "Token inválido" });
      }
    }
  }
}

import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { BadRequestError, ForbbidenError, UnauthorizedError } from "../Erros";

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
      if (erro instanceof BadRequestError || erro instanceof ForbbidenError) {
        res.status(erro.statusCode).json({ mensagem: erro.message });
      }

      if (erro instanceof TokenExpiredError) {
        res.status(403).json({ mensagem: "Permissão negada" });
      }
    }
  }
}

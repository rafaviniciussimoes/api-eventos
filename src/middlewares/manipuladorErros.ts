import { NextFunction, Request, Response } from "express";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../erros";

export function manipuladorErros(
  erro: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (erro instanceof BadRequestError) {
    res.status(erro.statusCode).json({ mensagem: erro.message });
  }

  if (erro instanceof NotFoundError) {
    res.status(erro.statusCode).json({ mensagem: erro.message });
  }

  if (erro instanceof ForbiddenError) {
    res.status(erro.statusCode).json({ mensagem: erro.message });
  }

  if (erro instanceof UnauthorizedError) {
    res.status(erro.statusCode).json({ mensagem: erro.message });
  }

  if (erro instanceof ConflictError) {
    res.status(erro.statusCode).json({ mensagem: erro.message });
  }

  if (erro instanceof ValidationError) {
    res.status(erro.statusCode).json({ mensagem: erro.message });
  }

  if (erro instanceof InternalServerError) {
    res.status(erro.statusCode).json({ mensagem: erro.message });
  }
}

import { NextFunction, Request, Response } from "express";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../erros";
import { prisma } from "../prisma";

export default class CompraMiddleware {
  async checarCamposCompra(req: Request, res: Response, next: NextFunction) {
    const { idEvento, idUsuario } = req.body;

    try {
      if (!idEvento || !idUsuario) {
        throw new BadRequestError("Todos os campos são obrigatórios");
      }

      const evento = await prisma.evento.findUnique({
        where: { id: idEvento },
      });

      if (!evento) {
        throw new NotFoundError("Evento não encontrado");
      }

      const usuario = await prisma.usuario.findUnique({
        where: { id: idUsuario },
      });

      if (!usuario) {
        throw new UnauthorizedError("Usuário não encontrado");
      }

      next();
    } catch (erro) {
      if (
        erro instanceof BadRequestError ||
        erro instanceof NotFoundError ||
        erro instanceof UnauthorizedError ||
        erro instanceof InternalServerError
      ) {
        res.status(erro.statusCode).json({ mensagem: erro.message });
      }
    }
  }

  async checarCompra(req: Request, res: Response, next: NextFunction) {
    const { idCompra } = req.params;

    try {
      if (!idCompra) {
        throw new BadRequestError("O parâmetro idCompra é obrigatório");
      }

      const compra = await prisma.compra.findFirst({
        where: { id: idCompra },
      });

      if (!compra) {
        throw new NotFoundError("Compra não encontrada");
      }

      next();
    } catch (erro) {
      if (
        erro instanceof NotFoundError ||
        erro instanceof BadRequestError ||
        erro instanceof InternalServerError
      ) {
        res.status(erro.statusCode).json({ mensagem: erro.message });
      }
    }
  }
}

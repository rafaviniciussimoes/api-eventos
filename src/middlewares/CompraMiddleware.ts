import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../Erros";
import { prisma } from "../prisma";

export default class CompraMiddleware {
  async checaCompra(req: Request, res: Response, next: NextFunction) {
    const { idEvento } = req.body;
    const { comprovante } = req.query;

    try {
      if (!comprovante) {
        throw new BadRequestError("O comprovante é obrigatório");
      }

      if (!idEvento) {
        throw new BadRequestError("O identificador do evento é obrigatório");
      }

      const evento = await prisma.evento.findUnique({
        where: { id: idEvento },
      });

      if (!evento) {
        throw new NotFoundError("Evento não encontrado");
      }

      const idUsuario = String(comprovante).split("/")[1];

      const usuario = await prisma.usuario.findUnique({
        where: { id: idUsuario },
      });

      if (!usuario) {
        throw new UnauthorizedError("Usuário não encontrado");
      }

      next();
    } catch (error) {
      if (
        error instanceof BadRequestError ||
        error instanceof NotFoundError ||
        error instanceof UnauthorizedError
      ) {
        res.status(error.statusCode).json({ mensagem: error.message });
      }

      res.status(500).json({ mensagem: "Erro do lado do servidor" });
    }
  }

  async excluirCompra(req: Request, res: Response, next: NextFunction) {
    const { idCompra } = req.params;

    try {
      const compra = await prisma.compra.findUnique({
        where: { id: idCompra },
      });

      if (!compra) {
        throw new NotFoundError("Compra não encontrada");
      }

      next();
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof BadRequestError) {
        return res.status(error.statusCode).json({ mensagem: error.message });
      }

      res.status(500).json({ mensagem: "Erro do lado do servidor" });
    }
  }
}

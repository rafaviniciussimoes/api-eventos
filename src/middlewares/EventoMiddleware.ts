import { Request, Response, NextFunction } from "express";
import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotFoundError,
} from "../Erros";
import { prisma } from "../prisma";

export default class EventoMiddleware {
  async checarEvento(req: Request, res: Response, next: NextFunction) {
    const { nome, endereco, data, preco } = req.body;

    try {
      if (!nome || !endereco || !data || !preco) {
        throw new BadRequestError("Todos os campos são obrigatórios");
      }

      const evento = await prisma.evento.findFirst({ where: { nome: nome } });

      if (evento) {
        throw new ConflictError("Evento já cadastrado");
      }

      next();
    } catch (erro) {
      if (
        erro instanceof BadRequestError ||
        erro instanceof ConflictError ||
        erro instanceof InternalServerError
      ) {
        res.status(erro.statusCode).json({ message: erro.message });
      }
    }
  }

  async checarEventoPorPreco(req: Request, res: Response, next: NextFunction) {
    const { maxPreco } = req.query;

    try {
      if (!maxPreco) {
        throw new BadRequestError("O campo maxPreco não foi informado");
      }

      if (isNaN(Number(maxPreco)) || Number(maxPreco) < 0) {
        throw new BadRequestError(
          "O preço máximo do evento deve conter apenas números e deve ser positivo"
        );
      }

      next();
    } catch (erro) {
      if (
        erro instanceof BadRequestError ||
        erro instanceof InternalServerError
      ) {
        res.status(erro.statusCode).json({ mensagem: erro.message });
      }
    }
  }

  async deletarEvento(req: Request, res: Response, next: NextFunction) {
    try {
      const { idEvento } = req.params;

      if (!idEvento) {
        throw new BadRequestError("O parâmetro idEvento é obrigatório");
      }

      const evento = await prisma.evento.findFirst({ where: { id: idEvento } });

      if (!evento) {
        throw new NotFoundError("Evento não encontrado");
      }

      next();
    } catch (erro) {
      if (
        erro instanceof BadRequestError ||
        erro instanceof NotFoundError ||
        erro instanceof InternalServerError
      ) {
        res.status(erro.statusCode).json({ mensagem: erro.message });
      }
    }
  }
}

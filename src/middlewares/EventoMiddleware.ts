import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../Erros";
import { prisma } from "../prisma";

export default class EventoMiddleware {
  async checaEvento(req: Request, res: Response, next: NextFunction) {
    const { nome, endereco, data, preco } = req.body;

    try {
      if (!nome || !endereco || !data || !preco) {
        throw new BadRequestError("Todos os campos são obrigatórios");
      }

      const evento = await prisma.evento.findFirst({ where: { nome: nome } });

      if (evento) {
        throw new BadRequestError("Evento já cadastrado");
      }

      next();
    } catch (error) {
      if (error instanceof BadRequestError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      res.status(500).json({ mensagem: "Erro do lado do servidor" });
    }
  }

  async checaPrecoEvento(req: Request, res: Response, next: NextFunction) {
    const { maxPreco } = req.query;

    try {
      if (!maxPreco) {
        const eventos = await prisma.evento.findMany({
          where: { preco: { lte: Number(maxPreco) } },
        });
        res.json(eventos);
      }

      if (isNaN(Number(maxPreco))) {
        throw new BadRequestError(
          "O preço máximo do evento deve conter apenas números e deve ser positivo"
        );
      }

      if (Number(maxPreco) < 0) {
        throw new BadRequestError("O preço máximo do evento deve ser positivo");
      }

      next();
    } catch (error) {
      if (error instanceof BadRequestError) {
        res.status(error.statusCode).json({ mensagem: error.message });
      }

      res.status(500).json({ mensagem: "Erro do lado do servidor" });
    }
  }

  async excluirEvento(req: Request, res: Response, next: NextFunction) {
    const { idEvento } = req.params;

    try {
      if (!idEvento) {
        throw new BadRequestError("O campo id é obrigatório");
      }

      const evento = await prisma.evento.findFirst({ where: { id: idEvento } });

      if (!evento) {
        throw new NotFoundError("Evento não encontrado");
      }

      next();
    } catch (error) {
      if (error instanceof BadRequestError || error instanceof NotFoundError) {
        res.status(error.statusCode).json({ mensagem: error.message });
      }

      res.status(500).json({ mensagem: "Erro do lado do servidor" });
    }
  }
}

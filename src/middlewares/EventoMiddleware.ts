import { Request, NextFunction } from "express";
import { BadRequestError, ConflictError, NotFoundError } from "../erros";
import { prisma } from "../prisma";

export default class EventoMiddleware {
  async checarCadastrarEvento(req: Request, next: NextFunction) {
    const { nome, endereco, data, preco } = req.body;

    if (!nome || !endereco || !data || !preco) {
      throw new BadRequestError("Todos os campos são obrigatórios");
    }

    const evento = await prisma.evento.findFirst({ where: { nome: nome } });

    if (evento) {
      throw new ConflictError("Evento já cadastrado");
    }

    next();
  }

  async checarListarEventoPorPreco(req: Request, next: NextFunction) {
    const { maxPreco } = req.query;

    if (maxPreco) {
      if (isNaN(Number(maxPreco)) || Number(maxPreco) < 0) {
        throw new BadRequestError(
          "O preço máximo do evento deve conter apenas números e deve ser positivo"
        );
      }
    }

    next();
  }

  async checarAtualizarEvento(req: Request, next: NextFunction) {
    const { idEvento } = req.params;
    const { nome, endereco, data, preco } = req.body;

    if (!idEvento) {
      throw new BadRequestError("O parâmetro idEvento é obrigatório");
    }

    const evento = await prisma.evento.findFirst({ where: { id: idEvento } });

    if (!evento) {
      throw new NotFoundError("Evento não encontrado");
    }

    if (!nome && !endereco && !data && !preco) {
      throw new BadRequestError("Nenhum campo para atualização foi informado");
    }
    next();
  }

  async checarDeletarEvento(req: Request, next: NextFunction) {
    const { idEvento } = req.params;

    if (!idEvento) {
      throw new BadRequestError("O parâmetro idEvento é obrigatório");
    }

    const evento = await prisma.evento.findFirst({ where: { id: idEvento } });

    if (!evento) {
      throw new NotFoundError("Evento não encontrado");
    }

    next();
  }

  async checarIdEvento(req: Request, next: NextFunction) {
    const { idEvento } = req.query;

    if (idEvento) {
      const usuario = await prisma.usuario.findMany({
        where: { id: String(idEvento) },
      });

      if (!usuario) {
        throw new NotFoundError("Evento não encontrado");
      }
    }

    next();
  }
}

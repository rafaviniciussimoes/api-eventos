import e, { Request, NextFunction, Response } from "express";
import { BadRequestError, ConflictError, NotFoundError } from "../erros";
import { prisma } from "../prisma";

export default class EventoMiddleware {
  async checarCadastrarEvento(req: Request, res: Response, next: NextFunction) {
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
      next(erro);
    }
  }

  async checarListarEventoPorPreco(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { maxPreco } = req.query;
    try {
      if (maxPreco) {
        if (isNaN(Number(maxPreco)) || Number(maxPreco) < 0) {
          throw new BadRequestError(
            "O preço máximo do evento deve conter apenas números e deve ser positivo"
          );
        }
      }

      next();
    } catch (erro) {
      next(erro);
    }
  }

  async checarAtualizarEvento(req: Request, res: Response, next: NextFunction) {
    const { idEvento } = req.params;
    const { nome, endereco, data, preco } = req.body;

    try {
      if (!idEvento) {
        throw new BadRequestError("O parâmetro idEvento é obrigatório");
      }

      const evento = await prisma.evento.findFirst({ where: { id: idEvento } });

      if (!evento) {
        throw new NotFoundError("Evento não encontrado");
      }

      if (!nome && !endereco && !data && !preco) {
        throw new BadRequestError(
          "Nenhum campo para atualização foi informado"
        );
      }
      next();
    } catch (erro) {
      next(erro);
    }
  }

  async checarDeletarEvento(req: Request, res: Response, next: NextFunction) {
    const { idEvento } = req.params;

    try {
      if (!idEvento) {
        throw new BadRequestError("O parâmetro idEvento é obrigatório");
      }

      const evento = await prisma.evento.findFirst({ where: { id: idEvento } });

      if (!evento) {
        throw new NotFoundError("Evento não encontrado");
      }

      next();
    } catch (erro) {
      next(erro);
    }
  }

  async checarIdEvento(req: Request, res: Response, next: NextFunction) {
    const { idEvento } = req.query;

    try {
      if (idEvento) {
        const usuario = await prisma.usuario.findMany({
          where: { id: String(idEvento) },
        });

        if (!usuario) {
          throw new NotFoundError("Evento não encontrado");
        }
      }

      next();
    } catch (erro) {
      next(erro);
    }
  }
}

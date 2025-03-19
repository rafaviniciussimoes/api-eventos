import { NextFunction, Request } from "express";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../erros";
import { prisma } from "../prisma";

export default class CompraMiddleware {
  async checarCamposCompra(req: Request, next: NextFunction) {
    const { idEvento, idUsuario } = req.body;

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
  }

  async checarCompra(req: Request, next: NextFunction) {
    const { idCompra } = req.params;

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
  }
}

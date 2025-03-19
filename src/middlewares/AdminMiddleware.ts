import { NextFunction, Request, Response } from "express";
import { BadRequestError, ConflictError, InternalServerError } from "../erros";
import { prisma } from "../prisma";

export class AdminMiddleware {
  async checarAdmin(req: Request, res: Response, next: NextFunction) {
    const { nome, email, senha } = req.body;

    try {
      if (!nome || !email || !senha) {
        throw new BadRequestError("Os campos são obrigatórios");
      }

      const admin = await prisma.admin.findUnique({ where: { email: email } });

      if (admin) {
        throw new ConflictError("O usuário administrador já existe");
      }

      next();
    } catch (erro) {
      next(erro);
    }
  }
}

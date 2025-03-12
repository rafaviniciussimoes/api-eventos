import { NextFunction, Request, Response } from "express";
import {
  BadRequestError,
  ConflictError,
  InternalServerError,
  NotFoundError,
} from "../Erros";
import { prisma } from "../prisma";

export default class UsuarioMiddleware {
  async checarUsuario(req: Request, res: Response, next: NextFunction) {
    const { nome, email, senha } = req.body;

    try {
      if (!nome || !email || !senha) {
        throw new BadRequestError("Todos os campos são obrigatórios");
      }

      const usuario = await prisma.usuario.findUnique({
        where: { email: email },
      });

      if (usuario) {
        throw new ConflictError("Usuário já cadastrado");
      }

      console.log("Estou no middleware");

      next();
    } catch (erro) {
      if (
        erro instanceof BadRequestError ||
        erro instanceof ConflictError ||
        erro instanceof InternalServerError
      ) {
        res.status(erro.statusCode).json({ mensagem: erro.message });
      }
    }
  }

  async deletarUsuario(req: Request, res: Response, next: NextFunction) {
    const { idUsuario } = req.params;

    try {
      if (!idUsuario) {
        throw new BadRequestError("O campo idUsuario é obrigatório");
      }

      const usuario = await prisma.usuario.findUnique({
        where: { id: idUsuario },
      });

      if (!usuario) {
        throw new NotFoundError("Usuário não encontrado");
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

import { NextFunction, Request, Response } from "express";
import { BadRequestError, ConflictError, NotFoundError } from "../erros";
import { prisma } from "../prisma";

export default class UsuarioMiddleware {
  async checarCadastrarUsuario(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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
      next(erro);
    }
  }

  async checarAtualizarUsuario(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { idUsuario } = req.params;
    const { nome, email, senha } = req.body;

    try {
      if (!idUsuario) {
        throw new BadRequestError("O parâmetro idUsuario é obrigatório");
      }

      const usuario = await prisma.usuario.findUnique({
        where: { id: idUsuario },
      });

      if (!usuario) {
        throw new NotFoundError("Usuário não encontrado");
      }

      if (!nome && !email && !senha) {
        throw new BadRequestError(
          "Nenhum campo para atualização foi informado"
        );
      }

      next();
    } catch (erro) {
      next(erro);
    }
  }

  async checarDeletarUsuario(req: Request, res: Response, next: NextFunction) {
    const { idUsuario } = req.params;

    try {
      if (!idUsuario) {
        throw new BadRequestError("O parâmetro idUsuario é obrigatório");
      }

      const usuario = await prisma.usuario.findUnique({
        where: { id: idUsuario },
      });

      if (!usuario) {
        throw new NotFoundError("Usuário não encontrado");
      }

      next();
    } catch (erro) {
      next(erro);
    }
  }

  async checarIdUsuario(req: Request, res: Response, next: NextFunction) {
    const { idUsuario } = req.query;

    try {
      if (idUsuario) {
        const usuario = await prisma.usuario.findUnique({
          where: { id: String(idUsuario) },
        });

        if (!usuario) {
          throw new NotFoundError("Usuário não encontrado");
        }
      }

      next();
    } catch (erro) {
      next(erro);
    }
  }
}

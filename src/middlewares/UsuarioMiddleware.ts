import { NextFunction, Request } from "express";
import { BadRequestError, ConflictError, NotFoundError } from "../erros";
import { prisma } from "../prisma";

export default class UsuarioMiddleware {
  async checarCadastrarUsuario(req: Request, next: NextFunction) {
    const { nome, email, senha } = req.body;

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
  }

  async checarAtualizarUsuario(req: Request, next: NextFunction) {
    const { idUsuario } = req.params;
    const { nome, email, senha } = req.body;

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
      throw new BadRequestError("Nenhum campo para atualização foi informado");
    }

    next();
  }

  async checarDeletarUsuario(req: Request, next: NextFunction) {
    const { idUsuario } = req.params;

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
  }

  async checarIdUsuario(req: Request, next: NextFunction) {
    const { idUsuario } = req.query;

    if (idUsuario) {
      const usuario = await prisma.usuario.findUnique({
        where: { id: String(idUsuario) },
      });

      if (!usuario) {
        throw new NotFoundError("Usuário não encontrado");
      }
    }

    next();
  }
}

import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../Erros";
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
        throw new BadRequestError("E-mail já cadastrado");
      }

      next();
    } catch (error) {
      if (error instanceof BadRequestError) {
        res.status(error.statusCode).json({ mensagem: error.message });
      }

      res.status(500).json({ mensagem: "Erro do lado do servidor" });
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
    } catch (error) {
      if (error instanceof BadRequestError || error instanceof NotFoundError) {
        res.status(error.statusCode).json({ mensagem: error.message });
      }
    }
  }
}

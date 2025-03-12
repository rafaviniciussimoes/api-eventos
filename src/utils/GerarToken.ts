import { Request, Response } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BadRequestError, ForbbidenError, NotFoundError } from "../Erros";

export class GerarToken {
  async token(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        throw new BadRequestError("As credenciais são obrigatórias");
      }

      const usuario = await prisma.usuario.findUnique({
        where: { email: email },
      });

      if (!usuario) {
        throw new NotFoundError("Usuário não encontrado");
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        throw new ForbbidenError("Credenciais incorretas");
      }

      const token = jwt.sign({ id: usuario.id }, `${process.env.JWT_SECRET}`, {
        expiresIn: "2h",
      });

      res.json({ token: token });
    } catch (erro) {
      if (
        erro instanceof BadRequestError ||
        erro instanceof NotFoundError ||
        erro instanceof ForbbidenError
      ) {
        res.status(erro.statusCode).json({ mensagem: erro.message });
      }
    }
  }
}

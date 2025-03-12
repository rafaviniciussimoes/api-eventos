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

      const admin = await prisma.admin.findUnique({
        where: { email: email },
      });

      if (!admin) {
        throw new NotFoundError("Administrador não encontrado");
      }

      const senhaValida = await bcrypt.compare(senha, admin.senha);

      if (!senhaValida) {
        throw new ForbbidenError("Credenciais incorretas");
      }

      const token = jwt.sign({ id: admin.id }, `${process.env.JWT_SECRET}`, {
        expiresIn: "12h",
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

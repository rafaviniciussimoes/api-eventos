import { Request, Response } from "express";
import { prisma } from "../prisma";
import { criptografarSenha } from "../utils/criptografia";

export class AdminControlador {
  async criarAdmin(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    const admin = await prisma.admin.create({
      data: {
        nome,
        email,
        senha: await criptografarSenha(senha),
      },
    });

    res.json(admin);
  }
}

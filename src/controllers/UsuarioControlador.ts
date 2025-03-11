import { Request, Response } from "express";
import { prisma } from "../prisma";

export default class UsuarioControlador {
  async listarUsuarios(req: Request, res: Response): Promise<void> {
    const usuarios = await prisma.usuario.findMany();

    res.json(usuarios);
  }

  async cadastrarUsuario(req: Request, res: Response): Promise<void> {
    const { nome, email, senha } = req.body;

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
      },
    });

    res.status(201).json({ ...usuario, senha: undefined });
  }

  async excluirUsuario(req: Request, res: Response): Promise<void> {
    const { idUsuario } = req.params;

    await prisma.usuario.delete({ where: { id: idUsuario } });

    res.status(204).send();
  }
}

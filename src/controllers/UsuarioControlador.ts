import { Request, Response } from "express";
import { prisma } from "../prisma";
import { criptografarSenha } from "../utils/criptografia";

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
        senha: await criptografarSenha(senha),
      },
    });

    console.log("Estou no controlador");

    res.status(201).json(usuario);
  }

  async atualizarUsuario(req: Request, res: Response) {
    const { idUsuario } = req.params;
    const { nome, email, senha } = req.body;

    let senhaCripografada;

    if (senha) {
      senhaCripografada = await criptografarSenha(senha);
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: idUsuario },
      data: {
        nome,
        email,
        senha: senhaCripografada,
      },
    });

    res.json(usuarioAtualizado);
  }

  async excluirUsuario(req: Request, res: Response): Promise<void> {
    const { idUsuario } = req.params;

    await prisma.usuario.delete({ where: { id: idUsuario } });

    res.status(204).send();
  }
}

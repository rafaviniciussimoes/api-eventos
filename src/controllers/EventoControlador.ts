import { Request, Response } from "express";
import { prisma } from "../prisma";
import { privateDecrypt } from "node:crypto";

export default class EventoControlador {
  async listarEvento(req: Request, res: Response): Promise<void> {
    const { maxPreco } = req.query;
    let eventos;

    if (maxPreco) {
      eventos = await prisma.evento.findMany({
        where: {
          preco: {
            lte: Number(maxPreco),
          },
        },
      });
    } else {
      eventos = await prisma.evento.findMany();
    }

    res.json(eventos);
  }

  async cadastrarEvento(req: Request, res: Response): Promise<void> {
    const { nome, endereco, data, preco } = req.body;

    const evento = await prisma.evento.create({
      data: {
        nome,
        endereco,
        data,
        preco,
      },
    });

    res.status(201).json(evento);
  }

  async atualizarEvento(req: Request, res: Response): Promise<void> {
    const { idEvento } = req.params;
    const { nome, endereco, data, preco } = req.body;

    const eventoAtualizado = await prisma.evento.update({
      where: { id: idEvento },
      data: {
        nome,
        endereco,
        data,
        preco,
      },
    });

    res.json(eventoAtualizado);
  }

  async deletarEvento(req: Request, res: Response) {
    const { idEvento } = req.params;

    await prisma.evento.delete({ where: { id: idEvento } });

    res.status(204).send();
  }
}

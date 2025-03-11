import { Request, Response } from "express";
import { prisma } from "../prisma";

export default class EventoControlador {
  async mostrarEvento(req: Request, res: Response) {
    const { maxPreco } = req.query;

    if (maxPreco) {
      const eventosFiltrados = await prisma.evento.findMany({
        where: {
          preco: {
            lte: Number(maxPreco),
          },
        },
      });

      res.json(eventosFiltrados);
    }

    const eventos = await prisma.evento.findMany();
    res.json(eventos);

    res.json(eventos);
  }

  async cadastrarEvento(req: Request, res: Response) {
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

  async excluirEvento(req: Request, res: Response) {
    const { idEvento } = req.params;

    await prisma.evento.delete({ where: { id: idEvento } });

    res.status(204).send();
  }
}

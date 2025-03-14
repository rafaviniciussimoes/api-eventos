import { Request, Response } from "express";
import { prisma } from "../prisma";

export default class CompraControlador {
  async cadastrarCompra(req: Request, res: Response): Promise<void> {
    const { idEvento, idUsuario } = req.body;

    const compra = await prisma.compra.create({
      data: {
        eventoId: idEvento,
        usuarioId: idUsuario,
      },
    });

    res.status(201).json(compra);
  }

  async listarCompras(req: Request, res: Response): Promise<void> {
    const { comprovante } = req.query;

    const idUsuario = String(comprovante).split("/")[1];

    const compras = await prisma.compra.findMany({
      where: { id: idUsuario },
    });

    res.json(compras);
  }

  async listarComprasPorUsuario() {}

  async atualizarCompra(req: Request, res: Response): Promise<void> {
    const { idCompra } = req.params;
    const { idUsuario, idEvento } = req.body;

    const compraAtualizada = await prisma.compra.update({
      where: { id: idCompra },
      data: { usuarioId: idUsuario, eventoId: idEvento },
    });

    res.json(compraAtualizada);
  }

  async deletarCompra(req: Request, res: Response): Promise<void> {
    const { idCompra } = req.params;

    await prisma.compra.delete({
      where: { id: idCompra },
    });

    res.status(204).send();
  }
}

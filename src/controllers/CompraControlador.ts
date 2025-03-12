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

  async deletarCompra(req: Request, res: Response): Promise<void> {
    const { idCompra } = req.params;

    await prisma.compra.delete({
      where: { id: idCompra },
    });

    res.status(204).send();
  }
}

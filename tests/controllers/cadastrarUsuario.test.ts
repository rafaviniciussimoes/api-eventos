import { Request, Response } from "express";
import UsuarioControlador from "../../src/controllers/UsuarioControlador";
import { prisma } from "../../src/prisma";
import { criptografarSenha } from "../../src/utils/criptografia";

jest.mock("../../src/prisma", () => ({
  prisma: {
    usuario: {
      create: jest.fn(),
    },
  },
}));

jest.mock("../../src/utils/criptografia", () => ({
  criptografarSenha: jest.fn(),
}));

describe("UsuarioControlador", () => {
  let usuarioControlador: UsuarioControlador;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    usuarioControlador = new UsuarioControlador();
    req = {
      body: {
        nome: "Rafael Vinicius",
        email: "rafael@email.com",
        senha: "rafa123",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("Deve cadastrar um usuario corretamente", async () => {
    (criptografarSenha as jest.Mock).mockResolvedValue("rafa123");
    (prisma.usuario.create as jest.Mock).mockResolvedValue({
      id: 1,
      nome: "Rafael Vinicius",
      email: "rafael@email.com",
      senha: "rafa123",
    });

    await usuarioControlador.cadastrarUsuario(req as Request, res as Response);

    expect(criptografarSenha).toHaveBeenCalledWith("rafa123");

    expect(prisma.usuario.create).toHaveBeenCalledWith({
      data: {
        nome: "Rafael Vinicius",
        email: "rafael@email.com",
        senha: "rafa123",
      },
    });

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      nome: "Rafael Vinicius",
      email: "rafael@email.com",
      senha: "rafa123",
    });
  });
});

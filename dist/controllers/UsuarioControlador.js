"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../prisma");
const criptografia_1 = require("../utils/criptografia");
class UsuarioControlador {
    listarUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield prisma_1.prisma.usuario.findMany();
            res.json(usuarios);
        });
    }
    cadastrarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, email, senha } = req.body;
            const usuario = yield prisma_1.prisma.usuario.create({
                data: {
                    nome,
                    email,
                    senha: yield (0, criptografia_1.criptografarSenha)(senha),
                },
            });
            console.log("Estou no controlador");
            res.status(201).json(usuario);
        });
    }
    excluirUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.params;
            yield prisma_1.prisma.usuario.delete({ where: { id: idUsuario } });
            res.status(204).send();
        });
    }
}
exports.default = UsuarioControlador;

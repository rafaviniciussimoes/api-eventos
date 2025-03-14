"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioControlador_1 = __importDefault(require("./controllers/UsuarioControlador"));
const EventoMiddleware_1 = __importDefault(require("./middlewares/EventoMiddleware"));
const UsuarioMiddleware_1 = __importDefault(require("./middlewares/UsuarioMiddleware"));
const EventoControlador_1 = __importDefault(require("./controllers/EventoControlador"));
const CompraControlador_1 = __importDefault(require("./controllers/CompraControlador"));
const CompraMiddleware_1 = __importDefault(require("./middlewares/CompraMiddleware"));
const LoginMiddleware_1 = require("./middlewares/LoginMiddleware");
const GerarToken_1 = require("./utils/GerarToken");
const AdminControlador_1 = require("./controllers/AdminControlador");
const AdminMiddleware_1 = require("./middlewares/AdminMiddleware");
const rotas = (0, express_1.Router)();
// Criar administrador do sistema
rotas.post("/admin", new AdminMiddleware_1.AdminMiddleware().checarAdmin, new AdminControlador_1.AdminControlador().criarAdmin);
// Logar no sistema
rotas.post("/login", new GerarToken_1.GerarToken().token);
// A partir daqui o admin precisa estar autenticado para acessar as rotas
rotas.use(new LoginMiddleware_1.Autenticar().autenticar);
// Listar usuarios
rotas.get("/usuarios", new UsuarioControlador_1.default().listarUsuarios);
// Cadastrar usuarios
rotas.post("/usuarios", new UsuarioMiddleware_1.default().checarUsuario, new UsuarioControlador_1.default().cadastrarUsuario);
// Deletar usuarios
rotas.delete("/usuarios/:idUsuario", new UsuarioMiddleware_1.default().deletarUsuario, new UsuarioControlador_1.default().excluirUsuario);
// Listar eventos
rotas.get("/eventos", new EventoMiddleware_1.default().checarEventoPorPreco, new EventoControlador_1.default().mostrarEvento);
// Cadastrar eventos
rotas.post("/eventos", new EventoMiddleware_1.default().checarEvento, new EventoControlador_1.default().cadastrarEvento);
// Deletar eventos
rotas.delete("/eventos/:idEvento", new EventoMiddleware_1.default().deletarEvento, new EventoControlador_1.default().excluirEvento);
// Listar compras
rotas.get("/compras", new CompraControlador_1.default().listarCompras);
// Cadastrar compras
rotas.post("/compras", new CompraMiddleware_1.default().checarCamposCompra, new CompraControlador_1.default().cadastrarCompra);
// Deletar compras
rotas.delete("/compras/:idCompra", new CompraMiddleware_1.default().checarCompra, new CompraControlador_1.default().deletarCompra);
exports.default = rotas;

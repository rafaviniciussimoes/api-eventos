import { Router } from "express";
import UsuarioControlador from "./controllers/UsuarioControlador";
import EventoMiddleware from "./middlewares/EventoMiddleware";
import UsuarioMiddleware from "./middlewares/UsuarioMiddleware";
import EventoControlador from "./controllers/EventoControlador";
import CompraControlador from "./controllers/CompraControlador";
import CompraMiddleware from "./middlewares/CompraMiddleware";
import { Autenticar } from "./middlewares/AutenticacaoMiddleware";
import { GerarToken } from "./utils/GerarToken";
import { AdminControlador } from "./controllers/AdminControlador";
import { AdminMiddleware } from "./middlewares/AdminMiddleware";

const rotas = Router();

// Criar administrador do sistema
rotas.post(
  "/admin",
  new AdminMiddleware().checarAdmin,
  new AdminControlador().criarAdmin
);

// Logar no sistema como administrador
rotas.post("/login", new GerarToken().token);

// A partir daqui o admin precisa estar autenticado para acessar as rotas
rotas.use(new Autenticar().autenticar);

// Listar usuarios
rotas.get("/usuarios", new UsuarioControlador().listarUsuarios);

// Cadastrar usuarios
rotas.post(
  "/usuarios",
  new UsuarioMiddleware().checarUsuario,
  new UsuarioControlador().cadastrarUsuario
);

// Atualizar usuarios
rotas.patch(
  "/usuarios/:idUsuario?",
  new UsuarioMiddleware().checaAtualizarUsuario,
  new UsuarioControlador().atualizarUsuario
);

// Deletar usuarios
rotas.delete(
  "/usuarios/:idUsuario?",
  new UsuarioMiddleware().deletarUsuario,
  new UsuarioControlador().excluirUsuario
);

// Listar eventos
rotas.get(
  "/eventos/listar",
  new EventoMiddleware().checarEventoPorPreco,
  new EventoControlador().listarEvento
);

// Cadastrar eventos
rotas.post(
  "/eventos/cadastrar",
  new EventoMiddleware().checarEvento,
  new EventoControlador().cadastrarEvento
);

// Atualizar eventos
rotas.patch(
  "/eventos/atualizar/:idEvento?",
  new EventoMiddleware().checarAtualizarEvento,
  new EventoControlador().atualizarEvento
);

// Deletar eventos
rotas.delete(
  "/eventos/deletar/:idEvento?",
  new EventoMiddleware().checarDeletarEvento,
  new EventoControlador().excluirEvento
);

// Listar compras
rotas.get("/compras/listar", new CompraControlador().listarCompras);

// Cadastrar compras
rotas.post(
  "/compras/cadastrar",
  new CompraMiddleware().checarCamposCompra,
  new CompraControlador().cadastrarCompra
);

// Atualizar compras
rotas.patch("/compras/:idCompra?", new CompraControlador().atualizarCompra);

// Deletar compras
rotas.delete(
  "/compras/deletar/:idCompra?",
  new CompraMiddleware().checarCompra,
  new CompraControlador().deletarCompra
);

export default rotas;

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
rotas.get("/usuarios/listar", new UsuarioControlador().listarUsuarios);

// Cadastrar usuarios
rotas.post(
  "/usuarios/cadastrar",
  new UsuarioMiddleware().checarCadastrarUsuario,
  new UsuarioControlador().cadastrarUsuario
);

// Atualizar usuarios
rotas.patch(
  "/usuarios/atualizar/:idUsuario?",
  new UsuarioMiddleware().checarAtualizarUsuario,
  new UsuarioControlador().atualizarUsuario
);

// Deletar usuarios
rotas.delete(
  "/usuarios/deletar/:idUsuario?",
  new UsuarioMiddleware().checarDeletarUsuario,
  new UsuarioControlador().deletarUsuario
);

// Listar eventos
rotas.get(
  "/eventos/listar",
  new EventoMiddleware().checarListarEventoPorPreco,
  new EventoControlador().listarEvento
);

// Cadastrar eventos
rotas.post(
  "/eventos/cadastrar",
  new EventoMiddleware().checarCadastrarEvento,
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
  new EventoControlador().deletarEvento
);

// Listar todas as compras ou filtrar por eventos ou usuarios
rotas.get(
  "/compras/listar",
  new UsuarioMiddleware().checarIdUsuario,
  new EventoMiddleware().checarIdEvento,
  new CompraControlador().listarCompras
);

// Cadastrar compras
rotas.post(
  "/compras/cadastrar",
  new CompraMiddleware().checarCamposCompra,
  new CompraControlador().cadastrarCompra
);

// Atualizar compras
rotas.patch(
  "/compras/atualizar/:idCompra?",
  new CompraMiddleware().checarCompra,
  new CompraControlador().atualizarCompra
);

// Deletar compras
rotas.delete(
  "/compras/deletar/:idCompra?",
  new CompraMiddleware().checarCompra,
  new CompraControlador().deletarCompra
);

export default rotas;

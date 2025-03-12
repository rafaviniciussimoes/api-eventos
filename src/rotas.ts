import { Router } from "express";
import UsuarioControlador from "./controllers/UsuarioControlador";
import EventoMiddleware from "./middlewares/EventoMiddleware";
import UsuarioMiddleware from "./middlewares/UsuarioMiddleware";
import EventoControlador from "./controllers/EventoControlador";
import CompraControlador from "./controllers/CompraControlador";
import CompraMiddleware from "./middlewares/CompraMiddleware";
import { Autenticar } from "./middlewares/LoginMiddleware";
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

// Logar no sistema
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

// Deletar usuarios
rotas.delete(
  "/usuarios/:idUsuario",
  new UsuarioMiddleware().deletarUsuario,
  new UsuarioControlador().excluirUsuario
);

// Listar eventos
rotas.get(
  "/eventos",
  new EventoMiddleware().checarEventoPorPreco,
  new EventoControlador().mostrarEvento
);

// Cadastrar eventos
rotas.post(
  "/eventos",
  new EventoMiddleware().checarEvento,
  new EventoControlador().cadastrarEvento
);

// Deletar eventos
rotas.delete(
  "/eventos/:idEvento",
  new EventoMiddleware().deletarEvento,
  new EventoControlador().excluirEvento
);

// Listar compras
rotas.get("/compras", new CompraControlador().listarCompras);

// Cadastrar compras
rotas.post(
  "/compras",
  new CompraMiddleware().checarCamposCompra,
  new CompraControlador().cadastrarCompra
);

// Deletar compras
rotas.delete(
  "/compras/:idCompra",
  new CompraMiddleware().checarCompra,
  new CompraControlador().deletarCompra
);

export default rotas;

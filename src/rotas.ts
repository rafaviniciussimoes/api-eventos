import { Router } from "express";
import UsuarioControlador from "./controllers/UsuarioControlador";
import EventoMiddleware from "./middlewares/EventoMiddleware";
import UsuarioMiddleware from "./middlewares/UsuarioMiddleware";
import EventoControlador from "./controllers/EventoControlador";
import CompraControlador from "./controllers/CompraControlador";
import CompraMiddleware from "./middlewares/CompraMiddleware";
import { Autenticar } from "./middlewares/LoginMiddleware";
import { GerarToken } from "./utils/GerarToken";

const rotas = Router();

// Logar no sistema
rotas.post("/login", new GerarToken().token);

rotas.use(new Autenticar().autenticar);

// Listar usuarios
rotas.get(
  "/usuarios",
  new Autenticar().autenticar,
  new UsuarioControlador().listarUsuarios
);

// Cadastrar usuarios
rotas.post(
  "/usuario",
  new UsuarioMiddleware().checarUsuario,
  new UsuarioControlador().cadastrarUsuario
);

// Deletar usuarios
rotas.delete(
  "/usuario/:idUsuario",
  new UsuarioMiddleware().deletarUsuario,
  new UsuarioControlador().excluirUsuario
);

// Listar eventos
rotas.get(
  "/eventos",
  new EventoMiddleware().checaPrecoEvento,
  new EventoControlador().mostrarEvento
);

// Cadastrar eventos
rotas.post(
  "/evento",
  new EventoMiddleware().checaEvento,
  new EventoControlador().cadastrarEvento
);

// Deletar eventos
rotas.delete(
  "/evento/:idEvento",
  new EventoMiddleware().excluirEvento,
  new EventoControlador().excluirEvento
);

// Listar compras
rotas.get("/compras", new CompraControlador().listaCompras);

// Cadastrar compras
rotas.post(
  "/compra",
  new CompraMiddleware().checaCompra,
  new CompraControlador().cadastrarCompra
);

// Deletar compras
rotas.delete("/compra/:idCompra", new CompraControlador().deletarCompra);

export default rotas;

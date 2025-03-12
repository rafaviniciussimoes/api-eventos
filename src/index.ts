import express, { Request, Response } from "express";
import rotas from "./rotas";

const app = express();
const porta = 8001;

app.use(express.json());

app.use(rotas);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}...`);
});

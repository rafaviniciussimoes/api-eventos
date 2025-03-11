import express, { Request, Response } from "express";

const app = express();
const porta = 8000;

app.use(express.json());

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}...`);
});

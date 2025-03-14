import express from "express";
import rotas from "./rotas";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const app = express();
const porta = 8001;

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(rotas);

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}...`);
});

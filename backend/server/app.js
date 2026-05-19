import router from "./router.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173", // Permite apenas o seu frontend acessar
        methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
        credentials: true, // Se precisar enviar cookies ou headers de autenticação futuramente
    }),
);
app.use(express.json());
app.use("/", router);

app.listen(8989, () => {
    console.log("Server online");
});

export default app;

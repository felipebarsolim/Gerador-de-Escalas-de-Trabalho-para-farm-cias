import router from "./router.js";
import express from "express";

const app = express();

app.use(express.json());
app.use("/", router);

app.listen(8989, () => {
    console.log("Server online");
});

export default app;

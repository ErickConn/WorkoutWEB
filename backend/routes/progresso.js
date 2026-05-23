import express from "express";
import progressoControllers from "../controllers/progresso.js";
import { validarProgresso } from "../middlewares/validarProgresso.js";

const routerProgresso = express.Router();

routerProgresso.get("/progresso/:userId", progressoControllers.getUserProgress);

routerProgresso.post("/progresso/:userId", validarProgresso, progressoControllers.addProgress);

routerProgresso.put("/progresso/:userId/:progressId", validarProgresso, progressoControllers.updateProgress);

export default routerProgresso;
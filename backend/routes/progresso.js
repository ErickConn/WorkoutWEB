import express from "express";
import progressoControllers from "../controllers/progresso.js";
import { validarProgresso } from "../middlewares/validarProgresso.js";

const routerProgresso = express.Router();

routerProgresso.get("/:userId", progressoControllers.getUserProgress);

routerProgresso.post("/:userId", validarProgresso, progressoControllers.addProgress);

routerProgresso.put("/:userId", validarProgresso, progressoControllers.updateProgress);

export default routerProgresso;
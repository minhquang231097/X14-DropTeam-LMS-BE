import sessionController from "@/controllers/session.controller";
import express from "express";

const sessionRouter = express.Router();

sessionRouter.get("/", sessionController.GetSession);
sessionRouter.post("/", sessionController.CreateNewSession);
sessionRouter.put("/:id", sessionController.UpdateSession);
sessionRouter.delete("/:id", sessionController.DeleteSession);

export default sessionRouter;

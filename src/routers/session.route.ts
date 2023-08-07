import sessionController from "@/controllers/session.controller";
import express from "express";

const sessionRouter = express.Router();

sessionRouter.get("/", sessionController.GetSession);
sessionRouter.post("/", sessionController.CreateNewSession);
sessionRouter.put("/", sessionController.UpdateSession);
sessionRouter.delete("/", sessionController.DeleteSession);

export default sessionRouter;

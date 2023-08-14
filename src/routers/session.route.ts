import sessionController from "@/controllers/session.controller";
import { SessionSchema } from "@/validation/session.joi";
import { ValidateJoi } from "@/validation/validatejoi";
import express from "express";

const sessionRouter = express.Router();

sessionRouter.get("/", sessionController.GetSession);
sessionRouter.post("/", ValidateJoi(SessionSchema.Session.create_session), sessionController.CreateNewSession);
sessionRouter.put("/", ValidateJoi(SessionSchema.Session.update_session), sessionController.UpdateSession);
sessionRouter.delete("/", sessionController.DeleteSession);

export default sessionRouter;

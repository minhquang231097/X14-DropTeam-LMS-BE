import sessionController from "@/controllers/session.controller";
import { SessionSchema } from "@/validation/session.joi";
import { ValidateJoi } from "@/validation/validatejoi";
import express from "express";

const sessionRouter = express.Router();

sessionRouter.get("/", sessionController.GetSession);
sessionRouter.get("/:id", sessionController.GetSessionInfo);
sessionRouter.post("/", sessionController.CreateSessionWithAttendance);
sessionRouter.put("/:id", ValidateJoi(SessionSchema.Session.update_session), sessionController.UpdateSession);
sessionRouter.delete("/:id", sessionController.DeleteSession);

export default sessionRouter;

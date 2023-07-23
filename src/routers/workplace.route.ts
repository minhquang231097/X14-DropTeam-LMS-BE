import workplaceController from "@/controllers/workplace.controller";
import express from "express";
import { ValidateJoi } from "@/validation/validateJoi";
import { WorkplaceSchema } from "@/validation/workplace.joi";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";

const workplaceRouter = express.Router()

workplaceRouter.post("/create-workplace", verifyAccessJWT, ValidateJoi(WorkplaceSchema.Workplace.create_workplace), workplaceController.CreateWorkplace)
workplaceRouter.put("/workplace/:id", verifyAccessJWT, ValidateJoi(WorkplaceSchema.Workplace.update_workplace), workplaceController.UpdateWorkplace)
workplaceRouter.get("/workplace", verifyAccessJWT, workplaceController.GetAllWorkplace)
workplaceRouter.get("/workplace/:id", verifyAccessJWT, workplaceController.GetWorkplaceById)
workplaceRouter.delete("/workplace/:id", verifyAccessJWT, workplaceController.DeletedWorkplace)

export default workplaceRouter
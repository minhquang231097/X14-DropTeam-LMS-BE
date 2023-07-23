import workplaceController from "@/controllers/workplace.controller";
import express from "express";
import { ValidateJoi } from "@/validation/validatejoi";
import { WorkplaceSchema } from "@/validation/workplace.joi";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";

const workplaceRouter = express.Router()

workplaceRouter.post("/", verifyAccessJWT, ValidateJoi(WorkplaceSchema.Workplace.create_workplace), workplaceController.CreateWorkplace)
workplaceRouter.put("/:id", verifyAccessJWT, ValidateJoi(WorkplaceSchema.Workplace.update_workplace), workplaceController.UpdateWorkplace)
workplaceRouter.get("/", verifyAccessJWT, workplaceController.GetAllWorkplace)
workplaceRouter.get("/:id", verifyAccessJWT, workplaceController.GetWorkplaceById)
workplaceRouter.delete("/:id", verifyAccessJWT, workplaceController.DeletedWorkplace)

export default workplaceRouter
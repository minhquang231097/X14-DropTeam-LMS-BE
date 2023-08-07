import workplaceController from "@/controllers/workplace.controller";
import express from "express";
import { ValidateJoi } from "@/validation/validatejoi";
import { WorkplaceSchema } from "@/validation/workplace.joi";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";

const workplaceRouter = express.Router()

workplaceRouter.post("/", verifyAccessJWT, ValidateJoi(WorkplaceSchema.Workplace.create_workplace), workplaceController.CreateWorkplace)
workplaceRouter.put("/", verifyAccessJWT, ValidateJoi(WorkplaceSchema.Workplace.update_workplace), workplaceController.UpdateWorkplace)
workplaceRouter.get("/", verifyAccessJWT, workplaceController.GetWorkplace)
workplaceRouter.delete("/", verifyAccessJWT, workplaceController.DeletedWorkplace)

export default workplaceRouter
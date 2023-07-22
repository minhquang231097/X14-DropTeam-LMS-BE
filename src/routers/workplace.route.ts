import workplaceController from "@/controllers/workplace.controller";
import express from "express";
import { ValidateJoi } from "@/validation/validateJoi";
import { Schema } from "@/validation/workplace.joi";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";

const workplaceRouter = express.Router()

workplaceRouter.post("/create-workplace", ValidateJoi(Schema.Workplace.create_workplace), workplaceController.CreateWorkplace)
workplaceRouter.put("/workplace/:id", ValidateJoi(Schema.Workplace.update_workplace), workplaceController.UpdateWorkplace)
workplaceRouter.get("/workplace", verifyAccessJWT, workplaceController.GetAllWorkplace)

export default workplaceRouter
import express from "express";
import { ValidateJoi } from "@/validation/validatejoi";
import { ClassSchema } from "@/validation/class.joi";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";
import classController from "@/controllers/class.controller";

const classRouter = express.Router()

classRouter.post("/", verifyAccessJWT, ValidateJoi(ClassSchema.Class.create_class), classController.CreateNewClass)
classRouter.put("/", verifyAccessJWT, ValidateJoi(ClassSchema.Class.create_class), classController.UpdateClass)
classRouter.get("/page", classController.GetAllClass)
classRouter.get("/", classController.GetClassByCode)
classRouter.get("/", classController.GetClassById)
classRouter.delete("/all", classController.DeleteManyClass)
classRouter.delete("/", verifyAccessJWT, classController.DeleteOneClass)

export default classRouter
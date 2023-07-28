import classController from "@/controllers/class.controller";
import express from "express";
import { ValidateJoi } from "@/validation/validatejoi";
import { ClassSchema } from "@/validation/class.joi";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";

const classRouter = express.Router()

classRouter.post("/", verifyAccessJWT, ValidateJoi(ClassSchema.Class.create_class), classController.CreateClass)
classRouter.put("/:id", verifyAccessJWT, ValidateJoi(ClassSchema.Class.update_class), classController.UpdateClass)
classRouter.get("/page/:page", classController.GetAllClass)
classRouter.get("/:id", classController.GetClassById)
classRouter.delete("/:id", verifyAccessJWT, classController.DeletedClass)

export default classRouter



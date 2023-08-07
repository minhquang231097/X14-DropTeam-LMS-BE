import express from "express";
import { ValidateJoi } from "@/validation/validatejoi";
import { CourseSchema } from "@/validation/course.joi";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";
import classController from "@/controllers/class.controller";

const classRouter = express.Router()

classRouter.post("/", verifyAccessJWT, ValidateJoi(CourseSchema.Course.create_course), classController.CreateNewClass)
classRouter.put("/", verifyAccessJWT, ValidateJoi(CourseSchema.Course.update_course), classController.UpdateClass)
// classRouter.get("/page", classController.GetAllClass)
classRouter.get("/", classController.GetClassByCode)
classRouter.get("/", classController.GetClassById)
classRouter.delete("/all", classController.DeleteManyCourse)
classRouter.delete("/", verifyAccessJWT, classController.DeleteOneClass)

export default classRouter
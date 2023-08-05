<<<<<<<< <Temporary merge branch 1
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


=========
import express from "express";
import { ValidateJoi } from "@/validation/validatejoi";
import { CourseSchema } from "@/validation/course.joi";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";
import classController from "@/controllers/class.controller";

const classRouter = express.Router()

classRouter.post("/", verifyAccessJWT, ValidateJoi(CourseSchema.Course.create_course), classController.CreateNewClass)
classRouter.put("/", verifyAccessJWT, ValidateJoi(CourseSchema.Course.update_course), classController.UpdateClass)
classRouter.get("/page", classController.GetAllClass)
classRouter.get("/", classController.GetClassByCode)
classRouter.get("/", classController.GetClassById)
classRouter.delete("/all", classController.DeleteManyCourse)
classRouter.delete("/", verifyAccessJWT, classController.DeleteOneClass)

export default classRouter
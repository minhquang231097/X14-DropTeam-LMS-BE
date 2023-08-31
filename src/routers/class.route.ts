import express from "express";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";
import classController from "@/controllers/class.controller";
import { ValidateJoi } from "@/validation/validatejoi";
import { ClassSchema } from "@/validation/class.joi";

const classRouter = express.Router();

classRouter.get("/", classController.GetClass);
classRouter.get("/:id", classController.GetClassInfo);
classRouter.post("/", ValidateJoi(ClassSchema.Class.create_class), classController.CreateNewClass);
classRouter.post("/add-student", verifyAccessJWT, ValidateJoi(ClassSchema.Class.add_student), classController.AddStudentToClass);
classRouter.put("/:id", ValidateJoi(ClassSchema.Class.update_class), verifyAccessJWT, classController.UpdateClass);
classRouter.put("/student-status/:id", ValidateJoi(ClassSchema.Class.update_student_status), verifyAccessJWT, classController.UpdateStatusStudentInClass);
classRouter.delete("/:id", verifyAccessJWT, classController.DeleteOneClass);

export default classRouter;

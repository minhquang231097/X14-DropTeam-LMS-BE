import express from "express";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";
import classController from "@/controllers/class.controller";
import { ValidateJoi } from "@/validation/validatejoi";
import { ClassSchema } from "@/validation/class.joi";

const classRouter = express.Router();

classRouter.get("/", classController.GetClass);
classRouter.get("/:id", classController.GetClassInfo);
classRouter.get("/mentor", verifyAccessJWT, classController.GetClassByMentor);
classRouter.post("/", ValidateJoi(ClassSchema.Class.create_class), classController.CreateNewClass);
classRouter.post("/add-student", ValidateJoi(ClassSchema.Class.add_student), classController.AddStudentToClass);
classRouter.put("/:id", ValidateJoi(ClassSchema.Class.update_class), classController.UpdateClass);
classRouter.put("/student-status/:id", ValidateJoi(ClassSchema.Class.update_student_status), classController.UpdateStatusStudentInClass);
classRouter.delete("/:id", classController.DeleteOneClass);

export default classRouter;

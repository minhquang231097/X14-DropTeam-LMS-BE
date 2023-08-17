import express from "express";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";
import classController from "@/controllers/class.controller";
import { ValidateJoi } from "@/validation/validatejoi";
import { ClassSchema } from "@/validation/class.joi";

const classRouter = express.Router();

classRouter.post(
  "/",
  // verifyAccessJWT,
  ValidateJoi(ClassSchema.Class.create_class),
  classController.CreateNewClass,
);
classRouter.post(
  "/add-student",
  ValidateJoi(ClassSchema.Class.add_student),
  // verifyAccessJWT,
  classController.AddStudentToClass,
);
classRouter.put("/:id", ValidateJoi(ClassSchema.Class.update_class), verifyAccessJWT, classController.UpdateClass);
classRouter.get("/", classController.GetClass);
classRouter.delete("/all", classController.DeleteManyCourse);
classRouter.delete("/:id", verifyAccessJWT, classController.DeleteOneClass);

export default classRouter;

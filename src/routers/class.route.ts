import express from "express";
import { verifyAccessJWT } from "@/middlewares/verifyAccessToken";
import classController from "@/controllers/class.controller";
import { ValidateJoi } from "@/validation/validatejoi";
import { ClassSchema } from "@/validation/class.joi";

const classRouter = express.Router();

classRouter.post(
  "/",
  verifyAccessJWT,
  ValidateJoi(ClassSchema.Class.create_class),
  classController.CreateNewClass,
);
classRouter.put("/", verifyAccessJWT, classController.UpdateClass);
classRouter.get("/", classController.GetClass);
classRouter.delete("/all", classController.DeleteManyCourse);
classRouter.delete("/", verifyAccessJWT, classController.DeleteOneClass);

export default classRouter;

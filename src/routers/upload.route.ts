import UploadImage from "@/controllers/upload.controller";
import { UploadCloud } from "@/services/upload.service";
import express from "express";

const uploadRouter = express.Router();

uploadRouter.post("/", UploadCloud.any(), UploadImage);

export default uploadRouter;

import UploadImage from "@/controllers/upload.controller";
import express from "express";

const uploadRouter = express.Router();

uploadRouter.post("/", UploadImage);

export default uploadRouter;

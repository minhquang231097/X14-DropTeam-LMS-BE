import multer from "multer";

import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
})

export const UploadCloud = multer({
  storage: storage
})
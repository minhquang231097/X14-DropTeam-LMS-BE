import HttpException from "@/common/httpException";
import HttpResponseData from "@/common/httpResponseData";
import { RESPONSE_CONFIG } from "@/configs/response.config";
import { Request, Response } from "express-serve-static-core";

const UploadImage = async (req: Request, res: Response) => {
  const file: any = req.files;
  try {
    let result = [];
    for (let i = 0; i < file.length; i++) {
      result.push(file[i].path);
    }
    res.json(new HttpResponseData(RESPONSE_CONFIG.MESSAGE.IMAGE.UPLOAD_SUCCESS, 200, result));
  } catch (error: any) {
    return res.json(
      new HttpException(RESPONSE_CONFIG.MESSAGE.IMAGE.UPLOAD_FAIL, 400, error.message),
    );
  }
};

export default UploadImage;

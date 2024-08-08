import "dotenv/config";
import { } from "path";
import multer from "multer";
import { v2 } from "cloudinary";
import { RequestHandler } from "express";

const upload = multer({ dest: "media/" });

export const uploadHandler = (fieldName: string, isOptional: boolean = false): RequestHandler => async (request, response, next) => {
  console.log(request.file, isOptional);
  if (!request.file && isOptional) return next();
  let mode = process.env.NODE_ENV;


  if (mode === "production") {
    try {
      if (request.file) {
        const result = await v2.uploader.upload(request.file.path);
        request.body.image = result.secure_url;
      }
      next();
    } catch (error) {
      return response.status(500).json({ error: "Failed to upload image to Cloudinary" });
    }
  } else {
    let uploader = upload.single(fieldName);

    uploader(request, response, (err) => {
      if (err) return response.status(400).json({ error: "Failed to upload image" });
      if (request.file) {
        const fileExtension = request.file.originalname.split('.').pop();

        request.body.image = `/media/${request.file.filename}.${fileExtension}`;
        next();
      }
    });
  }
};

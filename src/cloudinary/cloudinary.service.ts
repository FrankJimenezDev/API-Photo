import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'nestjs_uploads' }, (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Upload failed, no result from Cloudinary'));
          resolve(result);
        })
        .end(file.buffer);
    });
  }
}

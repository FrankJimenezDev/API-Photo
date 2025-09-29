import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  // Borrar imagen
  async deleteImage(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(new InternalServerErrorException(`No se pudo eliminar la imagen: ${error.message}`));
        if (result.result !== 'ok' && result.result !== 'not_found') {
          return reject(new InternalServerErrorException(`Error eliminando imagen: ${result.result}`));
        }
        resolve();
      });
    });
  }
}

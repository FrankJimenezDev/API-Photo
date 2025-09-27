import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class PhotoService {

  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadPhoto(file: Express.Multer.File) {    
    const result = await this.cloudinaryService.uploadImage(file);
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  findAll() {
    return `This action returns all photo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} photo`;
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IPhoto } from 'src/interfaces/photo.interface';

@Injectable()
export class PhotoService {

  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>
  ) { }

  async uploadPhoto(file: Express.Multer.File, PhotoDto: PhotoDto) {
    const result = await this.cloudinaryService.uploadImage(file);

    const photoData: IPhoto = {
      url: result.secure_url as string,
      coudinaryPublicId: result.public_id as string,
      description: PhotoDto.description ,
      title: PhotoDto.title,
    }

    const photo: Photo = this.photoRepository.create(photoData);

    try {
      await this.photoRepository.save(photo);
      return {
        message: "Foto Subida Correctamente",
        ...photo
      };
    } catch (error) {
      throw new InternalServerErrorException('No se pudo guardar la foto en la base de datos');
    }
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

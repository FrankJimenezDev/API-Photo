import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IPhoto } from 'src/interfaces/photo.interface';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class PhotoService {

  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>
  ) { }

  @Transactional()
  async uploadPhoto(file: Express.Multer.File, PhotoDto: PhotoDto) {
    const result = await this.cloudinaryService.uploadImage(file);

    const photoData: IPhoto = {
      url: result.secure_url as string,
      coudinaryPublicId: result.public_id as string,
      description: PhotoDto.description ,
      title: PhotoDto.title,
    }

    const photo: Photo = this.photoRepository.create({});

    try {
      await this.photoRepository.save(photo);
      return {
        message: "imagen Subida Correctamente",
        ...photo
      };
    } catch (error) {
      if (result?.public_id) {
      await this.cloudinaryService.deleteImage(result.public_id);
    }
      throw new InternalServerErrorException('No se pudo guardar la imagen en la base de datos');
    }
  }

  async findAll() {

    try {
      const photos : Photo[] = await this.photoRepository.find();
      if(photos.length === 0){
        throw new NotFoundException('No hay imagenes en la base de datos');
      }
      return photos;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Error al buscar las imagenes');
    }
  }

  async findOne(id: string) {
    try {
      const photo : Photo | null = await this.photoRepository.findOneBy({id});
      if(!photo){
        throw new NotFoundException('imagen no encontrada');
      }
      return photo;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Error al buscar la imagen' );
    }
  }

  async update(id: string, updatePhotoDto: UpdatePhotoDto) {
      const photo : Photo = await this.findOne(id)

    try {
      this.photoRepository.merge(photo, updatePhotoDto);
      await this.photoRepository.save(photo);
      return "datos de la imagen actualizados correctamente";
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Error al actualizar datos de la imagen');
    }
  }

  @Transactional()
  async remove(id: string) {

      const photo : Photo = await this.findOne(id);

    try {
      await this.update(id, {isDeleted: true});
      await this.cloudinaryService.deleteImage(photo.coudinaryPublicId);
      return "Foto eliminada correctamente";
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar la imagen');
    }
  }
}

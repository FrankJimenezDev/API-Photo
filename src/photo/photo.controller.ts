import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return await this.photoService.uploadPhoto(file);
  }

  @Get()
  findAll() {
    return this.photoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photoService.update(+id, updatePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoService.remove(+id);
  }
}

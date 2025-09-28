import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Photo } from './entities/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
    CloudinaryModule,
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}

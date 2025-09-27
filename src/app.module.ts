import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoModule } from './photo/photo.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    CloudinaryModule,
    PhotoModule,
    DbModule,
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que ConfigService sea global
      envFilePath: '.env.development.local', // opcional, si querés cargar tu .env
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

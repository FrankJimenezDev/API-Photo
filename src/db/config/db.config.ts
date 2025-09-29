// ormconfig.factory.ts
import { ConfigService } from '@nestjs/config';
import { Photo } from 'src/photo/entities/photo.entity';

export const createTypeOrmConfig = (configService: ConfigService) => ({
  type: 'mysql' as const,
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [Photo],
  synchronize: true,
});
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { createTypeOrmConfig } from "./db.config";


const configService = new ConfigService();
export const AppDataSource = new DataSource(createTypeOrmConfig(configService));
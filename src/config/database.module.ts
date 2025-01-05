import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // This tells NestJS to load the .env file
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        
        return {
          dialect: 'postgres', // Use PostgreSQL
          host: configService.get<string>('DB_HOST', 'localhost'), // Default to localhost if not provided
          port: +configService.get<number>('DB_PORT', 5432), // Default to 5432 if not provided
          username: configService.get<string>('DB_USERNAME', 'postgres'), // Default to 'postgres'
          password: configService.get<string>('DB_PASSWORD', 'admin'), // Default to 'admin'
          database: configService.get<string>('DB_NAME', 'postgres'), // Default to 'communicare'
          autoLoadModels: true, // Automatically load models
          synchronize: true, // Sync models with the database
          ...(isProduction && {
            dialectOptions: {
              ssl: {
                require: true,
                rejectUnauthorized: false, // Set to true in a production environment
              }
            }
          })
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}

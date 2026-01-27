import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');

        console.log('DEBUG MONGO_URI =', uri);

        if (!uri) {
          throw new Error('❌ MONGO_URI is not defined');
        }

        return {
          uri,
          connectionFactory: (connection) => {
            console.log(
              '✅ MongoDB connected to DB:',
              connection.db.databaseName,
            );
            return connection;
          },
        };
      },
    }),
  ],
})
export class MongoModule {}

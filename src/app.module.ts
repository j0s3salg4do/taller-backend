import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MuseumModule } from './museum/museum.module';
import { MuseumEntity } from './museum/museum.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [MuseumEntity],
      synchronize: true,
    }),
    MuseumModule,
  ],
})
export class AppModule {}

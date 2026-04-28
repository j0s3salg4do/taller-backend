import { Controller, Get, Query } from '@nestjs/common';
import { MuseumService } from './museum.service';
import { MuseumQueryDto } from './museum-query.dto';

@Controller('museums')
export class MuseumController {
  constructor(private readonly museumService: MuseumService) {}

  @Get()
  findAll(@Query() query: MuseumQueryDto) {
    return this.museumService.findAll(query);
  }

  @Get('seed')
  seed() {
    return this.museumService.seed();
  }
}

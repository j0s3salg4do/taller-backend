import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, LessThan, Repository } from 'typeorm';
import { MuseumEntity } from './museum.entity';
import { MuseumQueryDto } from './museum-query.dto';

@Injectable()
export class MuseumService {
  constructor(
    @InjectRepository(MuseumEntity)
    private readonly museumRepository: Repository<MuseumEntity>,
  ) {}

  async findAll(query: MuseumQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<MuseumEntity> = {};

    if (query.city) {
      where.city = ILike(`%${query.city}%`);
    }

    if (query.name) {
      where.name = ILike(`%${query.name}%`);
    }

    if (query.foundedBefore) {
      where.foundedBefore = LessThan(query.foundedBefore);
    }

    const [data, total] = await this.museumRepository.findAndCount({
      where,
      skip,
      take: limit,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async seed() {
    const count = await this.museumRepository.count();

    if (count > 0) {
      return {
        message: 'La base de datos ya tiene datos',
        total: count,
      };
    }
const museums = [
      {
        name: 'Museo del Oro',
        city: 'Bogota',
        address: 'Cra. 6 #15-88',
        foundedBefore: 1939,
      },
      {
        name: 'Museo Nacional de Colombia',
        city: 'Bogota',
        address: 'Cra. 7 #28-66',
        foundedBefore: 1823,
      },
      {
        name: 'Museo Botero',
        city: 'Bogota',
        address: 'Calle 11 #4-41',
        foundedBefore: 2000,
      },
      {
        name: 'Museo de Arte Moderno de Bogota',
        city: 'Bogota',
        address: 'Calle 24 #6-00',
        foundedBefore: 1955,
      },
      {
        name: 'Museo Quinta de Bolivar',
        city: 'Bogota',
        address: 'Calle 21 #4A-30',
        foundedBefore: 1922,
      },
      {
        name: 'Museo Colonial',
        city: 'Bogota',
        address: 'Cra. 6 #9-77',
        foundedBefore: 1942,
      },
      {
        name: 'Museo Santa Clara',
        city: 'Bogota',
        address: 'Cra. 8 #8-91',
        foundedBefore: 1968,
      },
      {
        name: 'Museo de la Independencia Casa del Florero',
        city: 'Bogota',
        address: 'Cra. 7 #11-28',
        foundedBefore: 1960,
      },
      {
        name: 'Museo Militar de Colombia',
        city: 'Bogota',
        address: 'Calle 10 #4-92',
        foundedBefore: 1982,
      },
      {
        name: 'Museo de Bogota',
        city: 'Bogota',
        address: 'Calle 10 #3-61',
        foundedBefore: 2019,
      },
      {
        name: 'Museo del Banco de la Republica',
        city: 'Bogota',
        address: 'Calle 11 #4-14',
        foundedBefore: 1958,
      },
      {
        name: 'Museo de Trajes Regionales',
        city: 'Bogota',
        address: 'Cra. 6 #10-93',
        foundedBefore: 1974,
      },
      {
        name: 'Museo de Arquitectura Leopoldo Rother',
        city: 'Bogota',
        address: 'Ciudad Universitaria',
        foundedBefore: 1974,
      },
      {
        name: 'Museo de Historia Natural UNAL',
        city: 'Bogota',
        address: 'Universidad Nacional',
        foundedBefore: 1970,
      },
      {
        name: 'Museo de Ciencias Maloka',
        city: 'Bogota',
        address: 'Cra. 68D #24A-51',
        foundedBefore: 1998,
      },
      {
        name: 'Museo del Vidrio',
        city: 'Bogota',
        address: 'Cra. 1 #6C-75',
        foundedBefore: 1969,
      },
      {
        name: 'Museo del Siglo XIX',
        city: 'Bogota',
        address: 'Calle 10 #8-95',
        foundedBefore: 1950,
      },
      {
        name: 'Museo de Arte Contemporaneo Minuto de Dios',
        city: 'Bogota',
        address: 'Cra. 74 #82A-81',
        foundedBefore: 1966,
      },
      {
        name: 'Museo de Arte Miguel Urrutia',
        city: 'Bogota',
        address: 'Calle 11 #4-21',
        foundedBefore: 2004,
      },
      {
        name: 'Museo de la Policia Nacional',
        city: 'Bogota',
        address: 'Calle 9 #9-27',
        foundedBefore: 1990,
      },
    ];

    await this.museumRepository.save(museums);

    return {
      message: 'Museos creados correctamente',
      total: museums.length,
    };
  }
}

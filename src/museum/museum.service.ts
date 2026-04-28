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
        name: 'Museo de Arte Moderno',
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
        name: 'Museo de Antioquia',
        city: 'Medellin',
        address: 'Cra. 52 #52-43',
        foundedBefore: 1881,
      },
      {
        name: 'Museo El Castillo',
        city: 'Medellin',
        address: 'Calle 9 Sur #32-269',
        foundedBefore: 1971,
      },
      {
        name: 'Museo de Arte Moderno de Medellin',
        city: 'Medellin',
        address: 'Cra. 44 #19A-100',
        foundedBefore: 1978,
      },
      {
        name: 'Museo La Tertulia',
        city: 'Cali',
        address: 'Av. Colombia #5-105',
        foundedBefore: 1956,
      },
      {
        name: 'Museo Arqueologico La Merced',
        city: 'Cali',
        address: 'Cra. 4 #6-59',
        foundedBefore: 1979,
      },
      {
        name: 'Museo Rayo',
        city: 'Roldanillo',
        address: 'Calle 8 #8-53',
        foundedBefore: 1981,
      },
      {
        name: 'Museo del Caribe',
        city: 'Barranquilla',
        address: 'Calle 36 #46-66',
        foundedBefore: 2009,
      },
      {
        name: 'Museo Romantico',
        city: 'Barranquilla',
        address: 'Cra. 54 #59-199',
        foundedBefore: 1983,
      },
      {
        name: 'Museo Naval del Caribe',
        city: 'Cartagena',
        address: 'Calle San Juan de Dios #3-62',
        foundedBefore: 1992,
      },
      {
        name: 'Museo Historico de Cartagena',
        city: 'Cartagena',
        address: 'Plaza de Bolivar',
        foundedBefore: 1924,
      },
      {
        name: 'Museo Casa de la Memoria',
        city: 'Medellin',
        address: 'Calle 51 #36-66',
        foundedBefore: 2006,
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
        name: 'Museo Taminango',
        city: 'Pasto',
        address: 'Calle 13 #27-67',
        foundedBefore: 1971,
      },
      {
        name: 'Museo Juan del Corral',
        city: 'Santa Fe de Antioquia',
        address: 'Calle 11 #9-77',
        foundedBefore: 1960,
      },
    ];

    await this.museumRepository.save(museums);

    return {
      message: 'Museos creados correctamente',
      total: museums.length,
    };
  }
}

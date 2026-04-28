import { Test, TestingModule } from '@nestjs/testing';
import { MuseumService } from './museum.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MuseumEntity } from './museum.entity';
import { ILike, LessThan } from 'typeorm';

describe('MuseumService', () => {
  let service: MuseumService;
  let repository: any;

  beforeEach(async () => {
    repository = {
      findAndCount: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MuseumService,
        {
          provide: getRepositoryToken(MuseumEntity),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<MuseumService>(MuseumService);
  });

  it('debe usar page=1 y limit=10 por defecto', async () => {
    repository.findAndCount.mockResolvedValue([[], 0]);

    await service.findAll({});

    expect(repository.findAndCount).toHaveBeenCalledWith({
      where: {},
      skip: 0,
      take: 10,
    });
  });

  it('debe filtrar por ciudad', async () => {
    repository.findAndCount.mockResolvedValue([[], 0]);

    await service.findAll({ city: 'Bogota' });

    expect(repository.findAndCount).toHaveBeenCalledWith({
      where: {
        city: ILike('%Bogota%'),
      },
      skip: 0,
      take: 10,
    });
  });

  it('debe filtrar por nombre', async () => {
    repository.findAndCount.mockResolvedValue([[], 0]);

    await service.findAll({ name: 'oro' });

    expect(repository.findAndCount).toHaveBeenCalledWith({
      where: {
        name: ILike('%oro%'),
      },
      skip: 0,
      take: 10,
    });
  });

  it('debe filtrar por foundedBefore', async () => {
    repository.findAndCount.mockResolvedValue([[], 0]);

    await service.findAll({ foundedBefore: 1900 });

    expect(repository.findAndCount).toHaveBeenCalledWith({
      where: {
        foundedBefore: LessThan(1900),
      },
      skip: 0,
      take: 10,
    });
  });

  it('debe combinar varios filtros', async () => {
    repository.findAndCount.mockResolvedValue([[], 0]);

    await service.findAll({
      city: 'Bogota',
      name: 'oro',
      foundedBefore: 1900,
    });

    expect(repository.findAndCount).toHaveBeenCalledWith({
      where: {
        city: ILike('%Bogota%'),
        name: ILike('%oro%'),
        foundedBefore: LessThan(1900),
      },
      skip: 0,
      take: 10,
    });
  });

  it('debe aplicar paginación correctamente', async () => {
    repository.findAndCount.mockResolvedValue([[], 25]);

    const result = await service.findAll({
      page: 2,
      limit: 5,
    });

    expect(repository.findAndCount).toHaveBeenCalledWith({
      where: {},
      skip: 5,
      take: 5,
    });

    expect(result.meta).toEqual({
      total: 25,
      page: 2,
      limit: 5,
      totalPages: 5,
    });
  });
});

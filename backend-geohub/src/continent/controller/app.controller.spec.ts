import { Test, TestingModule } from '@nestjs/testing';
import { ContinentController } from './continent.controller';
import { ContinentService } from '../service/continent.service';
import { CreateContinentDto } from '../dtos/create-continent-dto';
import { UpdateContinentDto } from '../dtos/update-continent-dto';

describe('ContinentController', () => {
  let continentController: ContinentController;
  let continentService: ContinentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContinentController],
      providers: [
        {
          provide: ContinentService,
          useValue: {
            listAll: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockResolvedValue({
              con_id: 1,
              con_name: 'América do Sul',
              con_description: 'Continente sul-americano',
            }),
            update: jest.fn().mockImplementation((dto: UpdateContinentDto) =>
              Promise.resolve({
                con_id: dto.id,
                con_name: dto.name,
                con_description: dto.description,
              }),
            ),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    continentController = module.get<ContinentController>(ContinentController);
    continentService = module.get<ContinentService>(ContinentService);
  });

  describe('create', () => {
    it('should create a continent', async () => {
      const createContinentDto: CreateContinentDto = {
        name: 'América do Sul',
        description: 'Continente sul-americano',
      };

      const result = await continentController.create(createContinentDto);
      expect(result).toEqual({
        con_id: 1,
        con_name: 'América do Sul',
        con_description: 'Continente sul-americano',
      });
    });
  });

  describe('listAll', () => {
    it('should return an array', async () => {
      const result = await continentController.listAll();
      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should be update a continent', async () => {
      const updateContinentDto: UpdateContinentDto = {
        id: 1,
        name: 'América do Norte',
        description: 'Continente norte-americano',
      };

      const result = await continentController.update(
        updateContinentDto.id,
        updateContinentDto,
      );
      expect(result).toEqual({
        con_id: 1,
        con_name: 'América do Norte',
        con_description: 'Continente norte-americano',
      });
    });
  });

  describe('delete', () => {
    it('should be delete a continent', async () => {
      const result = await continentController.delete(1);
      expect(result).toBeUndefined();
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { CrematoriumReservationService } from './crematorium-reservation.service';
import { CrematoriumReservation } from './crematorium-reservation.model';

describe('CrematoriumReservationService', () => {
  let service: CrematoriumReservationService;
  let mockModel: typeof CrematoriumReservation;

  beforeEach(async () => {
    mockModel = {
      findAll: jest.fn(),
      create: jest.fn()
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrematoriumReservationService,
        {
          provide: getModelToken(CrematoriumReservation),
          useValue: mockModel
        }
      ]
    }).compile();

    service = module.get<CrematoriumReservationService>(CrematoriumReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBookedSlots', () => {
    it('should return array of booked slots', async () => {
      (mockModel.findAll as jest.Mock).mockResolvedValue([
        { timeSlot: '10-12' }, 
        { timeSlot: '1-3' }
      ]);

      const result = await service.getBookedSlots(1, '2023-10-01');
      expect(result).toEqual(['10-12', '1-3']);
      expect(mockModel.findAll).toHaveBeenCalledWith({
        where: {
          crematoriumId: 1,
          funeralDate: new Date('2023-10-01'),
          status: 0
        },
        attributes: ['timeSlot']
      });
    });
  });

  describe('createReservation', () => {
    it('should create reservation with status 0', async () => {
      const mockData = { crematoriumId: 1 };
      (mockModel.create as jest.Mock).mockResolvedValue(mockData);

      await service.createReservation(mockData);
      expect(mockModel.create).toHaveBeenCalledWith({
        ...mockData,
        status: 0
      });
    });
  });
});

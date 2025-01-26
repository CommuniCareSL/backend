import { Test, TestingModule } from '@nestjs/testing';
import { CrematoriumReservationController } from './crematorium-reservation.controller';
import { CrematoriumReservationService } from './crematorium-reservation.service';

describe('CrematoriumReservationController', () => {
  let controller: CrematoriumReservationController;
  let service: CrematoriumReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrematoriumReservationController],
      providers: [
        {
          provide: CrematoriumReservationService,
          useValue: {
            getBookedSlots: jest.fn(),
            createReservation: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<CrematoriumReservationController>(CrematoriumReservationController);
    service = module.get<CrematoriumReservationService>(CrematoriumReservationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBookedSlots', () => {
    it('should call service with correct parameters', async () => {
      const getBookedSlotsSpy = jest.spyOn(service, 'getBookedSlots')
        .mockResolvedValue(['10-12']);
      
      await controller.getBookedSlots('1', '2023-10-01');
      expect(getBookedSlotsSpy).toHaveBeenCalledWith(1, '2023-10-01');
    });
  });

  describe('createReservation', () => {
    it('should pass data to service layer', async () => {
      const mockData = { crematoriumId: 1, funeralDate: '2023-10-01' };
      const createSpy = jest.spyOn(service, 'createReservation')
        .mockResolvedValue({} as any);
      
      await controller.createReservation(mockData);
      expect(createSpy).toHaveBeenCalledWith(mockData);
    });
  });
});
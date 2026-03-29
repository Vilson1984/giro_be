import { Injectable } from '@nestjs/common';
import { DriverService } from '../driver/driver.service';
import { MapsService } from '../maps/maps.service';

@Injectable()
export class RideService {
  constructor(
    private readonly driverService: DriverService,
    private readonly mapsService: MapsService,
  ) {}

  estimateRidePrice(data: any) {
    return {
      Message: 'EndPoint funcionando, mas ainda não implementado',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data,
    };
  }
}

import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { DriverService } from '../driver/driver.service';
import { MapsService } from '../maps/maps.service';
import { RideEstimateDto } from './estimate-ride.dto';

@Injectable()
export class RideService {
  constructor(
    private readonly driverService: DriverService,
    private readonly mapsService: MapsService,
  ) {}

  estimateRidePrice(data: RideEstimateDto) {
    if (data.origin === data.destination) {
      throw new BadRequestException({
        error_code: 'INVALID_ADDRESS',
        error_message: 'Os endereços de origem e destino não podem ser iguais.',
      });
    }

    const route = this.mapsService.getRoute(data.origin, data.destination);
    console.log(JSON.stringify(route, null, 2));

    return {
      message: 'endpoint funcionando',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: route,
    };
  }
}

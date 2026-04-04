import { Body, Controller, Post } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideEstimateDto } from './estimate-ride.dto';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post('estimate')
  estimateRidePrice(@Body() body: RideEstimateDto) {
    // Implementation for estimating ride price
    return this.rideService.estimateRidePrice(body);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { RideService } from './ride.service';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post('estimate')
  estimateRidePrice(@Body() body: any) {
    // Implementation for estimating ride price
    return this.rideService.estimateRidePrice(body);
  }
}

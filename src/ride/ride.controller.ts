import { Body, Controller, Get, Post } from '@nestjs/common';
import { DriverService } from '../driver/driver.service';
import { RideService } from './ride.service';

@Controller('ride')
export class RideController {
  constructor(
    private readonly driverService: DriverService,
    private readonly rideService: RideService,
  ) {}

  @Get('drivers')
  findAll() {
    return this.driverService.findAll();
  }

  @Post('estimate')
  estimateRidePrice(@Body() body: any) {
    // Implementation for estimating ride price
    return this.rideService.estimateRidePrice(body);
  }
}

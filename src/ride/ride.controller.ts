import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RideService } from './ride.service';
import { RideEstimateDto } from './estimate-ride.dto';
import { ConfirmRideDto } from 'src/driver/confirm-drive.dto';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post('estimate')
  estimateRidePrice(@Body() body: RideEstimateDto) {
    // Implementation for estimating ride price
    return this.rideService.estimateRidePrice(body);
  }

  @Patch('confirm')
  confirmRide(@Body() body: ConfirmRideDto) {
    // Implementation for confirming a ride
    return this.rideService.confirmRide(body);
  }

  @Get(':customer_id')
  getRideByCustomerId(
    @Param('customer_id') customer_id: string,
    @Query('driver_id') id?: string,
  ) {
    return this.rideService.getRides(customer_id, id ? Number(id) : undefined);
  }
}

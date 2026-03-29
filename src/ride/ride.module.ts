import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { MapsModule } from 'src/maps/maps.module';
import { DriverModule } from 'src/driver/driver.module';

@Module({
  imports: [DriverModule, MapsModule],
  providers: [RideService],
  controllers: [RideController],
})
export class RideModule {}

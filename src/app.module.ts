import { Module } from '@nestjs/common';
import { DriverModule } from './driver/driver.module';
import { MapsModule } from './maps/maps.module';
import { RideModule } from './ride/ride.module';

@Module({
  imports: [DriverModule, MapsModule, RideModule],
})
export class AppModule {}

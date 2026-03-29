import { Module } from '@nestjs/common';
// import { DriverModule } from './driver/driver.module';
// import { MapsModule } from './maps/maps.module';
// import { RideModule } from './ride/ride.module';
import { RideController } from './ride/ride.controller';
import { DriverService } from './driver/driver.service';

@Module({
  // imports: [DriverModule, MapsModule, RideModule],
  providers: [DriverService],
  controllers: [RideController],
})
export class AppModule {}

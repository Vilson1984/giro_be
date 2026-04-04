import { Module } from '@nestjs/common';
import { DriverModule } from './driver/driver.module';
import { MapsModule } from './maps/maps.module';
import { RideModule } from './ride/ride.module';
import { RideController } from './ride/ride.controller';
import { DriverService } from './driver/driver.service';
import { RideService } from './ride/ride.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DriverModule,
    MapsModule,
    RideModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [RideController],
  providers: [DriverService, RideService],
})
export class AppModule {}

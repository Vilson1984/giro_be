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

  async estimateRidePrice(data: RideEstimateDto) {
    if (data.origin === data.destination) {
      throw new BadRequestException({
        error_code: 'INVALID_ADDRESS',
        error_message: 'Os endereços de origem e destino não podem ser iguais.',
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const route = await this.mapsService.getRoute(
      data.origin,
      data.destination,
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const distanceInKm = Number(route.routes[0].legs[0].distanceMeters) / 1000; // Convertendo metros para quilômetros
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const duration = Number(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      route.routes[0].legs[0].duration.replace('s', '').trim() / 3600,
    ); // Removendo 'mins' e espaços extras
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const origin = route.routes[0].legs[0].startLocation.latLng;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const destination = route.routes[0].legs[0].endLocation.latLng;

    // eslint-disable-next-line @typescript-eslint/await-thenable
    const drivers = await this.driverService.findAll();
    console.log('drivers:', drivers);

    // eslint-disable-next-line prettier/prettier
    const availableDrivers = drivers.filter(
      (driver) => distanceInKm >= driver.min_km,
    );
    console.log('availableDrivers:', availableDrivers);

    const optionsDrivers = availableDrivers.map((driver) => {
      const price = Number  ((driver.tax_per_km * distanceInKm).toFixed(2));
      return { driver, price };
    });
    console.log('optionsDrivers:', optionsDrivers);

    return {
      message: 'endpoint funcionando',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: route,
      distanceInKm,
      duration,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      origin,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      destination,
    };
  }

  // async requestRide() {
  //   // eslint-disable-next-line @typescript-eslint/await-thenable
  //   const drivers = await this.driverService.findAll();
  //   // Lógica para solicitar uma corrida, como selecionar um motorista disponível, calcular o preço, etc.
  //   drivers.forEach((driver)=>{driver.min_km >= distanceInKm}

  //   )
  //   return {
  //     message: 'Solicitação de corrida recebida',
  //     drivers,
  //   };
  // }
}

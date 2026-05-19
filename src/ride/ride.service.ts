import {
  BadRequestException,
  Body,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { DriverService } from '../driver/driver.service';
import { MapsService } from '../maps/maps.service';
import { RideEstimateDto } from './estimate-ride.dto';
import { ConfirmRideDto } from '../driver/confirm-drive.dto';

@Injectable()
export class RideService {
  constructor(
    private readonly driverService: DriverService,
    private readonly mapsService: MapsService,
  ) {}
  private readonly rides: any[] = [];

  async estimateRidePrice(data: RideEstimateDto) {
    if (data.origin === data.destination) {
      throw new BadRequestException({
        error_code: 'INVALID_ADDRESS',
        error_message: 'Os endereços de origem e destino não podem ser iguais.',
      });
    }

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

    const drivers = this.driverService.findAll();
    console.log('drivers:', drivers);

    const availableDrivers = drivers.filter(
      (driver) => distanceInKm >= driver.min_km,
    );
    console.log('availableDrivers:', availableDrivers);

    const optionsDrivers = availableDrivers.map((driver) => {
      const price = Number((driver.tax_per_km * distanceInKm).toFixed(2));
      return { driver, price };
    });
    console.log('optionsDrivers:', optionsDrivers);

    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      origin: route.routes[0].legs[0].startLocation.latLng,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      destination: route.routes[0].legs[0].endLocation.latLng,
      distanceInKm,
      duration,
      optionsDrivers,
      // data: route,
    };
  }

  confirmRide(data: ConfirmRideDto) {
    // validações básicas
    if (!data.customer_id) {
      throw new BadRequestException({
        error_code: 'INVALID_DATA',
        error_description: 'Dados obrigatórios não informados',
      });
    }

    // buscar motorista
    const foundDriver = this.driverService.findById(data.driver.id);

    if (!foundDriver) {
      throw new NotFoundException({
        error_code: 'DRIVER_NOT_FOUND',
        error_description: 'Motorista não encontrado',
      });
    }

    // salvar (mock)
    const ride = {
      id: Date.now(),
      date: new Date(),
      customer_id: data.customer_id,
      origin: data.origin,
      destination: data.destination,
      distance: data.distance,
      duration: data.duration,
      driver: {
        id: foundDriver.id,
        name: foundDriver.name,
      },
      value: data.value,
    };

    this.rides.push(ride);
    return {
      success: true,
    };
  }

  getRides(customerId: string, driverId?: number) {
    if (!customerId) {
      throw new BadRequestException({
        error_code: 'INVALID_DATA',
        error_description: 'ID do usuário não informado',
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    let rides = this.rides.filter((r) => r.customer_id === customerId);

    if (driverId) {
      const driver = this.driverService.findById(driverId);
      if (!driver) {
        throw new BadRequestException({
          error_code: 'INVALID_DRIVER',
          error_description: 'Motorista inválido',
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      rides = rides.filter((r) => r.driver.id === driverId);
    }

    if (rides.length === 0) {
      throw new NotFoundException({
        error_code: 'NO_RIDES_FOUND',
        error_description: 'Nenhum registro encontrado',
      });
    }

    return {
      customer_id: customerId,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      rides: rides.sort((a, b) => b.date.getTime() - a.date.getTime()),
    };
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class DriverService {
  private drivers = [
    {
      id: 1,
      name: 'Homer Simpson',
      description: 'Motorista camarada',
      vehicle: 'Plymouth Valiant 1973',
      rating: 2,
      tax_per_km: 2.5,
      min_km: 1,
    },
    {
      id: 2,
      name: 'Dominic Toretto',
      description: 'Rápido e furioso',
      vehicle: 'Dodge Charger 1970',
      rating: 4,
      tax_per_km: 5,
      min_km: 5,
    },
    {
      id: 3,
      name: 'James Bond',
      description: 'Elegância total',
      vehicle: 'Aston Martin DB5',
      rating: 5,
      tax_per_km: 10,
      min_km: 10,
    },
  ];

  findAll() {
    return this.drivers;
  }

  findById(id: number) {
    return this.drivers.find((driver) => driver.id === id);
  }
}

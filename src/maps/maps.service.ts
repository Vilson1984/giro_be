import { Injectable } from '@nestjs/common';

@Injectable()
export class MapsService {
  viagensMock = [
    {
      id_corrida: 1,
      distance: 10,
    },
    {
      id_corrida: 2,
      distance: 20,
    },
    {
      id_corrida: 3,
      distance: 30,
    },
  ];
}

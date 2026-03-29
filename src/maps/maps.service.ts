import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MapsService {
  // viagensMock = [
  //   {
  //     id_corrida: 1,
  //     distance: 10,
  //   },
  //   {
  //     id_corrida: 2,
  //     distance: 20,
  //   },
  //   {
  //     id_corrida: 3,
  //     distance: 30,
  //   },
  // ];

  async getRoute(origin: string, destination: string) {
    const apiKey = process.env.API_KEY_ROUTE;

    const response = axios.post(
      'https://maps.googleapis.com/maps/api/directions/directions/v2:computeRoutes',
      {
        origin: { address: origin },
        destination: { address: destination },
        travelMode: 'DRIVE',
      },
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  }
}

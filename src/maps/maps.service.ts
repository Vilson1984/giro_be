import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MapsService {
  async getRoute(origin: string, destination: string) {
    const apiKey = process.env.GOOGLE_API_KEY;

    const response = await axios.post(
      // 'https://routes.googleapis.com/maps/api/directions/v2:computeRoutes',
      'https://routes.googleapis.com/directions/v2:computeRoutes',
      {
        origin: { address: origin },
        destination: { address: destination },
        travelMode: 'DRIVE',
      },
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'Content-Type': 'application/json',
          'X-Goog-FieldMask': '*',
        },
      },
    );
    console.log('Response from Google Maps API:', response.data);
    console.log(JSON.stringify(response.data, null, 2));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }
}

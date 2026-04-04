import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MapsService {
  async getRoute(origin: string, destination: string) {
    const apiKey = process.env.GOOGLE_API_KEY;

    const response = await axios.post(
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    return { ...response.data };
  }
}

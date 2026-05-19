import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

class DriverDto {
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @IsNotEmpty()
  @IsString()
  name!: string;
}

export class ConfirmRideDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @Transform(({ value }: { value?: string }) => value?.trim() ?? '')
  customer_id!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @Transform(({ value }: { value?: string }) => value?.trim() ?? '')
  origin!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @Transform(({ value }: { value?: string }) => value?.trim() ?? '')
  destination!: string;

  @IsNotEmpty()
  @IsNumber()
  distance!: number;

  @IsNotEmpty()
  @IsString()
  duration!: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DriverDto)
  driver!: DriverDto;

  @IsNotEmpty()
  @IsNumber()
  value!: number;
}

export class getRidesDto {
  customer_id?: string;
  id?: number;
}

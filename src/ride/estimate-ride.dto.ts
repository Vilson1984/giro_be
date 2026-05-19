import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RideEstimateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @Transform(({ value }: { value: string }) => value?.trim())
  customer_id!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @Transform(({ value }: { value: string }) => value?.trim())
  origin!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @Transform(({ value }: { value: string }) => value?.trim())
  destination!: string;
}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly weight: number;

  @IsNumber()
  @IsNotEmpty()
  readonly count: number;

  @IsNumber()
  @IsNotEmpty()
  readonly minCount: number;

  @IsNumber()
  @IsNotEmpty()
  readonly maxCount: number;

  @IsNumber()
  @IsNotEmpty()
  readonly countUp: number;

  @IsNumber()
  @IsNotEmpty()
  readonly weightUp: number;
}

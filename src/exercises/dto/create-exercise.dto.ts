import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExerciseDto {
  @ApiProperty({
    description: 'The name of the exercise',
    examples: ['Pull up', 'Push up', 'Squats'],
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Current weight for the exercise',
    examples: [10, 13, 8],
  })
  @IsNumber()
  @IsNotEmpty()
  readonly weight: number;

  @ApiProperty({
    description: 'Current count for the exercise',
    examples: [10, 13, 8],
  })
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

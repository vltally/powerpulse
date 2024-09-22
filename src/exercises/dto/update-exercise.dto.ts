import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateExerciseDto {
  @ApiProperty({
    description: 'The name of the exercise',
    examples: ['Pull up', 'Push up', 'Squats'],
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Current weight for the exercise',
    example: [10, 13, 8],
  })
  @IsNumber()
  @IsNotEmpty()
  readonly weight: number;

  @ApiProperty({
    description: 'Current count for the exercise',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly count: number;

  @ApiProperty({
    description: 'Minimal count of exercises',
    example: 3,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly minCount: number;

  @ApiProperty({
    description: 'Max count of exercises',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly maxCount: number;

  @ApiProperty({
    description: 'Number to increase the count the exercise',
    example: 4,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly countUp: number;

  @ApiProperty({
    description: 'Number to increase the weight the exercise',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly weightUp: number;

  @ApiProperty({
    description: 'Id of the user whose exercise this is',
    example: '64de38c3df73b4947a763f5d',
  })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({
    description: 'Id of the exercise',
    example: '64de38c3df73b4947a763f5d',
  })
  @IsString()
  @IsNotEmpty()
  readonly _id: string;
}

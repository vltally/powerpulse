import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateTrainingDto {
  constructor() {}

  @ApiProperty({
    description: 'The name of the workout',
    examples: ['Monday training', 'Cardio training'],
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'An array of exercise ids',
    example: [
      '64f62a4f542b24e86cc62653',
      '64f62a4f542b24e86cc62653',
      '64f62a4f542b24e86cc62653',
    ],
  })
  @IsNotEmpty()
  @IsArray()
  exercisesId: string[];
}

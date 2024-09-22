import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTrainingDto {
  constructor() {}

  @ApiProperty({
    description: 'Id of the workout',
    examples: ['64f62a4f542b24e86cc62653', '64f62a4f542b24e86cc62653'],
  })
  @IsNotEmpty()
  @IsString()
  _id: string;

  @ApiProperty({
    description: 'User id whose the workout is',
    examples: ['64f62a4f542b24e86cc62653', '64f62a4f542b24e86cc62653'],
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

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

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray } from 'class-validator';
import { Exercise } from '../schemas/exercise.schema';

export class UpdateExercisesDto {
  @ApiProperty({
    description: 'An array of exercises',
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

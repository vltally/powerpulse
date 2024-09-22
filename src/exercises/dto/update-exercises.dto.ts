import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateExercisesDto {
  @ApiProperty({
    description: 'Training ID',
    example: '64f62a4f542b24e86cc62653',
  })
  @IsNotEmpty()
  @IsString()
  trainingId: string;
}

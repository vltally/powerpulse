import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateTrainingDto {
  constructor() {}

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  exercisesId: string[];
}

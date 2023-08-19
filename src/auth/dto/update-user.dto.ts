import { IsArray, IsEmail, IsString, IsUrl, MinLength } from 'class-validator';
import { Training } from 'src/excercises/schemas/training.schema';

export class UpdateUserDto {
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsString()
  @IsUrl()
  image: string;

  @IsArray()
  exercises: Training[];
}

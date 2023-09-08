import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString, IsUrl, MinLength } from 'class-validator';
import { Training } from 'src/excercises/schemas/training.schema';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Email of the user',
    examples: ['alex@gmail.com', 'vitaliy@ukr.net', 'artempaliy@gmail.com'],
  })
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    examples: ['12312asdfas', 'afadsf3213', '1sd1321asd1'],
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Name of the user',
    examples: ['Alex', 'Kiryl', 'Viktor'],
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User`s icon',
    examples: [
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.simplilearn.com%2Fimage-processing-article&psig=AOvVaw3zwyhZwbOgAUOcKCn8yqqT&ust=1694288963687000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMDf6O7jm4EDFQAAAAAdAAAAABAE',
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&psig=AOvVaw3zwyhZwbOgAUOcKCn8yqqT&ust=1694288963687000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMDf6O7jm4EDFQAAAAAdAAAAABAI',
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.seiu1000.org%2Fpost%2Fimage-dimensions&psig=AOvVaw3zwyhZwbOgAUOcKCn8yqqT&ust=1694288963687000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMDf6O7jm4EDFQAAAAAdAAAAABAR',
    ],
  })
  @IsString()
  @IsUrl()
  image: string;

  @IsArray()
  exercises: Training[];
}

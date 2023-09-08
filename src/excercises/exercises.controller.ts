import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import JwtAccessGuard from 'src/auth/guards/JwtAccessGuard.guard';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { CreateTrainingDto } from './dto/create-training.dto';
import { ExercisesService } from './exercises.service';
import { Exercise } from './schemas/exercise.schema';
import { Training } from './schemas/training.schema';

@ApiSecurity('Access-JWT-auth')
@Controller('exercises')
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) {}

  // @Get()
  // async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
  //   return this.bookService.findAll(query);
  // }

  @ApiTags('Training')
  @Get('users/training/:id')
  @UseGuards(JwtAccessGuard)
  async getTraining(@Param('id') id: string): Promise<Training> {
    return this.exercisesService.findById(id);
  }

  @ApiTags('Training')
  @Delete('users/training/:id')
  @UseGuards(JwtAccessGuard)
  async deleteTraining(
    @Param('id') trainingId: string,
    @Req() req,
  ): Promise<Training> {
    return this.exercisesService.deleteTraining(trainingId, req.user);
  }

  @ApiTags('Exercise')
  @Post('createExercise')
  @UseGuards(JwtAccessGuard)
  async createExercise(
    @Body() exercise: CreateExerciseDto,
    @Req() req,
  ): Promise<Exercise> {
    return this.exercisesService.createExercise(exercise, req.user);
  }

  @ApiTags('Exercise')
  @Patch('increaseExercise/:id')
  @UseGuards(JwtAccessGuard)
  async increaseExercise(
    @Param('id') exerciseId: string,
    @Req() req,
  ): Promise<Exercise> {
    return this.exercisesService.increaseExercise(exerciseId, req.user);
  }

  @ApiTags('Exercise')
  @Patch('decreaseExercise/:id')
  @UseGuards(JwtAccessGuard)
  async decreaseExercise(
    @Param('id') exerciseId: string,
    @Req() req,
  ): Promise<Exercise> {
    return this.exercisesService.decreaseExercise(exerciseId, req.user);
  }

  @ApiTags('Training')
  @Post('createTraining')
  @UseGuards(JwtAccessGuard)
  async createTraining(
    @Body() training: CreateTrainingDto,
    @Req() req,
  ): Promise<Training> {
    return this.exercisesService.createTraining(training, req.user);
  }

  @ApiTags('Exercise')
  @Get('users/')
  @UseGuards(JwtAccessGuard)
  async getUserExercises(@Req() req): Promise<Exercise[]> {
    return this.exercisesService.getUserExercises(req.user);
  }

  @ApiTags('Training')
  @Get('users/training')
  @UseGuards(JwtAccessGuard)
  async getUserTrainings(@Req() req): Promise<Training[]> {
    return this.exercisesService.getUserTrainings(req.user);
  }

  // @Post()
  // @UseGuards(JwtAccessGuard)
  // async createTraining(
  //   @Body() exercise: CreateExerciseDsto,
  //   @Req() req,
  // ): Promise<Exercise> {
  //   return this.exercisesService.createTraining(exercise);
  // }

  // @Post()
  // @UseGuards(JwtAccessGuard)
  // async createBook(@Body() book: CreateBookDto, @Req() req): Promise<Book> {
  //   console.log(req.user);
  //   return this.bookService.create(book, req.user);
  // }

  // @Put(':id')
  // async updateBook(
  //   @Param('id') id: string,
  //   @Body() book: UpdateBookDto,
  // ): Promise<Book> {
  //   return this.bookService.updateById(id, book);
  // }

  // @Delete(':id')
  // async deleteBook(@Param('id') id: string): Promise<Book> {
  //   return this.bookService.deleteById(id);
  // }
}

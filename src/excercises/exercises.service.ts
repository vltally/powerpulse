import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { CreateTrainingDto } from './dto/create-training.dto';
import { Exercise } from './schemas/exercise.schema';
import { Training } from './schemas/training.schema';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel(Training.name)
    private trainingModel: mongoose.Model<Training>,
    @InjectModel(Exercise.name)
    private exerciseModel: mongoose.Model<Exercise>,
  ) {}

  async findById(id: string): Promise<Training> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id');
    }

    const training = await this.trainingModel
      .findById(id)
      .populate('exercisesId');

    if (!training) {
      throw new NotFoundException('Training not found');
    }

    return training;
  }

  async deleteTraining(trainingId: string, user: User): Promise<Training> {
    const isValidId = mongoose.isValidObjectId(trainingId);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id');
    }

    const deletedTraining = await this.trainingModel
      .findByIdAndDelete(trainingId)
      .where('userId')
      .equals(user._id);

    if (!deletedTraining) {
      throw new NotFoundException('Training not found');
    }

    return deletedTraining;
  }

  async createExercise(
    exercise: CreateExerciseDto,
    user: User,
  ): Promise<Exercise> {
    const userId = user._id;
    const data = { ...exercise, userId };
    const res = await this.exerciseModel.create(data);
    return res;
  }

  async getUserExercises(user: User): Promise<Exercise[]> {
    const exercises: Exercise[] = await this.exerciseModel.find({
      userId: user._id,
    });
    return exercises;
  }

  async createTraining(
    training: CreateTrainingDto,
    user: User,
  ): Promise<Training> {
    const validExerciseIds = training.exercisesId.filter((id) =>
      mongoose.isValidObjectId(id),
    );
    if (validExerciseIds.length !== training.exercisesId.length) {
      throw new BadRequestException('Some exercise Ids are invalid.');
    }
    const data = { userId: user._id, ...training };
    const res = await this.trainingModel.create(data);
    return res;
  }

  async getUserTrainings(user: User): Promise<Training[]> {
    const trainings: Training[] = await this.trainingModel
      .find({
        userId: user._id,
      })
      .populate('exercisesId');
    return trainings;
  }

  async increaseExercise(exerciseId: string, user: User): Promise<Exercise> {
    const isValidId = mongoose.isValidObjectId(exerciseId);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id');
    }

    const exercise = await this.exerciseModel
      .findById(exerciseId)
      .where('userId')
      .equals(user._id);

    console.log(exercise);
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    if (exercise.count >= exercise.maxCount) {
      exercise.count = exercise.minCount;
      exercise.weight += exercise.weightUp;
    } else exercise.count += exercise.countUp;

    await exercise.save();

    console.log(exercise);
    return exercise;
  }
}

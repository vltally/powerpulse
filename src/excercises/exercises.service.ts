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
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
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

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    if (exercise.count >= exercise.maxCount) {
      exercise.count = exercise.minCount;
      exercise.weight += exercise.weightUp;
    } else exercise.count += exercise.countUp;

    await exercise.save();

    return exercise;
  }

  async decreaseExercise(exerciseId: string, user: User): Promise<Exercise> {
    const isValidId = mongoose.isValidObjectId(exerciseId);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id');
    }

    const exercise = await this.exerciseModel
      .findById(exerciseId)
      .where('userId')
      .equals(user._id);

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    if (exercise.count <= exercise.minCount) {
      exercise.count = exercise.maxCount;

      if (exercise.weight - exercise.weightUp <= 0) {
        exercise.weight = 1;
      } else exercise.weight -= exercise.weightUp;
    } else exercise.count -= exercise.countUp;

    await exercise.save();

    return exercise;
  }

  async deleteExercise(exerciseId: string, user: User): Promise<Exercise> {
    const exercise = await this.exerciseModel.findById(exerciseId);

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    if (exercise.userId.toString() !== user._id.toString()) {
      throw new BadRequestException('Not user`s exercise');
    }

    const trainings = await this.trainingModel.find({
      exercisesId: { $in: [exerciseId] },
      userId: user._id,
    });

    if (trainings || trainings.length !== 0) {
      for (const training of trainings) {
        const exerciseIndex = training.exercisesId.indexOf(exerciseId);

        if (exerciseIndex !== -1) {
          training.exercisesId.splice(exerciseIndex, 1);
          await training.save();
        }
      }
    }

    await this.exerciseModel.findByIdAndDelete(exerciseId);

    return exercise;
  }

  async updateExercise(updateExerciseDto: UpdateExerciseDto, user: User) {
    const exercise = await this.exerciseModel.findById(updateExerciseDto._id);
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    if (exercise.userId.toString() !== user._id.toString()) {
      throw new BadRequestException('Not user`s exercise');
    }

    exercise.count = updateExerciseDto.count;
    exercise.minCount = updateExerciseDto.minCount;
    exercise.maxCount = updateExerciseDto.maxCount;
    exercise.countUp = updateExerciseDto.countUp;
    exercise.weight = updateExerciseDto.weight;
    exercise.weightUp = updateExerciseDto.weightUp;
    exercise.name = updateExerciseDto.name;

    await exercise.save();
  }

  async updateTraining(
    updateTrainingDto: UpdateTrainingDto,
    user: User,
  ): Promise<void> {
    const training = await this.trainingModel.findById(updateTrainingDto._id);
    if (!training) {
      throw new NotFoundException('Workout not found');
    }
    if (training.userId.toString() !== user._id.toString()) {
      throw new BadRequestException('Not user`s workout');
    }

    if (updateTrainingDto.exercisesId.length !== 0) {
      const validExercises = await this.exerciseModel.find({
        _id: { $in: updateTrainingDto.exercisesId },
      });

      if (validExercises.length < updateTrainingDto.exercisesId.length) {
        throw new BadRequestException(
          'Some of the id`s are incorrect, or duplicated',
        );
      }
    }

    try {
      training.name = updateTrainingDto.name;
      training.exercisesId = updateTrainingDto.exercisesId;
      await training.save();
    } catch {
      throw new BadRequestException('Exercise id validation failed');
    }
  }

  async updateExercises(
    exercisesId: string[],
    user: User,
  ): Promise<Exercise[]> {
    let exercises: Exercise[];
    if (exercisesId.length !== 0) {
      exercises = await this.exerciseModel.find({
        _id: { $in: exercisesId },
        userId: user._id,
      });

      if (exercises.length < exercisesId.length) {
        throw new BadRequestException(
          'Some of the id`s are incorrect, or duplicated',
        );
      }
    }
    try {
      for (let i = 0; i < exercises.length; i++) {
        if (exercises[i].count >= exercises[i].maxCount) {
          exercises[i].count = exercises[i].minCount;
          exercises[i].weight += exercises[i].weightUp;
        } else exercises[i].count += exercises[i].countUp;

        await exercises[i].save();
      }
      return exercises;
    } catch {
      throw new BadRequestException('Exercise id validation failed');
    }
  }

  // async increaseExercise(exerciseId: string, user: User): Promise<Exercise> {
  //   const isValidId = mongoose.isValidObjectId(exerciseId);

  //   if (!isValidId) {
  //     throw new BadRequestException('Please enter correct id');
  //   }

  //   const exercise = await this.exerciseModel
  //     .findById(exerciseId)
  //     .where('userId')
  //     .equals(user._id);

  //   if (!exercise) {
  //     throw new NotFoundException('Exercise not found');
  //   }

  //   if (exercise.count >= exercise.maxCount) {
  //     exercise.count = exercise.minCount;
  //     exercise.weight += exercise.weightUp;
  //   } else exercise.count += exercise.countUp;

  //   await exercise.save();

  //   return exercise;
  // }
}

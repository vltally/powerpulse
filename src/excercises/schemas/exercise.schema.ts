import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Exercise extends Document {
  @Prop()
  name: string;

  @Prop()
  weight: number;

  @Prop()
  count: number;

  @Prop()
  minCount: number;

  @Prop()
  maxCount: number;

  @Prop()
  countUp: number;

  @Prop()
  weightUp: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);

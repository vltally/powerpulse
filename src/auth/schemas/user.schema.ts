import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Training } from 'src/excercises/schemas/training.schema';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  image: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Training' }])
  trainings: Training[];
}

export const UserSchema = SchemaFactory.createForClass(User);

import mongoose, { Schema, Document } from 'mongoose';

export interface IPerson extends Document {
  name: string;
  nickname?: string;
  dateOfBirth?: Date;
  dateOfDeath?: Date;
  gender?: string;
  generation?: number;
  birthPlace?: string;
  hometown?: string;
  occupation?: string;
  parentId?: mongoose.Types.ObjectId;
  spouseIds?: mongoose.Types.ObjectId[];
  childrenIds?: mongoose.Types.ObjectId[];
  siblings?: mongoose.Types.ObjectId[];
  photo?: string;
  bio?: string;
  notes?: string;
  isAlive?: boolean;
  // Contact Information
  phoneNumber?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PersonSchema = new Schema<IPerson>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nickname: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    dateOfDeath: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    generation: {
      type: Number,
    },
    birthPlace: {
      type: String,
    },
    hometown: {
      type: String,
    },
    occupation: {
      type: String,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Person',
    },
    spouseIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Person',
      },
    ],
    childrenIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Person',
      },
    ],
    siblings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Person',
      },
    ],
    photo: {
      type: String,
    },
    bio: {
      type: String,
    },
    notes: {
      type: String,
    },
    isAlive: {
      type: Boolean,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Person = mongoose.model<IPerson>('Person', PersonSchema);

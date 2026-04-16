import mongoose, { Schema, Document } from 'mongoose';

export interface IFamilyTree extends Document {
  rootPersonId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const FamilyTreeSchema = new Schema<IFamilyTree>(
  {
    rootPersonId: {
      type: Schema.Types.ObjectId,
      ref: 'Person',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Person',
      },
    ],
  },
  { timestamps: true }
);

export const FamilyTree = mongoose.model<IFamilyTree>('FamilyTree', FamilyTreeSchema);

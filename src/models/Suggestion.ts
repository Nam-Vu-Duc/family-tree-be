import mongoose, { Schema, Document } from 'mongoose';

export interface ISuggestion extends Document {
  senderName: string;
  senderContact: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const SuggestionSchema = new Schema<ISuggestion>(
  {
    senderName: {
      type: String,
      required: true,
      trim: true,
    },
    senderContact: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Suggestion = mongoose.model<ISuggestion>('Suggestion', SuggestionSchema);

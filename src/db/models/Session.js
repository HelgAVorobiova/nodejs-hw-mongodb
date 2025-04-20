import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const sessionShema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);
sessionShema.post('save', handleSaveError);
sessionShema.pre('findOneAndUpdate', setUpdateSettings);
sessionShema.post('findOneAndUpdate', handleSaveError);

const SessionCollection = model('session', sessionShema);
export default SessionCollection;
import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';
import { emailRegexp } from '../../constants/auth.js';

const userShema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);
userShema.post('save', handleSaveError);
userShema.pre('findByIdAndUpdate', setUpdateSettings);
userShema.post('findByIdAndUpdate', handleSaveError);

const UsersCollection = model('users', userShema);
export default UsersCollection;

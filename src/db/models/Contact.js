import { Schema, model } from 'mongoose';
import { contactTypeList } from "../../constants/contacts.js";
import { handleSaveError, setUpdateSettings } from './hooks.js';
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: true,
    },
    contactType: {
      type: String,
      enum: contactTypeList,
      required: true,
      default: contactTypeList[2],
    },
  },
  { versionKey: false, timestamps: true },
);
contactSchema.post("save", handleSaveError);
contactSchema.pre('findByIdAndUpdate', setUpdateSettings);
contactSchema.post('findByIdAndUpdate', handleSaveError);
export const contactSortFields = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];

const ContactCollection = model('contact', contactSchema);

export default ContactCollection;

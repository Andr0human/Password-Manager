import { Schema } from 'mongoose';
import { ICredential, IHash } from '../entities';

const hashSchema: Schema<IHash> = new Schema<IHash>(
  {
    iv: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false },
);
const credentialSchema: Schema<ICredential> = new Schema<ICredential>(
  {
    websiteName: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    username: { type: String },
    email: {
      type: String,
      validate: {
        validator() {
          return !!(this.username || this.email);
        },
        message: 'At least one of `username` or `email` is required.',
      },
    },
    password: { type: hashSchema, required: true },
  },
  { timestamps: true },
);

export default credentialSchema;

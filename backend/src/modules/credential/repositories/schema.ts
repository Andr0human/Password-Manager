import { Schema } from 'mongoose';
import { ICredential } from '../entities';

const credentialSchema: Schema<ICredential> = new Schema<ICredential>(
  {
    websiteName: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    username: { type: String },
    email: {
      type: String,
      validate: {
        validator: function () {
          return !!(this.username || this.email);
        },
        message: 'At least one of `username` or `email` is required.',
      },
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default credentialSchema;

import { model, Model } from 'mongoose';
import { ICredential } from '../entities';
import credentialSchema from './schema';

const credentialModel: Model<ICredential> = model<ICredential>('Credential', credentialSchema);

export default credentialModel;

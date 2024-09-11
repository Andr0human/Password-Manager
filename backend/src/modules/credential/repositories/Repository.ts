import { BaseRepository } from '../../../lib/base';
import { ICredential } from '../entities'
import credentialModel from './model';

class CredentialRepository extends BaseRepository<ICredential> {
  constructor() {
    super(credentialModel);
  }

  create = async (credential: ICredential): Promise<ICredential | null> => {
    const result: ICredential | null = await this.createOne(credential);
    return result;
  };

  update = async (id: string, newData: ICredential): Promise<ICredential | null> => {
    const result: ICredential | null = await this.model.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    return result;
  };
}

export default CredentialRepository;
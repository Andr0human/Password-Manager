import bcrypt from 'bcrypt';
import { ICredential } from './entities';
import CredentialRepository from './repositories/Repository';

class CredentialService {
  credRepository: CredentialRepository;

  constructor() {
    this.credRepository = new CredentialRepository();
  }

  getById = async (credId: string, fields: string): Promise<ICredential | null> => {
    const result: ICredential | null = await this.credRepository.getById(credId, fields);
    return result;
  };

  updateById = async (jobId: string, newData: ICredential): Promise<ICredential | null> => {
    const result: ICredential | null = await this.credRepository.update(jobId, newData);
    return result;
  };

  getAll = async (page: number, limit: number): Promise<ICredential[] | null> => {
    const result: ICredential[] | null = await this.credRepository.findAll(
      {},
      '-createdBy',
      '-__v',
      page,
      limit
    );
    return result;
  };

  create = async (cred: ICredential): Promise<ICredential | null> => {
    // Hash password before storing in DB
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(cred.password, salt);

    const result: ICredential | null = await this.credRepository.create({
      ...cred,
      password: hashedPassword,
    });
    return result;
  };

  deleteById = async (id: string): Promise<void> => {
    await this.credRepository.deleteById(id);
  };

  deleteAll = async (): Promise<void> => {
    await this.credRepository.deleteAll();
  };
}

export default CredentialService;

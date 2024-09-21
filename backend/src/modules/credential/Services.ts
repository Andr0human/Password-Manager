import {
  Cipher, createCipheriv, createDecipheriv, Decipher, randomBytes,
} from 'crypto';
import { serverConfig } from '../../config';
import { ICreateRequest, ICredential, IHash } from './entities';
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
      limit,
    );
    return result;
  };

  create = async (cred: ICreateRequest): Promise<ICreateRequest> => {
    // Hash password before storing in DB
    const encryptedHash: IHash = CredentialService.encrypt(cred.password);

    await this.credRepository.create({
      ...cred,
      password: encryptedHash,
    });

    return cred;
  };

  deleteById = async (id: string): Promise<void> => {
    await this.credRepository.deleteById(id);
  };

  deleteAll = async (): Promise<void> => {
    await this.credRepository.deleteAll();
  };

  static encrypt = (text: string): IHash => {
    const iv: Buffer = randomBytes(16);
    const { cryptoAlgorithm, cryptoSecretKey } = serverConfig;

    const cipher: Cipher = createCipheriv(cryptoAlgorithm, cryptoSecretKey, iv);

    const encrypted: Buffer = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex'),
    };
  };

  static decrypt = (hash: IHash): string => {
    const { cryptoAlgorithm, cryptoSecretKey } = serverConfig;

    const decipher: Decipher = createDecipheriv(
      cryptoAlgorithm,
      cryptoSecretKey,
      Buffer.from(hash.iv, 'hex'),
    );

    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(hash.content, 'hex')),
      decipher.final(),
    ]);

    return decrpyted.toString();
  };
}

export default CredentialService;

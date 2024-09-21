import { IBase } from '../../../lib/base';
import IHash from './IHash';

interface ICredential extends IBase {
  websiteName: string;
  websiteUrl: string;
  username?: string;
  email?: string;
  password: IHash;
}

export default ICredential;

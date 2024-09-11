import { IBase } from '../../../lib/base';

interface ICredential extends IBase {
  websiteName: string;
  websiteUrl: string;
  username?: string;
  email?: string;
  password: string;
}

export default ICredential;

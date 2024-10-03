interface ICreateRequest {
  websiteName: string;
  websiteUrl: string;
  username?: string;
  email?: string;
  password: string;
}

export default ICreateRequest;

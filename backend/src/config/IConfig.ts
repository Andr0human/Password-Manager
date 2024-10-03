interface IServerConfig {
  devMode: string;
  port: number;
  jwtSecret: string;
  mongoUrl: string;
  morganLogLevel: string;
  cryptoAlgorithm: string;
  cryptoSecretKey: string;
}

export default IServerConfig;

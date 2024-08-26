interface IServerConfig {
  devMode: string;
  port: number;
  jwtSecret: string;
  mongoUrl: string;
  morganLogLevel: string;
}

export default IServerConfig;

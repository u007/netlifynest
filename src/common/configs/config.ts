import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: +(process.env.PORT || '3000'),
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'VitaHealth Api',
    description: '',
    version: '1.0',
    path: '',
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
  },
  security: {
    expiresIn: '90d',
    refreshIn: '40d',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;

import { bootstrapServerless } from './../../src/bootstrap.nest';

let server;
export const handler = async (event, context, callback) => {
  server = server ?? (await bootstrapServerless());
  return server(event, context, callback);
};


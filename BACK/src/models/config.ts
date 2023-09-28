export type Auth = {
  login: string;
  password: string;
  jwtSecret: string;
  jwtExpirate: string;
}

export type Database = {
  host: string;
  user: string;
  password: string;
  databaseName: string;
}

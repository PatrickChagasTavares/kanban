declare global {
  namespace NodeJS {
    interface ProcessEnv {

      PORT: number;
      /**
       * Credencial to sign
       */
      AUTH_USER: string;
      AUTH_PASS: string

      /**
       * jwt roles
       */
      JWT_SECRET: string
      JWT_EXPIRATION: string

      /**
       *
       * Envs of Database
       * */
      DATABASE_HOST: string
      DATABASE_USER: string
      DATABASE_PASSWORD: string
      DATABASE_NAME: string
    }
  }
}

export { };

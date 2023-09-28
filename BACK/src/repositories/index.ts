import { Sequelize } from "sequelize";
import { Database } from "@models/config";
import { Card } from "@models/card";
import CardRepository from "./card";


export interface IRepository {
  card: ICardRepository
}

export interface ICardRepository {
  Create(card: Card): Promise<Card>
  Update(card: Card): Promise<number>
  Find(): Promise<Card[]>
  FindOne(cardID: string): Promise<Card | null>
  Delete(cardID: string): Promise<void>
}


const initSequelize = (config: Database): Sequelize => {
  return new Sequelize({
    dialect: "postgres",
    host: config.host,
    username: config.user,
    password: config.password,
    database: config.databaseName,
    define: {
      timestamps: true,
      underscored: true,
    }

  });
}

export const initRepositories = (configDB: Database): IRepository => {
  const sequelize = initSequelize(configDB)

  sequelize
    .authenticate()
    .then(() => {
      console.log('Conexão com o PostgreSQL estabelecida com sucesso.');
    })
    .catch((error) => {
      console.error('Erro ao conectar com o PostgreSQL:', error);
    });

  return { card: new CardRepository(sequelize) }
}

import { Card } from "@models/card";
import { ICardRepository } from "@repositories/index";
import { DataTypes, Model, Sequelize } from "sequelize";


class CardModel extends Model<Card> { }

class CardRepository implements ICardRepository {
  constructor(sequelize: Sequelize) {
    CardModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        titulo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        conteudo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lista: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Card',
      }
    );
    CardModel.sync()
  }

  async Create(card: Card): Promise<Card> {
    const createdCard = await CardModel.create(card);
    return createdCard.toJSON() as Card;
  }

  async Update(card: Card): Promise<number> {
    const [updatedCard] = await CardModel.update(card, {
      where: { id: card.id },
      returning: true,
    });
    return updatedCard;
  }

  async Find(): Promise<Card[]> {
    const cards = await CardModel.findAll();
    return cards.map((card) => card.toJSON()) as Card[];
  }

  async FindOne(cardID: string): Promise<Card | null> {
    const card = await CardModel.findOne({
      where: { id: cardID }
    });

    if (card === null) {
      return null
    }
    return card?.toJSON() as Card
  }

  async Delete(cardID: string): Promise<void> {
    await CardModel.destroy({ where: { id: cardID } });
  }
}

export default CardRepository;

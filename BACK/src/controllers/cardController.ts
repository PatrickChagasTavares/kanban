import { Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid';


import { Card, validateCard } from "@models/card"
import AppError from "@models/error"
import { IRepository } from "@repositories";

export interface Icard {
  Create(req: Request, res: Response): Promise<void>
  Find(req: Request, res: Response): Promise<void>
  Update(req: Request, res: Response): Promise<void>
  Delete(req: Request, res: Response): Promise<void>
}

class CardController implements Icard {
  private repo: IRepository

  constructor(repo: IRepository) {
    this.repo = repo
  }

  private preCreateCard(card: Card): Card {
    const newCard: Card = {
      id: uuidv4(),
      titulo: card.titulo,
      conteudo: card.conteudo,
      lista: card.lista,
    };
    return newCard;
  }

  private isUUID(input: string): boolean {
    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidPattern.test(input);
  }

  public Create = async (req: Request, res: Response): Promise<void> => {
    try {
      let card: Card = req.body

      if (!validateCard(card)) {
        res.status(400).json({ message: "input is invalid" })
        return
      }

      card = await this.repo.card.Create(this.preCreateCard(card))

      res.status(201).json(card)

    } catch (error) {
      const err = new AppError(500, "failed to create card")
      throw err
    }

  }

  public Find = async (req: Request, res: Response): Promise<void> => {
    try {

      const cards = await this.repo.card.Find()
      res.status(200).json(cards)

    } catch (error) {
      const err = new AppError(500, "failed to find cards")
      throw err
    }
  }

  public Update = async (req: Request, res: Response): Promise<void> => {
    try {
      const card: Card = req.body
      card.id = req.params.id

      if (!this.isUUID(card.id)) {
        res.status(400).json({ message: "id is invalid" })
        return
      }

      if (!validateCard(card)) {
        res.status(400).json({ message: "input is invalid" })
        return
      }

      const updated = await this.repo.card.Update(card)
      if (updated < 1) {
        res.status(500).json({ message: "failed to update card", details: card })
        return
      }

      res.status(200).json(card)

    } catch (error) {
      const err = new AppError(500, "failed to create card")
      throw err
    }
  }

  public Delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const cardID = req.params.id

      if (!this.isUUID(cardID)) {
        res.status(400).json({ message: "id is invalid" })
        return
      }

      const card = await this.repo.card.FindOne(cardID)
      if (card === null) {
        res.status(404).json({ message: "card not found", details: "card_id:" + cardID })
        return
      }

      await this.repo.card.Delete(cardID)

      const cards = await this.repo.card.Find()

      res.status(200).json(cards)

    } catch (error) {
      const err = new AppError(500, "failed to create card")
      throw err
    }
  }

}

export default CardController;

const cardService = require('../services/card.service');

class CardController {
  async getAllCards(req, res, next) {
    try {
      const allCards = await cardService.getAllCards();

      res.status(200).json(allCards);
    } catch (error) {
      next(error);
    }
  }

  async createCard(req, res, next) {
    try {
      const card = await cardService.createCard(req.body);
      res.status(201).json(card);
    } catch (error) {
      next(error);
    }
  }

  async deleteCard(req, res, next) {
    try {
      const card = await cardService.deleteCard(req.params.id);
      res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const { body, params } = req;
      const card = await cardService.edit(body, params.id);

      res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CardController();

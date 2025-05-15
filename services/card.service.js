const { deleteCard } = require('../controllers/card.controller');
const cardModel = require('../models/card.model');

class CardServices {
  async getAllCards() {
    const cards = await cardModel.find();
    return cards;
  }

  async createCard(data) {
    const newCard = await cardModel.create(data);
    return newCard;
  }

  async deleteCard(id) {
    const card = await cardModel.findByIdAndDelete(id);
    return card;
  }
}

module.exports = new CardServices();

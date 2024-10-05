import ErrorHandler from "../middlewares/error.js";
import { Card } from "../models/cards.js";

export const newCard = async (req, res, next) => {
  try {
    const { title, description, link } = req.body;
    if (!title || !description || !link) {
      return next(new ErrorHandler("Enter the given fields", 400));
    }
    const card = await Card.create({
      title,
      description,
      link,
    });
    return res.json({
      status: "success",
      data: {
        card,
      },
    });
  } catch (e) {
    next(e);
  }
};
export const getSingleCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) {
      return next(new ErrorHandler("Card not found", 404));
    }
    return res.json({
      status: "success",
      data: {
        card,
      },
    });
  } catch (e) {
    next(e);
  }
};
export const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find();
    return res.json({
      status: "success",
      data: {
        cards,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const updateCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const { title, description, link } = req.body;
    const updateFields = {};

    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (link) updateFields.link = link;
    const card = await Card.updateOne(
      { _id: cardId },
      {
        $set: updateFields,
      }
    );
    return res.status(200).json({
      status: "success",
      message: "Card Update Successfully",
    });
  } catch (e) {
    next(e);
  }
};
export const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) return next(new ErrorHandler("card not found", 404));

    await card.deleteOne();

    return res.status(200).json({
      status: "success",
      message: "Card deleted successfully",
    });
  } catch (e) {
    next(e);
  }
};

import * as R from 'ramda'

const MSGS = {
  ADD_CARD: 'ADD_CARD',
  REMOVE_CARD: 'REMOVE_CARD',
  TOGGLE_SHOW_ANSWER: 'TOGGLE_SHOW_ANSWER',
  EDIT_MODE: 'EDIT_MODE',
  SAVE_CARD: 'SAVE_CARD',
  UPDATE_CARD_QUESTION: 'UPDATE_CARD_QUESTION',
  UPDATE_CARD_ANSWER: 'UPDATE_CARD_ANSWER',
}

export function addCardMsg(card) {
  return {
    type: MSGS.ADD_CARD,
    card,
  }
}

export function removeCardMsg(cardId) {
  return {
    type: MSGS.REMOVE_CARD,
    cardId,
  }
}

export function toggleShowAnswerMsg(cardId) {
  return {
    type: MSGS.TOGGLE_SHOW_ANSWER,
    cardId,
  }
}

export function editModeMsg(cardId) {
  return {
    type: MSGS.EDIT_MODE,
    cardId,
  }
}

export function saveCardMsg(card) {
  return {
    type: MSGS.SAVE_CARD,
    card,
  }
}

export function updateCardQuestionMsg(cardId, question) {
  return {
    type: MSGS.UPDATE_CARD_QUESTION,
    cardId,
    question,
  }
}

export function updateCardAnswerMsg(cardId, answer) {
  return {
    type: MSGS.UPDATE_CARD_ANSWER,
    cardId,
    answer,
  }
}

export default function update(msg, model) {
  switch (msg.type) {
    case MSGS.ADD_CARD: {
      const card = { ...msg.card, id: model.nextId, rank: 0, editMode: true, showAnswerMode: false }
      const cards = [card, ...model.cards]
      return { ...model, nextId: model.nextId + 1, cards }
    }
    case MSGS.REMOVE_CARD: {
      const cards = model.cards.filter(card => card.id !== msg.cardId)
      return { ...model, cards }
    }
    case MSGS.TOGGLE_SHOW_ANSWER: {
      const cards = model.cards.map(card => card.id === msg.cardId ? { ...card, showAnswerMode: !card.showAnswerMode } : card)
      return { ...model, cards }
    }
    case MSGS.EDIT_MODE: {
      const cards = model.cards.map(card => card.id === msg.cardId ? { ...card, editMode: true } : card)
      return { ...model, cards }
    }
    case MSGS.SAVE_CARD: {
      return model
    }
    case MSGS.UPDATE_CARD_QUESTION: {
      const { cardId, question } = msg
      const cards = model.cards.map(card => card.id === cardId ? { ...card, question } : card)
      return { ...model, cards }
    }
    case MSGS.UPDATE_CARD_ANSWER: {
      const { cardId, answer } = msg
      const cards = model.cards.map(card => card.id === cardId ? { ...card, answer } : card)
      return { ...model, cards }
    }
  }
  return model
}

export const sortCards = R.sortWith([
  R.ascend(R.prop('rank'))
])

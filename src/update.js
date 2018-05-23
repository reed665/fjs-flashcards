import * as R from 'ramda'

const MSGS = {
  ADD_CARD: 'ADD_CARD',
  REMOVE_CARD: 'REMOVE_CARD',
  TOGGLE_SHOW_ANSWER: 'TOGGLE_SHOW_ANSWER',
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
  }
  return model
}

export const sortCards = R.sortWith([
  R.ascend(R.prop('rank'))
])

import * as R from 'ramda'

const MSGS = {
  ADD_CARD: 'ADD_CARD',
  REMOVE_CARD: 'REMOVE_CARD',
  TOGGLE_SHOW_ANSWER: 'TOGGLE_SHOW_ANSWER',
  EDIT_MODE: 'EDIT_MODE',
  SAVE_CARD: 'SAVE_CARD',
  UPDATE_CARD_QUESTION: 'UPDATE_CARD_QUESTION',
  UPDATE_CARD_ANSWER: 'UPDATE_CARD_ANSWER',
  UPDATE_CARD_RANK: 'UPDATE_CARD_RANK',
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

export function saveCardMsg(cardId) {
  return {
    type: MSGS.SAVE_CARD,
    cardId,
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

export function updateCardRankMsg(cardId, feedback) {
  return {
    type: MSGS.UPDATE_CARD_RANK,
    cardId,
    feedback,
  }
}

const updateRank = (prevRank, feedback) => {
  switch (feedback) {
    case 'bad': return 0
    case 'good': return prevRank + 1
    case 'great': return prevRank + 2
  }
}

const addCard = (cards, card, toStart = true) => {
  return toStart
    ? [card, ...cards]
    : [...cards, card]
}

const removeCard = (cards, cardId) => cards.filter(card => card.id !== cardId)

const updateCard = (cards, cardId, update) => {
  return cards.map(card => {
    if (card.id !== cardId) return card
    if (typeof update === 'function') {
      return update(card)
    }
    return { ...card, ...update }
  })
}

export default function update(msg, model) {
  switch (msg.type) {
    case MSGS.ADD_CARD: {
      const card = { ...msg.card, id: model.nextId, rank: 0, editMode: true, showAnswerMode: false }
      const cards = addCard(model.cards, card)
      return { ...model, nextId: model.nextId + 1, cards }
    }
    case MSGS.REMOVE_CARD: {
      const cards = removeCard(model.cards, msg.cardId)
      return { ...model, cards }
    }
    case MSGS.TOGGLE_SHOW_ANSWER: {
      const cards = updateCard(model.cards, msg.cardId, card => ({ ...card, showAnswerMode: !card.showAnswerMode }))
      return { ...model, cards }
    }
    case MSGS.EDIT_MODE: {
      const cards = updateCard(model.cards, msg.cardId, { editMode: true })
      return { ...model, cards }
    }
    case MSGS.SAVE_CARD: {
      const cards = updateCard(model.cards, msg.cardId, { editMode: false })
      return { ...model, cards }
    }
    case MSGS.UPDATE_CARD_QUESTION: {
      const { cardId, question } = msg
      const cards = updateCard(model.cards, cardId, { question })
      return { ...model, cards }
    }
    case MSGS.UPDATE_CARD_ANSWER: {
      const { cardId, answer } = msg
      const cards = updateCard(model.cards, cardId, { answer })
      return { ...model, cards }
    }
    case MSGS.UPDATE_CARD_RANK: {
      const { cardId, feedback } = msg
      const cards = updateCard(model.cards, cardId, card => {
        const rank = updateRank(card.rank, feedback)
        return { ...card, rank, showAnswerMode: false }
      })
      return { ...model, cards }
    }
  }
  return model
}

export const sortCards = R.sortWith([
  R.ascend(R.prop('rank'))
])

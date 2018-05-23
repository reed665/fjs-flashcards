import * as R from 'ramda'

const MSGS = {
  ADD_CARD: 'ADD_CARD',
}

export function addCardMsg(card) {
  return {
    type: MSGS.ADD_CARD,
    card,
  }
}

export default function update(msg, model) {
  switch (msg.type) {
    case MSGS.ADD_CARD: {
      const card = { ...msg.card, id: model.nextId, rank: 0 }
      const cards = [ card, ...model.cards ]
      return { ...model, nextId: model.nextId + 1, cards }
    }
  }
  return model
}

export const sortCards = R.sortWith([
  R.ascend(R.prop('rank'))
])

import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'

const { div, h1, pre, a, i, span } = hh(h)

import { sortCards } from './update'

function addButton(dispatch) {
  return a({ className: 'f4 link dim ph3 pv2 mb3 ml2 dib white bg-green pointer'}, [
    i({ className: 'fa fa-plus mr2' }),
    span('Add Flashcard'),
  ])
}

function cardItem(dispatch, card) {
  return div({ className: 'bg-light-yellow relative shadow-4 w-30 pa3 ma2' }, [
    i({ className: 'fa fa-times black-60 absolute top-1 right-1 pointer dim' }),
    div({ className: 'f5 b underline mv1' }, 'Question'),
    div({ className: 'dim pointer' }, card.question),
    div({ className: 'f5 b underline mt3 mb1 pointer dim' }, 'Show Answer'),
    div(card.answer),
  ])
}

function cardList(dispatch, model) {
  const sorted = sortCards(model.cards)
  const cards = sorted.map(card => cardItem(dispatch, card))
  return div({ className: 'flex flex-wrap' }, cards)
}

export default function view(dispatch, model) {
  return div({ className: 'mw8 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Flashcards'),
    addButton(dispatch),
    cardList(dispatch, model),
    pre(JSON.stringify(model, null, 2)),
  ])
}

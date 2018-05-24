import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'

const { div, h1, pre, a, i, span, textarea, button } = hh(h)

import {
  sortCards,
  addCardMsg,
  removeCardMsg,
  toggleShowAnswerMsg,
  editModeMsg,
  saveCardMsg,
  updateCardQuestionMsg,
  updateCardAnswerMsg,
  updateCardRankMsg,
} from './update'

const saveDisabled = card => !card.question || !card.answer

function addButton(dispatch) {
  return a({
    className: 'f4 link dim ph3 pv2 mb3 ml2 dib white bg-green pointer',
    onclick: e => {
      const card = { question: '', answer: '' }
      dispatch(addCardMsg(card))
    },
  }, [
    i({ className: 'fa fa-plus mr2' }),
    span('Add Flashcard'),
  ])
}

function removeButton(dispatch, cardId) {
  return i({
    className: 'fa fa-times black-60 absolute top-1 right-1 pointer dim',
    onclick: e => dispatch(removeCardMsg(cardId))
  })
}

function saveButton(dispatch, card) {
  return button({
    className: 'f4 ph3 pv2 mt3',
    disabled: saveDisabled(card),
    onclick: e => dispatch(saveCardMsg(card.id)),
  }, 'Save')
}

function cardEditMode(dispatch, card) {
  return div({ className: 'bg-light-yellow relative shadow-4 w-30 pa3 ma2' }, [
    removeButton(dispatch, card.id),
    div({ className: 'f5 b underline mv1' }, 'Question'),
    textarea({
      rows: 5,
      autofocus: true,
      oninput: e => dispatch(updateCardQuestionMsg(card.id, e.target.value)),
    }, card.question),
    div({ className: 'f5 b underline mt3 mb1' }, 'Answer'),
    textarea({
      rows: 5,
      oninput: e => dispatch(updateCardAnswerMsg(card.id, e.target.value)),
    }, card.answer),
    saveButton(dispatch, card),
  ])
}

function answerBlock(dispatch, { answer, id: cardId }) {
  return div({
    className: 'flex flex-column',
  }, [
    answer,
    div({
      className: 'mt3 flex justify-between',
    }, [
      button({
        className: 'f4 pv1 ph3 bn br1 pointer dim white bg-red',
        onclick: e => dispatch(updateCardRankMsg(cardId, 'bad')),
      }, 'Bad'),
      button({
        className: 'f4 pv1 ph3 bn br1 pointer dim white bg-blue',
        onclick: e => dispatch(updateCardRankMsg(cardId, 'good')),
      }, 'Good'),
      button({
        className: 'f4 pv1 ph3 bn br1 pointer dim white bg-green',
        onclick: e => dispatch(updateCardRankMsg(cardId, 'great')),
      }, 'Great'),
    ])
  ])
}

function cardDefaultMode(dispatch, card) {
  return div({ className: 'bg-light-yellow relative shadow-4 w-30 pa3 ma2' }, [
    removeButton(dispatch, card.id),
    div({ className: 'f5 b underline mv1' }, 'Question'),
    div({
      className: 'dim pointer',
      onclick: e => dispatch(editModeMsg(card.id))
    }, card.question),
    div({
      className: 'f5 b underline mt3 mb1 pointer dim',
      onclick: e => dispatch(toggleShowAnswerMsg(card.id)),
    }, 'Show Answer'),
    card.showAnswerMode ? answerBlock(dispatch, card) : null,
  ])
}

function cardItem(dispatch, card) {
  if (card.editMode) {
    return cardEditMode(dispatch, card)
  }
  return cardDefaultMode(dispatch, card)
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
    // pre(JSON.stringify(model, null, 2)),
  ])
}

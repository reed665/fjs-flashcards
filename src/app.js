import { diff, patch } from 'virtual-dom'
import createElement from 'virtual-dom/create-element'

export default function app(initModel, update, view, el) {
  let model = { ...initModel }
  let currentView = view(dispatch, model)
  let rootNode = createElement(currentView)
  el.appendChild(rootNode)

  function dispatch(msg) {
    model = update(msg, model)
    const updatedView = view(dispatch, model)
    const patches = diff(currentView, updatedView)
    rootNode = patch(rootNode, patches)
    currentView = updatedView
  }
}

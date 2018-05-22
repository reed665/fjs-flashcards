import app from './app'
import model from './model'
import update from './update'
import view from './view'

const appEl = document.getElementById('app')

app(model, update, view, appEl)

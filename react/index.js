import React from 'react'
import { render } from 'react-dom'
import App from './App.js';
import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { Provider } from 'react-redux'

let initialState = {
  selected: '0',
  playing: false,
  interval: null,
  file: "https://cdn.glitch.com/2ac0ddc9-234b-4e35-8332-f2685f8adf53%2Fjanet.wav?1493346567821",
  chase: 'off',
  flats: 0,
  touched: false
}

const SELECT_CELL = 'SELECT_CELL'
const SET_BUFFER = 'SET_BUFFER'
const START_STOP = 'START_STOP'
const TOCK = 'TOCK'
const SET_CLOCK = 'SET_CLOCK'
const SET_FILE = 'SET_FILE'
const TOGGLE_CHASE = 'TOGGLE_CHASE'
const SET_FLATS = 'SET_FLATS'
const TOUCH = 'TOUCH'

export function selectCell(selected){
  return {
    type: SELECT_CELL,
    selected
  }
}

export function setBuffer(buffer, player, env) {
  return {
    type: SET_BUFFER,
    buffer,
    player,
    env,
    duration: buffer.duration,
    interval: buffer.duration/16
  }
}

export function startStop(playing) {
  return {
    type: START_STOP,
    playing,
    activeCell: null
  }
}

export function tock(current) {
  return {
    type: TOCK,
    activeCell: current
  }
}

export function setClock(clock) {
  return {
    type: SET_CLOCK,
    clock
  }
}

export function setFile(file) {
  return {
    type: SET_FILE,
    file
  }
}

export function toggleChase(chase) {
  return {
    type: TOGGLE_CHASE,
    chase
  }
}

export function setFlats(flats) {
  return {
    type: SET_FLATS,
    flats
  }
}

export function touch(bool) {
  return {
    type: TOUCH,
    touched: bool
  }
}

let reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case SELECT_CELL:
      newState.selected = action.selected
      break
    case SET_BUFFER:
      newState.buffer = action.buffer
      newState.player = action.player
      newState.duration = action.duration
      newState.interval = action.interval
      newState.env = action.env
      break
    case START_STOP:
      newState.playing = action.playing
      newState.activeCell = action.activeCell
      break
    case TOCK:
      newState.activeCell = action.activeCell
      break
    case SET_CLOCK:
      newState.clock = action.clock
      break
    case SET_FILE:
      newState.file = action.file
      break
    case TOGGLE_CHASE:
      newState.chase = action.chase
      break
    case SET_FLATS:
      newState.flats = action.flats
      break
    case TOUCH:
      newState.touched = action.touched
      break
    default:
      return newState 
  }
    console.log('ACTION>', action)
    console.log('STATE>', newState)
  return newState
}

let store = createStore(reducer, initialState, devToolsEnhancer())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

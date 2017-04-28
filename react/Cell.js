import React, { Component } from 'react'
import { connect } from 'react-redux'
import { store, selectCell } from './index.js'
import drawBuffer from 'draw-wave'
import Tone from 'tone'

class Cell extends Component {
  
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {}
  }
  
  handleClick(e) {
    this.props.clickCell(this.props.id)
  }
  
  componentWillReceiveProps (newProps) {
    let id = +this.props.id
    if (newProps.buffer !== this.props.buffer) {
      let cellSlice = [newProps.interval*id, newProps.interval*(id+1)]
      let cellBuffer = newProps.buffer.slice(...cellSlice)
      this.setState({
        cellBuffer
      })
      drawBuffer.canvas(document.querySelector(`#canvas-${this.props.id}`), cellBuffer, '#52F6A4');
    }
    // if (+newProps.selected === id && newProps.player) {
    //   newProps.player.seek(+newProps.interval*id)
    // }
  }
  
  render() {
    let selected = this.props.selected
    let activeCell = this.props.activeCell
    let buffer = this.props.buffer 
    let id = this.props.id
    let interval = this.props.interval
    let animationStyle = {animationDuration: interval+'s' }
    return (
     <p id={id} data-selected={selected === id} data-active={activeCell === id} style={animationStyle} onClick={this.handleClick}>
        <canvas id={'canvas-' + id}></canvas>
     </p>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    selected: state.selected,
    buffer: state.buffer,
    player: state.player,
    interval: state.interval,
    activeCell: state.activeCell
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clickCell: (selected) => dispatch(selectCell(selected))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell)
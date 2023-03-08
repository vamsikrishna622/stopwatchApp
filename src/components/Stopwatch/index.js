// Write your code here
import {Component} from 'react'

import './index.css'

class Stopwatch extends Component {
  state = {isTimerRunning: false, timeElapsedInSeconds: 0}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  resetTimer = () => {
    this.clearTimerInterval()
    this.setState({timeElapsedInSeconds: 0, isTimerRunning: false})
  }

  stopTimer = () => {
    this.clearTimerInterval()
    this.setState({isTimerRunning: false})
  }

  updateTime = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  startTimer = () => {
    this.intervalId = setInterval(this.updateTime, 1000)
    this.setState({isTimerRunning: true})
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds} = this.state
    const minutes = Math.floor(timeElapsedInSeconds / 60)
    const seconds = Math.floor(timeElapsedInSeconds - minutes * 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state

    return (
      <div className="app-container">
        <div className="stopwatch-container">
          <h1 className="heading">Stopwatch</h1>
          <div className="timer-container">
            <div className="timer">
              <img
                alt="stopwatch"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                className="timer-icon"
              />
              <p className="timer-text">Timer</p>
            </div>
            <h1 className="time">{this.getElapsedSecondsInTimeFormat()}</h1>
            <div className="button-container">
              <button
                type="button"
                className="button start-btn"
                onClick={this.startTimer}
                disabled={isTimerRunning}
              >
                Start
              </button>
              <button
                type="button"
                className="button stop-btn"
                onClick={this.stopTimer}
              >
                Stop
              </button>
              <button
                type="button"
                className="button reset-btn"
                onClick={this.resetTimer}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch

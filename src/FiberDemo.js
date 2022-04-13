import React, { startTransition } from "react";

import SierpinskiTriangle from './SierpinskiTriangle';

var containerStyle = {
  position: 'absolute',
  transformOrigin: '0 0',
  left: '50%',
  top: '50%',
  width: '10px',
  height: '10px',
  background: '#eee',
};

class FiberDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 0,
      useTimeSlicing: true,
    };
    this.tick = this.tick.bind(this);
    this.onTimeSlicingChange = this.onTimeSlicingChange.bind(this);
  }
  componentDidMount() {
    this.intervalID = setInterval(this.tick, 1000);
  }
  tick() {
    if (this.state.useTimeSlicing) {
      // Update is time-sliced.
      startTransition(() => {
        this.setState(state => ({ seconds: (state.seconds % 10) + 1 }));
      });
    } else {
      // Update is not time-sliced. Causes demo to stutter.
      this.setState(state => ({ seconds: (state.seconds % 10) + 1 }));
    }
  }
  onTimeSlicingChange(value) {
    this.setState(() => ({ useTimeSlicing: value }));
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  render() {
    const seconds = this.state.seconds;
    const elapsed = this.props.elapsed;
    const t = (elapsed / 1000) % 10;
    const scale = 1 + (t > 5 ? 10 - t : t) / 10;
    const transform = 'scaleX(' + (scale / 2.1) + ') scaleY(0.7) translateZ(0.1px)';
    
    return (
      <div>
        <div>
          <h3>Time-slicing</h3>
          <p>Toggle this and observe the effect</p>
          <Toggle
            onLabel="On"
            offLabel="Off"
            onChange={this.onTimeSlicingChange}
            value={this.state.useTimeSlicing}
          />
        </div>
        <div style={{ ...containerStyle, transform }}>
          <div>
            <SierpinskiTriangle x={0} y={0} s={1000}>
              {this.state.seconds}
            </SierpinskiTriangle>
          </div>
        </div>
      </div>
    );
  }
}

class Toggle extends React.Component {
  constructor(props) {
    super();
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    this.props.onChange(event.target.value === 'on');
  }
  render() {
    const value = this.props.value;
    return (
      <label onChange={this.onChange}>
        <label>
          {this.props.onLabel}
          <input type="radio" name="value" value="on" checked={value} />
        </label>
        <label>
          {this.props.offLabel}
          <input type="radio" name="value" value="off" checked={!value} />
        </label>
      </label>
    );
  }
}



export default FiberDemo;

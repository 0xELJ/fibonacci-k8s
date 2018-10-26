import React, { Component } from 'react';
import axios from 'axios';

class FibCalculator extends Component {
  state = { seeIndexes: [], values: {}, index: '' };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({ seenIndexes: seenIndexes.data });
  }

  async handleSubmit(event) {
    event.preventDefault();

    await axios.post('/api/values', { index: this.state.index });
    this.setState({ index: '' });
  }

  renderIndexHistory() {
    return this.state.seeIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const { values } = this.state;
    const entries = [];

    for(let key in values) {
      entries.push(<div key={key}><p>For index {key} I calculated {values[key]}</p></div>);
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Enter your index:</label>
          <input
            type="text"
            value={this.state.index}
            onChange={e => this.setState({ index: e.target.value })}
          />
          <button>Submit</button>
        </form>
        <h3>Index history:</h3>
        {this.renderIndexHistory()}
        <h3>Calculated values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default FibCalculator;

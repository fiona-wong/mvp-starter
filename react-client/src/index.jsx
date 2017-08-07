import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
import TOKEN from '../../config.js';
import ErrorPage from './components/Error.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: [],
      location: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
     location: event.target.value
    })
  }

  handleSubmit() {
    $.ajax({
      url: '/events',
      method: 'POST',
      data: {query: this.state.location},
      success: data => {
        data = JSON.parse(data)
        console.log(Array.isArray(data));
        if (Array.isArray(data)) {
          this.setState({
            events: data,
            location: ''
          })
        } else {
          this.setState({
            location: 'Please try again.'
          })
        }
      },
      error: err => {
        console.log('could not connect');
      }
    })
  }

  render () {
    return (<div>
      <h1>What's Happenin?</h1>
      <Search handleSubmit={this.handleSubmit} handleChange={this.handleChange} value={this.state.location}/>
      <List events={this.state.events} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
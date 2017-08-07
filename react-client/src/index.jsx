import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
import TOKEN from '../../config.js';

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
    //event.preventDefault();
    this.setState({
     location: event.target.value
    })

    console.log('changed', event.target.value);
  }

  handleSubmit() {
    $.ajax({
      url: '/events',
      method: 'POST',
      data: {query: this.state.location},
      success: data => {
        console.log(data);
        this.setState({
          events: JSON.parse(data)
        })
        console.log(this.state.events)
      },
      error: err => {
        console.log('could not connect');
      }
    })
    
    console.log('submitted', this.state.location)
  }



  // componentDidMount() {
  //   // $.ajax({
  //   //   url: '/events',
  //   //   success: (data) => {
  //   //     this.setState({
  //   //       items: data
  //   //     })
  //   //   },
  //   //   error: (err) => {
  //   //     console.log('err', err);
  //   //   }
  //   // });
  // $.ajax({
  //   url: `https://www.eventbriteapi.com/v3/events/search/`,
  //   method: 'GET',
  //   contentType: 'json',
  //   data: {
  //     sort_by: 'best',
  //     subcategories: '3008,3006,3014,3018',
  //     q: "San Diego"
  //   },
  //   success: response => {
  //     console.log(response);
  //   }
  // })

  // }

  render () {
    return (<div>
      <h1>What's Happenin?</h1>
      <Search handleSubmit={this.handleSubmit} handleChange={this.handleChange} value={this.state.location}/>
      <List events={this.state.events} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
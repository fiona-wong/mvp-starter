import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> Events: </h4>
    Here are the top {props.events.length} events:
    <ul>
    {props.events.map((item, index) => 
    	<ListItem key={index} item={item}/>
    )}
    </ul>
  </div>
)

export default List;
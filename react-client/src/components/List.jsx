import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> Events: </h4>
    10/10 would recommend:
    <ul>
    {props.events.map((item, index) => 
    	<ListItem key={index} item={item}/>
    )}
    </ul>
  </div>
)

export default List;
import React from 'react';

const ListItem = (props) => (
  <div>
    <li>
    {new Date(props.item.date).toString()}: 
    <a href={props.item.url}>{props.item.name}</a>

    </li>
  </div>
)

export default ListItem;
import React from 'react';

const Search = (props) => (
<div>
  <label>
    Location:
    <input type="text" value={props.value} onChange={props.handleChange} />
  </label>
  <input type="submit" value="Submit" onClick={props.handleSubmit}/>
  </div>
)

export default Search;
import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function LinkHeader (props) {
  return (
    <li>
      <Link to={props.to}>{props.text}</Link> 
    </li>
  );
}

export default LinkHeader ;
import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const LinkHeader = (props) => {
  return (
    <li>
        <Link to ={props.to} >{props.text}</Link>
    </li>
  )
}

export default LinkHeader
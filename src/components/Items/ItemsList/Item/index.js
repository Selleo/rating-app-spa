import React from 'react'
import { Link } from 'react-router-dom'

const Item = ({ item }) => (
  <div>
    <h1>{item.topic}</h1>
    <p>{item.description}</p>
    <em>
      {item.type}{' '}
      <strong>{item.duration} minutes</strong>
    </em>
    <p>
      <Link to={`/items/${item.id}/edit`}>
        Edit
      </Link>
    </p>
  </div>
);

export default Item;

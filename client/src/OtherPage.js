import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <h5>In some other page!</h5>
      <Link to="/">Go back home</Link>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
function Error() {
  return (
    <div>
      <h1>Uh oh, you went to a page that doesn't exist!</h1>
      <Link to="/">Click here to head back to the landing page.</Link>
    </div>
  );
}

export default Error;

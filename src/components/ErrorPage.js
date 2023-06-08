import React from "react";
//import reactRouteError
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="text-center">
      <h2 className="text-danger">{error.statusText}</h2>
      <p className="text-danger">{error.data}</p>
      <h3>No path Found</h3>
    </div>
  );
}

export default ErrorPage;

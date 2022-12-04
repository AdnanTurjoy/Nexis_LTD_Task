import { Navigate } from "react-router-dom";

function PrivateRoute({ token, children }) {
  //   if (token.access_token) {
  //     console.log("yes");
  //   } else {
  //     console.log("no");
  //   }
  //   console.log(token);

  return !token.access_token ? <Navigate to="/login" /> : children;
}

export default PrivateRoute;

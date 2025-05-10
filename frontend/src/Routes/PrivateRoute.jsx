import Cookies from "js-cookie";
import Login from "../Pages/Login";
const PrivateRoute = ({ children }) => {
  const token = Cookies.get("login_token");
  return !token ? <Login /> : children;
};

export default PrivateRoute;

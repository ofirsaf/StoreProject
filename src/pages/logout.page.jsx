import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { authActions } from "../redux/auth";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    history.push("/");
  }, []);
  return null;
};
export default LogoutPage;

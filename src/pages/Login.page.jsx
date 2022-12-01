import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import loginSchema from "../validation/login.validation";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { useHistory } from "react-router-dom";
import { authActions } from "../redux/auth";
import { useDispatch } from "react-redux";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enableBtn, setEnableBtn] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  useEffect(() => {
    if (location.state) {
      setEmail(location.state.email);
      setPassword(location.state.password);
    }
  }, []);
  useEffect(() => {
    if (password.length < 6) {
      setEnableBtn(false);
    } else {
      setEnableBtn(true);
    }
  }, [password]);
  const handleSumbit = (e) => {
    e.preventDefault();
    const validateValue = Joi.validate({ email, password }, loginSchema, {
      abortEarly: false,
    });
    const { error } = validateValue;
    if (error) {
      for (let item of error.details) {
        toast.error(item.message.replaceAll('"', ""));
      }
    } else {
      axios
        .post("/auth", {
          email: email,
          password: password,
        })
        .then((res) => {
          dispatch(authActions.login()); //update redux state
          dispatch(authActions.updateUserData(jwt_decode(res.data.token))); //update redux state
          localStorage.setItem("token", res.data.token);
          history.push("/");
        })
        .catch((err) => {
          toast.error("⚽ invalid email or password", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };
  return (
    <form onSubmit={handleSumbit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" disabled={!enableBtn} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
export default LoginPage;

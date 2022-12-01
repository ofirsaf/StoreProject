import { useState } from "react";
import validateRegister from "../validation/register.validate";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import axios from "axios";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isBiz, setIsBiz] = useState(false);
  const history = useHistory();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSumbitClick = (e) => {
    e.preventDefault();
    const validateValue = Joi.validate(
      { name, email, password, confirmPassword, isBiz },
      validateRegister,
      { abortEarly: false }
    );
    const { error } = validateValue;
    if (error) {
      for (let item of error.details) {
        toast.error(item.message.replaceAll('"', ""));
      }
    } else {
      axios
        .post("/users", {
          name,
          email,
          password,
          biz: isBiz,
        })
        .then((res) => {
          toast.success("🦄 Account created successfully");
          history.push("/login",{email:email,password:password});
        })
        .catch((err) => {
          console.log(err);
          toast.error("🦄 Something went wrong");
        });
    }
    
  };
  const handleChanged = (e) => {
    setIsBiz(e.target.checked);
  };

  return (
    <form onSubmit={handleSumbitClick}>
      <div className="mb-3">
        <label htmlFor="exampleInputfname" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputfname1"
          aria-describedby="emailHelp"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          valie={email}
          onChange={handleEmailChange}
        />
        <div id="emailHelp" className="form-text"></div>
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

      <div className="mb-3">
        <label htmlFor="exampleInputConfirmPassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputConfirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
          onChange={handleChanged}
          checked={isBiz}
        />
        <label className="form-check-label">is Biz?</label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
export default RegisterPage;

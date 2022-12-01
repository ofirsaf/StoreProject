import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const NavbarComponent = () => {
  const login = useSelector((state) => state.auth.loggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const showLogin = () => {
    if (userData.email) {
      return (
        <Fragment>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              {userData.email}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/logout">
              Logout
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/MyCart">
              Your cart
            </NavLink>
          </li>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
        </Fragment>
      );
    }
  };
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary">
        <NavLink className="navbar-brand" to="/">
          Store
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                Home <span className="sr-only"></span>
              </NavLink>
            </li>
            {showLogin()}
          </ul>
          <form>
            <span className="navbar-text"></span>
          </form>
        </div>
      </nav>
    </Fragment>
  );
};
export default NavbarComponent;

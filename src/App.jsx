import "./App.css";
import NavbarComponent from "./components/Navbar.components";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import CardPage from "./pages/Card.page";
import NotFoundPage from "./pages/NotFoundPage.page";
import { ToastContainer } from "react-toastify";
import LogoutPage from "./pages/logout.page";
import MyCardPage from "./pages/MyCard.page";
<style>body background-color: blue;</style>;
//https://dummyjson.com/products
function App() {
  return (
    <div className="container">
      <NavbarComponent />
      <ToastContainer />
      <Switch>
        <Route path="/" exact>
          <CardPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/logout">
          <LogoutPage />
        </Route>
        <Route path="/MyCart">
          <MyCardPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

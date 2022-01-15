import React, { useContext } from "react";
import classes from "./Login.module.css";
import MyButton from "../../Components/UI/button/MyButton";
import MyInput from "../../Components/UI/input/MyInput";
import { AuthContext } from "../../context";

const Login = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  const login = (e) => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
  }

  return (
    <div className={classes.login}>
      <h1>Login Page</h1>
      <form onSubmit={login}>
        <MyInput
          type="text"
          placeholder="Enter login"
        />
        <MyInput
          type="password"
          placeholder="Enter password"
        />
        <MyButton>Enter</MyButton>
      </form>
    </div>
  );
};

export default Login;

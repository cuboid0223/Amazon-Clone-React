import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .then( auth => {
        history.push('/')// 轉址到首頁
    })
    .catch(error => alert(error.message))
    //firebase
  };
  
  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // if successfully create new User
        console.log(auth);
        if(auth){
            history.push('/')// 轉址到首頁
        }
      })
      .catch((error) => alert(error.message));
    //firebase
  };
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login__container">
        <h1>登入</h1>
        <form action="">
          <h5>電子郵件</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>密碼</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="Amazon__button" onClick={signIn}>
            繼續
          </button>
        </form>
        <p>如果繼續，表示您同意 Amazon 的使用條款與隱私權通知。</p>

        <button className="login__registerButton" onClick={register}>
          建立您的Amazon帳戶
        </button>
      </div>
    </div>
  );
};

export default Login;

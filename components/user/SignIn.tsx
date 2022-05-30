import React, { useState } from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client";

import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../../context/auth";
import { LOGIN, SIGNIN } from "../graphql/mutation";
import { useForm } from "../../utils/hooks";
import Link from "next/link";


//Google
const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider;
  const Auth = getAuth(app)// グローバル変数ではエラー
  
  signInWithPopup(Auth, provider)
    .then((user) => {
      console.log(user)
      //await addUser()
    })
  //Mutation Login
  /*
  await Auth.onAuthStateChanged((user) => {
    if (user) {
      user.getIdToken(true).then(async (token) => {
        const idToken = token;
        await addUser();
      });
    }
  });
  */
};

//Github
const signInWithGithub = async () => {
  const provider = new GithubAuthProvider;
  //await Auth.signInWithPopup(provider);
  const Auth = getAuth(app)// グローバル変数ではエラー
  signInWithPopup(Auth, provider)
    .then((user) => {
      console.log(user)
      // await addUser()
    })
  //Mutation Login
  /*
  await Auth.onAuthStateChanged((user) => {
    if (user) {
      user.getIdToken(true).then(async (token) => {
        const idToken = token;
        await addUser();
      });
    }
  });
  */
};

const LoginModal = ({ show, setShow }) => {
  const [addUser] = useMutation(LOGIN);

  if (show) {
    //single sign on
    return (
      <div id="overlay">
        <div id="content" className="login_content">
          <div>
            <button
              onClick={signInWithGoogle}
              className="button sso google_sso"
            >
              <Image
                src="/ios/2x/btn_google_dark_pressed_ios@2x.png"
                alt="Sign in with google"
                width="32"
                height="32"
              />
              <p>Sign in with google</p>
            </button>
          </div>
          <div>
            <br></br>
            <button
              onClick={signInWithGithub}
              className="button sso github_sso"
            >
              <Image
                src="/PNG/GitHub-Mark-32px.png"
                alt="Sign in with github"
                width="32"
                height="32"
              />
              <p>Sign in with github</p>
            </button>
          </div>
          <button onClick={() => setShow(false)} className="close button">
            閉じる
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const SignInModal = ({ show, setShow }) => {
  let email;
  let password;
  const { input, onChange, onSubmit } = useForm(callback, {
    email: "",
    password: "",
  });

  const [addUser] = useMutation(LOGIN);


  function callback() {
    email = input.email;
    password = input.password;
    Register();
  }
  const [signIn] = useMutation(SIGNIN, {
    variables: input,
  });
  const Register = async () => {
    const Auth = getAuth(app)// グローバル変数ではエラー
    signInWithEmailAndPassword(Auth, email, password)
      .then((user) => {
        signIn()
      })
  };
  if (show) {
    //ユーザ登録
    return (
      <div id="overlay">
        <div id="content" className="login_content">
          <div>
            <button
              onClick={signInWithGoogle}
              className="button sso google_sso"
            >
              <Image
                src="/ios/2x/btn_google_dark_pressed_ios@2x.png"
                alt="Sign in with google"
                width="32"
                height="32"
              />
              <p>Sign Up with google</p>
            </button>
          </div>
          <div>
            <br></br>
            <button
              onClick={signInWithGithub}
              className="button sso github_sso"
            >
              <Image
                src="/PNG/GitHub-Mark-32px.png"
                alt="Sign in with github"
                width="32"
                height="32"
              />
              <p>Sign Up with github</p>
            </button>
          </div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="email"
              name="email"
              className="input_text"
              value={input.email}
              onChange={onChange}
            ></input>
            <input
              type="text"
              placeholder="password"
              className="input_text"
              name="password"
              value={input.password}
              onChange={onChange}
            ></input>

            <button className="button signIn">Sign Up</button>
            <button onClick={() => setShow(false)} className="close button">
              閉じる
            </button>
          </form>
        </div>
      </div>
    );
  } else if (!show) {
    return null;
  }
};

const SignIn = () => {
  const [show, setShow] = useState(false);
  const [signInShow, setSigInShow] = useState(false);
  const openModal = () => {
    setShow((props) => !props);
  };
  const openSignInModal = () => {
    setSigInShow((props) => !props);
  };
  return (
    <div className="user">
      <Link href={`/graph/create-graph`}>
        <a className="user-items button logined">グラフ作成</a>
      </Link>
      <button onClick={openSignInModal} className="user-items button">
        Sign Up
      </button>
      <SignInModal show={signInShow} setShow={setSigInShow} />
      <button onClick={openModal} className="user-items button">
        Sign In
      </button>
      <LoginModal show={show} setShow={setShow} />
    </div>
  );
};

export default SignIn;

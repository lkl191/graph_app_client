import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";

import { app } from "../context/auth";
import SignIn from "../components/SignIn";
import SignOut from "../components/SignOut";
import { getAuth } from "firebase/auth";



const Header = () => {
  //const Auth = getAuth(app)
  //const [user] = useAuthState(Auth);
  let user

  return (
    <div className="header">
      <div className="app_name">
        <Link href="/">
          <a className="button app_name_text">GraphApp</a>
        </Link>
      </div>
      {user ? (
        <div className="user">
          <Link href={`/graph/create-graph`}>
            <a className="user-items button logined">グラフ作成</a>
          </Link>
          <span className="user-items ">
            <SignOut />
          </span>
          <Link href={`/user?id=${user.uid}`}>
            <a className="user-items logined user-icon">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  width="30"
                  height="30"
                  className="user-icon-img"
                />
              ) : (
                <Image
                  src="/user-icon.png"
                  width="30"
                  height="30"
                  className="user-icon-img"
                />
              )}
            </a>
          </Link>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default Header;

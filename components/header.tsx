import React from "react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

import { Auth } from "../context/auth";
import SignIn from "../components/SignIn";
import SignOut from "../components/SignOut";

const Header = () => {
  const [user] = useAuthState(Auth);

  return (
    <div className="header">
      <div className="app_name">
        <Link href="/">
          <a className="button app_name_text">GraphApp</a>
        </Link>
      </div>
      {user ? (
        <div className="user">
          {user.displayName ? (
            <Link href={`/user?id=${user.uid}`}>
              <a className="user-items button logined">{user.displayName}</a>
            </Link>
          ) : (
            <Link href={`/user?id=${user.uid}`}>
              <a className="user-items button logined">Anonymous</a>
            </Link>
          )}
          <Link href={`/graph/create-graph`}>
            <a className="user-items button logined">グラフ作成</a>
          </Link>
          <span className="user-items ">
            <SignOut />
          </span>
        </div>
      ) : (
          <SignIn />
      )}
    </div>
  );
};

export default Header;

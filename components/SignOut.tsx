import React from 'react'

import { Auth } from "../context/auth";

const SignOut = () => {
    return Auth.currentUser && (
        <button onClick={() => Auth.signOut()} className="logined button logout" >ログアウト</button>
    )
}

export default SignOut
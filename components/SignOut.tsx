import { getAuth } from 'firebase/auth';
import React from 'react'

import { app } from "../context/auth";



const SignOut = () => {
    const Auth = getAuth(app)
    return Auth.currentUser && (
        <button onClick={() => Auth.signOut()} className="button user-items logined" >ログアウト</button>
    )
}

export default SignOut
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  signInWithGoogle,
} from "./firebase";

function Register() {
  const [user, loading] = useAuthState(auth);
  const history = useHistory();


  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/dashboard");
  }, [user, loading]);

  return (
    <div className="register">
      <div className="register__container">
       
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>

      </div>
    </div>
  );
}

export default Register;
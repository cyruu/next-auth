import { signIn } from "@/auth";
import LoginForm from "@/components/client/Form";
import React from "react";

const Login = () => {
  return (
    <div>
      <LoginForm />
      <form action="">
        <button type="submit">login with google</button>
      </form>
    </div>
  );
};

export default Login;

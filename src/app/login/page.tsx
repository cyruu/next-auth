import { auth, signIn } from "@/auth";
import LoginForm from "@/components/client/Form";
import { redirect } from "next/navigation";
import React from "react";

const Login = async () => {
  const session = await auth();
  const user = session?.user || "";
  if (user) {
    redirect("/");
  }
  return (
    <div>
      <LoginForm />
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button type="submit">login with google</button>
      </form>
    </div>
  );
};

export default Login;

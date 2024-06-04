"use client";

import { credentialLogin } from "@/actions/login";

const LoginForm = () => {
  return (
    <form
      action={async (formData) => {
        const email = formData.get("email") as string | undefined;
        const password = formData.get("password") as string | undefined;
        if (!email || !password) throw new Error("Enter email and pass");
        await credentialLogin(email, password);
      }}
    >
      email
      <input type="text" name="email" className="border border-black" /> <br />
      password{" "}
      <input type="text" name="password" className="border border-black" />{" "}
      <br />
      <button type="submit">Login</button>
    </form>
  );
};
export default LoginForm;

"use client";

import { loginHandler } from "@/actions/login";

const LoginForm = () => {
  return (
    <form
      action={async (formData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        if (!email || !password) alert("Enter email and pass");
        const res = await loginHandler(email, password);
        console.log(res);

        // if (res.) console.log("login successful");
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

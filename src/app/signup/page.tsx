import React from "react";
import User from "../model/userModel";
import { redirect } from "next/navigation";
import { connect } from "../dbconfig/dbconfig";

const Signup = () => {
  const handleSignup = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;
    await connect();
    const user = await User.findOne({ email });
    if (user) throw new Error("User already exist of that email");
    await User.create({
      name,
      email,
      password,
    });
    redirect("/login");
  };
  return (
    <div>
      <h1>signup</h1>
      <form action={handleSignup}>
        name
        <input type="text" name="name" className="border border-black" /> <br />
        email
        <input type="text" name="email" className="border border-black" />{" "}
        <br />
        password{" "}
        <input
          type="text"
          name="password"
          className="border border-black"
        />{" "}
        <br />
        <button type="submit">Signup</button>
      </form>
      <form action="">
        <button type="submit">Signup with google</button>
      </form>
    </div>
  );
};

export default Signup;

"use server";
import { signIn } from "@/auth";

export const loginHandler = async (email: string, password: string) => {
  try {
    console.log("logging in from login handler in login.tsx");

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { msg: "login successful", statusCode: 200 };
  } catch (error: any) {
    return { msg: error.message, statusCode: 404 };
  }
};

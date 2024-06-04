"use server";
import { signIn } from "@/auth";

const loginHandler = async (email: string, password: string) => {
  try {
    console.log("logging in from login handler in login.tsx");

    await signIn("credentials", {
      email,
      password,
    });
  } catch (error: any) {
    return error.message;
  }
};
export { loginHandler as credentialLogin };

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { connect } from "@/app/dbconfig/dbconfig";
import User from "../model/userModel";
import bcryptjs from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
const Login = () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData: FormData) => {
              "use server";

              const email = formData.get("email") as string | undefined;
              const password = formData.get("password") as string | undefined;
              if (!email || !password) {
                throw new Error("provide info");
              }

              try {
                await signIn("credentials", {
                  email,
                  password,
                  // redirect: true,
                  // redirectTo: "/",
                });
              } catch (error: any) {
                return error.message;
              }
            }}
          >
            <input
              type="text"
              className="border border-black mb-3"
              placeholder="email"
              name="email"
            />
            <br />
            <input
              type="text"
              className="border border-black mb-3"
              placeholder="password"
              name="password"
            />

            <button type="submit" className="border border-black">
              Login
            </button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <br />
          <form action="">
            <button type="submit" className="border border-black">
              Google login
            </button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

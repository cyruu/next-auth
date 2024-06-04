import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import User from "../model/userModel";
import bcryptjs from "bcryptjs";
import { redirect } from "next/navigation";
import { connect } from "../dbconfig/dbconfig";
const Signup = () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData: FormData) => {
              "use server";
              const name = formData.get("name") as string | undefined;
              const email = formData.get("email") as string | undefined;
              const password = formData.get("password") as string | undefined;
              if (!email || !name || !password) {
                throw new Error("provide info");
              }
              await connect();
              const user = await User.findOne({ email });
              if (user) throw new Error("alreadty exists user");
              const hashedpass = await bcryptjs.hash(password, 10);
              await User.create({
                name,
                email,
                password: hashedpass,
              });
              redirect("/login");
            }}
          >
            <input
              type="text"
              className="border border-black mb-3"
              placeholder="name"
              name="name"
            />
            <br />
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
              Signup
            </button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <br />
          <form action="">
            <button type="submit" className="border border-black">
              Google Signup
            </button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;

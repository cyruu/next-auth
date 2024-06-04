import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connect } from "./app/dbconfig/dbconfig";
import User from "./app/model/userModel";
import { pages } from "next/dist/build/templates/app-page";
import GoogleProvider from "next-auth/providers/google";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        console.log("inside authorize credentials", email, password);
        if (!email || !password) throw new Error("enter email and pass");
        await connect();
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No user found in db");
        }
        // check pass

        return { name: user.name, email: user.email, id: user._id };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import User from "./app/model/userModel";
import { connect } from "./app/dbconfig/dbconfig";
import bcryptjs from "bcryptjs";

//custom page for login and signup

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "credential",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "text",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        console.log(email, password);
        if (!email || !password) throw new Error("Email and pass required");
        //db connectc
        await connect();
        // session ma halne
        const user = await User.findOne({ email });
        console.log("user", user);

        if (!user) throw new Error("Invalid email or password");
        // google bata garne bela password not required
        // if (!user.password) throw new Error("signed in with google");
        // input,hashedpass
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Incorrect password");
        }
        if (password !== "passcode") {
          throw new Error("password dont match");
        }
        return { name: user.name, email: user.email, id: user._id };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

// auth().then(c=>{
//     c?.user
// })

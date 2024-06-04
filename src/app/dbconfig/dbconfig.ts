import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const conn = mongoose.connection;
    conn.on("connected", () => {
      console.log("db connected");
    });
    console.log("connecting");
    conn.on("error", () => {
      console.log("failed to connect to db");
    });
  } catch (error: any) {
    console.log(error.msg);
  }
}

import mongoose from "mongoose";
const DBConnection = async () => {
  const MONGO_URI = `mongodb+srv://imranmdsh:123456S@file-sharing.v76qxzf.mongodb.net/?retryWrites=true&w=majority&appName=file-sharing`;
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to database:", error?.message);
  }
};

export default DBConnection;

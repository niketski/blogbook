import mongoose from "mongoose";

export default async function dbConnect() {
  try {

    if(!process.env.MONGODB_URI) {
      
      throw new Error('Please provide Mongodb URI.');

    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('connected to mongodb.');
    
  } catch(error: unknown) {

    if(error instanceof Error) {
      
      console.log(error.message);

    }

  }

}
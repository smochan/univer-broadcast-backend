import mongoose from 'mongoose';

const connect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    return console.log("Database connected!");
  } catch (err) {
    console.log(err);
    return;
  }
};

export default {connect};
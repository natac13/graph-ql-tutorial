import mongoose from 'mongoose';
import chalk from 'chalk';
// mongoose.Promise = global.Promise;

async function connectToDB(env, mongoURI) {
  if (env === 'development' || env === 'test') {
    // connect to a development/test database
    try {
      const connection = await mongoose.connect(mongoURI, {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        useNewUrlParser: true,
      });
      console.log(chalk.cyan('\nConnected to the development Database'));
      console.log(chalk.red('-----------------------------------------------'));
      return connection;
    } catch (error) {
      console.log(chalk.red(error));
      return Promise.reject(new Error('Failed to connect to development DB'));
    }
  } else if (env === 'production') {
    try {
      const connection = await mongoose.connect(mongoURI, {
        autoIndex: false,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        useNewUrlParser: true,
      });
      console.log(chalk.cyan('Connected on production Database'));
      return connection;
    } catch (error) {
      // should record error in production
      return Promise.reject(new Error('Failed to connect to mongoDB'));
    }
  }
  return false;
}

export default connectToDB;

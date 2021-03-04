const mongoose = require('mongoose');
const { config } = require('./config/index');
// This code auto executes on require
(async () => {
  try {
    const db = await mongoose.connect(config.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    console.log("Database Connected", db.connection.host);
  } catch (error) {
    console.error(error);
  }
})();
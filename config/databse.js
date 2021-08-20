const mongoose = require("mongoose");

const connectdb = async () => {
  await mongoose
    .connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Monngodb Connected");
    });
};

module.exports = connectdb;

const mongoose = require("mongoose");

const uri = "";

const connection = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB successfully connected!"))
    .catch((err) => console.log("err: " + err.message));
};

module.exports = connection;

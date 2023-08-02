const mongoose = require("mongoose");

const mongooseConnect = async () => {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = mongooseConnect;

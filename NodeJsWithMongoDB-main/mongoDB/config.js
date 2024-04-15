const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ten_csdl', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

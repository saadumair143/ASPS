const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//express
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//routes
const adminRoute = require('./routes/admin');
const courseRoute = require('./routes/course');
const teacherRoute = require('./routes/teacher');
const studentRoute = require('./routes/student');
const sign_inRoute = require('./routes/sign_in');
const log_outRoute = require('./routes/log_out')
app.use('/admin',adminRoute);
app.use('/course',courseRoute);
app.use('/teacher',teacherRoute);
app.use('/student',studentRoute);
app.use('/signin',sign_inRoute);
app.use('/logout',log_outRoute);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
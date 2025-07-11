const express = require('express');
require('express-async-errors'); 
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const employeeRoutes = require('./controller/employee-controller');
const router = require('./router')

// middleware
app.use(bodyParser.json())
app.use('/api',router)

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).send('Something went wrong')
})

//DB connection start  expres server
db.query('SELECT 1')
  .then(() => {
    console.log('DB connection succeeded');

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.log('DB connection failed\n', err);
  });

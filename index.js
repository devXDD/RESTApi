const express = require('express');
const app = express();
const Validation = require('./validation');
const validationObj = new Validation();

app.use(express.json());
const userRoute = require('./routes/users')
const paymentRoute = require('./routes/payments')
app.use('/api/users', userRoute)
app.use('/api', paymentRoute)

const port = process.env.PORT || 2000;
const server =  app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;
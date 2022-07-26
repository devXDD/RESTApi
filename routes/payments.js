var router = require('express').Router();
const Validation = require('../validation');
const validationObj = new Validation();
const useing = require('./users')
const users = useing.users;
// const users = [ 
//   {Username: 'dev', email: 'dev@gmail.com', Password: '123445', DoB: '2012-06-06', CreditCard: '12'},
//   {Username: 'tev', email: 'dev@gmail.com', Password: '123445', DoB: '2012-06-06', CreditCard: '4111111111111111'},
//   {Username: 'sev', email: 'sev@gmail.com', Password: '1234455', DoB: '2012-06-06'},
//   {Username: 'rev', email: 'sev@gmail.com', Password: '1234455', DoB: '2012-06-06'}
// ];

const payments = [
  { Amount: '123'},
  { Amount: '143'},
];
 
router.post('/payments', (req, res) =>
  {
    const cardCheck = validationObj.CreditCardCheck(req.body);
    const amountValid = validationObj.AmountValidation(req.body);
    if(!cardCheck)
    {
        return res.status(400).send("Credit card details wrong. ");
    }
    const cardExist = validationObj.CreditCardExist(req.body, users)
    
    if(!cardExist)
    {
        return res.status(404).send("No users found with credit card details. ");
    }

    if(!amountValid)
    {
        return res.status(400).send("Enter only 3 digits");
    }
    const payment = 
    {
    CreditCard: req.body.CreditCard,
    Amount: req.body.Amount
    };
    payments.push(payment);
    res.status(201).send(payment);

  });

module.exports = router;
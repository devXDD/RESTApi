const express = require('express')
const router = express.Router()
router.use(express.json());
var userExist = false;

const users = [ 
    {Username: 'dev', email: 'dev@gmail.com', Password: '123445', DoB: '2012-06-06', CreditCard: '378282246310005'},
    {Username: 'tev', email: 'dev@gmail.com', Password: '123445', DoB: '2012-06-06', CreditCard: '4111111111111111'},
    {Username: 'sev', email: 'sev@gmail.com', Password: '1234455', DoB: '2012-06-06'},
    {Username: 'rev', email: 'sev@gmail.com', Password: '1234455', DoB: '2012-06-06'}
  ];
  
const Validation = require('../validation');
const validationObj = new Validation();

router.get('/', (req, res) => {
    res.status(201).send(users);
  });
  router.get('/CreditCard=Yes', (req, res) => {
    var filteredArray = users.filter(item => (typeof (item.CreditCard) !== 'undefined'));
    console.log(filteredArray);
    res.send(filteredArray);
  });
  router.get('/CreditCard=No', (req, res) => {
    var filteredArray = users.filter(item => (typeof (item.CreditCard) === 'undefined'));
    console.log(filteredArray);
    res.send(filteredArray);
  });
  router.post('/', (req, res) => { 
  if(!req.body.Username || !req.body.DoB || !req.body.email || !req.body.Password)
  {
      res.status(400).send("Please enter all the details. ");
      return;
  }
    const pass = validationObj.PasswordCheck(req.body);
    const userValid = validationObj.UsernameCheck(req.body);
    const userExist = validationObj.UsernameExist(req.body, users);
    const emailValid = validationObj.EmailCheck(req.body);
    const dobLocal = validationObj.DoBCheck(req.body);
    const checkUnder = validationObj.CheckUnderAge(req.body);
    if(req.body.CreditCard)
    {
        const creditLocal = validationObj.CreditCardCheck(req.body, users);
  
        if(!creditLocal)
        {
        return res.send("Credit card invalid");
        }
    }
    if(userExist)
    {
      return res.status(409).send("Username already exists");
    }
    if(!userValid)
    {
      return res.status(400).send("Username format incorrect");
    }
    // checking if user is underage
    if(checkUnder)
    {
        return res.status(403).send("Underage");
    }
    if(!dobLocal)
    {
      console.log("DoB not fulfilled");
      return res.status(400).send("DoB not fullfilled");
    }
    if(!emailValid)
    {
      console.log("Email not fulfilled");
      return res.status(400).send("Email not fullfilled");
    }
    if(!pass)
    {
      console.log("Password not fulfilled");
      return res.status(400).send("Password not fullfilled");
    }
    if(req.body.CreditCard)
      {
           const user = 
            {
            Username: req.body.Username,
            email: req.body.email,
            Password: req.body.Password,
            DoB: req.body.DoB,
            CreditCard: req.body.CreditCard
            };
            users.push(user);
            res.send(user);
      }
    else
    {
        const user = 
        {
        Username: req.body.Username,
        email: req.body.email,
        Password: req.body.Password,
        DoB: req.body.DoB   
         };
         users.push(user);
         res.send(user);
    }
  });
  module.exports = router;
  module.exports.users = users;
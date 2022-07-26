class Validation{  
    UsernameCheck(user, userLists)
    {
      var username= user.Username;
       return username.match(/^[a-zA-Z0-9\-_]{0,40}$/);
    }
    UsernameExist(user, userLists)
    {
      var username= user.Username;
      const userList = userLists.find(c => c.Username === username);
      return userList;
    }
    

    EmailCheck(user)
    {
    var emailCheck = user.email;
    return emailCheck.match(  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }

    PasswordCheck(user)
    {
      var password = user.Password;
      return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/);
    }

   DoBCheck(user)
    {
      var dobcheck = user.DoB;
    return dobcheck.match(/^[+-]?\d{4,5}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/);
    }

    CheckUnderAge(user)
    {
      var dobcheck = user.DoB;
      var currentYear = new Date().getFullYear();
      var age = dobcheck.substring(0,4);
        if(currentYear-age<18)
        {
            return true;
        }
       return false;
    }
    CreditCardCheck(user)
    {
        const pay = user.CreditCard;
        return pay.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/);
    }  
    
    AmountValidation(user)
    {
      const amount = user.Amount;
      
      return amount.match (/^([0-9]{3})$/);
    }

    CreditCardExist(user, users)
    {
      const pay = user.CreditCard;
      const userList = users.find(c => c.CreditCard === pay );
      if(!userList)
      {
          console.log("No users found with the number");
          return;
      }
      return userList;
    }
}
module.exports = Validation;
//exports.under = under;
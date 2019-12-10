const express = require('express');
const app = express();
const loginValidation = require('./src/routes/LoginValidation');
const signUp = require('./src/routes/SignUp');
const promotions = require('./src/routes/Promotions');
const clientsList = require('./src/routes/ClientList');

const port = 5000;

app.listen(port, () =>{
    console.log(`Server started and listening on port:${port}`);
});

app.use('/loginValidation', loginValidation);
app.use('/signUpNewUser', signUp);
app.use('/getPromotions', promotions);
app.use('/getClientInfo', clientsList)

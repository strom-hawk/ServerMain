const express = require('express');
const app = express();
const loginValidation = require('./src/routes/LoginValidation');
const signUp = require('./src/routes/SignUp');
const logOutUser = require('./src/routes/LogoutUser');
const port = 5000;

app.listen(port, () =>{
    console.log(`Server started and listening on port:${port}`);
});

app.use('/loginValidation', loginValidation);
app.use('/signUpNewUser', signUp)
app.use('/logOutUser', logOutUser)

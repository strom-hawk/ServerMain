const express = require('express');
const app = express();
const loginValidation = require('./src/routes/LoginValidation');
const port = 5000;

app.listen(port, () =>{
    console.log(`Server started and listening on port:${port}`);
});

app.use('/loginValidation', loginValidation);

app.get('/', function(req, res){
    res.send('homepage');
})

app.get('/helloworldpage', function(req, res){
    res.send('hello world');
});
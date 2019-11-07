const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
const name = "";
const emailId = "";
const password = "";

router.post('/', (request, response) => {
    console.log('/signUpNewUser');
    const credentials = {
        name : request.body.name,
        emailId : request.body.email,
        password : request.body.password
    }
    console.log(credentials);
    //CONNECTIVITY TO DB
    //INSERT QUERY TO DB
    //IF INSERTION IS SUCCESSFUL RETURN 200
    //ELSE RETURN ANY ERROR CODE

    response.json({
        "txnStatus":"200",
        "txnMessage":"Sign Up Successful"
    });
})

module.exports = router;
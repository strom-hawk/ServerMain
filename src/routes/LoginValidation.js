const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());

const userName = "";
const password = "";

router.post('/', (request, response) => {
    const credentials = {
        userName : request.body.userName,
        password : request.body.password
    }

    console.log(credentials);

    if(credentials.userName == 'test data' && credentials.password == 'test password'){
        response.json({
            "txnStatus":"200",
            "txnMessage":"Success"
        });
    } else{
        response.json({
            "txnStatus":"404",
            "txnMessage":"User Not found"
        });
    }
})

module.exports = router;
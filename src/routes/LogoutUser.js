const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
const name = "";

router.post('/', (request, response) => {
    console.log('/logOutUser');
    const credentials = {
        name : request.body.name,
    }
    console.log(credentials);
    //CONNECTIVITY TO DB
    //INSERT QUERY TO DB
    //IF INSERTION IS SUCCESSFUL RETURN 200
    //ELSE RETURN OTHER ERROR CODE

    response.json({
        "txnStatus":"200",
        "txnMessage":"Logout Successful"
    });
})

module.exports = router;
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const log4js = require('log4js');

router.use(bodyParser.json());
log4js.configure({
    appenders:{fileAppender:{type:'file', filename:'/logs/access_log.log'}},
    categories:{default:{appenders:['fileAppender'], level:'info'}}
});

const logger = log4js.getLogger();
const userName = "";
const password = "";

router.post('/', (request, response) => {
    console.log('/loginValidation');
    const credentials = {
        userName : request.body.userName,
        password : request.body.password
    }

    console.log(credentials);
    logger.info(credentials);

    //CONNECTIVITY TO DB
    //SEARCH DATA IN DB
    //RETURN 200 IF SUCCESS
    //ELSE RETURN 404

    if(credentials.userName == 'test' && credentials.password == 'test'){
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
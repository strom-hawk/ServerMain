const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const log4js = require('log4js');
const fileStream = require('fs');

router.use(bodyParser.json());
log4js.configure({
    appenders: { everything: { type: 'dateFile', filename: './logs/access_log.log' } },
    categories: { default: { appenders: ['everything'], level: 'debug' } }
});

const logger = log4js.getLogger();


function handleReponse(credentials, response) {
    let txnStatus = "";
    let txnMessage = "";
    let authentication = false;

    //READ DATA FROM JSON FILE
    let rawData = fileStream.readFileSync("./data/signUpData.txt");
    let finalData = JSON.parse(rawData);

    //TRAVERSING THROUGH EACH DATA
    for(let userNumber in finalData.users){
        let eachUser = finalData.users[userNumber];
        if ((credentials.emailOrMobile == eachUser['mobile'] || 
            credentials.emailOrMobile == eachUser['emailId']) 
            && credentials.password == eachUser['password']) {
            authentication = true;
            break;
        }
    }
    
    //CHECKING IF DATA IS PRESENT
    if (authentication == true) {
        txnStatus = "200";
        txnMessage = "Success";
    } else {
        txnStatus = "404";
        txnMessage = "User Not found";
    }

    //FORMING RESPONSE
    let responseJson = {
        "txnStatus": txnStatus,
        "txnMessage": txnMessage
    }

    //SENDING BACK RESPONSE
    response.json(responseJson);
    console.log(responseJson);
    logger.info('Response to app => ', responseJson);
}


router.post('/', (request, response) => {
    logger.info('Request from app => ', request.body);
    console.log(request.body);

    let credentials = {
        emailOrMobile: request.body.emailOrMobile,
        password: request.body.password
    }

    handleReponse(credentials, response);
})

module.exports = router;
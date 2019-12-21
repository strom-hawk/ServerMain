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

function validate(newUser, userObject) {
    for (let userNumber in userObject.users) {
        let eachUser = userObject.users[userNumber];
        if (newUser.mobile == eachUser['mobile']) {
            return 1;
        } else if (newUser.emailId == eachUser['emailId']) {
            return 2;
        }
    }
    return 0;
}

function handleResponse(validation, userObject, newUser, response) {
    let txnStatus = "";
    let txnMessage = "";

    if (validation == 1) {
        txnStatus = "283";
        txnMessage = "Mobile number already registered.";
    } else if (validation == 2) {
        txnStatus = "284";
        txnMessage = "Email already registered.";
    } else {
        //PUSHING NEW DATA TO OBJECT
        userObject.users.push(newUser);
        //console.log('userObject -->', userObject);

        //WRITING INTO FILE
        fileStream.writeFileSync('./data/signUpData.txt', JSON.stringify(userObject, 'utf-8', function (err) {
            if (err) {
                throw err;
            }
        }));

        txnStatus = "200";
        txnMessage = "success";
    }

    //SENDING BACK RESPONSE
    let responseJson = {
        "txnStatus": txnStatus,
        "txnMessage": txnMessage
    }
    response.json(responseJson);
    logger.info('Response to app => ', responseJson);
}

router.post('/', (request, response) => {
    logger.info('Request from app => ', request.body);

    //CREATING NEW USER VARIABLE
    let newUser = {
        name: request.body.name,
        mobile: request.body.mobile,
        emailId: request.body.emailId,
        password: request.body.password
    }
    console.log('newUser -->', newUser);

    //READING DATA
    let rawData = fileStream.readFileSync('./data/signUpData.txt');
    let userObject = JSON.parse(rawData);

    //VALIDATION FOR SAME MOBILE OR EMAIL
    let validation = validate(newUser, userObject);

    //HANDLE RESPONSE
    handleResponse(validation, userObject, newUser, response);
})

module.exports = router;
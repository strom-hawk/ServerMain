//import * as strings from '../resources/values/strings/strings';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const log4js = require('log4js');

//const applicationConstants = require('../resources/values/ApplicationConstants');

router.use(bodyParser.json());
log4js.configure({
    appenders: { fileAppender: { type: 'file', filename: './logs/access_log.log' } },
    categories: { default: { appenders: ['fileAppender'], level: 'info' } }
});

const logger = log4js.getLogger();

const txnStatusSuccess = "200";
const txnMessageSuccess = "success";
const isUpdateAvailable="Y";
const updateURL ="https://drive.google.com/open?id=1FZBu0BbbmVrv1jhiFC24FfKoA0VYDGEy";

router.use(bodyParser.json());


router.post('/', (request, response) => {
    logger.info(request.body);

    const responseJson = {
        "txnStatus": txnStatusSuccess,
        "txnMessage": txnMessageSuccess,
        "isUpdateAvailable":isUpdateAvailable,
        "updateURL":updateURL,
    }
    response.json(responseJson);
    logger.info(responseJson);
});

module.exports = router;
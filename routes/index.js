var express = require('express');
const { sendReponse } = require('../helpers/init');
var router = express.Router();

/* GET home page. */
// router.get('/', (req, res, next) => {
//   // res.status(200).send("Home!")
//   return sendReponse(200, {}, "Home!", res, next)
// });

const CompaniesRouter = require('./companies')
router.use('/companies', CompaniesRouter)
module.exports = router;

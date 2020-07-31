const express = require('express');
const transactionRouter = express.Router();
const transactionService = require('../services/transactionService.js');

transactionRouter.get('/', transactionService.findWithoutPeriod);
transactionRouter.get('/period/:period', transactionService.findByPeriod);
//prettier-ignore
transactionRouter.get('/description/:description', transactionService.findByDescription);
transactionRouter.post('/', transactionService.create);
transactionRouter.put('/:id', transactionService.update);
transactionRouter.delete('/:id', transactionService.remove);

module.exports = transactionRouter;

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const findWithoutPeriod = async (_, res) => {
  res.status(400).send({
    error:
      'É necessário informar o parâmetro "period", cujo o valor deve estar no formato yyyy-mm',
  });
};

const findByPeriod = async (req, res) => {
  try {
    const transactions = await TransactionModel.find({
      yearMonth: req.params.period,
    }).exec();
    if (transactions.length === 0) {
      res.status(404).send({ error: 'Período não encontrado' });
    }
    const length = transactions.length;
    const resp = { length, transactions };
    res.send(resp);
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
  }
};

const findByDescription = async (req, res) => {
  try {
    const regExFilter = new RegExp(req.params.description, 'i');

    const transactions = await TransactionModel.find({
      description: regExFilter,
    }).exec();
    if (transactions.length === 0) {
      res.status(404).send({ error: 'Descrição não encontrada' });
    }
    const length = transactions.length;
    const resp = { length, transactions };
    res.send(resp);
  } catch (err) {
    res.status(404).send({
      error: err.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const transaction = new TransactionModel(req.body);
    await transaction.save();
    res.status(201).send(transaction);
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .send({ message: 'Não há dados no corpo da requisição' });
    }

    const transaction = await TransactionModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!transaction) {
      res.status(404).send({
        message: `Transação com o id=${req.params.id} não encontrada`,
      });
    } else {
      res.send(transaction);
    }
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const transaction = await TransactionModel.findOneAndDelete({
      _id: req.params.id,
    });
    if (!transaction) {
      res.status(404).send({
        message: `Transação com o id=${req.params.id} não encontrada`,
      });
    } else {
      res.send();
    }
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};

module.exports = {
  findWithoutPeriod,
  findByPeriod,
  findByDescription,
  create,
  update,
  remove,
};

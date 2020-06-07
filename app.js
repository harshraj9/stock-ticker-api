const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const Controller = require('./stocks/controller');

const controller = new Controller();

require('dotenv').config();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/stock/:stockName', cors(), async (req, res) => {
  res.json(await controller.getTickersByName(req));
});

app.post('/stocks/', cors(), async (req, res) => {
  res.json(await controller.getTickersByParams(req));
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`[APP.JS] Server Started on Port ${process.env.PORT || 8080}`);
});

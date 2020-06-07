const Service = require('./service');
const ResponseBuilder = require('../response/response-builder');
const http_status_codes = require('../response/http-status-codes');

const service = new Service();
const responseBuilder = new ResponseBuilder();

class Controller {
  constructor() {}

  /**
   * This function will get the stock tickers by name
   * @param req 
   */
  async getTickersByName(req) {
    try {
      const stockName = req.params.stockName;
      console.log(`[Controller] [getTickersByName] ${stockName}`);
      const re = /^([a-zA-Z0-9 _-]+)$/;
      if (!re.test(stockName)) {
        return responseBuilder.buildResponse({
          status: http_status_codes.BadRequest,
          message: 'Please input valid stock name!'
        });
      }

      return responseBuilder.buildResponse({
        status: http_status_codes.Ok,
        result: await service.getTickersByName(stockName)
      });
    } catch (error) {
      console.log(`[Controller] [Error] [getTickersByName] ${error}`);
      return responseBuilder.buildResponse({
        status: http_status_codes.BadRequest,
        message: 'Please input valid stock name!'
      });
    }
  }

  /**
   * This function will get the stock tickers by specified params
   * @param  req 
   */
  async getTickersByParams(req) {
    try {
      const body = JSON.parse(JSON.stringify(req.body));
      const { date, name, minutes } = body;
      const re = /^([a-zA-Z0-9 _-]+)$/;
      if (!name || !re.test(name)) {
        return responseBuilder.buildResponse({
          status: http_status_codes.BadRequest,
          message: 'Please input valid stock name!'
        });
      }
      if (!date && !minutes) {
        return responseBuilder.buildResponse({
          status: http_status_codes.BadRequest,
          message: 'Please input atleast date or minutes to fetch'
        });
      }
      if (minutes && isNaN(minutes)) {
        return responseBuilder.buildResponse({
          status: http_status_codes.BadRequest,
          message: 'Please input minutes in valid format'
        });
      }

      const isDate = function (date) {
        return new Date(date) !== 'Invalid Date' && !isNaN(new Date(date));
      };

      if (date && date.length === 8) {
        const dateActual = `${date.substr(0, 4)}/${date.substr(4, 2)}/${date.substr(6, 2)}`;
        if (!isDate(dateActual)) {
          return responseBuilder.buildResponse({
            status: http_status_codes.BadRequest,
            message: 'Please input date in valid format'
          });
        }
      } else if (date && date.length !== 8) {
        if (!isDate(dateActual)) {
          return responseBuilder.buildResponse({
            status: http_status_codes.BadRequest,
            message: 'Please input date in valid format'
          });
        }
      }
      console.log(`[Controller] [getTickersByParams] ${date} ${name} ${minutes}`);
      return responseBuilder.buildResponse({
        status: http_status_codes.Ok,
        result: await service.getTickersByParams(date, name, minutes)
      });
    } catch (error) {
      console.log(`[Controller] [Error] [getTickersByParams] ${error}`);
      return responseBuilder.buildResponse({
        status: http_status_codes.BadRequest,
        message: 'Please input valid stock name!'
      });
    }
  }
}
module.exports = Controller;

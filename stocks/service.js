const fetch = require('node-fetch');

class Service {
  constructor() {}

  /**
   * This function will return an stock data by stock name.
   * @param stockName 
   * @returns single stock data 
   */
  async getTickersByName(stockName) {
    try {
      console.log(`[Service] [getTickersByName] ${stockName}`);
      const fetchReq = await fetch(
        `${process.env.BASE_URL}/${stockName}/quote?token=${process.env.API_KEY_IEX}&format=json`
      );
      const response = await fetchReq.json();
      console.log(`[Service] [getTickers] Successfully fetched data from api`);
      return response;
    } catch (error) {
      console.log(`[Service] [Error] [getTickersByName] ${error}`);
      return Promise.reject(error);
    }
  }

  /**
   * This function will return stocks data according to passed parameters
   * @param date 
   * @param name 
   * @param minutes 
   * @returns Multiple data for same stock according to params passed
   */
  async getTickersByParams(date, name, minutes) {
    try {
      console.log(`[Service] [getTickersByParams] ${name}`);
      let fetchReq;
      if (!date) {
        fetchReq = await fetch(
          `${process.env.BASE_URL}/${name}/intraday-prices?token=${process.env.API_KEY_IEX}&chartLast=${minutes}&format=json`
        );
      } else {
        fetchReq = await fetch(
          `${process.env.BASE_URL}/${name}/chart/date/${date}?token=${process.env.API_KEY_IEX}&format=json`
        );
      }
      const response = await fetchReq.json();
      console.log(`[Service] [getTickersByParams] Successfully fetched data by params`);
      return response;
    } catch (error) {
      console.log(`[Service] [Error] [getTickersByParams] ${error}`);
      return Promise.reject(error);
    }
  }
}
module.exports = Service;

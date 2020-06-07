const chai = require('chai');
const sinon = require('sinon');
const Controller = require('../../stocks/controller');
const Service = require('../../stocks/service');
const http_status_codes = require('../../response/http-status-codes');
const STOCK_FB_RESPONSE = require('../../__mock-data__/stock');
const STOCK_MINUTES_RESPONSE = require('../../__mock-data__/stock');
const STOCK_DATE_RESPONSE = require('../../__mock-data__/stock');

describe('Stocks controller test suite', () => {
  const service = new Service();
  let mockService = sinon.SinonMock;

  beforeEach(() => {
    mockService = sinon.mock(service);
  });

  afterEach(() => {
    mockService.restore();
  });

  it('should return proper response for the stock provided', async () => {
    const controller = new Controller();
    const req = { params: { stockName: 'fb' } };
    mockService.expects('getTickersByName').resolves(STOCK_FB_RESPONSE);
    const response = await controller.getTickersByName(req);
    chai.expect(response.status).eq(http_status_codes.Ok);
    mockService.verify();
  });

  it('should throw and error for invalid parameter', async () => {
    const controller = new Controller();
    const req = { params: { stockName: 'fb@' } };
    const response = await controller.getTickersByName(req);
    chai.expect(response.status).eq(http_status_codes.BadRequest);
  });

  it('should throw and error for not found', async () => {
    const controller = new Controller();
    const req = { params: { stockName: 'fadkhaklsjdasd' } };
    mockService.expects('getTickersByName').rejects('invalid param name');
    const response = await controller.getTickersByName(req);
    chai.expect(response.status).eq(http_status_codes.BadRequest);

    mockService.verify();
  });

  it('should return proper response when calling by proper minutes params', async () => {
    const controller = new Controller();
    const req = {
      body: {
        name: 'fb',
        minutes: '20'
      }
    };
    mockService.expects('getTickersByParams').resolves(STOCK_MINUTES_RESPONSE);
    const response = await controller.getTickersByName(req);
    chai.expect(response.status).eq(http_status_codes.Ok);

    mockService.verify();
  });

  it('should return proper response when calling by proper date params', async () => {
    const controller = new Controller();
    const req = {
      body: {
        name: 'fb',
        date: '20200506'
      }
    };
    mockService.expects('getTickersByParams').resolves(STOCK_DATE_RESPONSE);
    const response = await controller.getTickersByParams(req);
    chai.expect(response.status).eq(http_status_codes.Ok);

    mockService.verify();
    mockService.restore();
  });

  it('should throw stock not found by specified params', async () => {
    const controller = new Controller();
    const req = {
      body: {
        name: 'afasdasasd',
        date: '20200506'
      }
    };
    mockService.expects('getTickersByParams').rejects('invalid stock name');
    const response = await controller.getTickersByParams(req);
    chai.expect(response.status).eq(http_status_codes.BadRequest);

    mockService.verify();
  });

  it('should throw error of not passing stock name', async () => {
    const controller = new Controller();
    const req = {
      body: {
        minutes: '20'
      }
    };
    const response = await controller.getTickersByParams(req);
    chai.expect(response.status).eq(http_status_codes.BadRequest);
  });

  it('should throw error for not passing date or minutes', async () => {
    const controller = new Controller();
    const req = {
      body: {
        name: 'fb'
      }
    };
    const response = await controller.getTickersByParams(req);
    chai.expect(response.status).eq(http_status_codes.BadRequest);
  });

  it('should throw error for passing invalid date format', async () => {
    const controller = new Controller();
    const req = {
      body: {
        name: 'fb',
        date: 'asjdfhasdflkd'
      }
    };
    const response = await controller.getTickersByParams(req);
    chai.expect(response.status).eq(http_status_codes.BadRequest);
  });

  it('should throw error for passing invalid minutes format', async () => {
    const controller = new Controller();
    const req = {
      body: {
        name: 'fb',
        date: 'asfasdad'
      }
    };
    const response = await controller.getTickersByParams(req);
    chai.expect(response.status).eq(http_status_codes.BadRequest);

    mockService.verify();
  });
});

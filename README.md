# Stock Ticker API to get stock data

This is simple stock ticker API to get data from https://cloud.iexapis.com

## API List

1. GET - /stock/{stockName}

Sample Request

http://localhost:8080/stock/fb

2. POST - /stocks

Sample Request 

{
	"name": "fb",
	"minutes": "20"
}

You can also pass a date parameter as below

{
	"name": "fb",
	"date": "20200706" //yyyyddmm
}

All the validations for request parameters are covered in API

This is a dockerized application to start it you can first build with below command.

docker-compose build

After that you can run 

docker-compose up

As mentioned above this API internally calls a third patry service from https://cloud.iexapis.com

You can modify the .env API_KEY_IEX to view data for your access key.




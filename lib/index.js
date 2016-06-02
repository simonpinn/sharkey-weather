//import http from 'http';
import {writeData, fetchData} from './dataAccess.js';
import native from 'pg';
import rfxcom from 'rfxcom';
import express from 'express';

var connectionString = "pg://postgres:password@localhost/weather";
var app = express();
app.set('view engine', 'ejs');
var port = 8081;

/*
TODO: Create a table per recording type
CREATE TABLE wind (created_date TIMESTAMP DEFAULT NOW(), direction NUMBER, gustSpeed FLOAT, averageSpeed FLOAT);
CREATE TABLE temperatureHumidity (created_date TIMESTAMP DEFAULT NOW(), temperature FLOAT, humidity NUMBER, humidityStatus NUMBER);
CREATE TABLE rain (created_date TIMESTAMP DEFAULT NOW(), rainfall FLOAT, rainfallRate FLOAT);

insert on each .on
route for each type
PUSH TO A REPO...
*/

var rfxtrx = new rfxcom.RfxCom('COM3', {debug: true});

var connectionString = "pg://postgres:password@localhost/weather";
var windSql = "INSERT INTO wind (direction, gustSpeed, averageSpeed) VALUES ($1, $2, $3)";
var tempSql = "INSERT INTO temperatureHumidity (temperature, humidity, humidityStatus) VALUES ($1, $2, $3)";
var rainSql = "INSERT INTO rain (rainfall, rainfallRate) VALUES ($1, $2)";

rfxtrx.on("wind2", function (evt) {
  console.log('wind', evt);
  writeData(connectionString, native, windSql, [evt.direction, evt.gustSpeed, evt.averageSpeed]);
});

rfxtrx.on("th2", function (evt) {
  writeData(connectionString, native, tempSql, [evt.temperature, evt.humidity, evt.humidityStatus]);
});

rfxtrx.on("rain2", function (evt) {
  writeData(connectionString, native, rainSql, [evt.rainfall, evt.rainfallRate]);
});

rfxtrx.initialise(function () {
    console.log("Device initialised");
});


//app.use(express.static('src/views'));
app.use(express.static('bower_components'));

app.get('/', function(req, res){
    
    var windData, tempData, rainData;
    
    fetchData(connectionString, native, "SELECT * FROM wind ORDER BY created_date DESC LIMIT 50", (data) => {
        windData = data;
        fetchData(connectionString, native, "SELECT * FROM temperatureHumidity ORDER BY created_date DESC LIMIT 50", (data)=> {
           tempData = data;
           fetchData(connectionString, native, "SELECT * FROM rain ORDER BY created_date DESC LIMIT 50", (data)=> {
               rainData = data;
               res.render('index', {windData: windData, tempData: tempData, rainData: rainData});
           }); 
        });
    });
});

app.listen(port, function(err){
    console.log('running on port: ' + port);
});
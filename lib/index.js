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

var datesSql = "select to_char(created_date, 'yyyy-MM-DD') from wind group by to_char(created_date, 'yyyy-MM-DD') union select to_char(created_date, 'yyyy-MM-DD') from temperatureHumidity group by to_char(created_date, 'yyyy-MM-DD') order by to_char desc";


//app.use(express.static('src/views'));
app.use(express.static('bower_components'));

app.get('/api/data/wind', (req, res)=> {
    var param = getDateParam(req);
    fetchData(connectionString, native, `SELECT * FROM wind WHERE to_char(created_date, 'yyyy-MM-DD')='${param}' ORDER BY created_date ASC`, (data) => {
        res.send(data);
    });
});

app.get('/api/data/temp', (req, res)=> {
    var param = getDateParam(req);
    fetchData(connectionString, native, `SELECT * FROM temperatureHumidity WHERE to_char(created_date, 'yyyy-MM-DD')='${param}' ORDER BY created_date DESC`, (data)=> {
        res.send(data);
    });
});

app.get('/api/data/rain', (req, res)=> {
    var param = getDateParam(req);
    fetchData(connectionString, native, `SELECT * FROM rain WHERE to_char(created_date, 'yyyy-MM-DD')='${param}' ORDER BY created_date DESC LIMIT 50`, (data)=> {
        res.send(data);
    });
});

function getDateParam(req){
    var param = req.query.date ? req.query.date : new Date(Date.now()).toISOString().slice(0,10);;
    return param;
}

app.get('/', function(req, res) {
    //accept a param for current date
    var param = getDateParam(req);
    fetchData(connectionString, native, datesSql, (data) => {
        res.render('index', {
            dates: data,
            currentDate: param
        });
    });
});



app.listen(port, function(err){
    console.log('running on port: ' + port);
});

var rfxtrx = new rfxcom.RfxCom('COM4', {debug: true});

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

/*

 <div class="row">
 <h2>Rain</h2>
 <table class="table">
 <tr>
 <th>Recorded</th><th>Rainfall</th><th>Rainfall Rate</th>
 </tr>
 <% for(var k=0;k < rainData.length; k++){ %>
 <tr>
 <td><%=rainData[k].created_date %></td>
 <td><%=rainData[k].rainfall %></td>
 <td><%=rainData[k].rainfallrate %></td>
 </tr>
 <% } %>
 </table>
 </div>
 */
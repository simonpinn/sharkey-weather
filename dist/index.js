'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _test = require('./test.js');

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_pg2.default);
console.log(new _test.MyClass());
console.log((0, _test.SayHi)());

_http2.default.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7O0FBRUE7Ozs7OztBQUVBLFFBQVEsR0FBUjtBQUNBLFFBQVEsR0FBUixDQUFZLG1CQUFaO0FBQ0EsUUFBUSxHQUFSLENBQVksa0JBQVo7O0FBRUEsZUFBSyxZQUFMLENBQWtCLENBQUMsR0FBRCxFQUFNLEdBQU4sS0FBYztBQUM5QixNQUFJLFNBQUosQ0FBYyxHQUFkLEVBQW1CLEVBQUMsZ0JBQWdCLFlBQWpCLEVBQW5CO0FBQ0EsTUFBSSxHQUFKLENBQVEsZUFBUjtBQUNELENBSEQsRUFHRyxNQUhILENBR1UsSUFIVixFQUdnQixXQUhoQjs7QUFLQSxRQUFRLEdBQVIsQ0FBWSwwQ0FBWiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xyXG5pbXBvcnQge015Q2xhc3MsIFNheUhpfSBmcm9tICcuL3Rlc3QuanMnO1xyXG5cclxuaW1wb3J0IG5hdGl2ZSBmcm9tICdwZyc7XHJcblxyXG5jb25zb2xlLmxvZyhuYXRpdmUpO1xyXG5jb25zb2xlLmxvZyhuZXcgTXlDbGFzcygpKTtcclxuY29uc29sZS5sb2coU2F5SGkoKSk7XHJcblxyXG5odHRwLmNyZWF0ZVNlcnZlcigocmVxLCByZXMpID0+IHtcclxuICByZXMud3JpdGVIZWFkKDIwMCwgeydDb250ZW50LVR5cGUnOiAndGV4dC9wbGFpbid9KTtcclxuICByZXMuZW5kKCdIZWxsbyBXb3JsZFxcbicpO1xyXG59KS5saXN0ZW4oMTMzNywgJzEyNy4wLjAuMScpO1xyXG5cclxuY29uc29sZS5sb2coJ1NlcnZlciBydW5uaW5nIGF0IGh0dHA6Ly8xMjcuMC4wLjE6MTMzNy8nKTsiXX0=
//http server framework
var connect = require('connect');
var serveStatic = require('serve-static');
let port = 3000;
connect().use(serveStatic(__dirname)).listen(port, function () {
    console.log(`Server running on http://localhost:${port}`);
});

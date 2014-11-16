
    // A really simple node server for serving static files
    //
    // : To install
    // $ npm install express
    // $ npm install morgan
    //
    //
    // : To Run
    // node server.js
    // put your static files in /public/ directory

    var express    = require( 'express' ),
        morgan     = require( 'morgan' ),
        server     = express(),

        staticPath = __dirname + '/public/',
        port       = 3000;

    server.use( morgan('dev') );
    server.use( express.static(staticPath) );
    server.listen( port );

    console.log('Started Server on: http://localhost:' + port);


const express 	= require('express')
const bodyParser= require('body-parser')
const useragent = require('express-useragent')
const promise 	= require('bluebird')
const pg_promise= require('pg-promise')({ promiseLib: promise })
const config 	= require('./config/environment')
const http 		= require('http')
const swagger 	= require('swagger-express')



process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
console.log('NODE_TLS_REJECT_UNAUTHORIZED=0')

//load
module.exports = () => promise.try(() => preload()).then(start).catch(handleError)

//error
function handleError(err) {
    console.log('handleError', err)
}

//pre start
function preload() {
    console.log('load pre-start')
    return new promise(function(resolve, reject) {
        console.log('DB:'+config.db.pg)
        promise.try(() => pg_promise(config.db.pg))
            .then(instance => {
                console.log('pg connected!')
                global.pg = instance
                resolve(true)
            })
            .catch(error => {
                reject('Error connect pg:'+error)
            })
    })
}

//app start
function start() {
    let app = express()
    let server = http.createServer(app)
    app.disable('x-powered-by')
    app.set('trust proxy', true);
    app.set('port', process.env.PORT || config.port)
    app.use(bodyParser.urlencoded({
        extended: true,
        parameterLimit: 1000000
    }));
    app.use(bodyParser.json());
    app.use(function(err, req, res, next) {
        if (err) throw [400, 'invalid.']
        return next();
    });
    app.use(useragent.express())
    // for swagger docs
    app.use(swagger.init(app, {
        basePath: 'http://54.255.246.88',
        swaggerURL: '/docs',
        swaggerUI: './app/docs'
    }));

    //load routers
    require('./router')(app)
    //start server
    server.listen(app.get('port'), function() {
        let msg = "Start on port:" + (app.get('port'))
        console.log(msg)
        return true
    });
    app.server = server
    return app
}

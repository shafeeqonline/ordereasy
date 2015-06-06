var routeHelper = require('./helpers/routerHelper'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    port = 9990;
 
// middlewares
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/Public'));
 
// listening to the port
app.listen(process.env.PORT || port);
 
router.get('/authenticate', routeHelper.callbacks[0]);
 
router.get('/users/:user_id', routeHelper.callbacks[1]);
 
router.get('/transactions', routeHelper.callbacks[2]);
 
router.get('/transactions/:trans_id', routeHelper.callbacks[3]);
 
router.put('/transactions', routeHelper.callbacks[4]);
 
router.put('/transactions/:trans_id', routeHelper.callbacks[5]);
 
router.delete('/transactions/:trans_id', routeHelper.callbacks[6]);

app.use('/api', router);

console.log('Listening to port: ' + port);


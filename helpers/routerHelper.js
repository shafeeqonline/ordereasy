var api = require('./mongoAPI'),
    db = 'ordereasy',
    Schema = api.getSchema(),
    ObjectId = Schema.ObjectId ,
    user = {
        name: 'users',
        schema: {
            _id: ObjectId,
            name: String,
            password: String,
            email: String
        }
    },
   transaction = {
        name: 'transactions',
        schema: {
            description: String,
            transDate: Date,
            userId: String,
            itemsIds: Array,
            transId: String,
            sellerDetail: String   
        }
    },
    errorObj = {
        msg: false
    },
    items = {
        name: 'items',
        schema: {
            price: Number,
            id: String,
            name: String,
            description: String,
            imagePath: String
        }
    },
    seller = {
        name: 'sellers',
        schema: {
            id: String,
            name: String,
            address: String,
            contact: String,
            location: String,
            emailId: String
        }
    };
 
 
api.connectToDb(db);
 
user.model = api.createModel(user.name, api.createSchema(user.schema));
transaction.model = api.createModel(transaction.name, api.createSchema(transaction.schema));
seller.model = api.createModel(seller.name, api.createSchema(seller.schema));
items.model = api.createModel(items.name, api.createSchema(items.schema));


module.exports = {
 
    callbacks: [
        function(req, res) {
           /**
             *  check if user is 'alive'
             *  if yes then let him access the page
             *  otherwise redirect him to login page
             *  check his credentials
             *  if true then update 'alive'
             *  return true or false
             *
             */
 
            api.getDoc(user.model, {
                _id: req.query.user_id
            }, function(err, result) {
 
                var returnValue = false;
 
                if (!err && result.length === 1) {
 
                    if (result[0].password === req.query.pwd) {
 
                        api.updateDoc(user.model, {
                            _id: req.query.user_id
                        }, {
                            alive: true
                        }, {}, function(err, result) {
 
                            res.send(!err && result ? true : returnValue);
 
                        });
                    } else {
                        res.send(returnValue+'1');
                    }
                } else {
                    res.send(returnValue+'2');
                }
            });
 
        },
        function(req, res) {
            /**
             *  check if user has session
             *  if yes then give him data corresponding to the id
             *  otherwise return false
             *
             */
            var filter = {
                    _id: api.getTypes(req.params.user_id)
                },
                display = {
                    _id: 0,
                    password: 0
                };
 
            console.log(api.getTypes(req.params.user_id));   
            api.getDoc(user.model, filter, display, function(err, result) {
 
                console.log(result);
                res.json(!err && result.length === 1 ? result : errorObj);
 
            });
        },
        function(req, res) {
            /**
             * return all transactions
             */
 
            var filter = {},
                display = {};
 
            api.getDoc(transaction.model, filter, display, function(err, result) {
                console.log(result);
                res.json(!err ? result : errorObj);
 
            });
        },
        function(req, res) {
            /**
             * return transaction with that particular id
             *
             */
 
            var filter = {
                    _id: req.params.trans_id
                },
                display = {};
 
            api.getDoc(transaction.model, filter, display, function(err, result) {
 
                res.json(!err && result.length === 1 ? result[0] : errorObj);
 
            });
        },
        function(req, res) {
            /**
             * create a new transaction
             *
             */
            var returnValue = false;
 
            if (Object.keys(req.body).length === 2) {
                var obj = req.body,
                    doc;
 
                obj.transDate = Date.now();
                doc = api.createDoc(transaction.model, obj);
 
                api.saveDoc(doc, function(err, result) {
                    res.send(!err && result ? true : returnValue);
                });
            } else {
                res.send(returnValue);
            }
 
        },
        function(req, res) {
            /**
             * update transaction with that particular id
             *
             */
            var filter = {
                    _id: req.params.trans_id
                },
                newObj = req.body,
                returnValue = false;
 
            api.updateDoc(transaction.model, filter, newObj, {}, function(err, result) {
                res.send(!err && result ? true : returnValue);
            });
 
        },
        function(req, res) {
            /**
             *  delete transaction with that particular id
             *
             */
            var filter = {
                    _id: req.params.trans_id
                },
                returnValue = false;
 
            api.removeDoc(transaction.model, filter, function(err, result) {
                res.send(!err && result ? true : returnValue);
            });
        }
 
    ]
}
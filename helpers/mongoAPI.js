var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
 
module.exports = {
    // connect to database
    connectToDb: function ( db ) {
        return mongoose.connect( 'mongodb://localhost/' + db );
    },
    getSchema: function () {
        return Schema;
    },
    createSchema: function ( schema ) {
        return new Schema(schema);
    },
    createModel: function ( modelName, schema ) {
        return mongoose.model( modelName, schema );   
    },
    createDoc: function ( model, obj ) {
        return new model( obj );
    },
    getTypes: function ( x ) {
        return mongoose.Types.ObjectId(x);
    },
    saveDoc: function ( doc, callback ) {
        doc.save( function ( err, result ) {
            // console.log( err ? 'Error' : result );
            callback && callback( err, result );
        });
    },
    getDoc: function ( query, condition, display, callback ) {
        query.find( condition, display, function( err, result ) {
            // console.log( err ? 'Error' : result );
            callback && callback( err, result );
        });
    },
    updateDoc: function ( model, condition, newobj, options, callback ) {
        model.update( condition, newobj, options, function( err, result ) {
            // console.log( err ? 'Error' : result );
            callback && callback( err, result );
        });
    },
    removeDoc: function ( model, condition, callback ) {
        model.remove( condition, function( err, result ) {
            // console.log( err ? 'Error' : result );
            callback && callback( err, result );
        });
    }
};

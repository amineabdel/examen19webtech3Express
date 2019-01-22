const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient

var db;
/*
MongoClient.connect('mongodb://localhost:27017/products', { useNewUrlParser: true },
 (err, database) => {
    if (err) return console.log(err)
    db = database.db('products')
    app.listen(process.env.PORT || 4000, () => {
      console.log('Listening on port 4000')
    })
})*/

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var originsWhitelist = ['http://localhost:4200'];

var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials: true
};

app.use(cors(corsOptions));

// Redirect to list
app.get('/', (req, res) => {
   res.send("weed");
})



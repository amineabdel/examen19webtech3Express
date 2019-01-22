const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient

var db;
url = 'mongodb://localhost:27017/examen';
MongoClient.connect(url, { useNewUrlParser: true },
  (err, database) => {
    if (err) return console.log(err)
    db = database.db('examen')
    app.listen(process.env.PORT || 4000, () => {
      console.log('Listening on port 4000')
    })
  })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// Redirect to list
app.get('/', (req, res) => {
 

  db.collection('inhaal').find().toArray((err, resultaat) => {
    console.log((resultaat));
    res.render("index.ejs",{ex: (resultaat)})
    //res.json(resultaat)
  })
})

app.post('/formAanvraag', (req, res) => {
  db.collection('inhaal').insertOne({ body: req.body, date: new Date() },{$exists: true}, (err, resultaat) => {
    res.redirect("/");
  })
})

app.get("/:stud", (req, res) => {
  console.log(req.body);
  
  db.collection("inhaal").find().toArray( (err, resultaat) => {
    res.render("index.ejs", { ex: resultaat })
  })
 
})

app.post("/search", (req, res) => {
  stud = req.body.student;
    db.collection("inhaal").find(stud).toArray( (err, resultaat) => {
      res.redirect("/" + stud);
    })
  });


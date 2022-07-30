var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

var port = 8000;   
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    age: String,
    gender: String,
    address: String
  });
var Contact = mongoose.model('Contact', contactSchema);
app.use('/static', express.static('static'))  
app.use(express.urlencoded())


var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());
// app.use('/posts',postsRoute);
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views')) 
app.get('/', (req,res) => {
    var params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req,res) => {
    var params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact',(req, res)=> {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });

})
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})


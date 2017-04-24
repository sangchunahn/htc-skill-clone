const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const massive = require('massive')
// const config = require('./config')


const app = module.exports = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./bundle.js'))

var db = massive.connectSync({
  connectionString: process.env.dbstring
  
});

app.set('db', db);
db.set_products(function(err){
  if (err) return console.log(err)
  else return console.log('User Table Init')
})

const controller = require('./controller')

app.get('/api/get-all-smartphones', controller.getAllSmartphones);
app.get('/api/get-all-accessories', controller.getAllAccessories);
app.get('/api/get-smartphone', controller.getSmartphone);
app.post('/api/add-to-cart', controller.addToCart);
app.get('/api/get-cart', controller.getCart);
app.delete('/api/delete-from-cart', controller.deleteFromCart);
app.post('/api/register', controller.register);
app.post('/api/login', controller.login);

app.get('*', function(req, res){
  res.sendFile(__dirname + '/index.html')
})
app.listen(3000, function(){
    console.log("listening on 3000")
})


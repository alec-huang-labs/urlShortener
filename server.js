require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser")
const validUrl = require("valid-url")

app.use(bodyParser.urlencoded({extended: false}))

// Basic Configuration
const port = 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


let shortUrl = 0;
let originalUrl = "";
var httpsRegex = /http/

app.post('/api/shorturl', function(req, res){
  console.log(req.body)
  originalUrl = req.body.url
  shortUrl = Math.floor(Math.random()*1000)
  console.log(shortUrl)
  if (!httpsRegex.test(originalUrl)){
      console.log(originalUrl)
      res.json({ error: 'invalid url' })
  } else {
    if(validUrl.isUri(originalUrl)){
      console.log('is a valid url')
      res.json({
        original_url: originalUrl, 
        short_url: shortUrl
      })
    } else {
      res.json({ error: 'invalid url' })
    }
  }
})

app.get('/api/shorturl/:shortUrlRegex', function(req,res){
  if (shortUrlRegex = shortUrl){
    res.redirect(originalUrl)
  }
})
 
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

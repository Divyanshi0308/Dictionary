const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000
const path = require('path')
const http = require('http')

app.get('/', (req, res) => {
  return res.sendFile("index.html", {root: __dirname});
})

app.get('/searchword', (req, res) => {
  
  console.log(req.params)
  //var word = "ridiculous";
  const urlParams = new URLSearchParams(req.url.split('?')[1]);
  const entry = urlParams.get('entry');
  
  var options ={
    method: 'get',
    url: 'https://api.dictionaryapi.dev/api/v2/entries/en/' + entry,

  };
  
  axios.request(options).then(function(response){
    res.json(response.data);
    console.info(JSON.stringify(response.data, null, 2));
  }).catch(function(error){
    console.log(error);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port} - http://localhost:3000`)
})
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

//setup express and body parser for posting
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//start on port 3001
app.set('port', 3001);

//homepage
app.get('/', (req, res) => {
	res.send('Pictor RTS Homepage');
});

//listen on specified port
app.listen(app.get('port'), () => {
  console.log(`Server started at http://localhost:${app.get('port')}/`);
});



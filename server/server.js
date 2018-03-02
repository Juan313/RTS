const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = JSON.parse(fs.readFileSync('server/config.json'))

//setup express and body parser for posting
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));

//start on passed in command line argument for port or port 3001
app.set('port', process.argv[2] || 3001);

//get homepage acessing index.html
app.get('/', (req, res) => {
	res.sendFile('index.html', {root: path.join(__dirname, '../client')});
});

let gameState = null;

//setup mongodb mongoose connection
const uriString = `mongodb://capstone:${config.password}@cluster0-shard-00-00-dvojy.mongodb.net:27017,cluster0-shard-00-01-dvojy.mongodb.net:27017,cluster0-shard-00-02-dvojy.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`;

mongoose.connect(uriString, (err, res) => {
	if(err){
		console.log(err);
	}else{
		console.log('Connected to database');
	}
});

//create schema for user game state
const gameStateSchema = new mongoose.Schema({
	userName: { type: String },
	password: { type: String },
	userHouse: { type: String },
	AIHouse: { type: Number, min: 0 },
	userWheat: { type: Number, min: 0 },
	userTimber: { type: Number, min: 0 },
	AIWheat: { type: Number, min: 0 },
	AITimber: { type: Number, min: 0 },
	sortedItems: { type: Array },
	selectedItems: { type: Array }
});

const GameState = mongoose.model('GameState', gameStateSchema);

//update the current user's save state if it exists, creating a new one if there aren't any
app.post('/save', (req, res) => {
	GameState.findOneAndUpdate({userName: req.body.userName, password: req.body.password},
	{userHouse: req.body.userHouse, AIHouse: req.body.AIHouse, userWheat: req.body.userWheat, userTimber: req.body.userTimber,
	AIWheat: req.body.AIWheat, AITimber: req.body.AITimber, sortedItems: req.body.sortedItems,
	selectedItems: req.body.selectedItems}, {new: true, upsert: true}, (err, state) =>{
		if(err){
			console.log(err);
		}
	});
});

//find and return the user's current save state
app.post('/load', (req, res) => {
	GameState.findOne({'userName': req.body.userName, 'password': req.body.password}, (err, state) =>{
		if(err){
			console.log(err);
		}else{
			if(state == null){
			 state = JSON.stringify({failed: true});	
			}
			res.send(state);
		}
	});
});

//Don't display console dialog when deploying
if(process.env.DEPLOY == 1){
	app.listen(app.get('port'));
}else{
	//listen on specified port
	app.listen(app.get('port'), () => {
		console.log(`Server started at http://localhost:${app.get('port')}/`);
	});
}



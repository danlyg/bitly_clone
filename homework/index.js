var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var RString = require("randomstring");

var app = express();
var views = path.join(process.cwd(), "views"); //look this up
app.use(bodyParser.urlencoded({extended: true}));


var urls = {};


app.get('/', function (req, res) {
	var homePath = path.join(views, "home.html");
	res.sendFile(homePath);
});

app.get("/urls", function (req, res) {
	var urlsText = urls.join(", ");
	res.send(urlsText);
});

app.post("/urls", function (req, res) {
	console.log(req.body.url);
	var newUrl = req.body.url;
	var randomString = RString.generate();
	urls[randomString] = newUrl.link;
	res.send('URL shortened, GOTO localhost:3000/urls/' + randomString);
});

app.get("/urls/:index", function (req, res) {
	var url = urls[req.params.index];
	res.redirect(url);
});

app.listen(3000, function (req, res) {
	console.log("working!!")
});





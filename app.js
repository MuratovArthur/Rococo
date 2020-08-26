var express    = require("express"),
    ejs        = require('ejs'),
    mongoose   = require("mongoose"),
    bodyParser = require("body-parser"), 
    app        = express();

mongoose.connect("mongodb://localhost/rococo", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var foodSchema = new mongoose.Schema({
	image: String,
	title: String,
	subtitle: String,
	description: String,
	extra: String
});

var Food = mongoose.model("Food", foodSchema);

var filmSchema = new mongoose.Schema({
	image: String,
	title: String,
	subtitle: String,
	description: String,
	link: String
});

var Film = mongoose.model("Film", filmSchema);

var studySchema = new mongoose.Schema({
	image: String,
	title: String,
	subtitle: String,
	description: String,
	link: String
});

var Study = mongoose.model("Study", studySchema);

app.get("/", function (req, res){
	res.render("landing");
});

app.get("/food", function (req, res){
  Food.find({}, function(err, foodCards){
		if (err){
           console.log(err);
		}else{
            res.render("food", {foodCards: foodCards});
		}
	})
});

app.get("/films", function (req, res){
  Film.find({}, function(err, filmCards){
		if (err){
           console.log(err);
		}else{
            res.render("films", {filmCards: filmCards});
		}
	})
});

app.get("/study", function (req, res){
  Study.find({}, function(err, studyCards){
		if (err){
           console.log(err);
		}else{
            res.render("study", {studyCards: studyCards});
		}
	})
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});


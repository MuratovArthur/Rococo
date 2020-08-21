var express = require("express"),
    ejs     = require('ejs'),
    app     = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res){
	res.render("landing");
});

app.get("/food", function (req, res){
  res.render("food");
});

app.get("/films", function (req, res){
  res.render("films");
});

app.get("/study", function (req, res){
  res.render("study");
});


app.listen(3000, function() { 
  console.log("Server listening on port 3000"); 
});


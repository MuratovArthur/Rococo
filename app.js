var express    = require("express"),
    ejs        = require('ejs'),
    mongoose   = require("mongoose"),
    bodyParser = require("body-parser"), 
    session      = require('express-session'),
    flash        = require('req-flash'),
    app        = express();

require('dotenv').config()

const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
AdminBro.registerAdapter(AdminBroMongoose)    

var urlencoded = bodyParser.urlencoded({ extended: true }) ;


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(session({ 
  secret:  process.env.CK_PASS,
  resave: true,
  saveUninitialized: true
}));
app.use(flash());


var formSchema = new mongoose.Schema({
  name: String,
  city: String,
  email: String,
  phone: String,
  topic: String,
  message: String
});

var Form = mongoose.model("Form", formSchema);

var foodSchema = new mongoose.Schema({
	image: String,
	title: String,
	subtitle: String,
	description: String,
	link: String
});

var Food = mongoose.model("Food", foodSchema);

var wearSchema = new mongoose.Schema({
	image: String,
	title: String,
	subtitle: String,
	description: String,
	link: String
});

var Wear = mongoose.model("Wear", wearSchema);

var studySchema = new mongoose.Schema({
	image: String,
	title: String,
	subtitle: String,
	description: String,
	link: String
});

var Study = mongoose.model("Study", studySchema);

const run = async () => {
  const mongooseDb = await mongoose.connect(process.env.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true })

  const adminBro = new AdminBro({
    databases: [mongooseDb],
  })

  const ADMIN = {
  email: process.env.AD_EMAIL,
  password: process.env.AD_PASS,
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN
    }
    return null
  },
  cookieName: 'adminbro',
  cookiePassword: process.env.CK_PASS,
})

  app.use(adminBro.options.rootPath, router)
}

run()

app.get("/", function (req, res){
	res.render("landing", {flash: req.flash('success') });
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

app.get("/wear", function (req, res){
  Wear.find({}, function(err, wearCards){
		if (err){
           console.log(err);
		}else{
            res.render("wear", {wearCards: wearCards});
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

app.post('/message', urlencoded, function (req, res){
     Form.create(req.body.form, function (err , newForm){
       if(err){
        res.render("landing");
       } else {
        req.flash('success', 'Спасибо! Ваше сообщение было успешно отправлено.');
        res.redirect("/#message");
       }
     });
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});


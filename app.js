const express = require('express');
const app = express();
app.use(express.static("./public"));
app.set('views', "./pages");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const session = require('express-session');
app.use(session({ secret:'SupaPassword',proxy:true,resave:true,saveUninitialized:true,cookie:{ maxAge: 86000*60*60*60}}))
const mysql = require('mysql2');
function connect_db(){return mysql.createConnection({host:'localhost', user:'root',password:'',database:''})};
const mysql_promise = require('promise-mysql');
function connect_db_promise(){return mysql_promise.createConnection({host:'localhost', user:'root',password:'',database:''})};
const hbs = require('hbs');
app.set('view engine', 'hbs');
hbs.registerPartials('./pages/templates');

app.get('/', (req,res)=>{
    if(typeof req.session.user=='undefined')
    res.redirect('/authorisation');
    else
    res.render('index')
});

app.get('/authorisation', (res,req)=>{
    res.render('authorisation');
});


const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Server started on ${port}`));

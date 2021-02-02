//Подключение модулей
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
function connect_db_promise(){return mysql_promise.createConnection({host:'localhost', user:'root',password:'',database:'',multipleStatements:true})};
const hbs = require('hbs');
app.set('view engine', 'hbs');
hbs.registerPartials('./pages/templates');
app.use((req,res,next)=>{
    req.session.user="admin";
    next();
})
//GET-Запросы
app.get('/', (req,res)=>{
    if(typeof req.session.user=='undefined')
    res.redirect('/welcome');
    else{
    var connect = connect_db()
    connect.query('', (data,err)=>{
        if(err) throw err;
        res.render('index', {modules:data});
    });}
});
app.get('/welcome', (req,res)=>{
    if(typeof req.session.user!=='undefined')
    res.redirect('/');
    else
    res.render('welcomepage');
});

//POST-Запросы
app.post('/authorisation', urlencodedParser, (res,res)=>{
    var connect = connect_db();

    var login = `${req.body.login}`.replace(/\'|\"|\s/gi,'');
    connect.query('SELECT * from')
})
//Обработка ошибок
app.use((req, res)=>{
    res.status(404).render('error404', {title: "Ошибка 404"});
});
//Прослушивание порта
app.listen(3000);

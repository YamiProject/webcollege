const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({extended: false});
const cors = require('cors');
app.use(cors());
const session = require('express-session');
app.use(session({ secret:'SupaPassword',proxy:true,resave:true,saveUninitialized:true,cookie:{ maxAge: 86000*60*60*60}}))
const mysql = require('mysql2');
function connect_db(){return mysql.createConnection({host:'localhost', user:'root',password:'',database:''})};
app.get('/', (req,res)=>{
    res.send('wawddw');
});
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Server started on ${port}`));

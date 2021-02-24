//Подключение модулей
const express=require('express'); 
const app=express();
app.use(express.static("./public"));
app.set('views',"./pages");
const bodyParser=require('body-parser');
const urlencodedParser=bodyParser.urlencoded({extended: false});
const session=require('express-session');
app.use(session({secret:'SupaPassword',proxy:true,resave:true,saveUninitialized:true,cookie:{maxAge: 86000*60*60*60}}));
const cookieParser=require('cookie-parser');
const mysql=require('mysql2');
function connect_db(){return mysql.createConnection({host:'localhost', user:'root',password:'',database:'webcollege_db'})};
const mysql_promise=require('promise-mysql');
function connect_db_promise(){return mysql_promise.createConnection({host:'localhost',user:'root',password:'',database:'',multipleStatements:true})};
const hbs=require('hbs');
app.set('view engine','hbs');
hbs.registerPartials('./pages/templates');
hbs.registerHelper('equal',(first,second)=>{
    return first==second?true:false;
});
hbs.registerHelper('define', val=>{
    return typeof val!=='undefined'?true:false;
});
//Класс пользователя серверной части
class ServerUser{
    //Конструктор
    constructor(){
        //Серверные данные
        this.user_data;
        this.user_lvl;
        this.user_role;
        //Данные клиента
        this.user_surname;
        this.user_name;
        this.user_middlename;
        this.user_phone;
        this.user_bd;
        this.user_photo;
        this.user_group;
    }
    //Методы
    setUser(id,lvl,role,token,surname,name,middlename,number,birth_day,photo){
        this.user_data=id;
        this.user_lvl=lvl;
        this.user_role=role;
        this.user_token=token;
        this.user_surname=surname;
        this.user_name=name;
        this.user_middlename=middlename;
        this.user_number=number;
        this.user_bd=birth_day;
        this.user_photo=photo;
    }
    setUserGroup(group_id){
        this.user_group=group_id;
    }
    setUserTOKEN(){

    }
    //Функции
    getUserState(){
        return [this.user_data,this.user_lvl,this.user_role];
    }
    getUserData(){
        return [this.user_surname,this.user_name,this.user_middlename,this.user_phone,this.user_photo];
    }
    getUserTOKEN(){

    }
    addPortfolio(){

    }
    createQuery(query){
        var connect=connect_db();
        connect.query(`${query}`, (err,data)=>{
            if(err) throw err;
            return data;
        });
    }
    clearData(){
        this.user_data="";
        this.user_lvl="";
        this.user_role="";
        this.user_token="";
    }
}
//Экземпляр класса
var serverUser = new ServerUser();
//Проверка на существование сессии
app.use((req,res,next)=>{
    if(typeof req.session.user=='undefined')
        req.session.user="none";
    next();
});
//Создание проверочной сессии
app.use((req,res,next) =>{
    serverUser.setUser(1,1,"courator","12345",'Киселёва','Светлана', 'Владимировна','89166666666','./img/profile_avatars/c_1.png',1);
    req.session.user="@courator/1/2";
    app.set('views', `./pages/${serverUser.getUserState()[2]}`);
    next();
});
//Главная страница приложения
app.get('/welcomepage', (req,res)=>{
    app.set('views', "./pages");
    if(typeof req.session.user!=='undefined' && req.session.user!=='none')
        res.redirect('/');
    else
        res.render('index');
});
//Маршрутизация
app.get('/', (req,res)=>{
    app.set('views', "./pages");
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect('/welcomepage');
    else{
        console.log("dadad");
        app.set('views', `./pages/${serverUser.getUserState()[2]}`);
        res.redirect("/mainpage");}
});
//Авторизация
app.post('/authorisation', urlencodedParser, (req,res)=>{
    var connect = connect_db();
    var login = `${req.body.login}`.replace(/\'|\"|\s|\`/gi,'');
    var password = `${req.body.password}`.replace(/\'|\"|\s|\`/gi,'');
    if(login.slice(0,1)=="@")
        connect.query(`SELECT courator_id,courator_sur_name,courator_name,courator_mid_name,courator_number,courator_birth_date,courator_photo FROM curators WHERE curator_login=${login} AND curator_password=${password}`, (err,data)=>{
            if(err) throw err;
            if(typeof data[0]!=='undefined'){
                serverUser.setUser(data[0],data[1],"courator", `${data[0]}courator${data[0]}`,data[1],data[2],data[3],data[4],data[5],data[6]);
                req.session.user=`@courator/${data[0]}`;
                server.setUserGroup(serverUser.createQuery(`SELECT group_id FROM groups a inner join courators b on a.courator_id=b.courator_id WHERE a.courator_id=${serverUser.getUserState()[0]} AND group_end_education_date<NOW() ORDER BY group_id DESC LIMIT 1`));
                connect.end();
                res.end("Succsess");}
            else{
                connect.end();
                res.end("nExist");}
        });
    else if(login.slice(0,1)=="$")
        connect.query(`SELECT tutor_id,tutor_sur_name,tutor_name,tutor_mid_name,tutor_number,tutor_birth_date,tutor_photo FROM tutors WHERE tutor_login=${login} AND tutor_password=${password}`, (err,data)=>{
            if(err) throw err;
            if(typeof data[0]!=='undefined'){
                serverUser.setUser(data[0],data[1],"tutor", `${data[0]}tutor${data[0]}`,data[1],data[2],data[3],data[4],data[5],data[6]);
                req.session.user=`$tutor/${data[0]}`;
                server.setUserGroup(serverUser.createQuery(`SELECT group_id FROM groups a inner join tutor b on a.tutor_id=b.tutor_id WHERE a.tutor_id=${serverUser.getUserState()[0]} AND group_end_education_date<NOW()`));
                connect.end();
                res.end("Succsess");}
            else{
                connect.end();
                res.end("nExist");}
        });
    else
        connect.query("SELECT * FROM students WHERE", (err,data)=>{
            if(err) throw err;
            if(typeof data[0]!=='undefined'){
                serverUser.setUser(data[0],0,"student", `${damta[0]}student${data[0]}`,data[2],data[3],data[4],data[5],data[6],data[9]);
                server.setUserGroup(serverUser.createQuery(`SELECT group_id FROM groups a inner join courators b on a.courator_id=b.courator_id WHERE a.courator_id=${serverUser.getUserState()[0]} AND group_end_education_date<NOW()`));
                req.session.user=`#student${data[0]}`;
                connect.end();
                res.end("Succsess");}
            else{
                connect.end();
                res.end("nExist");}
        });
})
//Общие страницы
app.get("/mainpage",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("index",{username: `${serverUser.getUserData()[0]} ${serverUser.getUserData()[1]} ${serverUser.getUserData()[2]}`});}
});
//
app.get("/profile",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("profile");}
})
//
app.get("/options",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("options");}
});
//Страницы куратора
app.get("/feed",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_feed");}
});
//
app.get("/mygroup",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_mygroup");}
});
//
app.get("/student/:id",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_student");}
});
app.get("/student/:id/info",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_student_info");}
});
//
app.get("/student/:id/portfolio",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_student_portfolio");}
});
//
app.get("/student/:id/additionaleducation",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_student_additionaleducation");}
});
//
app.get("/student/:id/attendance",(res,req)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_student_attendance");}
});
//
app.get("/mygroupevents",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_mygroupevents");}
});
//
app.get("/mygroupevents/parentingmeetings",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_parentingmeetings");}
});
//
app.get("/mygroupevents/classhours",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_classhours");}
});
//
app.get("/mygroupevents/offsite",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_offsite");}
});
//
app.get("/mygroupindividualwork",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_mygroupindividualwork");}
});
//
app.get("/mygroupindividualwork/accounting",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_mygroupindividualwork_accounting");}
});
//
app.get("/mygroupindividualwork/preventionadvice",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_mygroupindividualwork_preventionadvice");}
});
//
app.get("/mygroupindividualwork/socialpsychologisthelp",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_mygroupindividualwork_socialpsychologisthelp");}
});
//
app.get("/mygroupindividualwork/reports",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_mygroupindividualwork_reports");}
});
//
app.get("/mygroupgallery",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_mygroupgallery");}
});
//
//Страницы студента
app.get("/portfolio",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("s_portfolio");}
});
//Страницы тьютора
app.get("/grouplist",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("t_grouplist");}
});
//
app.get("/group/:id",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("t_grouplist");}
});
//
app.get("/group/:id/student/:id",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("t_grouplist");}
});
//Выход
app.get("/logout",(req,res)=>{
    serverUser.clearData();
    app.set('views', "./pages");
    delete req.session.user;
    res.redirect("/");
})
//Обработка ошибок
app.get("/accsesserror",(req,res)=>{
    res.render("accsesserror");
});
app.use((req, res)=>{
    res.status(404).render('error404',{title: "Ошибка 404"});
});
app.use((error, req, res, next)=>{
    res.status(500).render("error500",{title:"Непредвиденная ошибка"});
});
//Прослушивание порта
app.listen(3000);

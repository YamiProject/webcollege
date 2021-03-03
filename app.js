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
const mysql_promise=require('mysql2/promise');
function connect_db_promise(){return mysql_promise.createConnection({host:'localhost',user:'root',password:'',database:'webcollege_db',multipleStatements:true})};
const hbs=require('hbs');
app.set('view engine','hbs');
hbs.registerPartials('./pages/templates');
hbs.registerHelper('equal',(val1,val2,options)=>{
    return (val1==val2)?options.fn(this):options.inverse(this);
});
hbs.registerHelper('define', (val,options)=>{
    return typeof val!=='undefined'?options.fn(this):options.inverse(this);
});
hbs.registerHelper('datenormalise', val=>{
    return val;
});
//Класс пользователя серверной части
class ServerUser{
    //Конструктор
    constructor(){
        //Серверные данные
        this.user_id;
        this.user_role;
        //Данные клиента
        this.user_surname;
        this.user_name;
        this.user_middlename;
        this.user_photo;
        this.user_group;
    }
    //Методы
    setUser(id,role,token,surname,name,middlename,photo){
        this.user_id=id;
        this.user_role=role;
        this.user_token=token;
        this.user_surname=surname;
        this.user_name=name;
        this.user_middlename=middlename;
        this.user_photo=photo;
    }
    setUserGroup(group_id){
        this.user_group=group_id;
    }
    //Функции
    getUserState(){
        return [this.user_id,this.user_role];
    }
    getUserData(){
        return [this.user_surname,this.user_name,this.user_middlename,this.user_photo];
    }
    getUserGroups(){
        return this.user_group;
    }
    getUserTOKEN(){
        return this.user_token;
    }
    addPortfolio(){

    }
    async createQuery(query){
        var connect = await connect_db_promise();
        var [rows, fields] = await connect.query(query);
        connect.end()
        return rows;
    }
    clearData(){
        this.user_id="";
        this.user_role="";
        this.user_surname="";
        this.user_name="";
        this.user_middlename="";
        this.user_photo="";
        this.user_group="";
    }
}
//Экземпляр класса
var serverUser = new ServerUser();
//Конвейер обработки
//Проверка на существование сессии
app.use((req,res,next)=>{
    if(typeof req.session.user=='undefined')
        req.session.user="none";
    next();
});
//Создание проверочной сессии
app.use((req,res,next) =>{
    serverUser.setUser(1,"courator","12345",'Киселёва','Светлана', 'Владимировна','89166666666','./img/profile_avatars/c_1.png');
    serverUser.setUserGroup(1);
    req.session.user="@courator/1/2";
    app.set('views', `./pages/${serverUser.getUserState()[1]}`);
    next();
});
//Express GET-запросы
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
        app.set('views', `./pages/${serverUser.getUserState()[1]}`);
        res.redirect("/mainpage");}
});
//Общие страницы
app.get("/mainpage",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/");
    else{
        res.render("index",{username: `${serverUser.getUserData()[0]} ${serverUser.getUserData()[1]} ${serverUser.getUserData()[2]}`, role:serverUser.getUserState()[1]});}
});
//
app.get("/profile",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        let userData = serverUser.createQuery(`SELECT * \ 
        FROM ${serverUser.getUserState()[1]}s \
        WHERE ${serverUser.getUserState()[1]}_id=${serverUser.getUserState()[0]}`);
        res.render("profile",{userData:userData});}
})
//
app.get("/options",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("options");}
});
//Страницы куратора
//Лента
app.get("/feed",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        let posts = serverUser.createQuery(`SELECT feed_id, feed_data,feed_text \
        FROM feed \
        WHERE group_id=${serverUser.getUserGroups()}`);
        res.render("c_feed",{posts:posts});}
});
//Страница группы
app.get("/mygroup",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        let Query = await serverUser.createQuery(`SELECT student_id, student_sur_name,student_name,student_mid_name,student_photo,student_headman\
        FROM students\
        WHERE group_id=${serverUser.getUserGroups()};\ 
        SELECT spetiality_abbreviated\
        FROM spetialities a inner join groups b on a.spetiality_id=b.spetiality_id\
        WHERE b.group_id=${serverUser.getUserGroups()} LIMIT 1`);
        res.render("c_mygroup",{studentsList:Query[0],title:Query[1][0].spetiality_abbreviated});}
});
//Страница студента
app.get("/student/:id",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        let student = serverUser.createQuery(`SELECT * \
        FROM students \ 
        WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')}`);
        if(serverUser.getUserGroups()==data[1])
            res.render("c_student", {info:data});
        else
            res.redirect('/mygroup');
    }
});
//Страница информации о студенте
app.get("/student/:id/documents",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        serverUser.createQuery(`;SELECT * \ 
        FROM documents \
        WHERE a.student_id`)
        res.render("c_student_info");}
});
//Страница достижений студента
app.get("/student/:id/portfolio",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_student_portfolio");}
});
//Страница ДО/ДПО студента
app.get("/student/:id/additionaleducation",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_student_additionaleducation");}
});
//Страница посещаемости студента
app.get("/student/:id/attendance",(res,req)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_student_attendance");}
});
//Страница мероприятий
app.get("/mygroupevents",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_mygroupevents");}
});
//Страница родительских собраний
app.get("/mygroupevents/parentingmeetings",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_parentingmeetings");}
});
//Страница классных часов
app.get("/mygroupevents/classhours",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_classhours");}
});
//Страница выездных мероприятий
app.get("/mygroupevents/offsite",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_offsite");}
});
//Страница индвидуальной работы
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
//Страница совета по прафилактике
app.get("/mygroupindividualwork/preventionadvice",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_mygroupindividualwork_preventionadvice");}
});
//Страница работы социального психолога
app.get("/mygroupindividualwork/socialpsychologisthelp",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_mygroupindividualwork_socialpsychologisthelp");}
});
//Страница докладных на группу
app.get("/mygroupindividualwork/reports",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_mygroupindividualwork_reports");}
});
//Страница-галерея
app.get("/mygroupgallery",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("c_mygroupgallery");}
});
//Страницы студента
//Страница достижений
app.get("/portfolio",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("s_portfolio");}
});
//Страницы тьютора
//Список групп
app.get("/grouplist",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("t_grouplist");}
});
//Страница группы
app.get("/group/:id",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/")
    else{
        res.render("t_grouplist");}
});
//Страница студента
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
//Express POST-запросы
//Авторизация
app.post('/authorisation', urlencodedParser, (req,res)=>{
    var connect = connect_db();
    var login = `${req.body.login}`.replace(/\'|\"|\s|\`/gi,'');
    var password = `${req.body.password}`.replace(/\'|\"|\s|\`/gi,'');
    if(login.slice(0,1)=="@")
        connect.query(`SELECT courator_id,courator_sur_name,courator_name,courator_mid_name,courator_photo \ 
        FROM curators \
        WHERE curator_login='${login}' AND curator_password='${password}'`, (err,data)=>{
            if(err) throw err;
            if(typeof data[0]!=='undefined'){
                serverUser.setUser(data[0],"courator", `${data[0]}courator${data[0]}`,data[1],data[2],data[3],data[4]);
                req.session.user=`@courator/${data[0]}`;
                server.setUserGroup(serverUser.createQuery(`SELECT group_id \
                FROM groups a INNER JOIN courators b ON a.courator_id=b.courator_id \
                WHERE a.courator_id=${serverUser.getUserState()[0]} AND group_end_education_date<NOW() ORDER BY group_id DESC LIMIT 1`));
                connect.end();
                res.end("Succsess");}
            else{
                connect.end();
                res.end("nExist");}
        });
    else if(login.slice(0,1)=="$")
        connect.query(`SELECT tutor_id,tutor_sur_name,tutor_name,tutor_mid_name,tutor_photo \ 
        FROM tutors \
        WHERE tutor_login='${login}' AND tutor_password='${password}'`, (err,data)=>{
            if(err) throw err;
            if(typeof data[0]!=='undefined'){
                serverUser.setUser(data[0],"tutor", `${data[0]}tutor${data[0]}`,data[1],data[2],data[3],data[4]);
                req.session.user=`$tutor/${data[0]}`;
                server.setUserGroup(serverUser.createQuery(`SELECT group_id \
                FROM groups a INNER JOIN tutor b ON a.tutor_id=b.tutor_id \
                WHERE a.tutor_id=${serverUser.getUserState()[0]} AND group_end_education_date<NOW()`));
                connect.end();
                res.end("Succsess");}
            else{
                connect.end();
                res.end("nExist");}
        });
    else
        connect.query(`SELECT student_id,student_sur_name,student_name,student_mid_name,student_photo,group_id \ 
        FROM students \
        WHERE student_login='${login}' AND student_password='${password}'`, (err,data)=>{
            if(err) throw err;
            if(typeof data[0]!=='undefined'){
                serverUser.setUser(data[0],"student", `${damta[0]}student${data[0]}`,data[1],data[2],data[3],data[4]);
                server.setUserGroup(data[5]);
                req.session.user=`#student/${data[0]}`;
                connect.end();
                res.end("Succsess");}
            else{
                connect.end();
                res.end("nExist");}
        });
});
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

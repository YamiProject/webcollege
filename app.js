//Подключение модулей
//NodeJs Express
const express=require('express'); 
const app=express();
//Настройка дерикторий
app.use(express.static("./public"));
app.set('views',"./pages");
//Модуль BodyParser
const bodyParser=require('body-parser');
const urlencodedParser=bodyParser.urlencoded({extended: false});
//Модуль Express-Сессия
const session=require('express-session');
app.use(session({
    secret:'SupaPassword',
    proxy:true,
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge: 86000*60*60*60}
    }));
//Модуль Cookit-парсер
const cookieParser=require('cookie-parser');
//Модуль для работы с базой данных MySql2/Promise
const mysql_promise=require('mysql2/promise');
function connect_db_promise(){
    return mysql_promise.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'webcollege_db',
        multipleStatements:true
    })};
//Шаблонизатор Handlebars
const hbs=require('hbs');
app.set('view engine','hbs');
hbs.registerPartials('./pages/templates');
//HandleBars хелперы
hbs.registerHelper('equal',(val1,val2,options)=>{
    return (val1==val2)?options.fn(this):options.inverse(this);
});
hbs.registerHelper('define', (val,options)=>{
    return typeof val!=='undefined'?options.fn(this):options.inverse(this);
});
hbs.registerHelper('notnull', (val,options)=>{
    return val!==null?options.fn(this):options.inverse(this);
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
    getUserFullName(){
        return `${this.user_surname} ${this.user_name} ${this.user_middlename}`;
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
    async checkAccsess(type,id,equal_id){
        let result;
        switch(type){
            case "s":
                result=await this.createQuery(`SELECT group_id FROM students WHERE student_id=${id} LIMIT 1`);
                break;
            case "g":
                result=-1;
                break;
            case "sg":
                result=-1;
                break;
        }
        if(typeof result[0]!=='undefined'){
            return result[0].group_id==equal_id?true:false;
        }
        else{
            return false;
        }
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
    if(typeof req.session.user!=='undefined' && req.session.user!=='none'){
        res.redirect('/');
    }
    else{
        res.render('index');
    }
});
//Маршрутизация
app.get('/', (req,res)=>{
    app.set('views', "./pages");
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect('/welcomepage');
    }
    else{
        app.set('views', `./pages/${serverUser.getUserState()[1]}`);
        res.redirect("/mainpage");
    }
});
//Общие страницы
//Главная страница веб-приложения
app.get("/mainpage",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        res.render("index",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1], 
            role:serverUser.getUserState()[1]
        });
    }
});
//Страница профиля пользователя
app.get("/profile",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none')
        res.redirect("/");
    else{
        let userData=await serverUser.createQuery(`SELECT * \ 
        FROM ${serverUser.getUserState()[1]}s \
        WHERE ${serverUser.getUserState()[1]}_id=${serverUser.getUserState()[0]}`);
        res.render("profile",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1],
            userData:userData
        });
    }
});
//Страница опций
app.get("/options",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        res.render("options",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1]
        });
    }
});
//Страницы куратора
//Лента
app.get("/feed",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        let posts=await serverUser.createQuery(`SELECT feed_id, feed_data,feed_text \
        FROM feed \
        WHERE group_id=${serverUser.getUserGroups()}`);
        res.render("c_feed",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1],
            posts:posts
        });
    }
});
//Страница группы
app.get("/mygroup",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        let group = await serverUser.createQuery(`SELECT student_id, student_sur_name,student_name,student_mid_name,student_photo,student_headman \
        FROM students \
        WHERE group_id=${serverUser.getUserGroups()};\ 
        SELECT spetiality_abbreviated \
        FROM spetialities a inner join groups b on a.spetiality_id=b.spetiality_id \
        WHERE b.group_id=${serverUser.getUserGroups()} LIMIT 1`);
        res.render("c_mygroup",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1],
            title:group[1][0].spetiality_abbreviated,
            studentsList:group[0]
        });
    }
});
//Страница студента
app.get("/student/:id",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else if(!await serverUser.checkAccsess("s",JSON.stringify(req.params.id).replace(/\"/gi,''),serverUser.getUserGroups())){
        res.redirect("/accsesserror");
    }
    else{
        let student=await serverUser.createQuery(`SELECT * \
        FROM students \ 
        WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')}`);
        res.render("c_student",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1],
            title:`${student[0].student_sur_name} ${student[0].student_name} ${student[0].student_mid_name}`,
            student:student
        });
    }
});
//Страница информации о студенте
app.get("/student/:id/documents",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else if(!await serverUser.checkAccsess("s",JSON.stringify(req.params.id).replace(/\"/gi,''),serverUser.getUserGroups())){
        res.redirect("/accsesserror");
    }
    else{
        let studentsDocumentary=await serverUser.createQuery(`SELECT * \
        FROM students \ 
        WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
        SELECT * \
        FROM passports \
        WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
        SELECT * \ 
        FROM documents \
        WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};`)
        res.render("c_student_documents",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1],
            title:`${studentsDocumentary[0][0].student_sur_name} ${studentsDocumentary[0][0].student_name} ${studentsDocumentary[0][0].student_mid_name}`,
            student:studentsDocumentary[0][0],
            passport:studentsDocumentary[1],
            documents:studentsDocumentary[2]
        });
    }
});
//Страница достижений студента
app.get("/student/:id/portfolio",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else if(!await serverUser.checkAccsess("s",JSON.stringify(req.params.id).replace(/\"/gi,''),serverUser.getUserGroups())){
        res.redirect("/accsesserror");
    }
    else{
        let studentPortfolio=serverUser.createQuery(`SELECT * \
        FROM students \ 
        WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
        SELECT * \
        FROM portfolio \
        WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};`)
        res.render("c_student_portfolio",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1],
            title:`${studentPortfolio[0][0].student_sur_name} ${studentPortfolio[0][0].student_name} ${studentPortfolio[0][0].student_mid_name}`,
            student:studentPortfolio[0][0],
            portfolio:studentPortfolio[1]
        });
    }
});
//Страница ДО/ДПО студента
app.get("/student/:id/additionaleducation",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else if(!await serverUser.checkAccsess("s",JSON.stringify(req.params.id).replace(/\"/gi,''),serverUser.getUserGroups())){
        res.redirect("/accsesserror");
    }
    else{
        let studentAdditionEducation=serverUser.createQuery(`SELECT * \
        FROM students \ 
        WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
        SELECT * \
        FROM additional_educations a INNER JOIN courses b ON a.ae_id=b.ae_id \
        WHERE b.student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')}`);
        res.render("c_student_additionaleducation",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1],
            title:`${studentAdditionEducation[0][0].student_sur_name} ${studentAdditionEducation[0][0].student_name} ${studentAdditionEducation[0][0].student_mid_name}`,
            student:studentAdditionEducation[0][0],
            portfolio:studentAdditionEducation[1]
        });
    }
});
//Страница посещаемости студента
app.get("/student/:id/attendance",async(res,req)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else if(!await serverUser.checkAccsess("s",JSON.stringify(req.params.id).replace(/\"/gi,''),serverUser.getUserGroups())){
        res.redirect("/accsesserror");
    }
    else{
        let studentAttendance=await serverUser.createQuery(`SELECT * \
        FROM students \ 
        WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
        SELECT * \
        FROM absenteeismes \
        WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};`);
        res.render("c_student_attendance",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1],
            title:`${studentAttendance[0][0].student_sur_name} ${studentAttendance[0][0].student_name} ${studentAttendance[0][0].student_mid_name}`,
            student:studentAttendance[0][0],absenteeismes:studentAttendance[1]});
    }
});
//Страница мероприятий
app.get("/mygroupevents",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        res.render("c_mygroupevents",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1]
        });
    }
});
//Страница родительских собраний
app.get("/mygroupevents/parentingmeetings",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        let meetingsList=await serverUser.createQuery(`SELECT * \
        FROM events a INNER JOIN event_types b ON a.event_type_id=b.event_type_id \ 
        WHERE event_type_name LIKE 'Родительское собрание'`);
        res.render("c_parentingmeetings",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1]
        });
    }
});
//Страница классных часов
app.get("/mygroupevents/classhours",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        let classHoursList=await serverUser.createQuery(`SELECT * \
        FROM events a INNER JOIN event_types b ON a.event_type_id=b.event_type_id \ 
        WHERE event_type_name LIKE 'Классный час'`);
        res.render("c_classhours",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1],
            classHoursList:classHoursList
        });
    }
});
//Страница выездных мероприятий
app.get("/mygroupevents/offsite",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        let offsiteEventsList=await serverUser.createQuery(`SELECT * \
        FROM events a INNER JOIN event_types b ON a.event_type_id=b.event_type_id \ 
        WHERE event_type_name LIKE 'Выездное мироприятие'`);
        res.render("c_offsite",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1]
        });
    }
});
//Страница индвидуальной работы
app.get("/mygroupindividualwork",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        res.render("c_mygroupindividualwork",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1]
        });
    }
});
//Страница студентов, состоящих на учёте
app.get("/mygroupindividualwork/accounting",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        let iwAccountingList=await serverUser.createQuery(`SELECT iw_id,iw_type_name,iw_reasone,iw_date \
        FROM individual_works a INNER JOIN students b on a.student_id=b.student_id \
        INNER JOIN individual_work_types c on a.iw_type_id=b.iw_type_id \
        WHERE b.group_id=${serverUser.getUserGroups()} AND a.iw_type_name LIKE 'Учёт'`);
        res.render("c_mygroupindividualwork_accounting",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1],
            iwAccountingList:iwAccountingList
        });
    }
});
//Страница студентов приглашённых(на)/посетивших совет по прафилактике
app.get("/mygroupindividualwork/preventionadvice",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        let iwPreventionAdviceList=await serverUser.createQuery(`SELECT iw_id,iw_type_name,iw_reasone,iw_date \
        FROM individual_works a INNER JOIN students b on a.student_id=b.student_id \
        INNER JOIN individual_work_types c on a.iw_type_id=b.iw_type_id \
        WHERE b.group_id=${serverUser.getUserGroups()} AND a.iw_type_name LIKE 'Совет по профилактике'`);
        res.render("c_mygroupindividualwork_preventionadvice",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1],
            iwPreventionAdviceList:iwPreventionAdviceList
        });
    }
});
//Страница работы социального психолога
app.get("/mygroupindividualwork/socialpsychologisthelp",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        let iwSPHelpList=await serverUser.createQuery(`SELECT iw_id,iw_type_name,iw_reasone,iw_date \
        FROM individual_works a INNER JOIN students b on a.student_id=b.student_id \
        INNER JOIN individual_work_types c on a.iw_type_id=b.iw_type_id \
        WHERE b.group_id=${serverUser.getUserGroups()} AND a.iw_type_name LIKE 'Совет по профилактике'`);
        res.render("c_mygroupindividualwork_socialpsychologisthelp",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1],
            iwSPHelpList:iwSPHelpList
        });
    }
});
//Страница докладных на группу
app.get("/mygroupindividualwork/reports",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        let reports=await serverUser.createQuery(``);
        res.render("c_mygroupindividualwork_reports",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1]
        });
    }
});
//Страница посещаемости
app.get("/attendance",(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        res.render("c_attendance",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1]
        });
    }
});
//Страница-галерея
app.get("/mygroupgallery",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        let gallery=await serverUser.createQuery(`SELECT event_archive \
        FROM events a INNER JOIN groups b ON a.group_id=b.group_id`);
        res.render("c_mygroupgallery",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1],
            gallery:gallery
        });
    }
});
//Страницы студента
//Страница достижений
app.get("/portfolio",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        res.render("s_portfolio",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1]
        });
    }
});
//Страницы тьютора
//Список групп
app.get("/grouplist",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        res.render("t_grouplist",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1]
        });
    }
});
//Страница группы
app.get("/group/:id",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        res.render("t_grouplist",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1]
        });
    }
});
//Страница студента
app.get("/group/:id/student/:id",async(req,res)=>{
    if(typeof req.session.user=='undefined' || req.session.user=='none'){
        res.redirect("/");
    }
    else{
        res.render("t_grouplist",{
            username:serverUser.getUserFullName(), 
            role:serverUser.getUserState()[1]
        });
    }
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
app.post('/authorisation',urlencodedParser,async(req,res)=>{
    var connect = connect_db();
    var login = `${req.body.login}`.replace(/\'|\"|\s|\`/gi,'');
    var password = `${req.body.password}`.replace(/\'|\"|\s|\`/gi,'');
    if(login.slice(0,1)=="@"){
        connect.query(`SELECT courator_id,courator_sur_name,courator_name,courator_mid_name,courator_photo\ 
        FROM curators\
        WHERE curator_login='${login}' AND curator_password='${password}'`, (err,data)=>{
            if(err) throw err;
            if(typeof data[0]!=='undefined'){
                serverUser.setUser(data[0],"courator", `${data[0]}courator${data[0]}`,data[1],data[2],data[3],data[4]);
                req.session.user=`@courator/${data[0]}`;
                server.setUserGroup(serverUser.createQuery(`SELECT group_id \
                FROM groups a INNER JOIN courators b ON a.courator_id=b.courator_id \
                WHERE a.courator_id=${serverUser.getUserState()[0]} AND group_end_education_date<NOW() ORDER BY group_id DESC LIMIT 1`));
                connect.end();
                res.end("Succsess");
            }
            else{
                connect.end();
                res.end("nExist");
            }
        });
    }
    else if(login.slice(0,1)=="$"){
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
                res.end("Succsess");
            }
            else{
                connect.end();
                res.end("nExist");
            }
        });
    }
    else{
        connect.query(`SELECT student_id,student_sur_name,student_name,student_mid_name,student_photo,group_id \ 
        FROM students \
        WHERE student_login='${login}' AND student_password='${password}'`, (err,data)=>{
            if(err) throw err;
            if(typeof data[0]!=='undefined'){
                serverUser.setUser(data[0],"student", `${damta[0]}student${data[0]}`,data[1],data[2],data[3],data[4]);
                server.setUserGroup(data[5]);
                req.session.user=`#student/${data[0]}`;
                connect.end();
                res.end("Succsess");
            }
            else{
                connect.end();
                res.end("nExist");
            }
        });
    }
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

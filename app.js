//Подключение модулей
//NodeJs Express
const express=require('express'); 
const app=express();
//Работа с файлами
const fs=require("fs");
const formidable=require("formidable");
//Настройка дерикторий
app.use(express.static("./public"));
app.set('views',["./pages",`./pages/teacher`,`./pages/student`,`./pages/head`,`./pages/admin`]);
//Модуль BodyParser
const bodyParser=require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended:false});
//Модуль Express-Сессия
const session=require('express-session');
app.use(session({
    secret:'SupaPassword',
    proxy:true,
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge: 86000*60*60*60}
}));
//Модуль Crypto-js
const crypto=require('crypto');
//Шифрование данных
async function encrypt(string){
    let secret_key=crypto.createCipher('aes-128-cbc','Th3_SU[pA_$ecR31>pA$SsvV0r9');
    let encrypt_string=secret_key.update(string,'utf8','base64');
    encrypt_string+=secret_key.final('base64');
    return encrypt_string;
}
//Дешифрование данных
async function decrypt(string){
    var secret_key=await crypto.createDecipher('aes-128-cbc','Th3_SU[pA_$ecR31>pA$SsvV0r9');
    let decrypt_string=await secret_key.update(string,'base64','utf8');
    decrypt_string+=await secret_key.final('utf8');
    return decrypt_string;
}
//Модуль Cookie-парсер
const cookieParser=require('cookie-parser');
app.use(cookieParser());
//Модуль для работы с базой данных MySql2/Promise
const mysql=require("mysql2");
function connect_db(){
    return mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'webcollege_database',
        multipleStatements:true
    })
}
const mysql_promise=require('mysql2/promise');
function connect_db_promise(){
    return mysql_promise.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'webcollege_database',
        multipleStatements:true
    })
}
//Шаблонизатор Handlebars
const hbs=require('hbs');
app.set('view engine','hbs');
hbs.registerPartials('./pages/templates');
//HandleBars хелперы
//HandleBars: Проверка на соответствие
hbs.registerHelper('equal',(val1,val2,options)=>{
    return (val1==val2)?options.fn(this):options.inverse(this);
});
//HandleBars: Проверка на несоответствие
hbs.registerHelper('nequal',(val1,val2,options)=>{
    return (val1!==val2)?options.fn(this):options.inverse(this);
});
//HandleBars: Проверка на существование переменной
hbs.registerHelper('undefine',(val,options)=>{
    return typeof val!=='undefined'?options.fn(this):options.inverse(this);
});
//HandleBars: Проверка на содержание элемента
hbs.registerHelper('have',(val1,val2,options)=>{
    return val1.includes(val2)?options.fn(this):options.inverse(this);
});
//HandleBars: Проверка на наличие изображения
hbs.registerHelper('imgnotnull',(val,sex)=>{
    return val==null||val==""||val=="null"?sex=="М"?"/img/icons/male.png":"/img/icons/girl.png":val;
});
//HandleBars: Проверка на наличие данных в переменной
hbs.registerHelper('notnull',(val,options)=>{
    return val!==null&&val!=='null'&&val!==""?options.fn(this):options.inverse(this);
});
//HandleBars: Форматирование даты на уровне шаблонизатора
hbs.registerHelper('datenormalise',(val,format)=>{
    let date;
    val!=="now"?date=new Date(val):date=new Date(); 
    let formation=format.split('');
    let result="";
    for(let i=0;i<formation.length;i++){
        switch(formation[i]){
            case("Y"):
                result+=date.getFullYear();
                break;
            case("M"):
                result+=date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
                break;
            case("D"):
                result+=date.getUTCDate()<10?"0"+date.getUTCDate():date.getUTCDate();
                break;
            case("h"):
                result+=date.getHours()<10?"0"+date.getHours():date.getHours();
                break;
            case("m"):
                result+=date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
                break;
            case("s"):
                result+=date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
                break;
            default:
                result+=formation[i];
                break;
        }
    }
    return result;
});
//HandleBars: Cравнение даты
hbs.registerHelper('dateop', (val,op,options)=>{
    date_val=new Date(val);
    date_now=new Date();
    switch(op){
        case '==now':
            return date_val.getTime()==date_now.getTime()?options.fn(this):options.inverse(this);
        case '>now':
            return date_val.getTime()>date_now.getTime()?options.fn(this):options.inverse(this);
        case '<now':
            return date_val.getTime()<date_now.getTime()?options.fn(this):options.inverse(this);
    }
});
//HandleBars: Простые математические операции
hbs.registerHelper('math', (val,act,num)=>{
    switch(act){
        case '*':
            return val*num;
        case '/':
            return val/num;
        case '+':
            return val+num;
        case '-':
            return val-num;
        case '^':
            return val^num;
    }
});
//Класс пользователя SERVER-SIDE
class ServerUser{
    //Конструктор
    constructor(){
        //Серверные данные
        this.user_id;
        this.user_abs_id;
        this.user_role;
        this.user_role_min;
        //Данные клиента
        this.user_surname;
        this.user_name;
        this.user_middlename;
        this.user_photo;
        this.user_group;
        this.user_options;
        this.user_sex;
    }
    //Методы
    setUser(id,abs_id,role,role_min,surname,name,middlename,photo,sex){
        this.user_id=id;
        this.user_abs_id=abs_id;
        this.user_role=role;
        this.user_role_min=role_min;
        this.user_surname=surname;
        this.user_name=name;
        this.user_middlename=middlename;
        this.user_photo=photo;
        this.user_sex=sex;
    }
    setNewUserData(surname,name,middlename,photo,sex){
        this.user_surname=surname;
        this.user_name=name;
        this.user_middlename=middlename;
        this.user_photo=photo;
        this.user_sex=sex;
    }
    setUserGroup(group_id){
        if(typeof group_id=='object'){
            this.user_group=group_id;
        }
        else{
            this.user_group=group_id;
        }
    }
    setUserOptions(user_options){
        this.user_options=user_options[0];
    }
    //Функции
    getUserState(){
        return [this.user_id,this.user_abs_id,this.user_role,this.user_role_min];
    }
    getUserData(){
        return [this.user_surname,this.user_name,this.user_middlename,this.user_photo,this.user_sex];
    }
    getUserFullName(){
        return `${this.user_surname} ${this.user_name} ${this.user_middlename}`;
    }
    getUserGroup(){
        return this.user_group[0].group_id;
    }
    getUserGroupsInString(){
        let string="";
        this.user_group.forEach(el=>{
            string+=`'${el}',`;
        });
        string.slice(0,-1);
        return string;
    }
    getUserOptions(){
        return this.user_options;
    }
    clearData(){
        delete this.user_id;
        delete this.user_abs_id;
        delete this.user_role;
        delete this.user_role_min;
        delete this.user_surname;
        delete this.user_name;
        delete this.user_middlename;
        delete this.user_photo;
        delete this.user_group;
        delete this.user_options;
    }
}
//Пул пользователей
var serverUser=[];
//функции
//Функция: Создание экземпляра класса для выполнения действий
async function identifyUser(class_ex,session,session_groups,session_options){
    let user=session.split("/");
    await class_ex.setUser(user[0],user[1],user[2],user[3],user[4],user[5],user[6],user[7],user[8]);
    await class_ex.setUserGroup(session_groups);
    await class_ex.setUserOptions(session_options);
    return "Success";
}
//Функция: Загрузка файла
async function fileUpload(path,files,file_name,ex_action){
    await dirExist(path);
    let uploadPath=files.path;
    let savePath;
    if(ex_action=='rn'){
        savePath=await fileExist(__dirname+path+"/"+file_name);
    }
    else{
        savePath=__dirname+path+"/"+file_name;
    }
    let rawData=fs.readFileSync(uploadPath);
    fs.writeFileSync(savePath.replace(/\//,'\\'),rawData,function(err){
        if(err){
            console.log(err);
        }
    })
    return savePath.replace(__dirname,"").replace("/public","");
}
//Функция: Проверка/создание дериктории
async function dirExist(path){
    let dir=path.split("/");
    let check=__dirname;
    for (let i = 1;i<dir.length;i++) {
       check+="/"+dir[i];
        if(!fs.existsSync(check)){
            fs.mkdirSync(check);
        }
    }
}
//Функция: Проверка на существование файла
async function fileExist(savePath){
    let checkPath=savePath.split(".");
    let path=savePath;
    let count=1;
    while(fs.existsSync(path)){
        path=checkPath[0]+`(${count}).`+checkPath[1];
        count++;
    }
    return path;
}
//Функция: Создание запроса вида SELECT
async function createSelectQuery(query){
    let connect=await connect_db_promise();
    let [rows,fields]=await connect.query(query);
    connect.end()
    return rows;
}
//Функция: Создание запроса вида INSERT/UPDATE/DELETE
async function createIUDQuery(query){
    let connect=await connect_db_promise();
    await connect.query(query);
    connect.end()
    return("Success");
}
//Функция: Нормализация даты
async function datenormalise(val,format){
    let date;
    val!=="now"?date=new Date(val):date=new Date(); 
    let formation=format.split('');
    let result="";
    for(let i=0;i<formation.length;i++){
        switch(formation[i]){
            case("Y"):
                result+=date.getFullYear();
                break;
            case("M"):
                result+=date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
                break;
            case("D"):
                result+=date.getUTCDate()<10?"0"+date.getUTCDate():date.getUTCDate();
                break;
            case("h"):
                result+=date.getHours()<10?"0"+date.getHours():date.getHours();
                break;
            case("m"):
                result+=date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
                break;
            case("s"):
                result+=date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
                break;
            default:
                result+=formation[i];
                break;
        }
    }
    return result;
}
//Middleware функции
//Middleware: Проверка на существование сессии
function isAuthenticated(req,res,next){
    return req.session.user?next():res.redirect("/welcomepage");
}
//Middleware: Проверка на соответсвие интерфейса в зависимости от роли
async function interfaceSplitter(req,res,next){
    return serverUser[req.session.user].getUserState()[3]==req.url.slice(1).split("/")[0]?next():res.redirect("/accsesserror");
}
//Middleware: Проверка доступа
async function isAccsessable(req,res,next){

    let result;
    let accsessData=req.url.slice(1).split("/");
    try{
        switch(accsessData[0]){
            case "t":
                if(accsessData[1]=='student'){
                    result=await createSelectQuery(`SELECT group_id \ 
                    FROM students \ 
                    WHERE student_id=${accsessData[2]} AND group_id=${serverUser[req.session.user].getUserGroup()} AND NOT EXISTS (SELECT student_id \ 
                                                                        FROM deductions \
                                                                        WHERE deductions.student_id=students.student_id) LIMIT 1`);
                }
                if(accsessData[2]=="attendance"){
                    result=await createSelectQuery(`SELECT attendance_id
                    FROM attendance
                    WHERE attendance_id=${accsessData[3]} AND group_id=${serverUser[req.session.user].getUserGroup()}`);
                }
                if(accsessData[1]=="report"){
                    result=await createSelectQuery(`SELECT report_id
                    FROM reports
                    WHERE report_id=${accsessData[2]} AND group_id=${serverUser[req.session.user].getUserGroup()}`);
                }
                break;
            case "h":
                result=[];
                break;
            case "s":
                result=[];
                break;
            case "a":
                result=[];
            default:
                result=[];
        }
        return result.length>0?next():res.redirect("/accsesserror");
    }
    catch{
        res.redirect("/accsesserror");
    }
}
//Конвейер обработки
//Создание проверочных сессий
app.use(async(req,res,next) =>{
    let createRole='t';
    switch(createRole){
        case "t":
            req.session.user=await encrypt("1/1/teacher/t/Киселёва/Светлана/Владимировна/\\img\\users\\1_1.png/Ж");
            req.session.user_groups=await createSelectQuery(`SELECT group_id
            FROM groups
            WHERE teacher_id=1 AND group_end_education_date>NOW() ORDER BY group_id DESC LIMIT 1`);
            req.session.user_options=await createSelectQuery(`SELECT *
            FROM options
            WHERE option_id=1`);
            serverUser[req.session.user]=new ServerUser();
            await identifyUser(serverUser[req.session.user],await decrypt(req.session.user),req.session.user_groups,req.session.user_options);
            break;
        case "h":
            req.session.user=await encrypt("3/1/head/h/Максимова/Татьяна/Викторовна/\\img\\users\\1_1.png/Ж");
            req.session.user_groups=await createSelectQuery(`SELECT group_id
            FROM groups
            WHERE head_id=1 AND group_end_education_date>NOW() ORDER BY group_id;`);
            req.session.user_options=await createSelectQuery(`SELECT *
            FROM options
            WHERE option_id=1`);
            serverUser[req.session.user]=new ServerUser();
            await identifyUser(serverUser[req.session.user],await decrypt(req.session.user),req.session.user_groups,req.session.user_options);
            break;
        case "s":
            req.session.user=await encrypt("4/1/student/s/Костин/Владислав/Констинтинович/\\img\\users\\1_1.png/М");
            req.session.user_groups=await createSelectQuery(`SELECT a.group_id
            FROM students a INNER JOIN groups b ON a.group_id=b.group_id
            WHERE student_id=1 AND group_end_education_date>NOW() ORDER BY group_id DESC LIMIT 1;`);
            req.session.user_options=await createSelectQuery(`SELECT *
            FROM options
            WHERE option_id=1`);
            serverUser[req.session.user]=new ServerUser();
            await identifyUser(serverUser[req.session.user],await decrypt(req.session.user),req.session.user_groups,req.session.user_options);
            break;
        case "a":
            req.session.user=await encrypt("2/1/admin/a/Костин/Владислав/Констинтинович/\\img\\users\\1_1.png/М");
            req.session.user_options=await createSelectQuery(`SELECT *
            FROM options
            WHERE option_id=1`);
            serverUser[req.session.user]=new ServerUser();
            await identifyUser(serverUser[req.session.user],await decrypt(req.session.user),req.session.user_groups,req.session.user_options);
            break;
        default:
            //console.log("Empty");  
            break;
    }
    next();
});
//Создание необходимых cookie
app.use(async(req,res,next)=>{
    if(req.session.user && !req.cookies.sidebar){  
        res.cookie('sidebar',1);
    }
    if(req.url.search("/t/newreport")<0){
        req.session.current_url=req.url;
    }
    next();
});
//Выход из состояния EMPTY-POST
app.use(async(req,res,next)=>{
    if(req.url.toString().slice(-1)=="?"){
        res.redirect(req.url.toString().substr(0,req.url.toString().length-1));
    }
    else{
        next();
    }
})
//Express 
//Главная страница приложения(+)
app.route('/welcomepage').get((req,res)=>{
    if(req.session.user){
        res.redirect("/");
    }
    else{
        res.render("index");
    }
}).post(urlencodedParser, async(req,res)=>{
    try{
        let connect=connect_db();
        let login=await encrypt(req.body.user_login.trim());
        let password=await encypt(req.body.user_password.trim());
        connect.query(`SELECT a.user_id,user_role,user_sur_name,user_name,user_mid_name,user_photo,teacher_id,head_id,student_id,admin_id,user_sex
        FROM users a LEFT JOIN teachers b ON a.user_id=b.user_id
        LEFT JOIN students c ON a.user_id=c.user_id
        LEFT JOIN heads d ON a.user_id=d.user_id
        LEFT JOIN admins e ON a.user_id=e.user_id
        WHERE user_login LIKE '${login}' AND user_password LIKE '${password}' LIMIT 1`, async(err,data)=>{
            if(err) throw err;
            if(data[0]){
                let photo='null';
                if(data[0].user_photo){
                    photo=data[0].user_photo.replace(/\//g,'\\');
                }
                switch(data[0].user_role){
                    case "Администратор":
                        req.session.user=await encrypt(`${data[0].admin_id}/${data[0].user_id}/admin/a/${data[0].user_sur_name}/${data[0].user_name}/${data[0].user_mid_name}/${photo}/${data[0].user_sex}`);
                        break;
                    case "Преподаватель":
                        req.session.user=await encrypt(`${data[0].teacher_id}/${data[0].user_id}/teacher/t/${data[0].user_sur_name}/${data[0].user_name}/${data[0].user_mid_name}/${photo}/${data[0].user_sex}`);
                        req.session.user_groups=await createSelectQuery(`SELECT group_id
                        FROM groups
                        WHERE teacher_id=${data[0].teacher_id} AND group_end_education_date>NOW() ORDER BY group_id DESC LIMIT 1`);
                        break;
                    case "Студент":
                        req.session.user=await encrypt(`${data[0].student_id}/${data[0].user_id}/student/s/${data[0].user_sur_name}/${data[0].user_name}/${data[0].user_mid_name}/${photo}/${data[0].user_sex}`);
                        req.session.user_groups=await createSelectQuery(`SELECT a.group_id
                        FROM students a INNER JOIN groups b ON a.group_id=b.group_id
                        WHERE student_id=${data[0].student_id} AND group_end_education_date>NOW() ORDER BY group_id DESC LIMIT 1;`);
                        break;
                    case "ЗавОтеделением":
                        req.session.user=await encrypt(`${data[0].head_id}/${data[0].user_id}/head/h/${data[0].user_sur_name}/${data[0].user_name}/${data[0].user_mid_name}/${photo}/${data[0].user_sex}`);
                        req.session.user_groups=await createSelectQuery(`SELECT group_id
                        FROM groups
                        WHERE head_id=${data[0].head_id} AND group_end_education_date>NOW() ORDER BY group_id;`);
                        break;
                }
                req.session.user_options=await createSelectQuery(`SELECT *
                FROM options
                WHERE option_id=${data[0].user_id}`);
                serverUser[req.session.user]=new ServerUser();
                await identifyUser(serverUser[req.session.user],await decrypt(req.session.user),req.session.user_groups,req.session.user_options);
                connect.end();
                res.end("Success");
            }
            else{
                connect.end();
                res.end("nExist");
            }
        });
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Общие страницы
//Главная страница веб-приложения(+)
app.get("/",isAuthenticated,async(req,res)=>{
    console.log(await encrypt(JSON.stringify(req.session.user_groups)));
    res.render(`${serverUser[req.session.user].getUserState()[3]}_index`,{
        username:serverUser[req.session.user].getUserFullName(),
        role:serverUser[req.session.user].getUserState()[2], 
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
    });
});
//Страница профиля пользователя(+)
app.route("/profile").get(isAuthenticated,async(req,res)=>{
    let userData=await createSelectQuery(`SELECT *
    FROM users
    WHERE user_id=${serverUser[req.session.user].getUserState()[0]} LIMIT 1;`);
    res.render("profile",{
        title:serverUser[req.session.user].getUserFullName(),
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        userData:userData[0]
    });
}).post(isAuthenticated,async(req,res)=>{
    try{
        let form=formidable.IncomingForm();
        form.parse(req,async(err,fields,files)=>{
            let savePath='null';
            if(files.file){
                savePath=await fileUpload(`/public/img/users`,files.file,`${serverUser[req.session.user].getUserState()[0]}_${serverUser[req.session.user].getUserState()[1]}.png`,'rw');
            }
            let result=await createIUDQuery(`UPDATE users SET
                user_sur_name='${fields.user_sur_name}',
                user_name='${fields.user_name}',
                user_mid_name='${fields.user_mid_name}',
                user_birthdate='${fields.user_birthdate}',
                user_sex='${fields.user_sex}',
                user_email='${fields.user_email}',
                user_photo='${savePath}'
                WHERE user_id=${serverUser[req.session.user].getUserState()[1]}
            ;`);
            let prev=req.session.user;
            req.session.user=`${serverUser[req.session.user].getUserState()[0]}/${serverUser[req.session.user].getUserState()[1]}/${serverUser[req.session.user].getUserState()[2]}/${serverUser[req.session.user].getUserState()[3]}/${fields.user_sur_name}/${fields.user_name}/${fields.user_mid_name}/${savePath}/${fields.user_sex}`;
            delete serverUser[prev];
            serverUser[req.session.user]=new ServerUser();
            await identifyUser(serverUser[req.session.user],req.session.user,req.session.user_groups,req.session.user_options);
            res.end(result);
        });
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница опций(+)
app.route("/options").get(isAuthenticated,async(req,res)=>{
    let h_sizeA=[];
    let font_sizeA=[];
    for (let i=12;i<=48;i++) {
        if(i<=36){
            font_sizeA.push(i);
        }
        h_sizeA.push(i);   
    }
    let themes=await createSelectQuery(`SELECT *
    FROM themes`);
    res.render("options",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        h_sizeA:h_sizeA,
        font_sizeA:font_sizeA,
        themes:themes
    });
}).post(isAuthenticated,urlencodedParser,async(req,res)=>{
    if(req.body.change=='default'){
        let result=await createIUDQuery(`UPDATE options SET
        h_size=42,
        h_color='#212529',
        font_size=16,
        font_color='#212529',
        theme_id=1,
        logo_d=1,
        app_name_d=1
        WHERE option_id=${serverUser[req.session.user].getUserState()[0]}`);
        req.session.user_options=await createSelectQuery(`SELECT *
        FROM options
        WHERE option_id=${serverUser[req.session.user].getUserState()[0]}`);
        await identifyUser(serverUser[req.session.user],req.session.user,req.session.user_groups,req.session.user_options);
        res.end(result);
    }
    else if(req.body.change=='new'){
        try{
            let themes=await createSelectQuery(`SELECT COUNT(theme_id) count FROM themes`);
            if((parseInt(req.body.h_size)>=8 && parseInt(req.body.h_size)<=56) &&
            (parseInt(req.body.font_size)>=8 && parseInt(req.body.font_size)<=36) &&
            (parseInt(req.body.theme_id)>0 && parseInt(req.body.theme_id)<=themes[0].count)){
                let logo_d=req.body.logo_d=='true'?1:0;
                let app_name_d=req.body.app_name_d=='true'?1:0;
                let result=await createIUDQuery(`UPDATE options SET
                h_size=${req.body.h_size},
                h_color='${req.body.h_color}',
                font_size=${req.body.font_size},
                font_color='${req.body.font_color}',
                theme_id=${req.body.theme_id},
                logo_d=${logo_d},
                app_name_d=${app_name_d}
                WHERE option_id=${serverUser[req.session.user].getUserState()[0]}`);   
                req.session.user_options=await createSelectQuery(`SELECT *
                FROM options
                WHERE option_id=${serverUser[req.session.user].getUserState()[0]}`);
                res.end(result);
            }
            else{
                res.end("Hacking attempt");
            }  
        }
        catch(err){
        console.log(err);
            res.end("Unexpected error");
        }
    }
    else{

        res.end("Token Error");
    }
});
//Страницы преподавателя-куратора (+)
//Объявления(+)
app.route("/t/announcements").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let announcement=await createSelectQuery(`SELECT *
    FROM announcements a INNER JOIN announcement_types b on a.announcement_type=b.announcement_type_id
    WHERE group_id=${serverUser[req.session.user].getUserGroup()} ORDER BY announcement_data DESC LIMIT 5;
    SELECT *
    FROM announcement_types;`);
    res.render("t_announcement",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        form:'t-announce',
        posts:announcement[0],
        announcement_type:announcement[1]
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{
        let form = new formidable.IncomingForm();
        form.parse(req,async(err, fields, files)=>{
            let file_path=null;
            if(files.file){
            let file_name=files.file.name;
            file_path=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/announcements_files`,files.file,file_name,'rn');
            }
            let result=await createIUDQuery(`INSERT INTO announcements
            VALUE(
                null,
                ${serverUser[req.session.user].getUserGroup()},
                NOW(),
                '${fields.head}',
                '${fields.type}',
                '${file_path}',
                '${fields.text}'
            );`);
            res.end(file_path);
        });
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница группы(+)
app.get("/t/mygroup",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let group=await createSelectQuery(`SELECT student_id,user_sur_name,user_name,user_mid_name,user_photo,student_headman,user_sex
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE group_id=${serverUser[req.session.user].getUserGroup()} AND NOT EXISTS (SELECT student_id FROM deductions WHERE deductions.student_id=a.student_id)
    ORDER BY user_sur_name;
    SELECT *
    FROM spetialities a INNER JOIN groups b ON a.spetiality_id=b.spetiality_id
    INNER JOIN spetiality_professions c ON a.spetiality_profession_id=c.spetiality_profession_id
    WHERE b.group_id=${serverUser[req.session.user].getUserGroup()} LIMIT 1;
    SELECT q1.all, q2.educated, SUM(q1.all-q2.educated) 'deducted'
    FROM (SELECT COUNT(a.student_id) 'all'
            FROM students a
            WHERE a.group_id=${serverUser[req.session.user].getUserGroup()}) q1,
        (SELECT COUNT(b.student_id) 'educated'
            FROM students b
            WHERE b.group_id=${serverUser[req.session.user].getUserGroup()} AND NOT EXISTS(SELECT c.student_id
                                            FROM deductions c
                                            WHERE b.student_id=c.student_id)) q2`);
    res.render("t_mygroup",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        title:group[1][0].spetiality_abbreviated,
        groupInfo:group[1][0],
        teacher:serverUser[req.session.user].getUserFullName(),
        groupStudentInfo:group[2][0],
        studentsList:group[0]
    });
});
//Страница студента(+)
app.get("/t/student/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let student=await createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT *
    FROM parents
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};`);
    res.render("t_student",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        title:`${student[0][0].user_sur_name} ${student[0][0].user_name} ${student[0][0].user_mid_name}`,
        student:student[0][0],
        parents:student[1],
        user_name:`${student[0][0].user_sur_name} ${student[0][0].user_name} ${student[0][0].user_mid_name}`
    });
});
//Страница документов студента(+)
app.route("/t/student/:id/documents").get(isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentsDocumentary=await createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT *
    FROM passports
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT *
    FROM documents
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')}
    ORDER BY document_name DESC;`);
    res.render("t_student_documents",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        title:`${studentsDocumentary[0][0].user_sur_name} ${studentsDocumentary[0][0].user_name} ${studentsDocumentary[0][0].user_mid_name}`,
        student_name:`${studentsDocumentary[0][0].user_sur_name} ${studentsDocumentary[0][0].user_name} ${studentsDocumentary[0][0].user_mid_name}`,
        passport:studentsDocumentary[1][0],
        documents:studentsDocumentary[2]
    });
}).post(isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    try{
        let form=new formidable.IncomingForm();
        form.parse(req,async(err,fields,files)=>{
            let savePath='null';
            let result;
            let file_exist;
            for(const [field_name,field_val] of Object.entries(fields)){
                switch(field_name){
                    case "СНИЛС":
                        if(files[field_name+"_scan"]){
                            savePath=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${JSON.stringify(req.params.id).replace(/\"/gi,'')}/documents`,files[field_name+"_scan"],'SNILS-scan.png','rw');
                        }
                        else{
                            file_exist=await createSelectQuery(`SELECT document_scan 
                            FROM documents 
                            WHERE student_id=${JSON.stringify(req.params.id)} AND document_name LIKE 'СНИЛС' AND document_scan IS NOT NULL`);
                            if(file_exist[0]){
                                savePath=file_exist[0].document_scan;
                            }
                            else{
                                savePath='null';
                            }
                        }
                        result=await createIUDQuery(`UPDATE documents SET
                        document_number='${field_val}',
                        document_scan='${savePath}'
                        WHERE student_id=${JSON.stringify(req.params.id)} AND document_name LIKE 'СНИЛС';`);
                        break;
                    case "ИНН":
                        if(files[field_name+"_scan"]){
                            savePath=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${JSON.stringify(req.params.id).replace(/\"/gi,'')}/documents`,files[field_name+"_scan"],'INN-scan.png','rw');
                        }
                        else{
                            file_exist=await createSelectQuery(`SELECT document_scan 
                            FROM documents 
                            WHERE student_id=${JSON.stringify(req.params.id)} AND document_name LIKE 'ИНН' AND document_scan IS NOT NULL;`);
                            if(file_exist[0]){
                                savePath=file_exist[0].document_scan;
                            }
                            else{
                                savePath='null';
                            }
                        }
                        result=await createIUDQuery(`UPDATE documents SET
                        document_number='${field_val}',
                        document_scan='${savePath}'
                        WHERE student_id=${JSON.stringify(req.params.id)} AND document_name LIKE 'ИНН';`);
                        break;
                    case "ПОЛИС":
                        if(files[field_name+"_scan"]){
                            savePath=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${JSON.stringify(req.params.id).replace(/\"/gi,'')}/documents`,files[field_name+"_scan"],'POLIS-scan.png','rw');
                        }
                        else{
                            file_exist=await createSelectQuery(`SELECT document_scan 
                            FROM documents 
                            WHERE student_id=${JSON.stringify(req.params.id)} AND document_name LIKE 'ПОЛИС' AND document_scan IS NOT NULL;`);
                            if(file_exist[0]){
                                savePath=file_exist[0].document_scan;
                            }
                            else{
                                savePath='null';
                            }
                        }
                        result=await createIUDQuery(`UPDATE documents SET
                        document_number='${field_val}',
                        document_scan='${savePath}'
                        WHERE student_id=${JSON.stringify(req.params.id)} AND document_name LIKE 'ПОЛИС';`);
                        break;
                }
            }
            if(files.passport_scan){
                savePath=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${JSON.stringify(req.params.id).replace(/\"/gi,'')}/documents`,files.passport_scan,'passport-scan.png','rw');
            }
            else{
                file_exist=await createSelectQuery(`SELECT passport_scan 
                FROM passports 
                WHERE student_id=${JSON.stringify(req.params.id)} AND passport_scan IS NOT NULL;`);
                if(file_exist[0]){
                    savePath=file_exist[0].passport_scan;
                }
                else{
                    savePath='null';
                }
            }
            result=await createIUDQuery(`UPDATE passports SET
            passport_series=${fields.passport_sir},
            passport_number=${fields.passport_num},
            passport_data_of_issue='${fields.passport_date}',
            passport_address='${fields.passport_lp}',
            passport_issued_by='${fields.passport_by}',
            passport_scan='${savePath}'
            WHERE student_id=${JSON.stringify(req.params.id)};`);
            res.end("Succsess");
        });
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница достижений студента(+)
app.route("/t/student/:id/achievements").get(isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentAchievments=await createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT *
    FROM achievements
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};`);
    res.render("t_student_achievements",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        form: "t-achievements",
        title:`${studentAchievments[0][0].user_sur_name} ${studentAchievments[0][0].user_name} ${studentAchievments[0][0].user_mid_name}`,
        student_name:`${studentAchievments[0][0].user_sur_name} ${studentAchievments[0][0].user_name} ${studentAchievments[0][0].user_mid_name}`,
        achievements:studentAchievments[1]
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{
        let form = new formidable.IncomingForm();
        form.parse(req,async(err, fields, files)=>{
            let file_name=files.file.name;
            let file_path=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${JSON.stringify(req.params.id).replace(/\"/gi,'')}/achievements`,files.file,file_name,'rn');
            let result=await createIUDQuery(`INSERT INTO achievements
            VALUE(
                null,
                ${JSON.stringify(req.params.id).replace(/\"/gi,'')},
                '${fields.name}',
                '${file_path}'
            );`);
            res.end(file_path);
        });
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница ДО/ДПО студента(+)
app.route("/t/student/:id/additionaleducation").get(isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentAdditionEducation=await createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id)};
    SELECT *
    FROM additional_educations a INNER JOIN courses b ON a.ae_id=b.ae_id
    INNER JOIN teachers c ON a.ae_lecturer_id=c.teacher_id
    INNER JOIN users d ON c.user_id=d.user_id
    WHERE b.student_id=${JSON.stringify(req.params.id)}
    ORDER BY ae_beg_date DESC;
    SELECT a.ae_id,a.ae_name,user_sur_name,user_name,user_mid_name
    FROM additional_educations a LEFT JOIN courses b ON a.ae_id=b.ae_id
    INNER JOIN teachers c ON a.ae_lecturer_id=c.teacher_id
    INNER JOIN users d ON c.user_id=d.user_id
    WHERE ae_beg_date>NOW() AND a.ae_id NOT IN (SELECT ae_id
                                              FROM courses
                                              WHERE student_id=${JSON.stringify(req.params.id)})
    ORDER BY ae_beg_date DESC;`);
    res.render("t_student_additionaleducation",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        title:`${studentAdditionEducation[0][0].user_sur_name} ${studentAdditionEducation[0][0].user_name} ${studentAdditionEducation[0][0].user_mid_name}`,
        student_name:`${studentAdditionEducation[0][0].user_sur_name} ${studentAdditionEducation[0][0].user_name} ${studentAdditionEducation[0][0].user_mid_name}`,
        ae:studentAdditionEducation[1],
        ae_form_values:studentAdditionEducation[2]
    });
}).post(isAuthenticated,interfaceSplitter,isAccsessable, urlencodedParser,async(req,res)=>{
    try{
        let result=await createIUDQuery(`INSERT INTO courses
        VALUES(
            null,
            ${req.body.cource_id},
            ${JSON.stringify(req.params.id)}
        );`);
        res.end("Succsses");
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница посещаемости студента(+)
app.route("/t/student/:id/absenteeismes").get(isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentAbsenteeismes=await createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT *
    FROM attendance a INNER JOIN absenteeismes b on a.attendance_id=b.attendance_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};`);
    res.render("t_student_absenteeismes",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        title:`${studentAbsenteeismes[0][0].user_sur_name} ${studentAbsenteeismes[0][0].user_name} ${studentAbsenteeismes[0][0].user_mid_name}`,
        student_name:`${studentAbsenteeismes[0][0].user_sur_name} ${studentAbsenteeismes[0][0].user_name} ${studentAbsenteeismes[0][0].user_mid_name}`,
        absentismeses: studentAbsenteeismes[1]
    });
}).post(isAuthenticated,interfaceSplitter,isAccsessable,urlencodedParser,async(req,res)=>{
    try{
        let form=new formidable.IncomingForm();
        form.parse(req,async(err,fields,files)=>{
            let file_name=files.file.name;
            let file_path=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${JSON.stringify(req.params.id).replace(/\"/gi,'')}/absentismeses`,files.file,file_name,'rn');
            let result=await createIUDQuery(`UPDATE absenteeismes SET absenteeismes_file='${file_path}'
            WHERE absenteeismes_id=${fields.id}`);
            res.end('');
        });
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница мероприятий(+)
app.route("/t/mygroup/events").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let groupEvents=await createSelectQuery(`SELECT *
    FROM events a INNER JOIN event_types b ON a.event_type_id=b.event_type_id
    WHERE a.group_id=${serverUser[req.session.user].getUserGroup()}
    ORDER BY event_id DESC;
    SELECT *
    FROM event_types`);
    res.render("t_mygroupevents",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        events:groupEvents[0],
        event_types:groupEvents[1],
        form:'t-events'
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{
        if(req.body.type){
            let result=await createIUDQuery(`INSERT INTO events 
            VALUES(
                null,
                ${serverUser[req.session.user].getUserGroup()},
                ${req.body.event_type},
                '${req.body.event_discr}',
                '${req.body.event_date}'
            );`);
            res.end(result);
        }
        else{
            let form=new formidable.IncomingForm();
            form.parse(req,async(err,fields,files)=>{
                console.log(fields.event_id);
                let savePath=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/events`,files.file,files.file.name,'rn');
                let result=await createIUDQuery(`UPDATE events 
                SET event_img='${savePath}'
                WHERE event_id=${fields.event_id}`);
                let gallery_add=await createIUDQuery(`INSERT INTO gallery
                VALUES(
                    null,
                    ${serverUser[req.session.user].getUserGroup()},
                    '${savePath}'
                );`);
                res.end();
            });
        }
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница индвидуальной работы(+)
app.route("/t/mygroup/individualwork").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let iw=await createSelectQuery(`SELECT * 
    FROM individual_work_types;
    SELECT c.student_id,user_sur_name,user_name,user_mid_name,iw_type_name,iw_reasone,iw_date
    FROM individual_works a INNER JOIN individual_work_types b ON a.iw_type_id=b.iw_type_id
    LEFT JOIN students c ON a.student_id=c.student_id INNER JOIN users d ON c.user_id=d.user_id
    WHERE c.group_id=${serverUser[req.session.user].getUserGroup()};
    SELECT a.student_id,user_sur_name,user_name,user_mid_name
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE group_id=${serverUser[req.session.user].getUserGroup()}`);
    console.log(iw[1]);
    res.render("t_mygroupindividualwork",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        iw:iw[1],
        iw_type:iw[0],
        students:iw[2],
        form:'t-iw'
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{
        let result=await createIUDQuery(`INSERT INTO individual_works
        VALUES(
            null,
            ${req.body.iw_type},
            ${req.body.st_id},
            '${req.body.iw_reasone}',
            '${req.body.iw_date}'
        );`);
        res.end('');
    }
    catch(err){
        console.log(err);
        res.end('Error');
    }
});
//Страница отчётов(+)
app.get("/t/mygroup/reports",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let reports=await createSelectQuery(`SELECT report_id,report_cr_date,report_interval_date,report_type,report_fields
    FROM reports
    WHERE group_id=${serverUser[req.session.user].getUserGroup()}
    ORDER BY report_cr_date,report_id DESC`);
    res.render("t_reports",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        reports:reports
    });
});
//Страница для создания отчёта(+)
app.route("/t/newreport").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    if(!req.session.current_url){
        req.session.current_url=req.url;
    }
    let report_form="";
    if(req.session.current_url.search("/t/mygroup/attendance")>=0){
        report_form="attendance";
    }
    else if(req.session.current_url.search("/t/mygroup/events")>=0){
        report_form="events";
    }
    else if(req.session.current_url.search("/t/mygroup/individualwork")>=0){
        report_form="iw";
    }
    req.session.current_url=req.url;
    res.render("t_newreport",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        report_form:report_form
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{
        let fields="#,";
        let select_query_part=`SET @rank=0; SELECT @rank:=@rank+1 as 'num',`,
        from_query_part=`FROM `,
        where_query_part=`WHERE `,
        groupby_query_part=`GROUP BY `;
        let date_now=await datenormalise("now","Y.M.D");
        switch(req.body.type){
            case "attendance":
                req.body['fields[]'].forEach(el=>{
                    switch(el){
                        case "ID":
                            fields+="ID,";
                            select_query_part+=`c.student_id,`;
                            groupby_query_part+=`c.student_id,`;
                            break;
                        case "Фамилия":
                            if(fields.search("Студент")<0){
                                fields+="Студент,";
                            }
                            select_query_part+=`d.user_sur_name,`;
                            groupby_query_part+=`d.user_sur_name,`;
                            break;
                        case "Имя":
                            if(fields.search("Студент")<0){
                                fields+="Студент,";
                            }
                            select_query_part+=`d.user_name,`;
                            groupby_query_part+=`d.user_name,`;
                            break;
                        case "Отчество":
                            if(fields.search("Студент")<0){
                                fields+="Студент,";
                            }
                            select_query_part+=`d.user_mid_name,`;
                            groupby_query_part+=`d.user_mid_name,`;
                            break;
                        case "Н":
                            fields+="Н,";
                            select_query_part+=`COUNT(case when absenteeismes_type='Н' then 1 end) 'N',`;
                            break;
                        case "З":
                            fields+="З,";
                            select_query_part+=`COUNT(case when absenteeismes_type='З' then 1 end) 'Z',`;
                            break;
                        case "common":
                            fields+="Общее кол-во пропусков,";
                            select_query_part+=`COUNT(absenteeismes_id) 'common',`;
                            break;
                        case "closed":
                            fields+="Закрытые пропуски,";
                            select_query_part+=`COUNT(absenteeismes_file) 'closed',`;
                            break;
                        case "unclosed":
                            fields+="Незакрытые пропуски,";
                            select_query_part+=`COUNT(absenteeismes_id)-COUNT(absenteeismes_file) 'unclosed',`;
                            break;
                    }
                });
                fields=fields.substr(0,fields.length-1);
                select_query_part=select_query_part.substr(0,select_query_part.length-1)+"\n";
                groupby_query_part=groupby_query_part.substr(0,groupby_query_part.length-1);
                from_query_part+=`attendance a RIGHT JOIN absenteeismes b ON a.attendance_id=b.attendance_id RIGHT JOIN students c ON b.student_id=c.student_id INNER JOIN users d ON c.user_id=d.user_id \n`;
                where_query_part+=`a.attendance_date<'${date_now}' AND DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]})>a.attendance_date AND c.group_id=${serverUser[req.session.user].getUserGroup()} AND c.student_id NOT IN (SELECT student_id FROM deductions) \n`;
                break;
            case "events":
                console.log(req.body);
                select_query_part+="b.event_type_name,";
                fields+="Наименование,";
                req.body['fields[]'].forEach(el=>{
                    switch(el){
                        case "date":
                            fields+="Дата последнего мероприятия,";
                            select_query_part+=`a.event_date,`;
                            break;
                        case "compl":
                            fields+="Проведённые,";
                            select_query_part+=`COUNT(CASE WHEN a.event_date<NOW() THEN 1 END) 'compl',`;
                            break;
                        case "future":
                            fields+="Предстоящие,";
                            select_query_part+=`COUNT(CASE WHEN a.event_date>NOW() THEN 1 END) 'future',`;
                            break;
                        case "common":
                            fields+="Общее количество,";
                            select_query_part+=`COUNT(a.event_date) 'comm',`;
                            break;
                    }
                });
                fields=fields.substr(0,fields.length-1);
                select_query_part=select_query_part.substr(0,select_query_part.length-1)+"\n";
                from_query_part+=`events a INNER JOIN event_types b ON a.event_type_id=b.event_type_id \n`;
                where_query_part+=`group_id=${serverUser[req.session.user].getUserGroup()} AND a.event_date>DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]}) \n`;
                groupby_query_part+="b.event_type_name";
                break;
            case "iw":
                req.body['fields[]'].forEach(el=>{
                    switch(el){
                        case "ID":
                            fields+="ID,";
                            select_query_part+=`c.student_id,`;
                            groupby_query_part+=`c.student_id,`;
                            break;
                        case "Фамилия":
                            if(fields.search("Студент")<0){
                                fields+="Студент,";
                            }
                            select_query_part+=`d.user_sur_name,`;
                            groupby_query_part+=`d.user_sur_name,`;
                            break;
                        case "Имя":
                            if(fields.search("Студент")<0){
                                fields+="Студент,";
                            }
                            select_query_part+=`d.user_name,`;
                            groupby_query_part+=`d.user_name,`;
                            break;
                        case "Отчество":
                            if(fields.search("Студент")<0){
                                fields+="Студент,";
                            }
                            select_query_part+=`d.user_mid_name,`;
                            groupby_query_part+=`d.user_mid_name,`;
                            break;
                        case "psy":
                            fields+="Работа с соц. психологом,";
                            select_query_part+=`COUNT(CASE WHEN A.iw_reasone='Работа с социальным психологом' THEN 1 END) 'psy',`;
                            break;
                        case "rep":
                            fields+="Полученные жалобы,";
                            select_query_part+=`COUNT(CASE WHEN A.iw_reasone='Жалоба' THEN 1 END) 'rep',`;
                            break;
                        case "cons":
                            fields+="Работа с советом по проф.,";
                            select_query_part+=`COUNT(CASE WHEN A.iw_reasone='Работа с советом по профилактике' THEN 1 END) 'cons',`;
                            break;
                    }
                });
                fields=fields.substr(0,fields.length-1);
                select_query_part=select_query_part.substr(0,select_query_part.length-1)+"\n";
                groupby_query_part=groupby_query_part.substr(0,groupby_query_part.length-1);
                from_query_part+=`individual_works a INNER JOIN individual_work_types b ON a.iw_type_id=b.iw_type_id RIGHT JOIN students c ON a.student_id=c.student_id INNER JOIN users d ON c.user_id=d.user_id \n`;
                where_query_part+=`(a.iw_date>DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]}) OR a.iw_date IS NULL) AND c.group_id=${serverUser[req.session.user].getUserGroup()} AND c.student_id NOT IN (SELECT student_id FROM deductions) \n`;
                break;
        }
        let query=select_query_part+from_query_part+where_query_part+groupby_query_part;
        //let check=await createSelectQuery(query);
        let result=await createIUDQuery(`INSERT INTO reports VALUES(null,${serverUser[req.session.user].getUserGroup()},NOW(),DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]}),'${req.body.type}','${fields}','${query.replace(/\'/gi,"\\'")}');`);
        let id=await createSelectQuery(`SELECT report_id FROM reports WHERE group_id=${serverUser[req.session.user].getUserGroup()} ORDER BY report_id DESC LIMIT 1 `);
        res.end(`${id[0].report_id}`);
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница данных отчёта(+)
app.get("/t/mygroup/report/:id",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let report=await createSelectQuery(`SELECT * 
    FROM reports
    WHERE report_id=${JSON.stringify(req.params.id)}`);
    let report_data=await createSelectQuery(report[0].report_query);
    let fields=report[0].report_fields.split(',');
    res.render("t_report_info",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],await serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        report:report[0],
        fields:fields,
        report_data:report_data[1]
    });
});
//Страница посещаемости(+)
app.get("/t/mygroup/attendance",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let attendanceInfo=await createSelectQuery(`SELECT * 
    FROM attendance
    WHERE group_id=${serverUser[req.session.user].getUserGroup()} LIMIT 3;`);
    res.render("t_mygroupattendance",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        at_list:attendanceInfo
    });
});
//Страница посещаемости(+)
app.get("/t/mygroup/attendance/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let url_id=req.url.replace(/\D+/gi,'');
    let attendanceInfo=await createSelectQuery(`SELECT * 
    FROM attendance
    WHERE attendance_id=${url_id};
    SELECT DISTINCT user_name,user_sur_name,user_mid_name,user_sex,user_photo,student_id,attendance_id
    FROM users a INNER JOIN students b ON a.user_id=b.user_id
    INNER JOIN groups c ON b.group_id=c.group_id
    INNER JOIN attendance d ON c.group_id=d.group_id
    WHERE d.attendance_id=${url_id} AND b.student_id NOT IN(SELECT student_id 
                                                    FROM absenteeismes 
                                                    WHERE attendance_id=${url_id});
    SELECT DISTINCT user_name,user_sur_name,user_mid_name,user_sex,user_photo,student_id,attendance_id
    FROM users a INNER JOIN students b ON a.user_id=b.user_id
    INNER JOIN groups c ON b.group_id=c.group_id
    INNER JOIN attendance d ON c.group_id=d.group_id
    WHERE d.attendance_id=${url_id} AND b.student_id IN(SELECT student_id 
                                                    FROM absenteeismes 
                                                    WHERE attendance_id=${url_id});`);
    res.render("t_mygroupattendance_info",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        attendance:attendanceInfo,
        att_date:attendanceInfo[0][0].attendance_date,
        present:attendanceInfo[1],
        absented:attendanceInfo[2]
    });
});
//Страница создания списка посещаемости(+)
app.route("/t/newattendance").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let studentList=await createSelectQuery(`SELECT student_id, user_sur_name,user_name,user_mid_name,user_photo,student_headman,user_sex
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE group_id=${serverUser[req.session.user].getUserGroup()} AND NOT EXISTS (SELECT student_id 
                                                                FROM deductions 
                                                                WHERE deductions.student_id=a.student_id)
                                                                ORDER BY user_sur_name`);
    res.render("t_newattendance",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        studentList:studentList
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{
        let form=new formidable.IncomingForm();
        form.parse(req,async(err,fields,files)=>{
            let existQ=await createSelectQuery(`SELECT attendance_date
            FROM attendance
            WHERE attendance_date='${fields.date}' AND group_id=${serverUser[req.session.user].getUserGroup()}`);
            let acs_Students=await createSelectQuery(`SELECT student_id
            FROM students
            WHERE group_id=${serverUser[req.session.user].getUserGroup()}`);
            let acs_array=[];
            for (let i=0;i<acs_Students.length;i++){
                acs_array.push(acs_Students[i].student_id);
            }
            if(!existQ[0]){
                await createIUDQuery(`INSERT INTO attendance
                VALUES(
                    null,
                    ${serverUser[req.session.user].getUserGroup()},
                    '${fields.date}',
                    ${parseInt(Object.keys(acs_Students).length)-parseInt(Object.keys(fields).length-1)}
                );`);
                let attendance_id=await createSelectQuery(`SELECT attendance_id
                FROM attendance 
                WHERE attendance_date='${fields.date} AND group_id=${serverUser[req.session.user].getUserGroup()}'`);
                for(const [field_id,field_val] of Object.entries(fields)){
                    if(acs_array.includes(parseInt(field_id))){
                        await createIUDQuery(`INSERT INTO absenteeismes 
                        VALUES(
                            null,
                            ${attendance_id[0].attendance_id},
                            ${field_id},
                            '${field_val}',
                            null
                        );`);
                    }
                }
                let savePath;
                for(const [file_id,file_val] of Object.entries(files)){
                    savePath=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${file_id}/absentismeses`,file_val,`abs_${fields.date}.${file_val.type.split("/")[1]}`,'rn');
                    let result=await createIUDQuery(`UPDATE absenteeismes SET absenteeismes_file='${savePath}'
                    WHERE student_id=${file_id}`);
                }
                res.end("Succsess");
            }
            else{
                result.end("AttExist");
            }
        });
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница-галерея(+)
app.route("/t/mygroup/gallery").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let gallery=await createSelectQuery(`SELECT gallery_id,gallery_img
    FROM gallery
    WHERE group_id=${serverUser[req.session.user].getUserGroup()}
    ORDER BY gallery_id DESC;`);
    console.log(gallery);
    res.render("t_mygroupgallery",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        gallery:gallery,
        form:"t-gallery"
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{
        let form=formidable.IncomingForm();
        form.parse(req,async(err,fileds,files)=>{
            for(const [file_name,file_val] of Object.entries(files)){
                let savePath=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/img`,file_val,file_name,'rn');
                let result=await createIUDQuery(`INSERT INTO gallery 
                VALUES(
                    null,
                    ${serverUser[req.session.user].getUserGroup()},
                    '${savePath}'
                );`);
            }
            res.end('')
        });
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страницы заведующей отделением (-)
//Страница группы (-)
app.get("/h/group/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let group=await createSelectQuery(`SELECT student_id,user_sur_name,user_name,user_mid_name,user_photo,student_headman,user_sex
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE group_id=${JSON.stringify(req.params.id)} AND NOT EXISTS (SELECT student_id FROM deductions WHERE deductions.student_id=a.student_id)
    ORDER BY user_sur_name;
    SELECT *
    FROM spetialities a INNER JOIN groups b ON a.spetiality_id=b.spetiality_id
    INNER JOIN spetiality_professions c ON a.spetiality_profession_id=c.spetiality_profession_id
    WHERE b.group_id=${JSON.stringify(req.params.id)} LIMIT 1;
    SELECT q1.all, q2.educated, SUM(q1.all-q2.educated) 'deducted'
    FROM (SELECT COUNT(a.student_id) 'all'
            FROM students a
            WHERE a.group_id=${JSON.stringify(req.params.id)}) q1,
        (SELECT COUNT(b.student_id) 'educated'
            FROM students b
            WHERE b.group_id=${JSON.stringify(req.params.id)} AND NOT EXISTS(SELECT c.student_id
                                            FROM deductions c
                                            WHERE b.student_id=c.student_id)) q2`);
    res.render("h_group",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        student_list:group[0],
        groupInfo:group[1]
    });
});
//Страница посещаемости группы (-)
app.get("/h/group/:id/attendance",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    res.render("h_groupattendance",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
    });
});
//Страница студента (-)
app.get("/h/group/:id/student/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    res.render("h_student",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
    });
});
//Страницы студента (-)
//Страница прогулов (-)
app.route("/s/absentismesess").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("s_absentismesess",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions()
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница ДО/ДПО (-)
app.get("/s/additionaleducation",isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("s_additionaleducation",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions()
    });
});
//Страница документов (-)
app.route("/s/documents").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("s_documents",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions()
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница индивидуальной работы (-)
app.get("/s/individualwork",isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("s_individualwork",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions()
    });
});
//Страница достижений (-)
app.get("/s/portfolio",isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("s_portfolio",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions()
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница анонсов (-)
app.get("/s/announcements",isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("s_announcements",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions()
    });
});
//Страница мероприятий (-)
app.get("/s/events",isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("s_events",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions()
    });
});
//Страницы администратора (-)
//Список пользователей (-)
app.route("/a/usersList").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("a_users",{
    });
}).post(isAuthenticated,interfaceSplitter,async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница для создания нового пользователя (-)
app.route("/a/createNewUser").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("a_new_user",{
    });
}).post(isAuthenticated,interfaceSplitter,async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница с информацией о пользователе (-)
app.get('/a/userInfo/:id',isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("a_user",{
    });
});
//Страница изменения пользователя (-)
app.route("/a/changeUser/:id").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("a_user_change",{
    });
}).post(isAuthenticated,interfaceSplitter,async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница со списком существующих групп (-)
app.route("/a/groupsList").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("a_groups",{
    });
}).post(isAuthenticated,interfaceSplitter,async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница для создания новой группы (-)
app.route("/a/createNewGroup").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("a_new_group",{
    });
}).post(isAuthenticated,interfaceSplitter,async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница с информацией о группе (-)
app.get('/a/groupInfo/:id',isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("a_group",{
    });
});
//Страница изменения группы (-)
app.route("/a/changeGroup/:id").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("a_group_change",{
    });
}).post(isAuthenticated,interfaceSplitter,async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
app.post("/queryResult",isAuthenticated,interfaceSplitter,async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Дополнительные POST-запросы
//Cookie-parse для sidebar-меню
app.post('/cookies',isAuthenticated,urlencodedParser,(req,res)=>{
    switch(req.body.action){
        case "s_off":
            res.cookie("sidebar",0);
            break;
        case "s_on":
            res.cookie("sidebar",1);
            break;
    }
    res.end('');
});
//Выход
app.get("/logout",(req,res)=>{
    serverUser[req.session.user].clearData();
    delete serverUser[req.session.user];
    delete req.session.user;
    delete req.session.user_groups;
    delete req.session.user_options;
    res.redirect("/welcomepage");
})
//Обработка ошибок
//Ошибка доступа
app.get("/accsesserror",async(req,res)=>{
    res.render("error", {
        title:"Ошибка доступа",
        status:'acs',
    });
});
//Ошибка 404 - страница не существует
app.use(async(req, res)=>{
    res.status(404).render('error',{
        title:"Ошибка 404",
        status:400,
    });
});
//Ошибка 500 - произошла непредвиенная ошибка в работе приложения
app.use(async(error, req, res, next)=>{
    res.status(500).render("error",{
        title:"Ошибка 500",
        status:500,
    });
});
//Прослушивание порта
app.listen(3000);
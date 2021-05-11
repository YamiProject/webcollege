//Подключение модулей
//NodeJs Express
const express=require('express'); 
const app=express();
//Работа с файлами
const fs=require("fs");
const formidable=require("formidable");
//Настройка дерикторий
app.use(express.static(__dirname+"/public"));
app.set('views',["./pages",`./pages/teacher`,`./pages/student`,`./pages/head`,`./pages/admin`]);
//Модуль BodyParser
const bodyParser=require('body-parser');
const urlencodedParser=bodyParser.urlencoded({extended:false});
//Модуль Express-Сессия
const session=require('express-session')({
    secret:'SupaPassword',
    proxy:true,
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge: 86000*60*60*60}
});
var sharedsession=require("express-socket.io-session");
app.use(session);
//Сервер
const http=require("http");
const server=http.createServer(app);
//Модуль Socket.IO
const socketIO=require("socket.io");
const io=socketIO(server);
io.use(function(socket,next){
    next();
});
io.use(sharedsession(session,{
autoSave:true
})); 
io.on('connection',async(socket)=>{
    let url=socket.handshake.session.current_url.slice(1).split("/");
    switch(url[0]){
        case "t":
            if(url[1]=="announcements"){ 
                socket.join(`Room_AnnouncementsOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[1]=="chat"){
                socket.join(`Room_ChatOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[2]=="individualwork"){
                socket.join(`Room_IWOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[2]=="events"){
                socket.join(`Room_EventsOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[2]=="attendance"){
                socket.join(`Room_AttendanceOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[2]=="reports"){
                socket.join(`Room_ReportsOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[1]=="students"&&url[3]=="documents"){
                socket.join(`Room_Students$${url[2]}_Docs_OfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[1]=="students"&&url[3]=="achievements"){
                socket.join(`Room_Students$${url[2]}_Achi_OfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[1]=="students"&&url[3]=="additionaleducation"){
                socket.join(`Room_Students$${url[2]}_AddE_OfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[1]=="students"&&url[3]=="absenteeismes"){
                socket.join(`Room_Students$${url[2]}_Abse_OfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[1]=="students"&&url[3]=="individualwork"){
                socket.join(`Room_Students$${url[2]}_InWo_OfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[2]=="gallery"){
                socket.join(`Room_GalleryOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            break;
        case "s":
            if(url[1]=="announcements"){
                socket.join(`Room_AnnouncementsOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[1]=="chat"){
                socket.join(`Room_ChatOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[2]=="events"){
                socket.join(`Room_EventsOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[2]=="duty"){
                socket.join(`Room_DutyOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[2]=="achievements"){
                socket.join(`Room_Students$${await serverUser[socket.handshake.session.user].getUserState()[0]}_Achi_OfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[2]=="absenteeismes"){
                socket.join(`Room_Students$${await serverUser[socket.handshake.session.user].getUserState()[0]}_Abse_OfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[2]=="documents"){
                socket.join(`Room_Students$${await serverUser[socket.handshake.session.user].getUserState()[0]}_Docs_OfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[2]=="additionaleducation"){
                socket.join(`Room_Students$${await serverUser[socket.handshake.session.user].getUserState()[0]}_AddE_OfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[2]=="individualwork"){
                socket.join(`Room_Students$${await serverUser[socket.handshake.session.user].getUserState()[0]}_InWo_OfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            else if(url[2]=="groupgallery"){
                socket.join(`Room_GalleryOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`);
            }
            break;
        case "h":
            if(url[1]=="group"&&url[3]=="events"){
                socket.join(`Room_EventsOfGroup$${url[2]}`);
            }
            else if(url[1]=="group"&&url[3]=="individualwork"){
                socket.join(`Room_IWOfGroup$${url[2]}`);
            }
            else if(url[1]=="group"&&url[3]=="attendance"){
                socket.join(`Room_AttendanceOfGroup$${url[2]}`);
            }
            else if(url[1]=="group"&&url[3]=="reports"){
                socket.join(`Room_ReportsOfGroup$${url[2]}`);
            }
            else if(url[1]=="group"&&url[3]=="student"&&url[5]=="documents"){
                socket.join(`Room_Students$${url[6]}_Docs_OfGroup$${url[2]}`);
            }
            else if(url[1]=="group"&&url[3]=="student"&&url[5]=="achievements"){
                socket.join(`Room_Students$${url[6]}_Achi_OfGroup$${url[2]}`);
            }
            else if(url[1]=="group"&&url[3]=="student"&&url[5]=="additionaleducation"){
                socket.join(`Room_Students$${url[6]}_AddE_OfGroup$${url[2]}`);
            }
            else if(url[1]=="group"&&url[3]=="student"&&url[5]=="absenteeismes"){
                socket.join(`Room_Students$${url[6]}_Abse_OfGroup$${url[2]}`);
            }
            else if(url[1]=="group"&&url[3]=="student"&&url[5]=="individualwork"){
                socket.join(`Room_Students$${url[6]}_InWo_OfGroup$${url[2]}`);
            }
            break;
    }
    socket.on("newAnnounce",async(data)=>{
        let path;
        if(data.path!==""){
            path=await base64(data.path);
        }
        io.to(`Room_AnnouncementsOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`).emit('addNewAnnounce',{
            head:data.head,
            type:data.type,
            date:await datenormalise("now","D/M/Y h:m"),
            text:data.text,
            path:path
        });
    });
    socket.on('newChatMessage',async(msg)=>{
        io.to(`Room_ChatOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`).emit('addChatMSG',{
            user:await serverUser[socket.handshake.session.user].getUserFullName(),
            date:await datenormalise("now","D/M/Y h:m:s"),
            msg:msg
        });
    });
    socket.on('newEvent',async(data)=>{
        if(serverUser[req.session.user].getUserState()[3]=="h"){
            let userGroups=await serverUser[req.session.user].getUserGroupsInString();
            if(userGroups.indexOf(data.group)>0){
                io.to(`Room_EventsOfGroup$${data.group}`).emit("addNewReport",{
                    event_type:data.event_type,
                    event_discr:data.event_discr,
                    event_date:data.event_date
                });
            }
        }
        else{
            io.to(`Room_EventsOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`).emit("addNewReport",{
                event_type:data.event_type,
                event_discr:data.event_discr,
                event_date:data.event_date
            })
        }
    });
    socket.on('newAttendance',async(data)=>{
        if(serverUser[req.session.user].getUserState()[3]=="h"){
            let userGroups=await serverUser[req.session.user].getUserGroupsInString();
            if(userGroups.indexOf(data.group)>0){
                io.to(`Room_AttendanceOfGroup$${url[2]}`).emit(`addNewAttendance`);
            }
        }
        else{
            io.to(`Room_AttendanceOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`).emit(`addNewAttendance`);
        }
    });
    socket.on('newIW',async(data)=>{
        if(serverUser[req.session.user].getUserState()[3]=="h"){
            let userGroups=await serverUser[req.session.user].getUserGroupsInString();
            if(userGroups.indexOf(data.group)>0){
                io.to(`Room_IWOfGroup$${url[2]}`).emit(`addNewIW`);
            }
        }
        else{
            io.to(`Room_IWOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`).emit(`addNewIW`);
        }
    });
    socket.on('newReport',async(data)=>{
        if(serverUser[req.session.user].getUserState()[3]=="h"){
            let userGroups=await serverUser[req.session.user].getUserGroupsInString();
            if(userGroups.indexOf(data.group)>0){
                io.to(`Room_AttendanceOfGroup$${url[2]}`).emit(`addNewReport`);
            }
        }
        else{
            io.to(`Room_AttendanceOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`).emit(`addNewReport`);
        }
    });
    socket.on('newGalleryPhoto',async()=>{
        io.to(`Room_GalleryOfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`).emit('addNewGalPhoto');
    });
    socket.on('newStDocument',async()=>{
        if(serverUser[req.session.user].getUserState()[3]=="h"){
            io.to(`Room_Students$${await serverUser[socket.handshake.session.user].getUserState()[0]}_Docs_OfGroup$${data.group_id}`).emit('stDocReload');
        }
        else{
            io.to(`Room_Students$${await serverUser[socket.handshake.session.user].getUserState()[0]}_Docs_OfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`).emit('stDocReload');
        }
    });
    socket.on('newStAchievement',async(dta)=>{
        if(serverUser[req.session.user].getUserState()[3]=="h"){
            io.to(`Room_Students$${await serverUser[socket.handshake.session.user].getUserState()[0]}_Achi_OfGroup$${data.group_id}`).emit('stAchiReload');
        }
        else{
            io.to(`Room_Students$${await serverUser[socket.handshake.session.user].getUserState()[0]}_Achi_OfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`).emit('stAchiReload');
        }
    });
    socket.on('newStAdditionalEducation',async()=>{
        if(serverUser[req.session.user].getUserState()[3]=="h"){
            io.to(`Room_Students$${await serverUser[socket.handshake.session.user].getUserState()[0]}_AddE_OfGroup$${data.group_id}`).emit('stAddEddReload');
        }
        else{
            io.to(`Room_Students$${await serverUser[socket.handshake.session.user].getUserState()[0]}_AddE_OfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`).emit('stAddEddReload');
        }
    });
    socket.on('newStAbsentismes',async()=>{
        if(serverUser[req.session.user].getUserState()[3]=="h"){
            io.to(`Room_Students$${await serverUser[socket.handshake.session.user].getUserState()[0]}_Abse_OfGroup$${data.group_id}`).emit('stAbsReload');
        }
        else{
            io.to(`Room_Students$${await serverUser[socket.handshake.session.user].getUserState()[0]}_Abse_OfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`).emit('stAbsReload');
        }
    });
    socket.on('newStIW',async()=>{
        if(serverUser[req.session.user].getUserState()[3]=="h"){
            io.to(`Room_Students$${await serverUser[socket.handshake.session.user].getUserState()[0]}_InWo_OfGroup$${data.group_id}`).emit('stIwReload');
        }
        else{
            io.to(`Room_Students$${await serverUser[socket.handshake.session.user].getUserState()[0]}_InWo_OfGroup$${await serverUser[socket.handshake.session.user].getUserGroup()}`).emit('stIwReload');
        }
    });
});
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
    });
}
const mysql_promise=require('mysql2/promise');
    function connect_db_promise(){
        return mysql_promise.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            database:'webcollege_database',
            multipleStatements:true
    });
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
//Handlebars: Шифрование данных
hbs.registerHelper('base64',(path)=>{
    if(!path||path==''||path=='null'||path==null){
        return null;
    }
    let split=path.split(".");
    let format=split[split.length-1];
    let data;
    switch(format){
        case "jpg":
            data="image/jpeg";
            break;
        case "jpeg":
            data="image/jpeg";
            break;
        case "png":
            data="image/png";
            break;
        case "rar":
            data="application/vnd.rar";
            break;
        case "zip":
            data="application/zip";
            break;
        case "doc":
            data="application/msword";
            break;
        case "docx":
            data="application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            break;
        case "pdf":
            data="application/pdf";
            break;
        case "xml":
            data="application/xml";
            break;
        case "js":
            data="text/javascript";
            break;
        case "css":
            data="text/css";
    }
    var bitmap = fs.readFileSync(__dirname+"/public/"+path);
    let buff=new Buffer(bitmap);
    let b64=buff.toString('base64');
    return `data:${data};base64,${b64}`;
});
//HandleBars: Форматирование даты на уровне шаблонизатора
hbs.registerHelper('datenormalise',(val,format)=>{
    let date;
    val!=="now"?date=new Date(val):date=new Date().now(); 
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
                result+=date.getDate()<10?"0"+date.getDate():date.getDate();
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
        let string='';
        let data=[this.user_surname,this.user_name,this.user_middlename];
        data.forEach(el=>{
            if(el!=='null'){
                string+=" "+el;
            }
        })
        return string.trim();
    }
    getUserGroup(){
        return this.user_group[0].group_id;
    }
    async getUserGroupsInString(){
        let string="";
        this.user_group.forEach(el=>{
            string+=`'${el.group_id}',`;
        });
        string=string.slice(0,-1);
        return string;
    }
    async getHGroupList(){
        let list=await createSelectQuery(`SELECT a.group_id,b.spetiality_abbreviated
        FROM groups a INNER JOIN spetialities b ON a.spetiality_id=b.spetiality_id
        WHERE a.group_id IN (${await this.getUserGroupsInString()}) AND a.group_end_education_date>NOW()`);
        return list;
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
async function fileUpload(path,files,f_name,ex_action){
    await dirExist(path);
    let uploadPath=files.path;
    let savePath;
    let file_split=f_name.split(".");
    let name_of_file="";
    let file_extension=file_split[file_split.length-1];
    for (let i=0;i<file_split.length-1;i++) {
        name_of_file+=file_split[i];
    }
    name_of_file=await encrypt(name_of_file);
    let file_name=name_of_file.replace(/\\|\//g,'')+"."+file_extension;
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
                result+=date.getDate()<10?"0"+date.getDate():date.getDate();
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
//Функция: Количество дней в месяце
async function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
//Функция: Шифрование base64
async function base64(path){
    let split=path.split(".");
    let format=split[split.length-1];
    let data;
    switch(format){
        case "jpg":
            data="image/jpeg";
            break;
        case "jpeg":
            data="image/jpeg";
            break;
        case "png":
            data="image/png";
            break;
        case "rar":
            data="application/vnd.rar";
            break;
        case "zip":
            data="application/zip";
            break;
        case "doc":
            data="application/msword";
            break;
        case "docx":
            data="application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            break;
        case "pdf":
            data="application/pdf";
            break;
        case "xml":
            data="application/xml";
            break;
        case "js":
            data="text/javascript";
            break;
        case "css":
            data="text/css";
    }
    var bitmap = fs.readFileSync(__dirname+"/public/"+path);
    let buff=new Buffer(bitmap);
    let b64=buff.toString('base64');
    return `data:${data};base64,${b64}`;
}
async function decodeDocuments(docs){
    let passport={};
    for(const [varible,value] of Object.entries(docs[0][0])){
        if(varible=="passport_id"||varible=="student_id"){
            passport[varible]=value;
        }
        else{ 
            passport[varible]=value!==null?await decrypt(value):null;
        }
    }
    let document_info={};
    let documents=[];
    let count=0;
    for (let i=0;i<docs[1].length;i++){
        for(const [varible,value] of Object.entries(docs[1][i])){
            if(varible=="document_id"||varible=="student_id"||varible=="document_name"){
                document_info[varible]=value;
            }
            else{
                document_info[varible]=value!==null&&value!=='null'?await decrypt(value):null;
            }
            count++;
            if(count==5){
                documents.push(document_info);
                document_info={}
            }
        }
        count=0;
    }
    return [passport,documents];
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
                else if(accsessData[2]=="attendance"){
                    result=await createSelectQuery(`SELECT attendance_id
                    FROM attendance
                    WHERE attendance_id=${accsessData[3]} AND group_id=${serverUser[req.session.user].getUserGroup()}`);
                }
                else if(accsessData[1]=="report"){
                    result=await createSelectQuery(`SELECT report_id
                    FROM reports
                    WHERE report_id=${accsessData[2]} AND group_id=${serverUser[req.session.user].getUserGroup()}`);
                }
                else{
                    result=[]
                }
                break;
            case "h":
                if(accsessData[1]=="group"&&accsessData[3]=="student"){
                    result=await createSelectQuery(`SELECT student_id
                    FROM students
                    WHERE group_id IN (${await serverUser[req.session.user].getUserGroupsInString()}) AND student_id=${accsessData[4]}`);
                }
                else if(accsessData[1]=="group"&&accsessData[3]=="attendance"&&accsessData[4]){
                    result=await createSelectQuery(`SELECT attendance_id
                    FROM attendance
                    WHERE group_id IN (${await serverUser[req.session.user].getUserGroupsInString()}) AND attendance_id=${accsessData[4]}`);
                }
                else if(accsessData[1]=="group"&&accsessData[3]=="report"){
                    result=await createSelectQuery(`SELECT report_id
                    FROM reports
                    WHERE group_id IN (${await serverUser[req.session.user].getUserGroupsInString()}) AND report_id=${accsessData[4]}`);
                }
                else if(accsessData[1]=="group"&&accsessData[3]=="report"&&accsessData[4]){
                    result=await createSelectQuery(`SELECT report_id
                    FROM reports
                    WHERE group_id IN (${await serverUser[req.session.user].getUserGroupsInString()}) AND report_id=${accsessData[4]}`);
                }
                else if(accsessData[1]=="group"){
                    result=await createSelectQuery(`SELECT group_id
                    FROM groups
                    WHERE ${accsessData[2]} IN (${await serverUser[req.session.user].getUserGroupsInString()})`); 
                }
                else{
                    result=[];
                }
                break;
            case "s":
                result=[];
                break;
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
app.use(async(req,res,next)=>{
    let createRole='t';
    switch(createRole){
        case "t":
            req.session.user=await encrypt("1/1/teacher/t/Киселёва/Светлана/Владимировна//Ж");
            req.session.user_groups=await createSelectQuery(`SELECT group_id
            FROM groups
            WHERE teacher_id=1 AND group_end_education_date>NOW() ORDER BY group_id DESC LIMIT 1`);
            req.session.user_options=await createSelectQuery(`SELECT *
            FROM options
            WHERE option_id=1`);
            serverUser[req.session.user]=new ServerUser();
            await identifyUser(serverUser[req.session.user],await decrypt(req.session.user),req.session.user_groups,req.session.user_options);
            break;
        case "s":
            req.session.user=await encrypt("1/4/student/s/Костин/Владислав/Констинтинович//М");
            req.session.user_groups=await createSelectQuery(`SELECT a.group_id
            FROM students a INNER JOIN groups b ON a.group_id=b.group_id
            WHERE student_id=1 AND group_end_education_date>NOW() ORDER BY group_id DESC LIMIT 1;`);
            req.session.user_options=await createSelectQuery(`SELECT *
            FROM options
            WHERE option_id=1`);
            serverUser[req.session.user]=new ServerUser();
            await identifyUser(serverUser[req.session.user],await decrypt(req.session.user),req.session.user_groups,req.session.user_options);
            break;
        case "h":
            req.session.user=await encrypt("1/3/head/h/Максимова/Татьяна/Викторовна//Ж");
            req.session.user_groups=await createSelectQuery(`SELECT group_id
            FROM groups
            WHERE head_id=1 AND group_end_education_date>NOW() ORDER BY group_id;`);
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
        req.session.current_url=await req.url;
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
app.route('/welcomepage').get(async(req,res)=>{
    if(req.session.user){
        res.redirect("/");
    }
    else{
        res.render("index");
    }
}).post(urlencodedParser, async(req,res)=>{
    try{
        let connect=connect_db();
        let login=req.body.user_login.trim();
        let password=await encrypt(req.body.user_password.trim().replace(/&quot;/g,"\""));
        let password_raw=req.body.user_password.trim().replace(/&quot;/g,"\"");
        connect.query(`SELECT a.user_id,user_role,user_sur_name,user_name,user_mid_name,user_photo,teacher_id,head_id,student_id,user_sex,user_password
        FROM users a LEFT JOIN teachers b ON a.user_id=b.user_id
        LEFT JOIN students c ON a.user_id=c.user_id
        LEFT JOIN heads d ON a.user_id=d.user_id
        WHERE (user_login LIKE '${login}' AND user_password LIKE '${password}') OR (user_login LIKE '${login}' AND user_password LIKE '${password_raw}') LIMIT 1`, async(err,data)=>{
            if(err) throw err;
            if(data[0]){
                let photo='null';
                if(data[0].user_photo){
                    photo=data[0].user_photo.replace(/\//g,'\\');
                }
                switch(data[0].user_role){
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
                if(data[0].user_password==password_raw){
                    let q=await createIUDQuery(`UPDATE users SET user_password='${await encrypt(data[0].user_password)}'
                    WHERE user_id=${data[0].user_id};`);
                }
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
    let list;
    if(serverUser[req.session.user].getUserState()[3]=="h"){
        list=await serverUser[req.session.user].getHGroupList();
    }
    res.render(`${serverUser[req.session.user].getUserState()[3]}_index`,{
        username:serverUser[req.session.user].getUserFullName(),
        role:serverUser[req.session.user].getUserState()[2], 
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        group_list:list
    });
});
//Страница профиля пользователя(+)
app.route("/profile").get(isAuthenticated,async(req,res)=>{
    let userData=await createSelectQuery(`SELECT *
    FROM users
    WHERE user_id=${serverUser[req.session.user].getUserState()[1]} LIMIT 1;`);
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
            req.session.user=`${serverUser[req.session.user].getUserState()[0]}/${serverUser[req.session.user].getUserState()[1]}/${serverUser[req.session.user].getUserState()[2]}/${serverUser[req.session.user].getUserState()[3]}/${fields.user_sur_name}/${fields.user_name}/${fields.user_mid_name}/${savePath.replace(/\//g,"\\")}/${fields.user_sex}`;
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
app.route("/t/chat").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let chat=await createSelectQuery(`SELECT a.user_sur_name,a.user_name,a.user_mid_name,b.chat_date,b.chat_msg
    FROM users a INNER JOIN group_chat b ON a.user_id=b.id_user
    WHERE b.id_group=${serverUser[req.session.user].getUserGroup()}
    ORDER BY chat_date DESC LIMIT 20;`);
    res.render("t_chat",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        chat:chat.reverse()
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{ 
        let newMessage=await createIUDQuery(`INSERT INTO group_chat
        VALUES(
            null,
            ${serverUser[req.session.user].getUserState()[1]},
            ${serverUser[req.session.user].getUserGroup()},
            NOW(),
            '${req.body.msg}'
        )`);
        res.end("Succsess");
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
    res.render("t_my_group",{
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
app.route("/t/student/:id").get(isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let student=await createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};
    SELECT *
    FROM parents
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};`);
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
}).post(isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    try{
        let nullification=await createIUDQuery(`UPDATE students SET student_headman=0
        WHERE group_id=${serverUser[req.session.user].getUserGroup()}`);
        let result=await createIUDQuery(`UPDATE students SET student_headman=1
        WHERE group_id=${serverUser[req.session.user].getUserGroup()} AND student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')}`);
        res.end("Success");
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
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};
    SELECT *
    FROM attendance a INNER JOIN absenteeismes b on a.attendance_id=b.attendance_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')}
    ORDER BY attendance_date DESC;`);
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
            let file_path=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${JSON.stringify(req.params.id).replace(/\"/g,'')}/absentismeses`,files.file,file_name,'rn');
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
//Страница достижений студента(+)
app.route("/t/student/:id/achievements").get(isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentAchievments=await createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};
    SELECT *
    FROM achievements
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};`);
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
            let file_path=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${JSON.stringify(req.params.id).replace(/\"/g,'')}/achievements`,files.file,file_name,'rn');
            let result=await createIUDQuery(`INSERT INTO achievements
            VALUE(
                null,
                ${JSON.stringify(req.params.id).replace(/\"/g,'')},
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
//Страница документов студента(+)
app.route("/t/student/:id/documents").get(isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentInfo=await createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};`);
    let studentsDocumentary=await createSelectQuery(`SELECT *
    FROM passports
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};
    SELECT *
    FROM documents
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')}
    ORDER BY document_name DESC;`);
    let documents;
    if(studentsDocumentary[0]){
        documents=await decodeDocuments(studentsDocumentary);
    }
    res.render("t_student_documents",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        title:`${studentInfo[0].user_sur_name} ${studentInfo[0].user_name} ${studentInfo[0].user_mid_name}`,
        student_name:`${studentInfo[0].user_sur_name} ${studentInfo[0].user_name} ${studentInfo[0].user_mid_name}`,
        passport:documents[0],
        documents:documents[1]
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
                            savePath=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${JSON.stringify(req.params.id).replace(/\"/g,'')}/documents`,files[field_name+"_scan"],`SN_${JSON.stringify(req.params.id).replace(/\"/g,'')}_ILS-scan.png`,'rw');
                            savePath=await encrypt(savePath);
                        }
                        else{
                            file_exist=await createSelectQuery(`SELECT document_scan 
                            FROM documents 
                            WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} AND document_name LIKE 'СНИЛС' AND document_scan IS NOT NULL`);
                            if(file_exist[0]){
                                savePath=file_exist[0].document_scan;
                            }
                            else{
                                savePath='null';
                            }
                        }
                        result=await createIUDQuery(`UPDATE documents SET
                        document_number='${await encrypt(field_val)}',
                        document_scan='${savePath}'
                        WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} AND document_name LIKE 'СНИЛС';`);
                        break;
                    case "ИНН":
                        if(files[field_name+"_scan"]){
                            savePath=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${JSON.stringify(req.params.id).replace(/\"/g,'')}/documents`,files[field_name+"_scan"],`IN_${JSON.stringify(req.params.id).replace(/\"/g,'')}_N-scan.png`,'rw');
                            savePath=await encrypt(savePath);
                        }
                        else{
                            file_exist=await createSelectQuery(`SELECT document_scan 
                            FROM documents 
                            WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} AND document_name LIKE 'ИНН' AND document_scan IS NOT NULL;`);
                            if(file_exist[0]){
                                savePath=file_exist[0].document_scan;
                            }
                            else{
                                savePath='null';
                            }
                        }
                        result=await createIUDQuery(`UPDATE documents SET
                        document_number='${await encrypt(field_val)}',
                        document_scan='${savePath}'
                        WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} AND document_name LIKE 'ИНН';`);
                        break;
                    case "ПОЛИС":
                        if(files[field_name+"_scan"]){
                            savePath=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${JSON.stringify(req.params.id).replace(/\"/g,'')}/documents`,files[field_name+"_scan"],`PO_${JSON.stringify(req.params.id).replace(/\"/g,'')}_LIS-scan.png`,'rw');
                            savePath=await encrypt(savePath);
                        }
                        else{
                            file_exist=await createSelectQuery(`SELECT document_scan 
                            FROM documents 
                            WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} AND document_name LIKE 'ПОЛИС' AND document_scan IS NOT NULL;`);
                            if(file_exist[0]){
                                savePath=file_exist[0].document_scan;
                            }
                            else{
                                savePath='null';
                            }
                        }
                        result=await createIUDQuery(`UPDATE documents SET
                        document_number='${await encrypt(field_val)}',
                        document_scan='${savePath}'
                        WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} AND document_name LIKE 'ПОЛИС';`);
                        break;
                }
            }
            if(files.passport_scan){
                savePath=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${JSON.stringify(req.params.id).replace(/\"/g,'')}/documents`,files.passport_scan,`PA_${JSON.stringify(req.params.id).replace(/\"/g,'')}_SSPORT-scan.png`,'rw');
                savePath=await encrypt(savePath);
            }
            else{
                file_exist=await createSelectQuery(`SELECT passport_scan 
                FROM passports 
                WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} AND passport_scan IS NOT NULL;`);
                if(file_exist[0]){
                    savePath=file_exist[0].passport_scan;
                }
                else{
                    savePath='null';
                }
            }
            result=await createIUDQuery(`UPDATE passports SET
            passport_series='${await encrypt(fields.passport_sir)}',
            passport_number='${await encrypt(fields.passport_num)}',
            passport_data_of_issue='${await encrypt(fields.passport_date)}',
            passport_address='${await encrypt(fields.passport_lp)}',
            passport_issued_by='${await encrypt(fields.passport_by)}',
            passport_scan='${savePath}'
            WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};`);
            res.end("Succsess");
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
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};
    SELECT *
    FROM additional_educations a INNER JOIN courses b ON a.ae_id=b.ae_id
    INNER JOIN teachers c ON a.ae_lecturer_id=c.teacher_id
    INNER JOIN users d ON c.user_id=d.user_id
    WHERE b.student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')}
    ORDER BY ae_beg_date DESC;
    SELECT a.ae_id,a.ae_name,user_sur_name,user_name,user_mid_name
    FROM additional_educations a LEFT JOIN courses b ON a.ae_id=b.ae_id
    INNER JOIN teachers c ON a.ae_lecturer_id=c.teacher_id
    INNER JOIN users d ON c.user_id=d.user_id
    WHERE ae_beg_date>NOW() AND a.ae_id NOT IN (SELECT ae_id
                                              FROM courses
                                              WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')})
    ORDER BY ae_beg_date DESC;`);
    res.render("t_student_additional_education",{
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
            ${JSON.stringify(req.params.id).replace(/\"/g,'')}
        );`);
        res.end("Succsses");
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница ИР студента(+)
app.route("/t/student/:id/individualwork").get(isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentIW=await createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};
    SELECT * 
    FROM individual_work_types;
    SELECT c.student_id,user_sur_name,user_name,user_mid_name,iw_type_name,iw_reasone,iw_date
    FROM individual_works a INNER JOIN individual_work_types b ON a.iw_type_id=b.iw_type_id
    LEFT JOIN students c ON a.student_id=c.student_id INNER JOIN users d ON c.user_id=d.user_id
    WHERE c.group_id=${serverUser[req.session.user].getUserGroup()} AND c.student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')}
    ORDER BY iw_date DESC LIMIT 15;`);
    res.render("t_student_individual_work",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        title:`${studentIW[0][0].user_sur_name} ${studentIW[0][0].user_name} ${studentIW[0][0].user_mid_name}`,
        student_name:`${studentIW[0][0].user_sur_name} ${studentIW[0][0].user_name} ${studentIW[0][0].user_mid_name}`,
        iw:studentIW[2],
        iw_type:studentIW[1],
        form:'t-st-iw'
    });
}).post(isAuthenticated,interfaceSplitter,isAccsessable,urlencodedParser,async(req,res)=>{
    try{
        let result=await createIUDQuery(`INSERT INTO individual_works
        VALUES(
            null,
            ${req.body.iw_type},
            ${JSON.stringify(req.params.id).replace(/\"/g,'')},
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
//Страница мероприятий(+)
app.route("/t/mygroup/events").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let groupEvents=await createSelectQuery(`SELECT *
    FROM events a INNER JOIN event_types b ON a.event_type_id=b.event_type_id
    WHERE a.group_id=${serverUser[req.session.user].getUserGroup()}
    ORDER BY event_id DESC LIMIT 8;
    SELECT *
    FROM event_types`);
    res.render("t_my_group_events",{
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
                '${req.body.event_date}',
                null
            );`);
            res.end(result);
        }
        else{
            let form=new formidable.IncomingForm();
            form.parse(req,async(err,fields,files)=>{
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
    WHERE c.group_id=${serverUser[req.session.user].getUserGroup()}
    ORDER BY iw_date DESC LIMIT 10;
    SELECT a.student_id,user_sur_name,user_name,user_mid_name
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE group_id=${serverUser[req.session.user].getUserGroup()}`);
    res.render("t_my_group_individual_work",{
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
    ORDER BY report_cr_date,report_id DESC LIMIT 16;`);
    res.render("t_reports",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        reports:reports
    });
});
//Страница данных отчёта(+)
app.get("/t/mygroup/report/:id",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let report=await createSelectQuery(`SELECT * 
    FROM reports
    WHERE report_id=${JSON.stringify(req.params.id).replace(/\"/g,'')}`);
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
    res.render("t_new_report",{
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
                            select_query_part+=`COUNT(
                                                    CASE 
                                                        WHEN absenteeismes_type='Н' AND a.attendance_date>DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]}) 
                                                        THEN 1 
                                                    END) 'N',`;
                            break;
                        case "З":
                            fields+="З,";
                            select_query_part+=`COUNT(
                                                    CASE 
                                                        WHEN absenteeismes_type='З' AND a.attendance_date>DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]}) 
                                                        THEN 1 
                                                    END) 'Z',`;
                            break;
                        case "common":
                            fields+="Общее кол-во пропусков,";
                            select_query_part+=`COUNT(
                                                    CASE 
                                                        WHEN a.attendance_date>DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]}) 
                                                        THEN 1 
                                                    END) 'common',`;
                            break;
                        case "closed":
                            fields+="Закрытые пропуски,";
                            select_query_part+=`COUNT(
                                                    CASE 
                                                        WHEN absenteeismes_file IS NOT NULL AND a.attendance_date>DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]}) 
                                                        THEN 1 
                                                    END) 'closed',`;
                            break;
                        case "unclosed":
                            fields+="Незакрытые пропуски,";
                            select_query_part+=`COUNT(
                                                    CASE 
                                                        WHEN a.attendance_date>DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]}) 
                                                        THEN 1 
                                                    END)
                                                -COUNT(
                                                        CASE 
                                                            WHEN absenteeismes_file IS NOT NULL AND a.attendance_date>DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]}) 
                                                            THEN 1 
                                                        END) 'unclosed',`;
                            break;
                    }
                });
                fields=fields.substr(0,fields.length-1);
                select_query_part=select_query_part.substr(0,select_query_part.length-1)+"\n";
                groupby_query_part=groupby_query_part.substr(0,groupby_query_part.length-1);
                from_query_part+=`attendance a RIGHT JOIN absenteeismes b ON a.attendance_id=b.attendance_id 
                                  RIGHT JOIN students c ON b.student_id=c.student_id 
                                  INNER JOIN users d ON c.user_id=d.user_id \n`;
                where_query_part+=`c.group_id=${serverUser[req.session.user].getUserGroup()} AND c.student_id NOT IN (SELECT student_id FROM deductions) \n`;
                break;
            case "events":
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
                            select_query_part+=`COUNT(
                                                    CASE 
                                                        WHEN a.event_date<NOW() AND a.event_date>DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]}) 
                                                        THEN 1 
                                                    END) 'compl',`;
                            break;
                        case "future":
                            fields+="Предстоящие,";
                            select_query_part+=`COUNT(
                                                    CASE 
                                                        WHEN a.event_date>NOW() AND a.event_date>DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]}) 
                                                        THEN 1 
                                                    END) 'future',`;
                            break;
                        case "common":
                            fields+="Общее количество,";
                            select_query_part+=`COUNT(
                                                    CASE
                                                        WHEN a.event_date>DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]}) 
                                                        THEN 1
                                                    END) 'comm',`;
                            break;
                    }
                });
                fields=fields.substr(0,fields.length-1);
                select_query_part=select_query_part.substr(0,select_query_part.length-1)+"\n";
                from_query_part+=`events a INNER JOIN event_types b ON a.event_type_id=b.event_type_id \n`;
                where_query_part+=`group_id=${serverUser[req.session.user].getUserGroup()} \n`;
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
                        case "soc":
                            fields+="Работа с соц. педагогом";
                            select_query_part+=`COUNT(
                                                    CASE 
                                                        WHEN a.iw_type_id=1 AND a.iw_date>DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]}) 
                                                        THEN 1 
                                                    END) 'psy',`;
                            break;
                        case "psy":
                            fields+="Работа с психологом,";
                            select_query_part+=`COUNT(
                                                    CASE 
                                                        WHEN a.iw_type_id=2 AND a.iw_date>DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]}) 
                                                        THEN 1 
                                                    END) 'psy',`;
                            break;
                        case "rep":
                            fields+="Полученные жалобы,";
                            select_query_part+=`COUNT(
                                                    CASE 
                                                        WHEN a.iw_type_id=3 AND a.iw_date>DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]}) 
                                                        THEN 1 
                                                    END) 'rep',`;
                            break;
                        case "cons":
                            fields+="Работа с советом по проф.,";
                            select_query_part+=`COUNT(
                                                    CASE 
                                                        WHEN a.iw_type_id=4 AND a.iw_date>DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]}) 
                                                        THEN 1 
                                                    END) 'cons',`;
                            break;
                    }
                });
                fields=fields.substr(0,fields.length-1);
                select_query_part=select_query_part.substr(0,select_query_part.length-1)+"\n";
                groupby_query_part=groupby_query_part.substr(0,groupby_query_part.length-1);
                from_query_part+=`individual_works a INNER JOIN individual_work_types b ON a.iw_type_id=b.iw_type_id 
                                  RIGHT JOIN students c ON a.student_id=c.student_id 
                                  INNER JOIN users d ON c.user_id=d.user_id \n`;
                where_query_part+=`c.group_id=${serverUser[req.session.user].getUserGroup()} AND c.student_id NOT IN (SELECT student_id FROM deductions) \n`;
                break;
            case "att-special":
                var days,month,interval;
                let date=new Date(await datenormalise("now","Y-M-D"));
                switch(req.body.date){
                    case "BLAST":
                        month=await date.setMonth(date.getMonth()-3);
                        month=await datenormalise(month,"M");
                        interval=2;
                        days=await daysInMonth(month,date.getFullYear());
                        break;
                    case "PREV":
                        month=await date.setMonth(date.getMonth()-2);
                        month=await datenormalise(month,"M");
                        interval=1;
                        days=await daysInMonth(month,date.getFullYear());
                        break;
                    case "NOW":
                        month=await date.setMonth(date.getMonth()-1);
                        month=await datenormalise(month,"M");
                        interval=0;
                        days=await daysInMonth(month,date.getFullYear());
                        break;
                };
                month=month++<10?"0"+month++:month++;
                fields+="Студент,";
                select_query_part+="d.user_sur_name,d.user_name,d.user_mid_name,";
                groupby_query_part+="d.user_sur_name,d.user_name,d.user_mid_name ORDER BY d.user_sur_name";
                let day;
                for (let i=1;i<=days;i++){
                    day=i<10?"0"+i:i;
                    console.log(day);
                    fields+=`${day}.${month},`;
                    select_query_part+=`(CASE 
                                            WHEN '${date.getFullYear()}-${month}-${day}' IN (SELECT attendance_date FROM attendance aq1 INNER JOIN absenteeismes aq2 ON aq1.attendance_id=aq2.attendance_id WHERE aq1.attendance_date LIKE '${date.getFullYear()}-${month}-${day}' AND c.student_id=aq2.student_id) AND b.absenteeismes_type='Н' 
                                                THEN 'Н' 
                                            WHEN '${date.getFullYear()}-${month}-${day}' IN (SELECT attendance_date FROM attendance aq1 INNER JOIN absenteeismes aq2 ON aq1.attendance_id=aq2.attendance_id WHERE aq1.attendance_date LIKE '${date.getFullYear()}-${month}-${day}' AND c.student_id=aq2.student_id) AND b.absenteeismes_type='З' 
                                                THEN 'З' 
                                            ELSE '' 
                                        END) AS 'DAY${day}',`;
                }
                fields=fields.slice(0,-1);
                select_query_part=select_query_part.slice(0,-1)+"\n";
                from_query_part+=`attendance a RIGHT JOIN absenteeismes b ON a.attendance_id=b.attendance_id 
                                RIGHT JOIN students c ON b.student_id=c.student_id 
                                INNER JOIN users d ON c.user_id=d.user_id \n`;
                where_query_part+=`c.group_id=${serverUser[req.session.user].getUserGroup()} AND c.student_id NOT IN (SELECT student_id FROM deductions) \n`;
                break;
        }
        let query=select_query_part+from_query_part+where_query_part+groupby_query_part;
        //let check=await createSelectQuery(query);
        let result;
        if(req.body.type!=="att-special"){
            result=await createIUDQuery(`INSERT INTO reports 
            VALUES(
                null,
                ${serverUser[req.session.user].getUserGroup()},
                NOW(),
                DATE_SUB('${date_now}',INTERVAL ${req.body['date[]'][0]} ${req.body['date[]'][1]}),
                '${req.body.type}',
                '${fields}',
                '${query.replace(/\'/gi,"\\'")}'
            );`);
        }
        else{
            let spec_date=date_now.split(".");
            result=await createIUDQuery(`INSERT INTO reports 
            VALUES(
                null,
                ${serverUser[req.session.user].getUserGroup()},
                NOW(),
                DATE_SUB('${spec_date[0]}.${spec_date[1]}.01', INTERVAL ${interval} MONTH),
                '${req.body.type}',
                '${fields}',
                '${query.replace(/\'/gi,"\\'")}'
            );`);
        }
        let id=await createSelectQuery(`SELECT report_id 
        FROM reports 
        WHERE group_id=${serverUser[req.session.user].getUserGroup()} 
        ORDER BY report_id DESC LIMIT 1;`);
        res.end(`${id[0].report_id}`);
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница посещаемости(+)
app.get("/t/mygroup/attendance",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let attendanceInfo=await createSelectQuery(`SELECT * 
    FROM attendance
    WHERE group_id=${serverUser[req.session.user].getUserGroup()}
    ORDER BY attendance_id DESC LIMIT 12;`);
    res.render("t_my_group_attendance",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        at_list:attendanceInfo
    });
});
//Страница и информацией о посещаемости()(+)
app.get("/t/mygroup/attendance/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let attendanceInfo=await createSelectQuery(`SELECT * 
    FROM attendance
    WHERE attendance_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};
    SELECT DISTINCT user_name,user_sur_name,user_mid_name,user_sex,user_photo,student_id,attendance_id
    FROM users a INNER JOIN students b ON a.user_id=b.user_id
    INNER JOIN groups c ON b.group_id=c.group_id
    INNER JOIN attendance d ON c.group_id=d.group_id
    WHERE d.attendance_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} AND b.student_id NOT IN(SELECT student_id 
                                                    FROM absenteeismes 
                                                    WHERE attendance_id=${JSON.stringify(req.params.id).replace(/\"/g,'')})
    ORDER BY user_sur_name;
    SELECT DISTINCT user_name,user_sur_name,user_mid_name,user_sex,user_photo,student_id,attendance_id
    FROM users a INNER JOIN students b ON a.user_id=b.user_id
    INNER JOIN groups c ON b.group_id=c.group_id
    INNER JOIN attendance d ON c.group_id=d.group_id
    WHERE d.attendance_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} AND b.student_id IN(SELECT student_id 
                                                    FROM absenteeismes 
                                                    WHERE attendance_id=${JSON.stringify(req.params.id).replace(/\"/g,'')})
    ORDER BY user_sur_name;`);
    res.render("t_my_group_attendance_info",{
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
    res.render("t_new_attendance",{
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
    res.render("t_my_group_gallery",{
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
//Страницы студента (+)
//Страница анонсов (+)
app.get("/s/announcements",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let announcements=await createSelectQuery(`SELECT *
    FROM announcements a INNER JOIN announcement_types b on a.announcement_type=b.announcement_type_id
    WHERE group_id=${serverUser[req.session.user].getUserGroup()} ORDER BY announcement_data DESC LIMIT 5;`);
    res.render("s_announcements",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        posts:announcements
    });
});
//Страница чата (+)
app.route("/s/chat").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let chat=await createSelectQuery(`SELECT a.user_sur_name,a.user_name,a.user_mid_name,b.chat_date,b.chat_msg
    FROM users a INNER JOIN group_chat b ON a.user_id=b.id_user
    WHERE b.id_group=${serverUser[req.session.user].getUserGroup()} 
    ORDER BY chat_date DESC LIMIT 20`);
    res.render("t_chat",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        chat:chat.reverse()
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{
        let newMessage=await createIUDQuery(`INSERT INTO group_chat
        VALUES(
            null,
            ${serverUser[req.session.user].getUserState()[1]},
            ${serverUser[req.session.user].getUserGroup()},
            NOW(),
            '${req.body.msg}'
        )`);
        res.end("Succsess");
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница мероприятий (+)
app.get("/s/events",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let events=await createSelectQuery(`SELECT *
    FROM events a INNER JOIN event_types b ON a.event_type_id=b.event_type_id
    WHERE a.group_id=${serverUser[req.session.user].getUserGroup()}
    ORDER BY event_id DESC LIMIT 8;`);
    res.render("s_events",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        events:events
    });
});
//Страница группы студента (+)
app.get("/s/mygroup",isAuthenticated,interfaceSplitter,async(req,res)=>{
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
                                            WHERE b.student_id=c.student_id)) q2;
    SELECT user_sur_name,user_name,user_mid_name
    FROM users a INNER JOIN teachers b ON a.user_id=b.user_id
    INNER JOIN groups c ON b.teacher_id=c.group_id
    WHERE group_id=${serverUser[req.session.user].getUserGroup()} LIMIT 1`);
    let teacher;
    if(group[3][0].user_sur_name!==null){
        teacher=`${group[3][0].user_sur_name} ${group[3][0].user_name} ${group[3][0].user_mid_name}`
    }
    else{
        teacher="Отсутствует";
    }
    res.render("s_my_group",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        title:group[1][0].spetiality_abbreviated,
        groupInfo:group[1][0],
        teacher:teacher,
        groupStudentInfo:group[2][0],
        studentsList:group[0]
    });
});
//Страница дежурств (+)
app.route("/s/duty").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let duty=await createSelectQuery(`SELECT a.user_sur_name,a.user_name,a.user_mid_name,b.student_id
    FROM users a INNER JOIN students b ON a.user_id=b.user_id
    WHERE b.group_id=${serverUser[req.session.user].getUserGroup()}
    ORDER BY a.user_sur_name;
    SELECT a.ds_date, c.user_sur_name 'f_st_sn',c.user_name 'f_st_n',c.user_mid_name 'f_st_mn',e.user_sur_name 's_st_sn',e.user_name 's_st_n',e.user_mid_name 's_st_mn'
    FROM duty_schedule a INNER JOIN students b ON a.first_student_id=b.student_id
    INNER JOIN users c ON b.user_id=c.user_id
    INNER JOIN students d ON a.second_student_id=d.student_id
    INNER JOIN users e ON e.user_id=d.user_id
    WHERE a.group_id=${serverUser[req.session.user].getUserGroup()}
    ORDER BY a.ds_date DESC LIMIT 10;
    SELECT a.ds_date, c.user_sur_name 'f_st_sn',c.user_name 'f_st_n',c.user_mid_name 'f_st_mn',e.user_sur_name 's_st_sn',e.user_name 's_st_n',e.user_mid_name 's_st_mn'
    FROM duty_schedule a INNER JOIN students b ON a.first_student_id=b.student_id
    INNER JOIN users c ON b.user_id=c.user_id
    INNER JOIN students d ON a.second_student_id=d.student_id
    INNER JOIN users e ON e.user_id=d.user_id
    WHERE a.group_id=${serverUser[req.session.user].getUserGroup()} AND a.ds_date=CURDATE() LIMIT 1;
    SELECT student_headman
    FROM students
    WHERE student_id=${serverUser[req.session.user].getUserState()[0]} LIMIT 1`);
    res.render("s_duty",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        students_list:duty[0],
        duty_list:duty[1],
        duty_today:duty[2],
        headman:duty[3][0]
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{
        let checkAccsess=await createSelectQuery(`SELECT student_id
        FROM students 
        WHERE student_id=${req.body.f_student} OR student_id=${req.body.s_student}`);
        if(checkAccsess.length==2){
            let check=await createSelectQuery(`SELECT *
            FROM duty_schedule
            WHERE group_id=${serverUser[req.session.user].getUserGroup()} and ds_date=CURDATE()`);
            if(check[0]){
                let res= await createIUDQuery(`UPDATE duty_schedule SET 
                first_student_id=${req.body.f_student},
                second_student_id=${req.body.s_student}
                WHERE group_id=${serverUser[req.session.user].getUserGroup()} and ds_date=CURDATE()`);
            }
            else{
                let res=await createIUDQuery(`INSERT INTO duty_schedule 
                VALUES(
                    null,
                    NOW(),
                    ${req.body.f_student},
                    ${req.body.s_student},
                    ${serverUser[req.session.user].getUserGroup()}
                )`);
            }
            res.end("Success");
        }
        else{
            res.end("Hacking attempt!")
        }
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница достижений (+)
app.route("/s/achievements").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let studentAchievments=await createSelectQuery(`SELECT *
    FROM achievements
    WHERE student_id=${serverUser[req.session.user].getUserState()[0]}`);
    res.render("s_achievements",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        form: "s-achievements",
        achievements:studentAchievments
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{
        let form = new formidable.IncomingForm();
        form.parse(req,async(err, fields, files)=>{
            let file_name=files.file.name;
            let file_path=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${serverUser[req.session.user].getUserState()[0]}/achievements`,files.file,file_name,'rn');
            let result=await createIUDQuery(`INSERT INTO achievements
            VALUE(
                null,
                ${serverUser[req.session.user].getUserState()[0]},
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
//Страница посещаемости (+)
app.route("/s/absenteeismes").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let studentAbsenteeismes=await createSelectQuery(`SELECT *
    FROM attendance a INNER JOIN absenteeismes b on a.attendance_id=b.attendance_id
    WHERE student_id=${serverUser[req.session.user].getUserState()[0]}
    ORDER BY attendance_date DESC;`);
    res.render("s_absenteeismes",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        absentismeses: studentAbsenteeismes
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{
        let form=new formidable.IncomingForm();
        form.parse(req,async(err,fields,files)=>{
            let file_name=files.file.name;
            let file_path=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${serverUser[req.session.user].getUserState()[0]}/absentismeses`,files.file,file_name,'rn');
            let result=await createIUDQuery(`UPDATE absenteeismes SET absenteeismes_file='${file_path}'
            WHERE absenteeismes_id=${fields.id}`);
            res.end(file_path);
        });
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница документов (+)
app.route("/s/documents").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let studentsDocumentary=await createSelectQuery(`SELECT *
    FROM passports
    WHERE student_id=${serverUser[req.session.user].getUserState()[0]};
    SELECT document_id,student_id,document_name,document_number,document_scan
    FROM documents
    WHERE student_id=${serverUser[req.session.user].getUserState()[0]}
    ORDER BY document_name DESC;`);
    let documents;
    if(studentsDocumentary[0]){
        documents=await decodeDocuments(studentsDocumentary);
    }
    res.render("s_documents",{
    username:serverUser[req.session.user].getUserFullName(), 
    role:serverUser[req.session.user].getUserState()[2],
    options:serverUser[req.session.user].getUserOptions(),
    user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
    sidebar_d:req.cookies.sidebar,
    passport:documents[0],
    documents:documents[1]
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
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
                            savePath=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${serverUser[req.session.user].getUserState()[0]}/documents`,files[field_name+"_scan"],`SN_${serverUser[req.session.user].getUserState()[0]}_ILS-scan.png`,'rw');
                            savePath=await encrypt(savePath);
                        }
                        else{
                            file_exist=await createSelectQuery(`SELECT document_scan 
                            FROM documents 
                            WHERE student_id=${serverUser[req.session.user].getUserState()[0]} AND document_name LIKE 'СНИЛС' AND document_scan IS NOT NULL`);
                            if(file_exist[0]){
                                savePath=file_exist[0].document_scan;
                            }
                            else{
                                savePath='null';
                            }
                        }
                        result=await createIUDQuery(`UPDATE documents SET
                        document_number='${await encrypt(field_val)}',
                        document_scan='${savePath}'
                        WHERE student_id=${serverUser[req.session.user].getUserState()[0]} AND document_name LIKE 'СНИЛС';`);
                        break;
                    case "ИНН":
                        if(files[field_name+"_scan"]){
                            savePath=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${serverUser[req.session.user].getUserState()[0]}/documents`,files[field_name+"_scan"],`IN_${serverUser[req.session.user].getUserState()[0]}_N-scan.png`,'rw');
                            savePath=await encrypt(savePath);
                        }
                        else{
                            file_exist=await createSelectQuery(`SELECT document_scan 
                            FROM documents 
                            WHERE student_id=${serverUser[req.session.user].getUserState()[0]} AND document_name LIKE 'ИНН' AND document_scan IS NOT NULL;`);
                            if(file_exist[0]){
                                savePath=file_exist[0].document_scan;
                            }
                            else{
                                savePath='null';
                            }
                        }
                        result=await createIUDQuery(`UPDATE documents SET
                        document_number='${await encrypt(field_val)}',
                        document_scan='${savePath}'
                        WHERE student_id=${serverUser[req.session.user].getUserState()[0]} AND document_name LIKE 'ИНН';`);
                        break;
                    case "ПОЛИС":
                        if(files[field_name+"_scan"]){
                            savePath=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${serverUser[req.session.user].getUserState()[0]}/documents`,files[field_name+"_scan"],`PO_${serverUser[req.session.user].getUserState()[0]}_LIS-scan.png`,'rw');
                            savePath=await encrypt(savePath);
                        }
                        else{
                            file_exist=await createSelectQuery(`SELECT document_scan 
                            FROM documents 
                            WHERE student_id=${serverUser[req.session.user].getUserState()[0]} AND document_name LIKE 'ПОЛИС' AND document_scan IS NOT NULL;`);
                            if(file_exist[0]){
                                savePath=file_exist[0].document_scan;
                            }
                            else{
                                savePath='null';
                            }
                        }
                        result=await createIUDQuery(`UPDATE documents SET
                        document_number='${await encrypt(field_val)}',
                        document_scan='${savePath}'
                        WHERE student_id=${serverUser[req.session.user].getUserState()[0]} AND document_name LIKE 'ПОЛИС';`);
                        break;
                }
            }
            if(files.passport_scan){
                savePath=await fileUpload(`/public/files/${serverUser[req.session.user].getUserGroup()}/${serverUser[req.session.user].getUserState()[0]}/documents`,files.passport_scan,`PA_${serverUser[req.session.user].getUserState()[0]}_SSPORT-scan.png`,'rw');
                savePath=await encrypt(savePath);
            }
            else{
                file_exist=await createSelectQuery(`SELECT passport_scan 
                FROM passports 
                WHERE student_id=${serverUser[req.session.user].getUserState()[0]} AND passport_scan IS NOT NULL;`);
                if(file_exist[0]){
                    savePath=file_exist[0].passport_scan;
                }
                else{
                    savePath='null';
                }
            }
            result=await createIUDQuery(`UPDATE passports SET
            passport_series='${await encrypt(fields.passport_sir)}',
            passport_number='${await encrypt(fields.passport_num)}',
            passport_data_of_issue='${await encrypt(fields.passport_date)}',
            passport_address='${await encrypt(fields.passport_lp)}',
            passport_issued_by='${await encrypt(fields.passport_by)}',
            passport_scan='${savePath}'
            WHERE student_id=${serverUser[req.session.user].getUserState()[0]};`);
            res.end("Succsess");
        });
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница ДО/ДПО (+)
app.get("/s/additionaleducation",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let studentAdditionEducation=await createSelectQuery(`SELECT ae_name,ae_beg_date,ae_end_date,user_sur_name,user_name,user_mid_name
    FROM additional_educations a INNER JOIN courses b ON a.ae_id=b.ae_id
    INNER JOIN teachers c ON a.ae_lecturer_id=c.teacher_id
    INNER JOIN users d ON c.user_id=d.user_id
    WHERE b.student_id=${serverUser[req.session.user].getUserState()[0]}
    ORDER BY ae_beg_date DESC;`);
    res.render("s_additional_education",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        ae:studentAdditionEducation,
    });
});
//Страница индивидуальной работы (+)
app.get("/s/individualwork",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let individualWork=await createSelectQuery(`SELECT c.student_id,user_sur_name,user_name,user_mid_name,iw_type_name,iw_reasone,iw_date
        FROM individual_works a INNER JOIN individual_work_types b ON a.iw_type_id=b.iw_type_id
        LEFT JOIN students c ON a.student_id=c.student_id INNER JOIN users d ON c.user_id=d.user_id
        WHERE c.student_id=${serverUser[req.session.user].getUserState()[0]}
        ORDER BY iw_date DESC LIMIT 15;`);
    res.render("s_individual_work",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        iw:individualWork
    });
});
//Страница галлереи (+)
app.route("/s/groupgallery").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let gallery=await createSelectQuery(`SELECT gallery_id,gallery_img
    FROM gallery
    WHERE group_id=${serverUser[req.session.user].getUserGroup()}
    ORDER BY gallery_id DESC;`);
    res.render("s_gallery",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        gallery:gallery,
        form:"s-gallery"
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
            res.end(savePath);
        });
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страницы заведующей отделением (+)
//Страница группы (+)
app.get("/h/group/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let list=await serverUser[req.session.user].getHGroupList();
    let group=await createSelectQuery(`SELECT student_id,user_sur_name,user_name,user_mid_name,user_photo,student_headman,user_sex
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE group_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} AND NOT EXISTS (SELECT student_id FROM deductions WHERE deductions.student_id=a.student_id)
    ORDER BY user_sur_name;
    SELECT *
    FROM spetialities a INNER JOIN groups b ON a.spetiality_id=b.spetiality_id
    INNER JOIN spetiality_professions c ON a.spetiality_profession_id=c.spetiality_profession_id
    WHERE b.group_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} LIMIT 1;
    SELECT q1.all, q2.educated, SUM(q1.all-q2.educated) 'deducted'
    FROM (SELECT COUNT(a.student_id) 'all'
            FROM students a
            WHERE a.group_id=${JSON.stringify(req.params.id).replace(/\"/g,'')}) q1,
        (SELECT COUNT(b.student_id) 'educated'
            FROM students b
            WHERE b.group_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} AND NOT EXISTS(SELECT c.student_id
                                            FROM deductions c
                                            WHERE b.student_id=c.student_id)) q2;
    SELECT user_sur_name,user_name,user_mid_name
    FROM users a INNER JOIN teachers b ON a.user_id=b.user_id
    RIGHT JOIN groups c ON b.teacher_id=c.group_id
    WHERE group_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} LIMIT 1`);
    let teacher;
    if(group[3][0].user_sur_name!==null){
        teacher=`${group[3][0].user_sur_name} ${group[3][0].user_name} ${group[3][0].user_mid_name}`
    }
    else{
        teacher="Отсутствует";
    }
    res.render("h_group",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        student_list:group[0],
        groupInfo:group[1][0],
        groupStudentInfo:group[2][0],
        group_list:list,
        teacher:teacher,
        title:group[1][0].spetiality_abbreviated,
    });
});
//Страница посещаемости группы (+)
app.get("/h/group/:id/attendance",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let list=await serverUser[req.session.user].getHGroupList();
    let attendanceInfo=await createSelectQuery(`SELECT * 
    FROM attendance
    WHERE group_id=${JSON.stringify(req.params.id).replace(/\"/g,'')}
    ORDER BY attendance_id DESC LIMIT 12;
    SELECT *
    FROM spetialities a INNER JOIN groups b ON a.spetiality_id=b.spetiality_id
    INNER JOIN spetiality_professions c ON a.spetiality_profession_id=c.spetiality_profession_id
    WHERE b.group_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} LIMIT 1;`);
    res.render("h_group_attendance",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        group_list:list,
        at_list:attendanceInfo[0],
        spec_abbr:attendanceInfo[1][0].spetiality_abbreviated
    });
});
//Страница с информацией о данной посещаемости (+)
app.get("/h/group/:id/attendance/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let list=await serverUser[req.session.user].getHGroupList();
    let attendanceInfo=await createSelectQuery(`SELECT * 
    FROM attendance
    WHERE attendance_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};
    SELECT DISTINCT user_name,user_sur_name,user_mid_name,user_sex,user_photo,student_id,attendance_id
    FROM users a INNER JOIN students b ON a.user_id=b.user_id
    INNER JOIN groups c ON b.group_id=c.group_id
    INNER JOIN attendance d ON c.group_id=d.group_id
    WHERE d.attendance_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} AND b.student_id NOT IN(SELECT student_id 
                                                    FROM absenteeismes 
                                                    WHERE attendance_id=${JSON.stringify(req.params.id).replace(/\"/g,'')})
    ORDER BY user_sur_name;
    SELECT DISTINCT user_name,user_sur_name,user_mid_name,user_sex,user_photo,student_id,attendance_id
    FROM users a INNER JOIN students b ON a.user_id=b.user_id
    INNER JOIN groups c ON b.group_id=c.group_id
    INNER JOIN attendance d ON c.group_id=d.group_id
    WHERE d.attendance_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} AND b.student_id IN(SELECT student_id 
                                                    FROM absenteeismes 
                                                    WHERE attendance_id=${JSON.stringify(req.params.id).replace(/\"/g,'')})
    ORDER BY user_sur_name;`);
    res.render("h_group_attendance_info",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        group_list:list,
        attendance:attendanceInfo,
        att_date:attendanceInfo[0][0].attendance_date,
        present:attendanceInfo[1],
        absented:attendanceInfo[2]
    });
});
//Страница мероприятий группы (+)
app.get("/h/group/:id/events",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let list=await serverUser[req.session.user].getHGroupList();
    let groupEvents=await createSelectQuery(`SELECT *
    FROM events a INNER JOIN event_types b ON a.event_type_id=b.event_type_id
    WHERE a.group_id=${JSON.stringify(req.params.id).replace(/\"/g,'')}
    ORDER BY event_id DESC LIMIT 8;
    SELECT *
    FROM spetialities a INNER JOIN groups b ON a.spetiality_id=b.spetiality_id
    INNER JOIN spetiality_professions c ON a.spetiality_profession_id=c.spetiality_profession_id
    WHERE b.group_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} LIMIT 1;`);
    res.render("h_group_events",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        group_list:list,
        events:groupEvents[0],
        spec_abbr:groupEvents[1][0].spetiality_abbreviated
    });
});
//Страница отчётов группы (+)
app.get("/h/group/:id/reports",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let list=await serverUser[req.session.user].getHGroupList();
    let reports=await createSelectQuery(`SELECT report_id,report_cr_date,report_interval_date,report_type,report_fields
    FROM reports
    WHERE group_id=${JSON.stringify(req.params.id).replace(/\"/g,'')}
    ORDER BY report_cr_date,report_id DESC LIMIT 16;
    SELECT *
    FROM spetialities a INNER JOIN groups b ON a.spetiality_id=b.spetiality_id
    INNER JOIN spetiality_professions c ON a.spetiality_profession_id=c.spetiality_profession_id
    WHERE b.group_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} LIMIT 1;`);
    res.render("h_reports",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        group_list:list,
        reports:reports[0],
        spec_abbr:reports[1][0].spetiality_abbreviated
    });
});
//Страница отчёта (+)
app.get("/h/group/:id/report/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let list=await serverUser[req.session.user].getHGroupList();
    let report=await createSelectQuery(`SELECT * 
    FROM reports
    WHERE report_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} LIMIT 12`);
    let report_data=await createSelectQuery(report[0].report_query);
    let fields=report[0].report_fields.split(',');
    res.render("h_report_info",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        group_list:list,
        report:report[0],
        fields:fields,
        report_data:report_data[1]
    });
});
//Страница индивидуальной работы группы (+)
app.get("/h/group/:id/individualwork",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let list=await serverUser[req.session.user].getHGroupList();
    let iw=await createSelectQuery(`SELECT c.student_id,user_sur_name,user_name,user_mid_name,iw_type_name,iw_reasone,iw_date
    FROM individual_works a INNER JOIN individual_work_types b ON a.iw_type_id=b.iw_type_id
    LEFT JOIN students c ON a.student_id=c.student_id INNER JOIN users d ON c.user_id=d.user_id
    WHERE c.group_id=${JSON.stringify(req.params.id).replace(/\"/g,'')}
    ORDER BY iw_date DESC LIMIT 10;
    SELECT *
    FROM spetialities a INNER JOIN groups b ON a.spetiality_id=b.spetiality_id
    INNER JOIN spetiality_professions c ON a.spetiality_profession_id=c.spetiality_profession_id
    WHERE b.group_id=${JSON.stringify(req.params.id).replace(/\"/g,'')} LIMIT 1;`);
    res.render("h_group_individual_work",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        group_list:list,
        spec_abbr:iw[1][0].spetiality_abbreviated,
        iw:iw[0]
    });
});
//Страница студента (+)
app.get("/h/group/:id/student/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let list=await serverUser[req.session.user].getHGroupList();
    let student=await createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};
    SELECT *
    FROM parents
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};`);
    res.render("h_student",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        group_list:list,
        title:`${student[0][0].user_sur_name} ${student[0][0].user_name} ${student[0][0].user_mid_name}`,
        student:student[0][0],
        parents:student[1],
        user_name:`${student[0][0].user_sur_name} ${student[0][0].user_name} ${student[0][0].user_mid_name}`
    });
});
//Страница пропусков студента (+) 
app.get("/h/group/:id/student/:id/absenteeismes",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let list=await serverUser[req.session.user].getHGroupList();
    let studentAbsenteeismes=await createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};
    SELECT *
    FROM attendance a INNER JOIN absenteeismes b on a.attendance_id=b.attendance_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')}
    ORDER BY attendance_date DESC;`);
    res.render("h_student_absenteeismes",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        group_list:list,
        title:`${studentAbsenteeismes[0][0].user_sur_name} ${studentAbsenteeismes[0][0].user_name} ${studentAbsenteeismes[0][0].user_mid_name}`,
        student_name:`${studentAbsenteeismes[0][0].user_sur_name} ${studentAbsenteeismes[0][0].user_name} ${studentAbsenteeismes[0][0].user_mid_name}`,
        absentismeses: studentAbsenteeismes[1]
    });
});
//Страница достижений студента (+) 
app.get("/h/group/:id/student/:id/achievements",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let list=await serverUser[req.session.user].getHGroupList();
    let studentAchievments=await createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};
    SELECT *
    FROM achievements
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};`);
    res.render("h_student_achievements",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        group_list:list,
        title:`${studentAchievments[0][0].user_sur_name} ${studentAchievments[0][0].user_name} ${studentAchievments[0][0].user_mid_name}`,
        student_name:`${studentAchievments[0][0].user_sur_name} ${studentAchievments[0][0].user_name} ${studentAchievments[0][0].user_mid_name}`,
        achievements:studentAchievments[1]
    });
});
//Страница документов студента (+) 
app.get("/h/group/:id/student/:id/documents",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let list=await serverUser[req.session.user].getHGroupList();
    let studentInfo=await createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};`);
    let studentsDocumentary=await createSelectQuery(`SELECT *
    FROM passports
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};
    SELECT *
    FROM documents
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')}
    ORDER BY document_name DESC;`);
    let documents=await decodeDocuments(studentsDocumentary);
    res.render("h_student_documents",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        group_list:list,
        title:`${studentInfo[0].user_sur_name} ${studentInfo[0].user_name} ${studentInfo[0].user_mid_name}`,
        student_name:`${studentInfo[0].user_sur_name} ${studentInfo[0].user_name} ${studentInfo[0].user_mid_name}`,
        passport:documents[0],
        documents:documents[1]
    });
});
//Страница ДО/ДПО студента (+) 
app.get("/h/group/:id/student/:id/additionaleducation",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let list=await serverUser[req.session.user].getHGroupList();
    let studentAdditionEducation=await createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};
    SELECT *
    FROM additional_educations a INNER JOIN courses b ON a.ae_id=b.ae_id
    INNER JOIN teachers c ON a.ae_lecturer_id=c.teacher_id
    INNER JOIN users d ON c.user_id=d.user_id
    WHERE b.student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')}
    ORDER BY ae_beg_date DESC;
    SELECT a.ae_id,a.ae_name,user_sur_name,user_name,user_mid_name
    FROM additional_educations a LEFT JOIN courses b ON a.ae_id=b.ae_id
    INNER JOIN teachers c ON a.ae_lecturer_id=c.teacher_id
    INNER JOIN users d ON c.user_id=d.user_id
    WHERE ae_beg_date>NOW() AND a.ae_id NOT IN (SELECT ae_id
                                              FROM courses
                                              WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')})
    ORDER BY ae_beg_date DESC;`);
    res.render("h_student_additional_education",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        group_list:list,
        title:`${studentAdditionEducation[0][0].user_sur_name} ${studentAdditionEducation[0][0].user_name} ${studentAdditionEducation[0][0].user_mid_name}`,
        student_name:`${studentAdditionEducation[0][0].user_sur_name} ${studentAdditionEducation[0][0].user_name} ${studentAdditionEducation[0][0].user_mid_name}`,
        ae:studentAdditionEducation[1],
        ae_form_values:studentAdditionEducation[2]
    });
});
//Страница ИР студента(+)
app.route("/h/group/:id/student/:id/individualwork").get(isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let list=await serverUser[req.session.user].getHGroupList();
    let studentIW=await createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')};
    SELECT * 
    FROM individual_work_types;
    SELECT c.student_id,user_sur_name,user_name,user_mid_name,iw_type_name,iw_reasone,iw_date
    FROM individual_works a INNER JOIN individual_work_types b ON a.iw_type_id=b.iw_type_id
    LEFT JOIN students c ON a.student_id=c.student_id INNER JOIN users d ON c.user_id=d.user_id
    WHERE c.group_id=${serverUser[req.session.user].getUserGroup()} AND c.student_id=${JSON.stringify(req.params.id).replace(/\"/g,'')}
    ORDER BY iw_date DESC LIMIT 15;`);
    res.render("h_student_individual_work",{
        username:serverUser[req.session.user].getUserFullName(), 
        role:serverUser[req.session.user].getUserState()[2],
        options:serverUser[req.session.user].getUserOptions(),
        user_photo:[serverUser[req.session.user].getUserData()[3],serverUser[req.session.user].getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        title:`${studentIW[0][0].user_sur_name} ${studentIW[0][0].user_name} ${studentIW[0][0].user_mid_name}`,
        student_name:`${studentIW[0][0].user_sur_name} ${studentIW[0][0].user_name} ${studentIW[0][0].user_mid_name}`,
        iw:studentIW[2],
        iw_type:studentIW[1],
        group_list:list
    });
})
//Дополнительные POST-запросы
//Подгрузка объявлений (+)
app.post("/announcements_load",isAuthenticated,urlencodedParser,async(req,res)=>{
    try{
        let announcementsLoad=await createSelectQuery(`SELECT *
        FROM announcements a INNER JOIN announcement_types b on a.announcement_type=b.announcement_type_id
        WHERE group_id=${serverUser[req.session.user].getUserGroup()} ORDER BY announcement_data DESC LIMIT ${req.body.count},5;`);
        data="";
        await announcementsLoad.forEach(async(el)=>{
            let date=await datenormalise(el.announcement_data,"D/M/Y h:m");
            if(el.announcement_file!=='null'||el.announcement_file!==null){
                data+=`<article class="col-xl-8 col-11 row justify-content-center mt-1 mb-5">
                            <div class="col-xl-11 col-12 row justify-content-center">
                                <div class="col-12">
                                    <div class="col-12 t-announcement-header">
                                        <h2 class="col-12 text-center">${el.announcement_header}</h2>
                                    </div>
                                </div>
                                <div class="col-xl-10 col-4 row t-announcement-info">
                                    <div class="col-xl-4 col-12">
                                        <label class="col-12 text-center">${date}</label>
                                    </div>
                                    <div class="col-xl-8 col-12">
                                        <label class="col-12 text-center">${el.announcement_type_name}</label>
                                    </div>
                                </div>
                                <div class="col-xl-12 col-8 t-announcement-text">
                                    <p class="col">${el.announcement_text}</p>
                                </div>
                            </div>  
                        </article> \n`;
            }
            else{
                data+=`<article class="col-xl-8 col-11 row justify-content-center mt-1 mb-5">
                        <div class="col-xl-11 col-12 row justify-content-center">
                            <div class="col-12">
                                <div class="col-12 t-announcement-header">
                                    <h2 class="col-12 text-center">${el.announcement_header}</h2>
                                </div>
                            </div>
                            <div class="col-xl-10 col-4 row t-announcement-info">
                                <div class="col-xl-4 col-12">
                                    <label class="col-12 text-center">${date}</label>
                                </div>
                                <div class="col-xl-8 col-12">
                                    <label class="col-12 text-center">${el.announcement_type_name}</label>
                                </div>
                            </div>
                            <div class="col-xl-12 col-8 t-announcement-text">
                                <p class="col">${el.announcement_text}</p>
                            </div>
                            <div class="col-12 row justify-content-end">
                                <div class="col-4 row justify-content-center">
                                    <a href="${await base64(el.announcement_file)}" class="t-announcement-download col-12 text-center text-black-50" download>Вложение</a>
                                </div>
                            </div>
                        </div>  
                    </article> \n`;
            }
        });
        res.end(data);
    }
    catch(err){
        console.log(err);
        res.end();
    }
});
//Подгрузка чата (+)
app.post("/chat_load",isAuthenticated,urlencodedParser,async(req,res)=>{
    try{
        let chatLoad=await createSelectQuery(`SELECT a.user_sur_name,a.user_name,a.user_mid_name,b.chat_date,b.chat_msg
        FROM users a INNER JOIN group_chat b ON a.user_id=b.id_user
        WHERE b.id_group=${serverUser[req.session.user].getUserGroup()}
        ORDER BY chat_date DESC LIMIT ${req.body.count},20;`);
        data="";
        await chatLoad.reverse().forEach(async(el)=>{
            let date=await datenormalise(el.chat_date,"D/M/Y h:m");
            data+=`<div class="col-11 mx-4 msg">
                    <p>${el.user_sur_name} ${el.user_name} ${el.user_mid_name} [${date}]</p>
                    <p>${el.chat_msg}</p>
                </div>
                \n`;
        });
        res.end(data);
    }
    catch(err){
        console.log(err);
        res.end();
    }
});
//Подгрузка мероприятий (+)
app.post("/event_load",isAuthenticated,urlencodedParser,async(req,res)=>{
    try{
        let eventLoad;
        if(serverUser[req.session.user].getUserState()[3]=="h"){
            let userGroups=await serverUser[req.session.user].getUserGroupsInString();
            if(userGroups.indexOf(req.body.group)>0){
                eventLoad=await createSelectQuery(`SELECT *
                FROM events a INNER JOIN event_types b ON a.event_type_id=b.event_type_id
                WHERE a.group_id=${req.body.group}
                ORDER BY event_id DESC LIMIT ${req.body.count},20;`);
            }
            else{
                res.end("Accsess Errror");
            }
        }
        else{
            eventLoad=await createSelectQuery(`SELECT *
            FROM events a INNER JOIN event_types b ON a.event_type_id=b.event_type_id
            WHERE a.group_id=${serverUser[req.session.user].getUserGroup()}
            ORDER BY event_id DESC LIMIT ${req.body.count},20;`);
        }
        data="";
        await eventLoad.forEach(async(el)=>{
            let date=await datenormalise(el.event_date,"D/M/Y");
            let ev_type;
            switch(el.event_type_id){
                case "1":
                    ev_type=serverUser[req.session.user].getUserState()[3]+`-event-type-oe`;
                    break;
                case "2":
                    ev_type=serverUser[req.session.user].getUserState()[3]+`-event-type-pr`;
                    break;
                case "3":
                    ev_type=serverUser[req.session.user].getUserState()[3]+`-event-type-sut`;
                    break;
            }
            data+=`<article class="col-8 mb-4 row justify-content-center align-content-center align-items-center stylise-block-static ${ev_type}">
                        <div class="col-6">
                            <h3>${date}</h3>
                        </div>
                        <div class="col-6">
                            <label>${el.event_type_name}</label>
                        </div>
                        <div class="col-12 border-top border-dark">
                            <p>{{event_description}}</p>
                        </div>
                \n`;
            if(el.event_date<new Date.now()){
                if(el.event_img!==null&&el.event_img!=='null'){
                    data+=`<div class="col-12 row justify-content-center my-1 p-5 border-dark border-top" id="${serverUser[req.session.user].getUserState()[3]}-event-img-block">
                                <img src="${await base64(el.event_img)}" alt="EVENTIMG-${el.event_id}">
                            </div>`;
                }
                else if(serverUser[req.session.user].getUserState()[3]=="t"){
                    data+=`
                        <div class="col-12 border-top border-dark">
                            <form class="col-12 row justify-content-end my-2" id="t-event-event-img-add-{{../event_id}}">
                                <input type="file" class="form-control-file col-9" id="t-event-event-img-add-input">
                                <button class="btn col-3 stylise-block" id="t-event-event-img-add-input-button" disabled>Загрузить</button>    
                            </form>
                        </div>
                    </article>`;
                }
                else{
                    data+=`</article>`;
                }
                
            }
            else{
                data+=`</article>`;
            }
        });
        res.end(data);
        
    }
    catch(err){
        console.log(err);
        res.end();
    }
});
//Подгрузка индивидуальной работы (+)
app.post("/iw_load",isAuthenticated,urlencodedParser,async(req,res)=>{
    try{
        let iw_load;
        if(serverUser[req.session.user].getUserState()[3]=="h"){
            let userGroups=await serverUser[req.session.user].getUserGroupsInString();
            if(userGroups.indexOf(req.body.group)>0){
                iw_load=await createSelectQuery(`SELECT c.student_id,user_sur_name,user_name,user_mid_name,iw_type_name,iw_reasone,iw_date
                FROM individual_works a INNER JOIN individual_work_types b ON a.iw_type_id=b.iw_type_id
                LEFT JOIN students c ON a.student_id=c.student_id INNER JOIN users d ON c.user_id=d.user_id
                WHERE c.group_id=${req.body.group}
                ORDER BY iw_date DESC LIMIT ${req.body.count},10;`);
            }
            else{
                res.end("Accsess Error");
            }
        }
        else{
            iw_load=await createSelectQuery(`SELECT c.student_id,user_sur_name,user_name,user_mid_name,iw_type_name,iw_reasone,iw_date
            FROM individual_works a INNER JOIN individual_work_types b ON a.iw_type_id=b.iw_type_id
            LEFT JOIN students c ON a.student_id=c.student_id INNER JOIN users d ON c.user_id=d.user_id
            WHERE c.group_id=${serverUser[req.session.user].getUserGroup()}
            ORDER BY iw_date DESC LIMIT ${req.body.count},10;`);
        }
        data="";
        await iw_load.forEach(async(el)=>{
            let iw_date=await datenormalise(el.iw_date,"D-M-Y");
            data+=`<article class="col-8 mb-4 row justify-content-center align-content-center align-items-center stylise-block-static">
                        <div class="col-6">
                            <h3>${iw_date}</h3>
                        </div>
                        <div class="col-6">
                            <span>Студент: ${el.user_sur_name} ${el.user_name} ${el.user_mid_name}</span>
                        </div>
                        <div class="col-12 border-top border-dark">
                            <span>Тип работы: ${el.iw_type_name}</span>
                        </div>
                        <div class="col-12 border-top border-dark">
                            <p>${el.iw_reasone}</p>
                        </div>
                    </article>`;
        });
        res.end(data);
    }
    catch(err){
        console.log(err);
        res.end();
    }
});
//Подгрузка посещаемости (+)
app.post("/attendance_load",isAuthenticated,urlencodedParser,async(req,res)=>{
    try{
        let attendnce_load;
        if(serverUser[req.session.user].getUserState()[3]=="h"){
            let userGroups=await serverUser[req.session.user].getUserGroupsInString();
            if(userGroups.indexOf(req.body.group)>0){
                attendnce_load=await createSelectQuery(`SELECT * 
                FROM attendance
                WHERE group_id=${serverUser[req.session.user].getUserGroup()}
                ORDER BY attendance_id DESC LIMIT ${req.body.count},10;`)
            }
            else{
                res.end("Accsess Error");
            }
        }
        else{
            attendnce_load=await createSelectQuery(`SELECT * 
            FROM attendance
            WHERE group_id=${serverUser[req.session.user].getUserGroup()}
            ORDER BY attendance_id DESC LIMIT ${req.body.count},10;`);
        }
        let data="";
        await attendnce_load.forEach(async(el)=>{
            let date=await datenormalise(el.attendance_date,"D-M-Y")
            data+=`<article class="col-xl-4 col-10 row m-2 p-4 stylise-block" id="att-${el.attendance_id}">
                    <div class="col-12">
                        <h2>Дата: ${date}</h2>
                    </div>
                    <div class="col-12">
                        <span>Присутствующих: ${el.attendance_present}</span>
                    </div>
                </article>
            `;
        });
        res.end(data);
    }
    catch(err){
        console.log(err);
        res.end();
    }
});  
//Подгрузка отчётов (+)
app.post("/reports_load",isAuthenticated,urlencodedParser,async(req,res)=>{
    try{
        let report_load;
        if(serverUser[req.session.user].getUserState()[3]=="h"){
            let userGroups=await serverUser[req.session.user].getUserGroupsInString();
            if(userGroups.indexOf(req.body.group)>0){
                report_load=await createSelectQuery(`SELECT report_id,report_cr_date,report_interval_date,report_type,report_fields
                FROM reports
                WHERE group_id=${req.body.group}
                ORDER BY report_cr_date,report_id DESC LIMIT ${req.body.count},6;`);
            }
            else{
                res.end("Accsess Error");    
            }
        }
        else{
            report_load=await createSelectQuery(`SELECT report_id,report_cr_date,report_interval_date,report_type,report_fields
            FROM reports
            WHERE group_id=${serverUser[req.session.user].getUserGroup()}
            ORDER BY report_cr_date,report_id DESC LIMIT ${req.body.count},6;`);
        }
        let data="";
        await report_load.forEach(async(el)=>{
            let type;
            let date=await datenormalise(el.report_cr_date,"D-M-Y");
            switch(el.report_type){
                case "att-special":
                    type="Посещаемость (табл.)";
                    break;
                case "events":
                    type="Мероприятия";
                    break;
                case "attendance":
                    type="Посещаемость";
                    break;
                case "iw":
                    type="Индивид. работа";
                    break;
            }
            data+=`<article class="col-xl-5 col-10 row m-4 p-4 stylise-block" id="rep-${el.report_id}">
            <div class="col-12">
                <h2>Отчёт:${date}</h2>
            </div>`;
            
            if(el.report_type=="att-special"){
                let date_interval=await datenormalise(el.report_interval_date,"M-Y");
                data+=`<div class="col-12">
                            <span>Месяц: ${date_interval} <br> Дата составления: ${date}</span>
                        </div>`
            }
            else{
                data+=`<div class="col-12">
                    <span>Промeжуток: ${date_interval}/${date}</span>
                </div>`;
            }
            data+=`
                <div class="col-12">
                    <span>Тип: ${type}</span>
                </div>
                <div class="col-12">
                    <span>Данные: ${el.report_fields}</span>
                </div>
            </article>`
        });
        res.end(data);
    }
    catch(err){
        console.log(err);
        res.end();
    }
});
//Подгрузка дежурств (+)
app.post("/duty_load",isAuthenticated,urlencodedParser,async(req,res)=>{
    try{
        let duty_load=await createSelectQuery(`SELECT a.ds_date, c.user_sur_name 'f_st_sn',c.user_name 'f_st_n',c.user_mid_name 'f_st_mn',e.user_sur_name 's_st_sn',e.user_name 's_st_n',e.user_mid_name 's_st_mn'
        FROM duty_schedule a INNER JOIN students b ON a.first_student_id=b.student_id
        INNER JOIN users c ON b.user_id=c.user_id
        INNER JOIN students d ON a.second_student_id=d.student_id
        INNER JOIN users e ON e.user_id=d.user_id
        WHERE a.group_id=${serverUser[req.session.user].getUserGroup()}
        ORDER BY a.ds_date DESC LIMIT ${req.body.count},10;`);
        let data="";
        await duty_load.forEach(async(el)=>{
            let date= await datenormalise(el.ds_date,"D-M-Y");
            data+=`<article class="col-8 mb-4 row justify-content-center align-content-center align-items-center stylise-block-static">
                    <div class="col-12">
                        <h3 class="text-center">${date}</h3>
                    </div>
                    <div class="col-6 border-top border-dark">
                        <p>${el.f_st_sn} ${el.f_st_n} ${el.f_st_mn}</p>
                    </div>
                    <div class="col-6 border-top border-dark">
                        <p class="text-right">${el.s_st_sn} ${el.s_st_n} ${el.s_st_mn}</p>
                    </div>
                </article>`;
        });
        res.end(data);
    }
    catch(err){
        console.log(err);
        res.end();
    }
});  
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
});
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
server.listen(3000);
//Подключение модулей
//NodeJs Express
const express=require('express'); 
const app=express();
//Работа с файлами
const fs=require("fs");
const formidable=require("formidable");
//Настройка дерикторий
app.use(express.static("./public"));
app.set('views',["./pages",`./pages/teacher`,`./pages/student`,`./pages/head`]);
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
    })};
const mysql_promise=require('mysql2/promise');
function connect_db_promise(){
    return mysql_promise.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'webcollege_database',
        multipleStatements:true
    })};
//Шаблонизатор Handlebars
const hbs=require('hbs');
app.set('view engine','hbs');
hbs.registerPartials('./pages/templates');
//HandleBars хелперы
//HandleBars проверка на соответствие
hbs.registerHelper('equal',(val1,val2,options)=>{
    return (val1==val2)?options.fn(this):options.inverse(this);
});
//HandleBars проверка на ге соответствие
hbs.registerHelper('nequal',(val1,val2,options)=>{
    return (val1!==val2)?options.fn(this):options.inverse(this);
});
//HandleBars проверка на существование переменной
hbs.registerHelper('undefine',(val,options)=>{
    return typeof val!=='undefined'?options.fn(this):options.inverse(this);
});
//HandleBars проверка на наличие изображения
hbs.registerHelper('imgnotnull',(val,sex)=>{
    return val==null||val==""||val=="null"?sex=="М"?"/img/icons/male.png":"/img/icons/girl.png":val;
});
//HandleBars проверка на наличие данных в переменной
hbs.registerHelper('notnull',(val,options)=>{
    console.log(val);
    return val!==null&&val!=='null'&&val!==""?options.fn(this):options.inverse(this);
});
//HandleBars форматирование даты на уровне шаблонизатора
hbs.registerHelper('datenormalise',(val,format)=>{
    let date=new Date(val);
    let formation=format.split('');
    let result="";
    for(let i=0;i<formation.length;i++){
        switch(formation[i]){
            case("Y"):
                result+= date.getFullYear();
                break;
            case("M"):
                result+=date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1;
                break;
            case("D"):
                result+=date.getUTCDate()+1<10?"0"+(date.getUTCDate()+1):date.getUTCDate()+1;
                break;
            case("h"):
                result+= date.getHours()+1<10?"0"+(date.getHours()+1):date.getHours()+1;
                break;
            case("m"):
                result+= date.getMinutes()+1<10?"0"+(date.getMinutes()+1):date.getMinutes()+1;
                break;
            case("s"):
                result+= date.getSeconds()+1<10?"0"+(date.getSeconds()+1):date.getSeconds()+1;
                break;
            default:
                result+=formation[i];
                break;
        }
    }
    return result;
});
//HandleBars простые математические операции
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
//Класс пользователя серверной части
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
        this.user_group=group_id;
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
        return this.user_group;
    }
    getUserOptions(){
        return this.user_options;
    }
    async fileUpload(path,files,file_name,ex_action){
        await this.dirExist(path);
        let uploadPath=files.path;
        let savePath;
        if(ex_action=='rn'){
            savePath=await this.fileExist(__dirname+path+"/"+file_name);
        }
        else{
            savePath=__dirname+path+"/"+file_name;
        }
        let rawData=fs.readFileSync(uploadPath);
        fs.writeFileSync(savePath,rawData,function(err){
            if(err){
                console.log(err);
            }
        })
        return savePath.replace(__dirname,"").replace("/public","");
    }
    async dirExist(path){
        let dir=path.split("/");
        let check=__dirname;
        for (let i = 1;i<dir.length;i++) {
           check+="/"+dir[i];
            if(!fs.existsSync(check)){
                fs.mkdirSync(check);
            }
        }
    }
    async fileExist(savePath){
        let checkPath=savePath.split(".");
        let path=savePath;
        let count=1;
        while(fs.existsSync(path)){
            path=checkPath[0]+`(${count}).`+checkPath[1];
            count++;
        }
        return path;
    }
    async createSelectQuery(query){
        let connect=await connect_db_promise();
        let [rows,fields]=await connect.query(query);
        connect.end()
        return rows;
    }
    async createIUDQuery(query){
        let connect=await connect_db_promise();
        await connect.query(query);
        connect.end()
        return("Success");
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
//Экземпляр класса
var serverUser = new ServerUser();
//Middleware функции
//Проверка на существование сессии
function isAuthenticated(req,res,next){
    return req.session.user?next():res.redirect("/welcomepage");
}
//Проверка на соответсвие интерфейса в зависимости от роли
function interfaceSplitter(req,res,next){
    return serverUser.getUserState()[3]==req.url.slice(1).split("/")[0]?next():res.redirect("/accsesserror");
}
//Проверка доступа
async function isAccsessable(req,res,next){
    let result;
    let accsessData=req.url.slice(1).split("/");
    switch(accsessData[0]){
        case "t":
            if(accsessData[1]=='student'){
                result=await serverUser.createSelectQuery(`SELECT group_id \ 
                FROM students \ 
                WHERE student_id=${accsessData[2]} AND group_id=${serverUser.getUserGroup()} AND NOT EXISTS (SELECT student_id \ 
                                                                    FROM deductions \
                                                                    WHERE deductions.student_id=students.student_id) LIMIT 1`);
            }
            if(accsessData[2]=="attendance"){
                result=await serverUser.createSelectQuery(`SELECT attendance_id
                FROM attendance
                WHERE attendance_id=${accsessData[3]} AND group_id=${serverUser.getUserGroup()}`);
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
//Конвейер обработки
//Создание проверочной сессии
app.use(async(req,res,next) =>{
    let createRole='t';
    switch(createRole){
        case "t":
            await serverUser.setUser(1,1,"teacher","t",'Киселёва','Светлана', 'Владимировна','/img/users/1_1.jpg','Ж');
            await serverUser.setUserGroup(1);
            await serverUser.setUserOptions(await serverUser.createSelectQuery(`SELECT *
            FROM options
            WHERE option_id=${serverUser.getUserState()[1]} LIMIT 1`));
            req.session.user="@teacher/1/2";
            break;
        case "h":
            break;
        case "s":
            break;
        case "a":
            break;
            default:
            break;
    }
    next();
});
//Создание необходимых cookie
app.use(async(req,res,next)=>{
    if(req.session.user && !req.cookies.sidebar){  
        res.cookie('sidebar',1);
    }
    next();
});
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
        let connect = connect_db();
        let login = req.body.user_login;
        let password = req.body.user_password;
        connect.query(`SELECT user_id,user_role,user_sur_name,user_name,user_mid_name,user_photo,teacher_id,head_id,student_id,admin_id,user_sex
            FROM users a LEFT JOIN teachers b ON a.user_id=b.user_id
            LEFT JOIN students c ON a.user_id=c.user_id
            LEFT JOIN heads d ON a.user_id=d.user_id
            LEFT JOIN admins e ON a.user_id=e._user_id
            WHERE user_login LIKE '${login}' AND user_password LIKE '${password} LIMIT 1'`, async(err,data)=>{
            if(err) throw err;
            if(data[0]){
                let group;
                switch(data[0].user_role){
                    case "Администратор":
                        await serverUser.setUser(data[0].admin_id,
                            data[0].user_id,
                            "admin",
                            "a",
                            data[0].user_sur_name,
                            data[0].user_name,
                            data[0].user_mid_name,
                            data[0].user_photo,
                            data[0].user_sex);
                        req.session.user=`@admin/${data[0].admin_id}`;
                        break;
                    case "Преподаватель":
                        await serverUser.setUser(data[0].teacher_id,
                            data[0].user_id,
                            "teacher",
                            "t",
                            data[0].user_sur_name,
                            data[0].user_name,
                            data[0].user_mid_name,
                            data[0].user_photo,
                            data[0].user_sex);
                        req.session.user=`@teacher/${data[0].teacher_id}`;
                        group=await serverUser.createSelectQuery(`SELECT group_id
                        FROM groups a INNER JOIN teachers b ON a.teacher_id=b.teacher_id
                        WHERE a.teacher_id=${serverUser.getUserState()[0]} AND group_end_education_date>NOW() ORDER BY group_id DESC LIMIT 1`);
                        await serverUser.setUserGroup(group[0].group_id);
                        delete group_id;
                        break;
                    case "Студент":
                        await serverUser.setUser(data[0].student_id,
                            data[0].user_id,
                            "student",
                            "s",
                            data[0].user_sur_name,
                            data[0].user_name,
                            data[0].user_mid_name,
                            data[0].user_photo,
                            data[0].user_sex);
                        req.session.user=`@student/${data[0].teacher_id}`;
                        group=await serverUser.createSelectQuery(`SELECT group_id
                        FROM groups a INNER JOIN students b ON a.student_id=b.student_id
                        WHERE a.student_id=${serverUser.getUserState()[0]} AND group_end_education_date>NOW() ORDER BY group_id DESC LIMIT 1`);
                        await serverUser.setUserGroup(group[0].group_id);
                        delete group_id;
                        break;
                    case "ЗавОтеделением":
                        await serverUser.setUser(data[0].head_id,
                            data[0].user_id,
                            "head",
                            "h",
                            data[0].user_sur_name,
                            data[0].user_name,
                            data[0].user_mid_name,
                            data[0].user_photo,
                            data[0].user_sex);
                        req.session.user=`@head/${data[0].teacher_id}`;
                        group=await serverUser.createSelectQuery(`SELECT group_id
                        FROM groups a INNER JOIN heads b ON a.head_id=b.head_id
                        WHERE a.head_id=${serverUser.getUserState()[0]} AND group_end_education_date>NOW() ORDER BY group_id DESC LIMIT 1`);
                        await serverUser.setUserGroup(group[0].group_id);
                        delete group_id;
                        break;
                }
                await serverUser.setUserOptions(await serverUser.createSelectQuery(`SELECT *
                FROM options
                WHERE option_id=${data[0].user_id}`));
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
app.get("/",isAuthenticated,(req,res)=>{
    res.render(`${serverUser.getUserState()[3]}_index`,{
        username:serverUser.getUserFullName(),
        role:serverUser.getUserState()[2], 
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
    });
});
//Страница профиля пользователя(+)
app.route("/profile").get(isAuthenticated,async(req,res)=>{
    let userData=await serverUser.createSelectQuery(`SELECT *
    FROM users
    WHERE user_id=${serverUser.getUserState()[0]} LIMIT 1;`);
    res.render("profile",{
        title:serverUser.getUserFullName(),
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        userData:userData[0]
    });
}).post(isAuthenticated,async(req,res)=>{
    try{
        let form=formidable.IncomingForm();
        form.parse(req,async(err,fields,files)=>{
            let savePath='null';
            if(files.file){
                savePath=await serverUser.fileUpload(`/public/img/users`,files.file,`${serverUser.getUserState()[0]}_${serverUser.getUserState()[1]}.png`,'rw');
            }
            let result=await serverUser.createIUDQuery(`UPDATE users SET
                user_sur_name='${fields.user_sur_name}',
                user_name='${fields.user_name}',
                user_mid_name='${fields.user_mid_name}',
                user_birthdate='${fields.user_birthdate}',
                user_sex='${fields.user_sex}',
                user_email='${fields.user_email}',
                user_photo='${savePath}'
                WHERE user_id=${serverUser.getUserState()[1]}
            ;`);
            serverUser.setNewUserData(fields.user_sur_name,fields.user_name,fields.user_mid_name,savePath);
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
    let themes=await serverUser.createSelectQuery(`SELECT * \
    FROM themes`);
    res.render("options",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        h_sizeA:h_sizeA,
        font_sizeA:font_sizeA,
        themes:themes
    });
}).post(isAuthenticated,urlencodedParser,async(req,res)=>{
    if(req.body.change=='default'){
        let result=await serverUser.createIUDQuery(`UPDATE options SET
        h_size=42,
        h_color='#212529',
        font_size=16,
        font_color='#212529',
        theme_id=1,
        logo_d=1,
        app_name_d=1
        WHERE option_id=${serverUser.getUserState()[1]}`);
        res.end(result);
    }
    else if(req.body.change=='new'){
        try{
            let themes=await serverUser.createSelectQuery(`SELECT COUNT(theme_id) count FROM themes`);
            if((parseInt(req.body.h_size)>=8 && parseInt(req.body.h_size)<=56) &&
            (parseInt(req.body.font_size)>=8 && parseInt(req.body.font_size)<=36) &&
            (parseInt(req.body.theme_id)>0 && parseInt(req.body.theme_id)<=themes[0].count)){
                let logo_d=req.body.logo_d=='true'?1:0;
                let app_name_d=req.body.app_name_d=='true'?1:0;
                let result=await serverUser.createIUDQuery(`UPDATE options SET
                h_size=${req.body.h_size},
                h_color='${req.body.h_color}',
                font_size=${req.body.font_size},
                font_color='${req.body.font_color}',
                theme_id=${req.body.theme_id},
                logo_d=${logo_d},
                app_name_d=${app_name_d}
                WHERE option_id=${serverUser.getUserState()[1]}`);   
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
//Страницы преподавателя-куратора
//Объявления(+)
app.route("/t/announcements").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let announcement=await serverUser.createSelectQuery(`SELECT *
    FROM announcements a INNER JOIN announcement_types b on a.announcement_type=b.announcement_type_id
    WHERE group_id=${serverUser.getUserGroup()} ORDER BY announcement_data DESC LIMIT 5;
    SELECT *
    FROM announcement_types`);
    res.render("t_announcement",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
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
            file_path=await serverUser.fileUpload(`/public/files/${serverUser.getUserGroup()}/announcements_files`,files.file,file_name,'rn');
            }
            let result=await serverUser.createIUDQuery(`INSERT INTO announcements
            VALUE(
                null,
                ${serverUser.getUserGroup()},
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
    let group=await serverUser.createSelectQuery(`SELECT student_id,user_sur_name,user_name,user_mid_name,user_photo,student_headman,user_sex
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE group_id=${serverUser.getUserGroup()} AND NOT EXISTS (SELECT student_id FROM deductions WHERE deductions.student_id=a.student_id)
    ORDER BY user_sur_name;
    SELECT *
    FROM spetialities a INNER JOIN groups b ON a.spetiality_id=b.spetiality_id
    INNER JOIN spetiality_professions c ON a.spetiality_profession_id=c.spetiality_profession_id
    WHERE b.group_id=${serverUser.getUserGroup()} LIMIT 1;
    SELECT q1.all, q2.educated, SUM(q1.all-q2.educated) 'deducted'
    FROM (SELECT COUNT(a.student_id) 'all'
            FROM students a
            WHERE a.group_id=${serverUser.getUserGroup()}) q1,
        (SELECT COUNT(b.student_id) 'educated'
            FROM students b
            WHERE b.group_id=${serverUser.getUserGroup()} AND NOT EXISTS(SELECT c.student_id
                                            FROM deductions c
                                            WHERE b.student_id=c.student_id)) q2`);
    res.render("t_mygroup",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        title:group[1][0].spetiality_abbreviated,
        groupInfo:group[1][0],
        teacher:serverUser.getUserFullName(),
        groupStudentInfo:group[2][0],
        studentsList:group[0]
    });
});
//Страница студента(+)
app.get("/t/student/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let student=await serverUser.createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT *
    FROM parents
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};`);
    res.render("t_student",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        title:`${student[0][0].user_sur_name} ${student[0][0].user_name} ${student[0][0].user_mid_name}`,
        student:student[0][0],
        parents:student[1],
        user_name:`${student[0][0].user_sur_name} ${student[0][0].user_name} ${student[0][0].user_mid_name}`
    });
});
//Страница документов студента(+)
app.route("/t/student/:id/documents").get(isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentsDocumentary=await serverUser.createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT *
    FROM passports
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT *
    FROM documents
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')}
    ORDER BY document_name DESC;`);
    console.log(studentsDocumentary[1][0]);
    res.render("t_student_documents",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
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
            console.log(fields);
            if(fields.document=="passport"){
                let savePath='null';
                if(files.scan){
                    savePath=await serverUser.fileUpload(`/public/files/${serverUser.getUserGroup()}/${JSON.stringify(req.params.id).replace(/\"/gi,'')}/documents`,files.scan,'passport-scan.png','rw');
                }
                let result=await serverUser.createIUDQuery(`INSERT INTO passports
                VALUES(
                    null,
                    ${JSON.stringify(req.params.id)},
                    ${fields.siries},
                    ${fields.number},
                    '${fields.date}',
                    '${fields.lp}',
                    '${fields.by}',
                    '${savePath}'
                );`)
            }  
            else{
                
            }
        });
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница достижений студента(+)
app.route("/t/student/:id/achievements").get(isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentAchievments=await serverUser.createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT *
    FROM achievements
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};`);
    res.render("t_student_achievements",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
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
            let file_path=await serverUser.fileUpload(`/public/files/${serverUser.getUserGroup()}/${JSON.stringify(req.params.id).replace(/\"/gi,'')}/achievements`,files.file,file_name,'rn');
            let result=await serverUser.createIUDQuery(`INSERT INTO achievements
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
app.get("/t/student/:id/additionaleducation",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentAdditionEducation=await serverUser.createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT *
    FROM additional_educations a INNER JOIN courses b ON a.ae_id=b.ae_id
    INNER JOIN teachers c ON a.ae_lecturer_id=c.teacher_id
    WHERE b.student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')}
    ORDER BY ae_beg_date DESC;`);
    res.render("t_student_additionaleducation",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        title:`${studentAdditionEducation[0][0].user_sur_name} ${studentAdditionEducation[0][0].user_name} ${studentAdditionEducation[0][0].user_mid_name}`,
        student_name:`${studentAdditionEducation[0][0].user_sur_name} ${studentAdditionEducation[0][0].user_name} ${studentAdditionEducation[0][0].user_mid_name}`,
        ae:studentAdditionEducation[1]
    });
});
//Страница посещаемости студента(+)
app.route("/t/student/:id/absenteeismes").get(isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentAbsenteeismes=await serverUser.createSelectQuery(`SELECT *
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT *
    FROM attendance a INNER JOIN absenteeismes b on a.attendance_id=b.attendance_id
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};`);
    res.render("t_student_absenteeismes",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
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
            let file_path=await serverUser.fileUpload(`/public/files/${serverUser.getUserGroup()}/${JSON.stringify(req.params.id).replace(/\"/gi,'')}/absentismeses`,files.file,file_name,'rn');
            let result=await serverUser.createIUDQuery(`UPDATE absenteeismes SET absenteeismes_file='${file_path}'
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
    let groupEvents=await serverUser.createSelectQuery(`SELECT *
    FROM events a INNER JOIN event_types b ON a.event_type_id=b.event_type_id
    WHERE a.group_id=${serverUser.getUserGroup()}
    ORDER BY event_date;
    SELECT *
    FROM event_types`);
    console.log(groupEvents[0]);
    res.render("t_mygroupevents",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        events:groupEvents[0],
        event_types:groupEvents[1],
        form:'t-events'
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{
        let result=await serverUser.createIUDQuery(`INSERT INTO events 
        VALUES(
            null,
            ${serverUser.getUserGroup()},
            ${req.body.event_type},
            '${req.body.event_discr}',
            '${req.body.event_date}'
        );`);
        res.end(result);
    }
    catch(err){
        console.log(err);
       res.end("Error");
    }
});
//Страница индвидуальной работы(+)
app.route("/t/mygroup/individualwork").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("t_mygroupindividualwork",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{
        let result=await serverUser.createIUDQuery(`INSERT INTO individual_works
        VALUES(
            null,
            ${req.body.iw_type},
            ${req.body.st_id},
            '${req.body.iw_reasone}',
            NOW()
        );`);
        res.end('');
    }
    catch(err){
        console.log(err);
        res.end('Error');
    }
});
//Страница с формой создания новой докладной на группу/студента(+)
app.route("/t/newreport").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let data=await serverUser.createSelectQuery(`SELECT group_id,spetiality_abbreviated
    FROM groups a INNER JOIN spetialities b ON a.spetiality_id=b.spetiality_id 
    WHERE a.group_end_education_date>NOW();`);
    res.render("t_newreport",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        group_list:data
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{
        let result=await serverUser.createIUDQuery(`INSERT INTO reports 
        VALUES(
            null,
            ${serverUser.getUserState()[0]},
            ${req.body.group_id},
            '${req.body.text}',
            NOW()
        );`);
        res.end(result);
    }
    catch(err){
        console.log(err);
        res.end("Error");
    }
});
//Страница посещаемости(+)
app.get("/t/mygroup/attendance",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let attendanceInfo=await serverUser.createSelectQuery(`SELECT * 
    FROM attendance
    WHERE group_id=${serverUser.getUserGroup()} LIMIT 3;`);
    res.render("t_mygroupattendance",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        at_list:attendanceInfo
    });
});
//Страница посещаемости(+)
app.get("/t/mygroup/attendance/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let url_id=req.url.replace(/\D+/gi,'');
    let attendanceInfo=await serverUser.createSelectQuery(`SELECT * 
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
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        attendance:attendanceInfo,
        att_date:attendanceInfo[0][0].attendance_date,
        present:attendanceInfo[1],
        absented:attendanceInfo[2]
    });
});
//Страница создания списка посещаемости(+)
app.route("/t/newattendance").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let studentList=await serverUser.createSelectQuery(`SELECT student_id, user_sur_name,user_name,user_mid_name,user_photo,student_headman,user_sex
    FROM students a INNER JOIN users b ON a.user_id=b.user_id
    WHERE group_id=${serverUser.getUserGroup()} AND NOT EXISTS (SELECT student_id 
                                                                FROM deductions 
                                                                WHERE deductions.student_id=a.student_id)
                                                                ORDER BY user_sur_name`);
    res.render("t_newattendance",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        studentList:studentList
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{
        let form=new formidable.IncomingForm();
        form.parse(req,async(err,fields,files)=>{
            let existQ=await serverUser.createSelectQuery(`SELECT attendance_date
            FROM attendance
            WHERE attendance_date='${fields.date}' AND group_id=${serverUser.getUserGroup()}`);
            let acs_Students=await serverUser.createSelectQuery(`SELECT student_id
            FROM students
            WHERE group_id=${serverUser.getUserGroup()}`);
            let acs_array=[];
            for (let i=0;i<acs_Students.length;i++){
                acs_array.push(acs_Students[i].student_id);
            }
            if(!existQ[0]){
                await serverUser.createIUDQuery(`INSERT INTO attendance
                VALUES(
                    null,
                    ${serverUser.getUserGroup()},
                    '${fields.date}',
                    ${parseInt(Object.keys(acs_Students).length)-parseInt(Object.keys(fields).length-1)}
                );`);
                let attendance_id=await serverUser.createSelectQuery(`SELECT attendance_id
                FROM attendance 
                WHERE attendance_date='${fields.date} AND group_id=${serverUser.getUserGroup()}'`);
                for(const [field_id,field_val] of Object.entries(fields)){
                    if(acs_array.includes(parseInt(field_id))){
                        await serverUser.createIUDQuery(`INSERT INTO absenteeismes 
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
                    savePath=await serverUser.fileUpload(`/public/files/${serverUser.getUserGroup()}/${file_id}/absentismeses`,file_val,`abs_${fields.date}.${file_val.type.split("/")[1]}`,'rn');
                    let result=await serverUser.createIUDQuery(`UPDATE absenteeismes SET absenteeismes_file='${savePath}'
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
    let gallery=await serverUser.createSelectQuery(`SELECT gallery_img
    FROM gallery
    WHERE group_id=${serverUser.getUserGroup()}`);
    res.render("t_mygroupgallery",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
        gallery:gallery,
        form:"t-gallery"
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    try{
        let form=formidable.IncomingForm();
        form.parse(req,async(err,fileds,files)=>{
            for(const [file_name,file_val] of Object.entries(files)){
                let savePath=await serverUser.fileUpload(`/public/files/${serverUser.getUserGroup()}/img`,file_val,file_name,'rn');
                let result=await serverUser.createIUDQuery(`INSERT INTO gallery 
                VALUES(
                    null,
                    ${serverUser.getUserGroup()},
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
//Страницы заведующей отделением
//Список групп
app.get("/h/groups",isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("h_grouplist",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
    });
});
//Страница группы
app.get("/h/group/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    res.render("h_group",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
    });
});
//Страница посещаемости группы
app.get("/h/group/:id/attendance",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    res.render("h_groupattendance",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
    });
});
//Страница студента
app.get("/h/group/:id/student/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    res.render("h_student",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        user_photo:[serverUser.getUserData()[3],serverUser.getUserData()[4]],
        sidebar_d:req.cookies.sidebar,
    });
});
//Страницы студента
//Страница достижений
app.get("/s/portfolio",isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("s_portfolio",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions()
    });
});
//Страницы администратора
//Список пользователей
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
//Страница для создания нового пользователя
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
//Страница с информацией о пользователе
app.get('/a/userInfo/:id',isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("a_user",{
        
    });
});
//Страница изменения пользователя
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
//Страница со списком существующих групп
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
//Страница для создания новой группы
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
//Страница с информацией о группе
app.get('/a/groupInfo/:id',isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("a_group",{
        
    });
});
//Страница изменения группы
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
    serverUser.clearData();
    delete req.session.user;
    res.redirect("/");
})
//Обработка ошибок
//Ошибка доступа
app.get("/accsesserror",(req,res)=>{
    res.render("error", {
        title:"Ошибка доступа",
        status:'acs',
        options:serverUser.getUserOptions()
    });
});
//Ошибка 404 - страница не существует
app.use((req, res)=>{
    res.status(404).render('error',{
        title:"Ошибка 404",
        status:400,
        options:serverUser.getUserOptions()
    });
});
//Ошибка 500 - произошла непредвиенная ошибка в работе приложения
app.use((error, req, res, next)=>{
    res.status(500).render("error",{
        title:"Ошибка 500",
        status:500,
        options:serverUser.getUserOptions()
    });
});
//Прослушивание порта
app.listen(3000);
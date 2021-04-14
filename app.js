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
const { copySync } = require('fs-extra');
app.set('view engine','hbs');
hbs.registerPartials('./pages/templates');
//HandleBars хелперы
//HandleBars проверка на соответствие
hbs.registerHelper('equal',(val1,val2,options)=>{
    //console.log(val1,' ',val2);
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
    return val!==null&&val!==""?sex=="М"?"/img/male.png":"/img/girl.png":val;
});
//HandleBars проверка на наличие данных в переменной
hbs.registerHelper('notnull',(val,options)=>{
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
                result+=date.getMonth()<10?"0"+date.getMonth():date.getMonth();
                break;
            case("D"):
                result+=date.getDay()<10?"0"+date.getDay():date.getDay();
                break;
            case("h"):
                result+= date.getHours();
                break;
            case("m"):
                result+= date.getMinutes();
                break;
            case("s"):
                result+= date.getSeconds();
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
    }
    //Методы
    setUser(id,abs_id,role,role_min,surname,name,middlename,photo){
        this.user_id=id;
        this.user_abs_id=abs_id;
        this.user_role=role;
        this.user_role_min=role_min;
        this.user_surname=surname;
        this.user_name=name;
        this.user_middlename=middlename;
        this.user_photo=photo;
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
        return [this.user_surname,this.user_name,this.user_middlename,this.user_photo];
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
    async fileUpload(path,files,file_name){
        await this.dirExist(path);
        let uploadPath=files.file.path;
        let savePath=await this.fileExist(__dirname+path+"/"+file_name);
        console.log(savePath);
        let rawData=fs.readFileSync(uploadPath);
        fs.writeFileSync(savePath,rawData,function(err){
            if(err) console.log(err);
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
            result=await serverUser.createSelectQuery(`SELECT group_id \ 
                FROM students \ 
                WHERE student_id=${accsessData[2]} AND NOT EXISTS (SELECT student_id \ 
                                                                    FROM deductions \
                                                                    WHERE deductions.student_id=students.student_id) LIMIT 1`);
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
            await serverUser.setUser(1,1,"teacher","t",'Киселёва','Светлана', 'Владимировна','/img/profile_avatars/c_1.png');
            await serverUser.setUserGroup(1);
            await serverUser.setUserOptions(await serverUser.createSelectQuery(`SELECT * \
            FROM options \
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
    let connect = connect_db();
    let login = req.body.user_login;
    let password = req.body.user_password;
    connect.query(`SELECT user_id,user_role,user_sur_name,user_name,user_mid_name,user_photo,teacher_id,head_id,student_id,admin_id \ 
    FROM users a LEFT JOIN teachers b ON a.user_id=b.user_id \
    LEFT JOIN students c ON a.user_id=c.user_id \
    LEFT JOIN heads d ON a.user_id=d.user_id \
    LEFT JOIN admins e ON a.user_id=e._user_id \
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
                        data[0].user_photo);
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
                        data[0].user_photo);
                    req.session.user=`@teacher/${data[0].teacher_id}`;
                    group=await serverUser.createSelectQuery(`SELECT group_id \
                    FROM groups a INNER JOIN teachers b ON a.teacher_id=b.teacher_id \
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
                        data[0].user_photo);
                    req.session.user=`@student/${data[0].teacher_id}`;
                    group=await serverUser.createSelectQuery(`SELECT group_id \
                    FROM groups a INNER JOIN students b ON a.student_id=b.student_id \
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
                        data[0].user_photo);
                    req.session.user=`@head/${data[0].teacher_id}`;
                    group=await serverUser.createSelectQuery(`SELECT group_id \
                    FROM groups a INNER JOIN heads b ON a.head_id=b.head_id \
                    WHERE a.head_id=${serverUser.getUserState()[0]} AND group_end_education_date>NOW() ORDER BY group_id DESC LIMIT 1`);
                    await serverUser.setUserGroup(group[0].group_id);
                    delete group_id;
                    break;
            }
            await serverUser.setUserOptions(await serverUser.createSelectQuery(`SELECT * \ 
            FROM options \
            WHERE option_id=${data[0].user_id}`));
            connect.end();
            res.end("Success");
        }
        else{
            connect.end();
            res.end("nExist");
        }
    });
});
//Общие страницы
//Главная страница веб-приложения(+)
app.get("/",isAuthenticated,(req,res)=>{
    res.render(`${serverUser.getUserState()[3]}_index`,{
        username:serverUser.getUserFullName(),
        role:serverUser.getUserState()[2], 
        options:serverUser.getUserOptions(),
        sidebar_d:req.cookies.sidebar,
    });
});
//Страница профиля пользователя(-)
app.route("/profile").get(isAuthenticated,async(req,res)=>{
    let userData=await serverUser.createSelectQuery(`SELECT * \ 
    FROM ${serverUser.getUserState()[2]}s \
    WHERE ${serverUser.getUserState()[2]}_id=${serverUser.getUserState()[0]}`);
    res.render("profile",{
        title:serverUser.getUserFullName(),
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        sidebar_d:req.cookies.sidebar,
        userData:userData
    });
}).post(isAuthenticated,async(req,res)=>{

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
        sidebar_d:req.cookies.sidebar,
        h_sizeA:h_sizeA,
        font_sizeA:font_sizeA,
        themes:themes
    });
}).post(isAuthenticated,urlencodedParser,async(req,res)=>{
    if(req.body.change=='default'){
        let result=await serverUser.createIUDQuery(`UPDATE options SET \
        h_size=42, \
        h_color='#212529', \
        font_size=16, \
        font_color='#212529', \
        theme_id=1, \
        logo_d=1, \
        app_name_d=1 \
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
                let result=await serverUser.createIUDQuery(`UPDATE options SET \
                h_size=${req.body.h_size}, \
                h_color='${req.body.h_color}', \
                font_size=${req.body.font_size}, \
                font_color='${req.body.font_color}', \
                theme_id=${req.body.theme_id}, \
                logo_d=${logo_d}, \
                app_name_d=${app_name_d} \
                WHERE option_id=${serverUser.getUserState()[1]}`);   
                res.end(result);
            }
            else{
                res.end("Hacking attempt");
            }  
        }
        catch{
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
    let announcement=await serverUser.createSelectQuery(`SELECT * \
    FROM announcements a INNER JOIN announcement_types b on a.announcement_type=b.announcement_type_id \
    WHERE group_id=${serverUser.getUserGroup()} ORDER BY announcement_data DESC LIMIT 5;
    SELECT * \ 
    FROM announcement_types`);
    res.render("t_announcement",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        sidebar_d:req.cookies.sidebar,
        form:'t-announce',
        posts:announcement[0],
        announcement_type:announcement[1]
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req,async(err, fields, files)=>{
        let file_path=null;
        if(files.file){
        let file_name=files.file.name;
        file_path=await serverUser.fileUpload(`/public/files/${serverUser.getUserGroup()}/announcements_files`,files,file_name);
        }
        let result=await serverUser.createIUDQuery(`INSERT INTO announcements \
        VALUE(null,${serverUser.getUserGroup()},NOW(),'${fields.head}','${fields.type}','${file_path}','${fields.text}');`);
        res.end(file_path);
    });
});
//Страница группы(+)
app.get("/t/mygroup",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let group=await serverUser.createSelectQuery(`SELECT student_id,user_sur_name,user_name,user_mid_name,user_photo,student_headman,user_sex \
    FROM students a INNER JOIN users b ON a.user_id=b.user_id \
    WHERE group_id=${serverUser.getUserGroup()} AND NOT EXISTS (SELECT student_id FROM deductions WHERE deductions.student_id=a.student_id) \
    ORDER BY user_sur_name;\ 
    SELECT * \
    FROM spetialities a INNER JOIN groups b ON a.spetiality_id=b.spetiality_id \
    INNER JOIN spetiality_professions c ON a.spetiality_profession_id=c.spetiality_profession_id \
    WHERE b.group_id=${serverUser.getUserGroup()} LIMIT 1; \
    SELECT q1.all, q2.educated, SUM(q1.all-q2.educated) 'deducted'
    FROM (SELECT COUNT(a.student_id) 'all' \ 
            FROM students a \ 
            WHERE a.group_id=${serverUser.getUserGroup()}) q1,
        (SELECT COUNT(b.student_id) 'educated' \
            FROM students b \ 
            WHERE b.group_id=${serverUser.getUserGroup()} AND NOT EXISTS(SELECT c.student_id \
                                            FROM deductions c \
                                            WHERE b.student_id=c.student_id)) q2`);
    res.render("t_mygroup",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
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
    let student=await serverUser.createSelectQuery(`SELECT * \
    FROM students \ 
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT * \
    FROM parents \
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};`);
    res.render("t_student",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        sidebar_d:req.cookies.sidebar,
        title:`${student[0][0].user_sur_name} ${student[0][0].user_name} ${student[0][0].user_mid_name}`,
        student:student[0][0],
        parents:student[1],
        user_name: `${student[0][0].user_sur_name} ${student[0][0].user_name} ${student[0][0].user_mid_name}`
    });
});
//Страница документов студента(+)
app.get("/t/student/:id/documents",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentsDocumentary=await serverUser.createSelectQuery(`SELECT * \
    FROM students a INNER JOIN users b ON a.user_id=b.user_id\ 
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT * \
    FROM passports \
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT * \ 
    FROM documents \
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')} \
    ORDER BY document_name DESC;`);
    res.render("t_student_documents",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        sidebar_d:req.cookies.sidebar,
        title:`${studentsDocumentary[0][0].user_sur_name} ${studentsDocumentary[0][0].user_name} ${studentsDocumentary[0][0].user_mid_name}`,
        user_name:`${studentsDocumentary[0][0].user_sur_name} ${studentsDocumentary[0][0].user_name} ${studentsDocumentary[0][0].user_mid_name}`,
        passport:studentsDocumentary[1][0],
        documents:studentsDocumentary[2]
    });
});
//Страница достижений студента(+)
app.route("/t/student/:id/achievements").get(isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentAchievments=await serverUser.createSelectQuery(`SELECT * \
    FROM students a INNER JOIN users b ON a.user_id=b.user_id \ 
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT * \
    FROM achievements \
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};`);
    console.log(studentAchievments[1]);
    res.render("t_student_achievements",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        sidebar_d:req.cookies.sidebar,
        form: "t-achievements",
        title:`${studentAchievments[0][0].user_sur_name} ${studentAchievments[0][0].user_name} ${studentAchievments[0][0].user_mid_name}`,
        user_name:`${studentAchievments[0][0].user_sur_name} ${studentAchievments[0][0].user_name} ${studentAchievments[0][0].user_mid_name}`,
        achievements:studentAchievments[1]
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req,async(err, fields, files)=>{
        let file_name=files.file.name;
        let file_path=await serverUser.fileUpload(`/public/files/${serverUser.getUserGroup()}/${JSON.stringify(req.params.id).replace(/\"/gi,'')}/achievements`,files,file_name);
        let result=await serverUser.createIUDQuery(`INSERT INTO achievements \
        VALUE(null,${JSON.stringify(req.params.id).replace(/\"/gi,'')},'${fields.name}','${file_path}');`);
        res.end(file_path);
    });
});;
//Страница ДО/ДПО студента(+)
app.get("/t/student/:id/additionaleducation",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentAdditionEducation=await serverUser.createSelectQuery(`SELECT * \
    FROM students a INNER JOIN users b ON a.user_id=b.user_id \ 
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT * \
    FROM additional_educations a INNER JOIN courses b ON a.ae_id=b.ae_id \
    INNER JOIN teachers c ON a.ae_lecturer_id=c.teacher_id\
    WHERE b.student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')} \
    ORDER BY ae_beg_date DESC`);
    console.log(studentAdditionEducation[1]);
    res.render("t_student_additionaleducation",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        sidebar_d:req.cookies.sidebar,
        title:`${studentAdditionEducation[0][0].user_sur_name} ${studentAdditionEducation[0][0].user_name} ${studentAdditionEducation[0][0].user_mid_name}`,
        student:studentAdditionEducation[0][0],
        ae:studentAdditionEducation[1]
    });
});
//Страница посещаемости студента(+)
app.route("/t/student/:id/absenteeismes").get(isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentAbsenteeismes=await serverUser.createSelectQuery(`SELECT * \
    FROM students a INNER JOIN users b ON a.user_id=b.user_id \ 
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')}; \
    SELECT * \
    FROM absenteeismes \ 
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')}; \
    `);
    res.render("t_student_absenteeismes",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        sidebar_d:req.cookies.sidebar,
        title:`${studentAbsenteeismes[0][0].user_sur_name} ${studentAbsenteeismes[0][0].user_name} ${studentAbsenteeismes[0][0].user_mid_name}`,
        absentismeses: studentAbsenteeismes[1]
    });
}).post(isAuthenticated,interfaceSplitter,isAccsessable,urlencodedParser,async(req,res)=>{
    let form=new formidable.IncomingForm();
    form.parse(req,async(err,fields,files)=>{
        let file_name=files.file.name;
        let file_path=await serverUser.fileUpload(`/public/files/${serverUser.getUserGroup()}/${JSON.stringify(req.params.id).replace(/\"/gi,'')}/absentismeses`,files,file_name);
        let result=await serverUser.createIUDQuery(`UPDATE absenteeismes SET absenteeismes_file='${file_path}' \
        WHERE absenteeismes_id=${fields.id}`);
        res.end();
    });
});
//Страница мероприятий(-)
app.route("/t/mygroup/events").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let groupEvents=await serverUser.createSelectQuery(`SELECT * \
    FROM events a INNER JOIN event_types b ON a.event_type_id=b.event_type_id
    WHERE a.group_id=${serverUser.getUserGroup()}; \
    SELECT * \
    FROM event_types`)
    res.render("t_mygroupevents",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        sidebar_d:req.cookies.sidebar,
        events: groupEvents[0],
        enet_types: groupEvents[1]
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{

});
//Страница индвидуальной работы(-)
app.route("/t/mygroup/individualwork").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("t_mygroupindividualwork",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        sidebar_d:req.cookies.sidebar,
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{

});
//Страница с формой создания новой докладной на группу/студента(+-)
app.route("/t/newreport").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let data=await serverUser.createSelectQuery("SELECT group_id, spetiality_abbreviated \
    FROM groups a INNER JOIN spetialities b ON a.spetiality_id=b.spetiality_id \
    WHERE a.group_end_education_date>NOW();");
    res.render("t_newreport",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        sidebar_d:req.cookies.sidebar,
        group_list:data
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    let result=await serverUser.createIUDQuery(`INSERT INTO reports \ 
    VALUES(null,${serverUser.getUserState()[0]},${req.body.group_id},'${req.body.text}',NOW())`);
    res.end(result);
});
//Страница посещаемости(-)
app.get("/t/mygroup/attendance",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let studentList=await serverUser.createSelectQuery(`SELECT student_id, user_sur_name,user_name,user_mid_name,user_photo,student_headman,user_sex \
    FROM students a INNER JOIN users b ON a.user_id=b.user_id  \
    WHERE group_id=${serverUser.getUserGroup()} AND NOT EXISTS (SELECT student_id FROM deductions WHERE deductions.student_id=a.student_id) \
    ORDER BY user_sur_name`);
    res.render("t_mygroupattendance",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        sidebar_d:req.cookies.sidebar,
        studentList:studentList
    });
});
//Страница создания списка посещаемости(-)
app.route("/t/newattendance").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let studentList=await serverUser.createSelectQuery(`SELECT student_id, user_sur_name,user_name,user_mid_name,user_photo,student_headman,user_sex \
    FROM students a INNER JOIN users b ON a.user_id=b.user_id \
    WHERE group_id=${serverUser.getUserGroup()} AND NOT EXISTS (SELECT student_id FROM deductions WHERE deductions.student_id=a.student_id) \
    ORDER BY user_sur_name`);
    res.render("t_newattendance",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        sidebar_d:req.cookies.sidebar,
        studentList:studentList
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
});
//Страница-галерея(-)
app.route("/t/mygroup/gallery").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let gallery=await serverUser.createSelectQuery(`SELECT gallery_img \
    FROM gallery \
    WHERE group_id=${serverUser.getUserGroup()}`);
    res.render("t_mygroupgallery",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        sidebar_d:req.cookies.sidebar,
        gallery:gallery,
        form:"t-gallery"
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{

});
//Страницы заведующей отделением
//Список групп
app.get("/h/groups",isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("h_grouplist",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        sidebar_d:req.cookies.sidebar,
    });
});
//Страница группы
app.get("/h/group/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    res.render("h_group",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        sidebar_d:req.cookies.sidebar,
    });
});
app.get("/h/group/:id/attendance",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    res.render("h_groupattendance",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
        sidebar_d:req.cookies.sidebar,
    });
});
//Страница студента
app.get("/h/group/:id/student/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    res.render("h_student",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[2],
        options:serverUser.getUserOptions(),
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
app.route("/createNewStudent").get(isAuthenticated,interfaceSplitter,async(req,res)=>{

});
//Дополнительные POST-запросы
app.post('/cookies',isAuthenticated,urlencodedParser,(req,res)=>{
    switch(req.body.action){
        case "s_off":
            res.cookie("sidebar",0);
            break;
        case "s_on":
            res.cookie("sidebar",1);
            break;
    }
    res.end();
});
//Выход
app.get("/logout",(req,res)=>{
    serverUser.clearData();
    delete req.session.user;
    res.redirect("/");
})
//Обработка ошибок
app.get("/accsesserror",(req,res)=>{
    res.render("error", {
        title:"Ошибка доступа",
        status:'acs',
        options:serverUser.getUserOptions()
    });
});
app.use((req, res)=>{
    res.status(404).render('error',{
        title:"Ошибка 404",
        status:400,
        options:serverUser.getUserOptions()
    });
});
app.use((error, req, res, next)=>{
    res.status(500).render("error",{
        title:"Ошибка 500",
        status:500,
        options:serverUser.getUserOptions()
    });
});
//Прослушивание порта
app.listen(3000);
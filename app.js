//Подключение модулей
//NodeJs Express
const express=require('express'); 
const app=express();
//Настройка дерикторий
app.use(express.static("./public"));
app.set('views',["./pages",`./pages/courator`,`./pages/student`,`./pages/tutor`]);
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
hbs.registerHelper('equal',(val1,val2,options)=>{
    return (val1==val2)?options.fn(this):options.inverse(this);
});
hbs.registerHelper('define', (val,options)=>{
    console.log(val);
    return typeof val!=='undefined'?options.fn(this):options.inverse(this);
});
hbs.registerHelper('imgnotnull', (val,sex)=>{
    return val!==null?sex=="М"?"/img/male.png":"/img/girl.png":val;
});
hbs.registerHelper('notnull', (val,options)=>{
    return val!==null?options.fn(this):options.inverse(this);
});
hbs.registerHelper('datenormalise', val=>{
    let date = new Date(val);
    return `${date.getDay()<10?"0"+date.getDay():date.getDay()}-${date.getMonth()<10?"0"+date.getMonth():date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
});
//Класс пользователя серверной части
class ServerUser{
    //Конструктор
    constructor(){
        //Серверные данные
        this.user_id;
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
    setUser(id,role,role_min,surname,name,middlename,photo){
        this.user_id=id;
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
    //БД
    async createSelectQuery(query){
        var connect=await connect_db_promise();
        var [rows, fields]=await connect.query(query);
        connect.end()
        return rows;
    }
    async createIUDQuery(query){
        var connect=await connect_db_promise();
        await connect.query(query);
        connect.end()
        return("succsess");
    }
    //Функции
    getUserState(){
        return [this.user_id,this.user_role,this.user_role_min];
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
    async fileNormalisePath(file,type,user_id){
        if(file==""){
            return null;
        }
        else{
            switch(type){
                case "common_img":
                    return `'/files/${this.getUserGroup()}/images/${file}'`;
                case "personal_img":
                    return `'/files/${this.getUserGroup()}/images/${file}'`;
                case "portfolio":
                    return `'/files/${this.getUserGroup()}/images/${file}'`;
            }
        }
    }
    clearData(){
        this.user_id=null;
        this.user_role=null;
        this.user_surname=null;
        this.user_name=null;
        this.user_middlename=null;
        this.user_photo=null;
        this.user_group=null;
        this.user_options=null;
    }
}
//Экземпляр класса
var serverUser = new ServerUser();
//Middleware функции
//Проверка на существование сессии
function isAuthenticated(req,res,next){
    return req.session.user?next():res.redirect("/welcomepage");
}
function interfaceSplitter(req,res,next){
    return serverUser.getUserState()[2]==req.url.split("/")[1]?next():res.redirect("/accsesserror");
}
async function isAccsessable(req,res,next){
    let result;
    let accsessData=req.url.split("/");
    switch(accsessData[1]){
        case "c":
            result=await serverUser.createSelectQuery(`SELECT group_id \ 
                FROM students \ 
                WHERE student_id=${accsessData[3]} AND NOT EXISTS (SELECT student_id FROM deductions WHERE deductions.student_id=students.student_id) LIMIT 1`);
            break;
        case "t":
            result=[];
            break;
        case "s":
            result=[];
            break;
    }
    return result.length>0?next():res.redirect("/accsesserror");
}
//Конвейер обработки
//Создание проверочной сессии
app.use(async(req,res,next) =>{
    await serverUser.setUser(1,"courator","c",'Киселёва','Светлана', 'Владимировна','/img/profile_avatars/c_1.png');
    await serverUser.setUserGroup(1);
    await serverUser.setUserOptions(await serverUser.createSelectQuery(`SELECT * FROM options WHERE option_id=8 LIMIT 1`));
    req.session.user="@courator/1/2";
    next();
});
//Express 
//Главная страница приложения
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
    if(login.slice(0,1)=="@"){
        connect.query(`SELECT courator_id,courator_sur_name,courator_name,courator_mid_name,courator_photo,courator_login \ 
        FROM courators \
        WHERE courator_login LIKE '${login}' AND courator_password LIKE '${password}'`, async(err,data)=>{
            if(err) throw err;
            if(typeof data[0]!=='undefined'){
                await serverUser.setUser(data[0].courator_id,
                    "courator",
                    "c",
                    data[0].courator_sur_name,
                    data[0].courator_name,
                    data[0].courator_mid_name,
                    data[0].courator_photo);
                req.session.user=`@courator/${data[0].courator_id}`;
                let group = await serverUser.createSelectQuery(`SELECT group_id \
                FROM groups a INNER JOIN courators b ON a.courator_id=b.courator_id \
                WHERE a.courator_id=${serverUser.getUserState()[0]} AND group_end_education_date>NOW() ORDER BY group_id DESC LIMIT 1`);
                await serverUser.setUserGroup(group[0].group_id);
                delete group_id;
                serverUser.setUserOptions(await serverUser.createSelectQuery(`SELECT * \ 
                FROM options a inner join users b on a.option_id=b.user_id WHERE user_login LIKE '${data[0].courator_login}'`));
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
        connect.query(`SELECT tutor_id,tutor_sur_name,tutor_name,tutor_mid_name,tutor_photo,tutor_login \ 
        FROM tutors \
        WHERE tutor_login LIKE '${login}' AND tutor_password LIKE '${password}'`, async(err,data)=>{
            if(err) throw err;
            if(typeof data[0]!=='undefined'){
                serverUser.setUser(data[0].tutor_id,
                    "tutor",
                    "t",
                    data[0].tutor_sur_name,
                    data[0].tutor_name,
                    data[0].tutor_mid_name,
                    data[0].tutor_photo);
                req.session.user=`$tutor/${data[0].tutor_id}`;
                serverUser.setUserGroup(await serverUser.createSelectQuery(`SELECT group_id \
                FROM groups a INNER JOIN tutors b ON a.tutor_id=b.tutor_id \
                WHERE a.tutor_id=${serverUser.getUserState()[0]} AND group_end_education_date>NOW()`));
                serverUser.setUserOptions(await serverUser.createSelectQuery(`SELECT * \ 
                FROM options a inner join users b on a.option_id=b.user_id WHERE user_login LIKE '${data[0].tutor_login}'`));
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
        connect.query(`SELECT student_id,student_sur_name,student_name,student_mid_name,student_photo,group_id,student_login \ 
        FROM students \
        WHERE student_login LIKE '${login}' AND student_password LIKE '${password}'`, async(err,data)=>{
            if(err) throw err;
            if(typeof data[0]!=='undefined'){
                await serverUser.setUser(data[0].student_id,
                    "student",
                    "s",
                    data[0].student_sur_name,
                    data[0].student_name,
                    data[0].student_mid_name,
                    data[0].student_photo);
                req.session.user=`#student/${data[0]}`;
                await serverUser.setUserGroup(data[0].group_id);
                await serverUser.setUserOptions(await serverUser.createSelectQuery(`SELECT * \ 
                FROM options a inner join users b on a.option_id=b.user_id WHERE user_login LIKE '${data[0].student_login}'`));
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
//Общие страницы
//Главная страница веб-приложения
app.get("/",isAuthenticated,(req,res)=>{
    res.render(`${serverUser.getUserState()[2]}_index`,{
        username:serverUser.getUserFullName(),
        role:serverUser.getUserState()[1], 
        options:serverUser.getUserOptions()
    });
});
//Страница профиля пользователя
app.get("/profile",isAuthenticated,async(req,res)=>{
    let userData=await serverUser.createSelectQuery(`SELECT * \ 
    FROM ${serverUser.getUserState()[1]}s \
    WHERE ${serverUser.getUserState()[1]}_id=${serverUser.getUserState()[0]}`);
    res.render("profile",{
        title:serverUser.getUserFullName(),
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions(),
        userData:userData
    });
});
//Страница опций
app.get("/options",isAuthenticated,async(req,res)=>{
    res.render("options",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions()
    });
});
//Страницы куратора
//Объявления
app.route("/c/announcements").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let announcement=await serverUser.createSelectQuery(`SELECT * \
    FROM announcements a INNER JOIN announcement_types b on a.announcement_type=b.announcement_type_id \
    WHERE group_id=${serverUser.getUserGroup()} ORDER BY announcement_data DESC;
    SELECT * \ 
    FROM announcement_types`);
    res.render("c_announcement",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions(),
        posts:announcement[0],
        announcement_type:announcement[1]
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    let file=await serverUser.fileNormalisePath(req.body.file,'common_img',null);
    await serverUser.createIUDQuery(`INSERT INTO announcements \
    VALUE(null,${serverUser.getUserGroup()},NOW(),'${req.body.head}','${req.body.type}',${file},'${req.body.text}');`);
    res.end();
});
//Страница группы
app.get("/c/mygroup",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let group=await serverUser.createSelectQuery(`SELECT student_id, student_sur_name,student_name,student_mid_name,student_photo,student_headman,student_sex \
    FROM students \
    WHERE group_id=${serverUser.getUserGroup()} AND NOT EXISTS (SELECT student_id FROM deductions WHERE deductions.student_id=students.student_id) \
    ORDER BY student_sur_name;\ 
    SELECT spetiality_abbreviated \
    FROM spetialities a inner join groups b on a.spetiality_id=b.spetiality_id \
    WHERE b.group_id=${serverUser.getUserGroup()} LIMIT 1;
    SELECT * \
    FROM groups \
    WHERE group_id=${serverUser.getUserGroup()}`);
    res.render("c_mygroup",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions(),
        title:group[1][0].spetiality_abbreviated,
        studentsList:group[0],
        groupInfo: group[2][0]
    });
});
//Страница студента
app.get("/c/student/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let student=await serverUser.createSelectQuery(`SELECT * \
    FROM students \ 
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')}`);
    res.render("c_student",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions(),
        title:`${student[0].student_sur_name} ${student[0].student_name} ${student[0].student_mid_name}`,
        student:student
    });
});
//Страница информации о студенте
app.get("/c/student/:id/documents",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentsDocumentary=await serverUser.createSelectQuery(`SELECT * \
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
        options:serverUser.getUserOptions(),
        title:`${studentsDocumentary[0][0].student_sur_name} ${studentsDocumentary[0][0].student_name} ${studentsDocumentary[0][0].student_mid_name}`,
        student:studentsDocumentary[0][0],
        passport:studentsDocumentary[1],
        documents:studentsDocumentary[2]
    });
});
//Страница достижений студента
app.route("/c/student/:id/portfolio").get(isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentPortfolio=serverUser.createSelectQuery(`SELECT * \
    FROM students \ 
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT * \
    FROM portfolio \
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};`)
    res.render("c_student_portfolio",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions(),
        title:`${studentPortfolio[0][0].student_sur_name} ${studentPortfolio[0][0].student_name} ${studentPortfolio[0][0].student_mid_name}`,
        student:studentPortfolio[0][0],
        portfolio:studentPortfolio[1]
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{

    res.end();
});;
//Страница ДО/ДПО студента
app.get("/c/student/:id/additionaleducation",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    let studentAdditionEducation=serverUser.createSelectQuery(`SELECT * \
    FROM students \ 
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT * \
    FROM additional_educations a INNER JOIN courses b ON a.ae_id=b.ae_id \
    WHERE b.student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')}`);
    res.render("c_student_additionaleducation",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions(),
        title:`${studentAdditionEducation[0][0].student_sur_name} ${studentAdditionEducation[0][0].student_name} ${studentAdditionEducation[0][0].student_mid_name}`,
        student:studentAdditionEducation[0][0],
        portfolio:studentAdditionEducation[1]
    });
});
//Страница посещаемости студента
app.route("/c/student/:id/attendance").get(isAuthenticated,interfaceSplitter,isAccsessable,async(res,req)=>{
    let studentAttendance=await serverUser.createSelectQuery(`SELECT * \
    FROM students \ 
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};
    SELECT * \
    FROM absenteeismes \
    WHERE student_id=${JSON.stringify(req.params.id).replace(/\"/gi,'')};`);
    res.render("c_student_attendance",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions(),
        title:`${studentAttendance[0][0].student_sur_name} ${studentAttendance[0][0].student_name} ${studentAttendance[0][0].student_mid_name}`,
        student:studentAttendance[0][0],
        absenteeismes:studentAttendance[1]
    });
}).post(isAuthenticated,interfaceSplitter,isAccsessable,urlencodedParser, async(res,req)=>{

    res.end();
});
//Страница мероприятий
app.get("/c/mygroup/events",isAuthenticated,interfaceSplitter,(req,res)=>{
    res.render("c_mygroupevents",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions()
    });
});
//Страница родительских собраний
app.get("/c/mygroup/events/parentingmeetings",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let meetingsList=await serverUser.createSelectQuery(`SELECT * \
    FROM events a INNER JOIN event_types b ON a.event_type_id=b.event_type_id \ 
    WHERE event_type_name LIKE 'Родительское собрание'`);
    res.render("c_parentingmeetings",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUseOptions()
    });
});
//Страница классных часов
app.get("/c/mygroup/events/classhours",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let classHoursList=await serverUser.createSelectQuery(`SELECT * \
    FROM events a INNER JOIN event_types b ON a.event_type_id=b.event_type_id \ 
    WHERE event_type_name LIKE 'Классный час'`);
    res.render("c_classhours",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions(),
        classHoursList:classHoursList
    });
});
//Страница выездных мероприятий
app.get("/c/mygroup/events/offsite",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let offsiteEventsList=await serverUser.createSelectQuery(`SELECT * \
    FROM events a INNER JOIN event_types b ON a.event_type_id=b.event_type_id \ 
    WHERE event_type_name LIKE 'Выездное мироприятие'`);
    res.render("c_offsite",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions()
    });
});
//Страница с формой создания нового мероприятия
app.route("/c/mygroup/newevent").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("c_mygroupnewevent",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions()
    });
}).post(urlencodedParser,isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.end();
});
//Страница индвидуальной работы
app.get("/c/mygroup/individualwork",(req,res)=>{
    res.render("c_mygroupindividualwork",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions()
    });
});
//Страница студентов, состоящих на учёте
app.get("/c/mygroup/individualwork/accounting",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let iwAccountingList=await serverUser.createSelectQuery(`SELECT iw_id,iw_type_name,iw_reasone,iw_date \
    FROM individual_works a INNER JOIN students b on a.student_id=b.student_id \
    INNER JOIN individual_work_types c on a.iw_type_id=b.iw_type_id \
    WHERE b.group_id=${serverUser.getUserGroup()} AND a.iw_type_name LIKE 'Учёт'`);
    res.render("c_mygroupindividualwork_accounting",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions(),
        iwAccountingList:iwAccountingList
    });
});
//Страница студентов приглашённых(на)/посетивших совет по прафилактике
app.get("/c/mygroup/individualwork/preventionadvice",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let iwPreventionAdviceList=await serverUser.createSelectQuery(`SELECT iw_id,iw_type_name,iw_reasone,iw_date \
    FROM individual_works a INNER JOIN students b on a.student_id=b.student_id \
    INNER JOIN individual_work_types c on a.iw_type_id=b.iw_type_id \
    WHERE b.group_id=${serverUser.getUserGroup()} AND a.iw_type_name LIKE 'Совет по профилактике'`);
    res.render("c_mygroupindividualwork_preventionadvice",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions(),
        iwPreventionAdviceList:iwPreventionAdviceList
    });
});
//Страница работы социального психолога
app.get("/c/mygroupindividualwork/socialpsychologisthelp",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let iwSPHelpList=await serverUser.createSelectQuery(`SELECT iw_id,iw_type_name,iw_reasone,iw_date \
    FROM individual_works a INNER JOIN students b on a.student_id=b.student_id \
    INNER JOIN individual_work_types c on a.iw_type_id=b.iw_type_id \
    WHERE b.group_id=${serverUser.getUserGroup()} AND a.iw_type_name LIKE 'Совет по профилактике'`);
    res.render("c_mygroupindividualwork_socialpsychologisthelp",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions(),
        iwSPHelpList:iwSPHelpList
    });
});
//Страница докладных на группу
app.get("/c/mygroup/individualwork/reports",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let reports=await serverUser.createSelectQuery(`SELECT * \ 
    FROM reports \
    WHERE group_id=${serverUser.getUserGroup()}`);
    res.render("c_mygroupindividualwork_reports",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions(),
        reports:reports
    });
});
//Страница с формой создания новой докладной на группу/студента
app.route("/c/newreport").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let data=await serverUser.createSelectQuery("SELECT group_id, spetiality_abbreviated \
    FROM groups a INNER JOIN spetialities b ON a.spetiality_id=b.spetiality_id \
    WHERE a.group_end_education_date>NOW();");
    res.render("c_newreport",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions(),
        group_list:data
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
    await serverUser.createIUDQuery(`INSERT INTO reports \ 
    VALUES(null,${serverUser.getUserState()[0]},${req.body.group_id},'${req.body.text}',NOW())`);
    res.end();
});
//Страница посещаемости
app.get("/c/mygroup/attendance",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let studentList=await serverUser.createSelectQuery(`SELECT student_id, student_sur_name,student_name,student_mid_name,student_photo,student_headman,student_sex \
    FROM students \
    WHERE group_id=${serverUser.getUserGroup()} AND NOT EXISTS (SELECT student_id FROM deductions WHERE deductions.student_id=students.student_id) \
    ORDER BY student_sur_name`);
    res.render("c_mygroupattendance",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions(),
        studentList:studentList
    });
});
app.route("/c/newattendance").get(isAuthenticated,interfaceSplitter,async(req,res)=>{
    let studentList=await serverUser.createSelectQuery(`SELECT student_id, student_sur_name,student_name,student_mid_name,student_photo,student_headman,student_sex \
    FROM students \
    WHERE group_id=${serverUser.getUserGroup()} AND NOT EXISTS (SELECT student_id FROM deductions WHERE deductions.student_id=students.student_id) \
    ORDER BY student_sur_name`);
    res.render("c_newattendance",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions(),
        studentList:studentList
    });
}).post(isAuthenticated,interfaceSplitter,urlencodedParser,async(req,res)=>{
});
//Страница-галерея
app.get("/c/mygroup/gallery",isAuthenticated,interfaceSplitter,async(req,res)=>{
    let gallery=await serverUser.createSelectQuery(`SELECT event_archive \
    FROM events a INNER JOIN groups b ON a.group_id=b.group_id`);
    res.render("c_mygroupgallery",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions(),
        gallery:gallery
    });
});
//Страницы студента
//Страница достижений
app.get("/s/portfolio",isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("s_portfolio",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions()
    });
});
//Страницы тьютора
//Список групп
app.get("/t/groups",isAuthenticated,interfaceSplitter,async(req,res)=>{
    res.render("t_grouplist",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions()
    });
});
//Страница группы
app.get("/t/group/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    res.render("t_grouplist",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions()
    });
});
//Страница студента
app.get("/t/group/:id/student/:id",isAuthenticated,interfaceSplitter,isAccsessable,async(req,res)=>{
    res.render("t_grouplist",{
        username:serverUser.getUserFullName(), 
        role:serverUser.getUserState()[1],
        options:serverUser.getUserOptions()
    });
});
//Страницы администратора
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
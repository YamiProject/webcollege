-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 04 2021 г., 23:10
-- Версия сервера: 8.0.19
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `wc_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `absenteeismes`
--

CREATE TABLE `absenteeismes` (
  `absenteeismes_id` int NOT NULL,
  `attendance_id` int NOT NULL,
  `student_id` int NOT NULL,
  `absenteeismes_type` enum('Н','З') NOT NULL,
  `absenteeismes_file` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `absenteeismes`
--

INSERT INTO `absenteeismes` (`absenteeismes_id`, `attendance_id`, `student_id`, `absenteeismes_type`, `absenteeismes_file`) VALUES
(7, 8, 1, 'Н', '/files/1/1/absentismeses/6351992_preview.png'),
(8, 8, 2, 'З', '/files/1/2/absentismeses/abs_2000-03-02.png'),
(9, 9, 1, 'З', NULL),
(10, 9, 2, 'Н', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `achievements`
--

CREATE TABLE `achievements` (
  `achievement_id` int NOT NULL,
  `student_id` int NOT NULL,
  `achievement_name` varchar(300) NOT NULL,
  `achievement_scan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `achievements`
--

INSERT INTO `achievements` (`achievement_id`, `student_id`, `achievement_name`, `achievement_scan`) VALUES
(1, 1, 'e21e1', '/files/1/1/achievements/QR.png'),
(2, 2, '133', '/files/1/2/achievements/Morse.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `additional_educations`
--

CREATE TABLE `additional_educations` (
  `ae_id` int NOT NULL,
  `ae_name` varchar(300) NOT NULL,
  `ae_lecturer_id` int DEFAULT NULL,
  `ae_beg_date` date NOT NULL,
  `ae_end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `additional_educations`
--

INSERT INTO `additional_educations` (`ae_id`, `ae_name`, `ae_lecturer_id`, `ae_beg_date`, `ae_end_date`) VALUES
(1, 'Машинное обучение', 1, '2021-05-25', '2021-05-31'),
(2, 'Графический Дизайн', 1, '2021-05-25', '2021-05-31');

-- --------------------------------------------------------

--
-- Структура таблицы `announcements`
--

CREATE TABLE `announcements` (
  `announcement_id` int NOT NULL,
  `group_id` int NOT NULL,
  `announcement_data` datetime NOT NULL,
  `announcement_header` varchar(300) NOT NULL,
  `announcement_type` int NOT NULL,
  `announcement_file` text,
  `announcement_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `announcements`
--

INSERT INTO `announcements` (`announcement_id`, `group_id`, `announcement_data`, `announcement_header`, `announcement_type`, `announcement_file`, `announcement_text`) VALUES
(1, 1, '2021-04-14 20:53:43', '21323', 2, '/files/1/announcements_files/aaa.jpg', 'fawfwf'),
(2, 1, '2021-04-20 12:07:37', 'dwdwd', 2, '/files/1/announcements_files/QR2.png', 'wdwdwd'),
(3, 1, '2021-04-27 19:38:35', 'aaaaaaaaaaa', 1, '/files/1/announcements_files/6e727e315d647b5987533b12104aafe1.jpg', 'aaaaaaaaaaaaaa'),
(4, 1, '2021-05-03 00:03:24', 'wwwwwwwwwwww', 2, '/files/1/announcements_files/6e727e315d647b5987533b12104aafe1(1).jpg', 'dddddddddddddddd'),
(5, 1, '2021-05-03 10:55:51', 'aaaaaa', 2, '/files/1/announcements_files/6e727e315d647b5987533b12104aafe1(2).jpg', 'csssssssssd'),
(6, 1, '2021-05-05 18:51:24', '213213', 2, '/files/1/announcements_files/6e727e315d647b5987533b12104aafe1(3).jpg', 'dwdawdd');

-- --------------------------------------------------------

--
-- Структура таблицы `announcement_types`
--

CREATE TABLE `announcement_types` (
  `announcement_type_id` int NOT NULL,
  `announcement_type_name` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `announcement_types`
--

INSERT INTO `announcement_types` (`announcement_type_id`, `announcement_type_name`) VALUES
(1, 'Мероприятие'),
(2, 'Оповещение'),
(3, 'Предупреждение'),
(4, 'Новость');

-- --------------------------------------------------------

--
-- Структура таблицы `attendance`
--

CREATE TABLE `attendance` (
  `attendance_id` int NOT NULL,
  `group_id` int NOT NULL,
  `attendance_date` date NOT NULL,
  `attendance_present` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `attendance`
--

INSERT INTO `attendance` (`attendance_id`, `group_id`, `attendance_date`, `attendance_present`) VALUES
(8, 1, '2000-03-02', 0),
(9, 1, '2021-04-01', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `courses`
--

CREATE TABLE `courses` (
  `course_id` int NOT NULL,
  `ae_id` int NOT NULL,
  `student_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `courses`
--

INSERT INTO `courses` (`course_id`, `ae_id`, `student_id`) VALUES
(1, 1, 2),
(2, 2, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `deductions`
--

CREATE TABLE `deductions` (
  `deduction_id` int NOT NULL,
  `student_id` int NOT NULL,
  `deduction_date` date NOT NULL,
  `deduction_reasone` text NOT NULL,
  `deduction_file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `departments`
--

CREATE TABLE `departments` (
  `department_id` int NOT NULL,
  `department_name` varchar(200) NOT NULL,
  `department_abbreviated` varchar(20) NOT NULL,
  `department_address` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `departments`
--

INSERT INTO `departments` (`department_id`, `department_name`, `department_abbreviated`, `department_address`) VALUES
(1, 'Отделение управления и информационных технологий', 'ОУИТ', 'г.Москва, ул.Генерала Белова, д.6');

-- --------------------------------------------------------

--
-- Структура таблицы `documents`
--

CREATE TABLE `documents` (
  `document_id` int NOT NULL,
  `student_id` int NOT NULL,
  `document_name` varchar(200) NOT NULL,
  `document_number` varchar(40) DEFAULT NULL,
  `document_scan` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `documents`
--

INSERT INTO `documents` (`document_id`, `student_id`, `document_name`, `document_number`, `document_scan`) VALUES
(1, 1, 'ИНН', NULL, NULL),
(2, 1, 'СНИЛС', NULL, NULL),
(3, 1, 'ПОЛИС', NULL, NULL),
(4, 2, 'ИНН', NULL, NULL),
(5, 2, 'СНИЛС', '11111111111', '/files/1/2/documents/SNILS-scan.png'),
(6, 2, 'ПОЛИС', NULL, NULL),
(7, 3, 'ИНН', NULL, NULL),
(8, 3, 'СНИЛС', NULL, NULL),
(9, 3, 'ПОЛИС', NULL, NULL),
(10, 5, 'СНИЛС', NULL, NULL),
(11, 5, 'ИНН', NULL, NULL),
(12, 5, 'ПОЛИС', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `duty_schedule`
--

CREATE TABLE `duty_schedule` (
  `ds_id` int NOT NULL,
  `ds_date` date NOT NULL,
  `first_student_id` int NOT NULL,
  `second_student_id` int NOT NULL,
  `group_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `events`
--

CREATE TABLE `events` (
  `event_id` int NOT NULL,
  `group_id` int NOT NULL,
  `event_type_id` int NOT NULL,
  `event_description` text NOT NULL,
  `event_date` date NOT NULL,
  `event_img` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `events`
--

INSERT INTO `events` (`event_id`, `group_id`, `event_type_id`, `event_description`, `event_date`, `event_img`) VALUES
(1, 1, 2, 'fawfawf', '2021-04-23', NULL),
(2, 1, 1, '13WAD', '2021-04-15', NULL),
(3, 1, 1, 'DWDAAD', '2021-04-07', NULL),
(4, 1, 2, 'DD21123', '2021-04-07', '/files/1/events/photo-1525034687081-c702010cb70d.jfif'),
(5, 1, 3, 'ввввввввввввв', '2021-04-24', '/files/1/events/6e727e315d647b5987533b12104aafe1.jpg'),
(6, 1, 1, 'DWDWDWDWD', '2021-05-27', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `event_types`
--

CREATE TABLE `event_types` (
  `event_type_id` int NOT NULL,
  `event_type_name` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `event_types`
--

INSERT INTO `event_types` (`event_type_id`, `event_type_name`) VALUES
(1, 'Выездное мероприятие'),
(2, 'Родительское собрание'),
(3, 'Субботник');

-- --------------------------------------------------------

--
-- Структура таблицы `gallery`
--

CREATE TABLE `gallery` (
  `gallery_id` int NOT NULL,
  `group_id` int NOT NULL,
  `gallery_img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `gallery`
--

INSERT INTO `gallery` (`gallery_id`, `group_id`, `gallery_img`) VALUES
(1, 1, '/files/1/img/Untitled-1.png'),
(2, 1, '/files/1/img/А4 ввод ключа.png'),
(3, 1, '/files/1/events/6e727e315d647b5987533b12104aafe1.jpg'),
(4, 1, '/files/1/events/photo-1525034687081-c702010cb70d.jfif'),
(5, 1, '/files/1/img/6351992_preview.png');

-- --------------------------------------------------------

--
-- Структура таблицы `groups`
--

CREATE TABLE `groups` (
  `group_id` int NOT NULL,
  `teacher_id` int DEFAULT NULL,
  `head_id` int DEFAULT NULL,
  `department_id` int NOT NULL,
  `spetiality_id` int NOT NULL,
  `group_beg_education_date` date NOT NULL,
  `group_end_education_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `groups`
--

INSERT INTO `groups` (`group_id`, `teacher_id`, `head_id`, `department_id`, `spetiality_id`, `group_beg_education_date`, `group_end_education_date`) VALUES
(1, 1, 1, 1, 1, '2020-09-01', '2023-05-31'),
(2, NULL, 1, 1, 2, '2021-05-02', '2021-11-30');

-- --------------------------------------------------------

--
-- Структура таблицы `group_chat`
--

CREATE TABLE `group_chat` (
  `chat_id` int NOT NULL,
  `id_user` int NOT NULL,
  `id_group` int NOT NULL,
  `chat_date` date NOT NULL,
  `chat_msg` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `heads`
--

CREATE TABLE `heads` (
  `head_id` int NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `heads`
--

INSERT INTO `heads` (`head_id`, `user_id`) VALUES
(1, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `individual_works`
--

CREATE TABLE `individual_works` (
  `iw_id` int NOT NULL,
  `iw_type_id` int NOT NULL,
  `student_id` int NOT NULL,
  `iw_reasone` text NOT NULL,
  `iw_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `individual_works`
--

INSERT INTO `individual_works` (`iw_id`, `iw_type_id`, `student_id`, `iw_reasone`, `iw_date`) VALUES
(1, 1, 1, 'ddddddddddddd', '2021-04-28');

-- --------------------------------------------------------

--
-- Структура таблицы `individual_work_types`
--

CREATE TABLE `individual_work_types` (
  `iw_type_id` int NOT NULL,
  `iw_type_name` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `individual_work_types`
--

INSERT INTO `individual_work_types` (`iw_type_id`, `iw_type_name`) VALUES
(1, 'Работа с социальным педагогом'),
(2, 'Работа с психологом'),
(3, 'Жалоба'),
(4, 'Вызов на совет по профилактике');

-- --------------------------------------------------------

--
-- Структура таблицы `options`
--

CREATE TABLE `options` (
  `option_id` int NOT NULL,
  `h_size` int NOT NULL,
  `h_color` varchar(300) NOT NULL,
  `font_size` int NOT NULL,
  `font_color` varchar(100) NOT NULL,
  `theme_id` int NOT NULL,
  `logo_d` tinyint(1) NOT NULL,
  `app_name_d` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `options`
--

INSERT INTO `options` (`option_id`, `h_size`, `h_color`, `font_size`, `font_color`, `theme_id`, `logo_d`, `app_name_d`) VALUES
(1, 42, '#212529', 16, '#212529', 1, 1, 1),
(2, 42, '#212529', 16, '#212529', 1, 1, 1),
(3, 42, '#212529', 16, '#212529', 1, 1, 1),
(4, 42, '#212529', 16, '#212529', 1, 1, 1),
(5, 42, '#212529', 16, '#212529', 1, 1, 1),
(6, 42, '#212529', 16, '#212529', 1, 1, 1),
(13, 42, '#212529', 16, '#212529', 1, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `parents`
--

CREATE TABLE `parents` (
  `parent_id` int NOT NULL,
  `student_id` int NOT NULL,
  `parent_sur_name` varchar(200) NOT NULL,
  `parent_name` varchar(200) NOT NULL,
  `parent_mid_name` varchar(200) DEFAULT NULL,
  `parent_role` enum('Мать','Отец','Бабушка','Дедушка') NOT NULL,
  `parent_number` varchar(13) NOT NULL,
  `parent_pc` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `passports`
--

CREATE TABLE `passports` (
  `passport_id` int NOT NULL,
  `student_id` int NOT NULL,
  `passport_series` int DEFAULT NULL,
  `passport_number` int DEFAULT NULL,
  `passport_data_of_issue` date DEFAULT NULL,
  `passport_address` varchar(250) DEFAULT NULL,
  `passport_issued_by` varchar(250) DEFAULT NULL,
  `passport_scan` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `passports`
--

INSERT INTO `passports` (`passport_id`, `student_id`, `passport_series`, `passport_number`, `passport_data_of_issue`, `passport_address`, `passport_issued_by`, `passport_scan`) VALUES
(1, 1, 1231, 123123, '2021-04-22', '12313313', 'dwadwawd', '/files/1/1/documents/passport-scan.png'),
(2, 2, 1111, 111111, '2021-03-31', '1111111111111111', '111111111111111111111111111111111111', '/files/1/2/documents/passport-scan.png'),
(3, 3, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 5, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `reports`
--

CREATE TABLE `reports` (
  `report_id` int NOT NULL,
  `group_id` int NOT NULL,
  `report_cr_date` date NOT NULL,
  `report_interval_date` date NOT NULL,
  `report_type` varchar(40) NOT NULL,
  `report_fields` text NOT NULL,
  `report_query` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `reports`
--

INSERT INTO `reports` (`report_id`, `group_id`, `report_cr_date`, `report_interval_date`, `report_type`, `report_fields`, `report_query`) VALUES
(8, 1, '2021-05-04', '2021-03-04', 'attendance', '#,ID,Студент,Н,З,Общее кол-во пропусков,Закрытые пропуски,Незакрытые пропуски', 'SET @rank=0; SELECT @rank:=@rank+1 as \'num\',c.student_id,d.user_name,d.user_sur_name,d.user_mid_name,COUNT(case when absenteeismes_type=\'Н\' then 1 end) \'N\',COUNT(case when absenteeismes_type=\'З\' then 1 end) \'Z\',COUNT(absenteeismes_id) \'common\',COUNT(absenteeismes_file) \'closed\',COUNT(absenteeismes_id)-COUNT(absenteeismes_file) \'unclosed\'\nFROM attendance a RIGHT JOIN absenteeismes b ON a.attendance_id=b.attendance_id RIGHT JOIN students c ON b.student_id=c.student_id INNER JOIN users d ON c.user_id=d.user_id \nWHERE a.attendance_date<\'2021.05.04\' AND DATE_SUB(\'2021.05.04\',INTERVAL 2 MONTH)>a.attendance_date AND c.group_id=1 AND c.student_id NOT IN (SELECT student_id FROM deductions) \nGROUP BY c.student_id,d.user_name,d.user_sur_name,d.user_mid_name'),
(9, 1, '2021-05-04', '2021-05-02', 'attendance', '#,ID,Студент,Н,З,Общее кол-во пропусков,Закрытые пропуски,Незакрытые пропуски', 'SET @rank=0; SELECT @rank:=@rank+1 as \'num\',c.student_id,d.user_name,d.user_sur_name,d.user_mid_name,COUNT(case when absenteeismes_type=\'Н\' then 1 end) \'N\',COUNT(case when absenteeismes_type=\'З\' then 1 end) \'Z\',COUNT(absenteeismes_id) \'common\',COUNT(absenteeismes_file) \'closed\',COUNT(absenteeismes_id)-COUNT(absenteeismes_file) \'unclosed\'\nFROM attendance a RIGHT JOIN absenteeismes b ON a.attendance_id=b.attendance_id RIGHT JOIN students c ON b.student_id=c.student_id INNER JOIN users d ON c.user_id=d.user_id \nWHERE (a.attendance_date<\'2021.05.04\' AND DATE_SUB(\'2021.05.04\',INTERVAL 2 DAY)>a.attendance_date) OR a.attendance_date IS NULL AND c.group_id=1 AND c.student_id NOT IN (SELECT student_id FROM deductions) \nGROUP BY c.student_id,d.user_name,d.user_sur_name,d.user_mid_name'),
(11, 1, '2021-05-04', '2021-03-04', 'attendance', '#,ID,Студент,Н,З,Общее кол-во пропусков,Закрытые пропуски,Незакрытые пропуски', 'SET @rank=0; SELECT @rank:=@rank+1 as \'num\',c.student_id,d.user_name,d.user_sur_name,d.user_mid_name,COUNT(\n                                                    CASE \n                                                        WHEN absenteeismes_type=\'Н\' AND a.attendance_date>DATE_SUB(\'2021.05.04\',INTERVAL 2 MONTH) \n                                                        THEN 1 \n                                                    END) \'N\',COUNT(\n                                                    CASE \n                                                        WHEN absenteeismes_type=\'З\' AND a.attendance_date>DATE_SUB(\'2021.05.04\',INTERVAL 2 MONTH) \n                                                        THEN 1 \n                                                    END) \'Z\',COUNT(\n                                                    CASE \n                                                        WHEN a.attendance_date>DATE_SUB(\'2021.05.04\',INTERVAL 2 MONTH) \n                                                        THEN 1 \n                                                    END) \'common\',COUNT(\n                                                    CASE \n                                                        WHEN absenteeismes_file IS NOT NULL AND a.attendance_date>DATE_SUB(\'2021.05.04\',INTERVAL 2 MONTH) \n                                                        THEN 1 \n                                                    END) \'closed\',COUNT(\n                                                    CASE \n                                                        WHEN a.attendance_date>DATE_SUB(\'2021.05.04\',INTERVAL 2 MONTH) \n                                                        THEN 1 \n                                                    END)\n                                                -COUNT(\n                                                        CASE \n                                                            WHEN absenteeismes_file IS NOT NULL AND a.attendance_date>DATE_SUB(\'2021.05.04\',INTERVAL 2 MONTH) \n                                                            THEN 1 \n                                                        END) \'unclosed\'\nFROM attendance a RIGHT JOIN absenteeismes b ON a.attendance_id=b.attendance_id \n                                  RIGHT JOIN students c ON b.student_id=c.student_id \n                                  INNER JOIN users d ON c.user_id=d.user_id \nWHERE c.group_id=1 AND c.student_id NOT IN (SELECT student_id FROM deductions) \nGROUP BY c.student_id,d.user_name,d.user_sur_name,d.user_mid_name'),
(12, 1, '2021-05-04', '2021-03-04', 'events', '#,Наименование,Дата последнего мероприятия,Проведённые,Предстоящие,Общее количество', 'SET @rank=0; SELECT @rank:=@rank+1 as \'num\',b.event_type_name,a.event_date,COUNT(\n                                                    CASE \n                                                        WHEN a.event_date<NOW() AND a.event_date>DATE_SUB(\'2021.05.04\',INTERVAL 2 MONTH) \n                                                        THEN 1 \n                                                    END) \'compl\',COUNT(\n                                                    CASE \n                                                        WHEN a.event_date>NOW() AND a.event_date>DATE_SUB(\'2021.05.04\',INTERVAL 2 MONTH) \n                                                        THEN 1 \n                                                    END) \'future\',COUNT(\n                                                    CASE\n                                                        WHEN a.event_date>DATE_SUB(\'2021.05.04\',INTERVAL 2 MONTH) \n                                                        THEN 1\n                                                    END) \'comm\'\nFROM events a INNER JOIN event_types b ON a.event_type_id=b.event_type_id \nWHERE group_id=1 \nGROUP BY b.event_type_name'),
(13, 1, '2021-05-04', '2021-03-04', 'iw', '#,ID,Студент,Работа с соц. педагогомРабота с психологом,Полученные жалобы,Работа с советом по проф.', 'SET @rank=0; SELECT @rank:=@rank+1 as \'num\',c.student_id,d.user_name,d.user_sur_name,d.user_mid_name,COUNT(\n                                                    CASE \n                                                        WHEN a.iw_type_id=1 AND a.iw_date>DATE_SUB(\'2021.05.04\',INTERVAL 2 MONTH) \n                                                        THEN 1 \n                                                    END) \'psy\',COUNT(\n                                                    CASE \n                                                        WHEN a.iw_type_id=2 AND a.iw_date>DATE_SUB(\'2021.05.04\',INTERVAL 2 MONTH) \n                                                        THEN 1 \n                                                    END) \'psy\',COUNT(\n                                                    CASE \n                                                        WHEN a.iw_type_id=3 AND a.iw_date>DATE_SUB(\'2021.05.04\',INTERVAL 2 MONTH) \n                                                        THEN 1 \n                                                    END) \'rep\',COUNT(\n                                                    CASE \n                                                        WHEN a.iw_type_id=4 AND a.iw_date>DATE_SUB(\'2021.05.04\',INTERVAL 2 MONTH) \n                                                        THEN 1 \n                                                    END) \'cons\'\nFROM individual_works a INNER JOIN individual_work_types b ON a.iw_type_id=b.iw_type_id \n                                  RIGHT JOIN students c ON a.student_id=c.student_id \n                                  INNER JOIN users d ON c.user_id=d.user_id \nWHERE c.group_id=1 AND c.student_id NOT IN (SELECT student_id FROM deductions) \nGROUP BY c.student_id,d.user_name,d.user_sur_name,d.user_mid_name'),
(21, 1, '2021-05-04', '2021-05-01', 'att-special', '#,Студент,01.04,02.04,03.04,04.04,05.04,06.04,07.04,08.04,09.04,10.04,11.04,12.04,13.04,14.04,15.04,16.04,17.04,18.04,19.04,20.04,21.04,22.04,23.04,24.04,25.04,26.04,27.04,28.04,29.04,30.04', 'SET @rank=0; SELECT @rank:=@rank+1 as \'num\',d.user_sur_name,d.user_name,d.user_mid_name,(CASE \r\n                                            WHEN \'2021-04-01\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-01\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY01\',(CASE \r\n                                            WHEN \'2021-04-02\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-02\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY02\',(CASE \r\n                                            WHEN \'2021-04-03\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-03\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY03\',(CASE \r\n                                            WHEN \'2021-04-04\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-04\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY04\',(CASE \r\n                                            WHEN \'2021-04-05\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-05\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY05\',(CASE \r\n                                            WHEN \'2021-04-06\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-06\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY06\',(CASE \r\n                                            WHEN \'2021-04-07\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-07\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY07\',(CASE \r\n                                            WHEN \'2021-04-08\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-08\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY08\',(CASE \r\n                                            WHEN \'2021-04-09\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-09\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY09\',(CASE \r\n                                            WHEN \'2021-04-10\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-10\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY10\',(CASE \r\n                                            WHEN \'2021-04-11\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-11\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY11\',(CASE \r\n                                            WHEN \'2021-04-12\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-12\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY12\',(CASE \r\n                                            WHEN \'2021-04-13\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-13\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY13\',(CASE \r\n                                            WHEN \'2021-04-14\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-14\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY14\',(CASE \r\n                                            WHEN \'2021-04-15\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-15\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY15\',(CASE \r\n                                            WHEN \'2021-04-16\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-16\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY16\',(CASE \r\n                                            WHEN \'2021-04-17\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-17\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY17\',(CASE \r\n                                            WHEN \'2021-04-18\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-18\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY18\',(CASE \r\n                                            WHEN \'2021-04-19\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-19\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY19\',(CASE \r\n                                            WHEN \'2021-04-20\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-20\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY20\',(CASE \r\n                                            WHEN \'2021-04-21\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-21\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY21\',(CASE \r\n                                            WHEN \'2021-04-22\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-22\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY22\',(CASE \r\n                                            WHEN \'2021-04-23\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-23\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY23\',(CASE \r\n                                            WHEN \'2021-04-24\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-24\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY24\',(CASE \r\n                                            WHEN \'2021-04-25\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-25\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY25\',(CASE \r\n                                            WHEN \'2021-04-26\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-26\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY26\',(CASE \r\n                                            WHEN \'2021-04-27\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-27\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY27\',(CASE \r\n                                            WHEN \'2021-04-28\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-28\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY28\',(CASE \r\n                                            WHEN \'2021-04-29\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-29\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY29\',(CASE \r\n                                            WHEN \'2021-04-30\'IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'Н\' \r\n                                                THEN \'Н\' \r\n                                            WHEN \'2021-04-30\' IN (SELECT attendance_date FROM attendance) AND b.absenteeismes_type=\'З\' \r\n                                                THEN \'З\' \r\n                                            ELSE \'\' \r\n                                        END) AS \'DAY30\'\r\nFROM attendance a RIGHT JOIN absenteeismes b ON a.attendance_id=b.attendance_id \r\n                                RIGHT JOIN students c ON b.student_id=c.student_id \r\n                                INNER JOIN users d ON c.user_id=d.user_id \r\nWHERE c.group_id=1 AND c.student_id NOT IN (SELECT student_id FROM deductions) \r\nGROUP BY c.student_id,d.user_sur_name,d.user_name,d.user_mid_name ORDER BY d.user_sur_name');

-- --------------------------------------------------------

--
-- Структура таблицы `spetialities`
--

CREATE TABLE `spetialities` (
  `spetiality_id` int NOT NULL,
  `spetiality_profession_id` int NOT NULL,
  `spetiality_abbreviated` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `spetialities`
--

INSERT INTO `spetialities` (`spetiality_id`, `spetiality_profession_id`, `spetiality_abbreviated`) VALUES
(1, 1, '18ИС-13'),
(2, 2, 'СА-1');

-- --------------------------------------------------------

--
-- Структура таблицы `spetiality_professions`
--

CREATE TABLE `spetiality_professions` (
  `spetiality_profession_id` int NOT NULL,
  `spetiality_full_name` varchar(200) NOT NULL,
  `spetiality_profession` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `spetiality_professions`
--

INSERT INTO `spetiality_professions` (`spetiality_profession_id`, `spetiality_full_name`, `spetiality_profession`) VALUES
(1, 'Информационные системы и программирование', 'Разработка веб и мультимедиа'),
(2, 'Сетевое и системное администрирование', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `students`
--

CREATE TABLE `students` (
  `student_id` int NOT NULL,
  `user_id` int NOT NULL,
  `group_id` int DEFAULT NULL,
  `student_disabled` tinyint(1) DEFAULT NULL,
  `student_headman` tinyint(1) DEFAULT NULL,
  `date_of_enrollment` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `students`
--

INSERT INTO `students` (`student_id`, `user_id`, `group_id`, `student_disabled`, `student_headman`, `date_of_enrollment`) VALUES
(1, 4, 1, NULL, NULL, NULL),
(2, 5, 1, NULL, NULL, NULL),
(3, 6, 1, NULL, NULL, NULL),
(5, 13, 2, NULL, NULL, NULL);

--
-- Триггеры `students`
--
DELIMITER $$
CREATE TRIGGER `new_student_documents` AFTER INSERT ON `students` FOR EACH ROW INSERT INTO documents
VALUES(null,NEW.student_id,'СНИЛС',null,null),
(null,NEW.student_id,'ИНН',null,null),
(null,NEW.student_id,'ПОЛИС',null,null)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `new_student_passport` AFTER INSERT ON `students` FOR EACH ROW INSERT INTO passports
VALUES(null,NEW.student_id,null,null,null,null,null,null)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int NOT NULL,
  `user_id` int NOT NULL,
  `teacher_exp` int DEFAULT NULL,
  `teacher_spetiality` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `user_id`, `teacher_exp`, `teacher_spetiality`) VALUES
(1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `themes`
--

CREATE TABLE `themes` (
  `theme_id` int NOT NULL,
  `theme_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `themes`
--

INSERT INTO `themes` (`theme_id`, `theme_name`) VALUES
(1, 'По умолчанию'),
(2, 'Тёплый вечер'),
(3, 'Изумрудный город'),
(4, 'Меланхолия');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `user_login` varchar(300) NOT NULL,
  `user_password` varchar(300) NOT NULL,
  `user_role` enum('Студент','Преподаватель','ЗавОтделением','Администратор') NOT NULL,
  `user_sur_name` varchar(300) NOT NULL,
  `user_name` varchar(300) NOT NULL,
  `user_mid_name` varchar(300) DEFAULT NULL,
  `user_birthdate` date NOT NULL,
  `user_sex` enum('М','Ж') NOT NULL,
  `user_number` varchar(13) NOT NULL,
  `user_email` varchar(300) NOT NULL,
  `user_photo` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `user_login`, `user_password`, `user_role`, `user_sur_name`, `user_name`, `user_mid_name`, `user_birthdate`, `user_sex`, `user_number`, `user_email`, `user_photo`) VALUES
(1, 'Kiselova123', 'I6W1C6yTWOJWN/J2nm241w==', 'Преподаватель', 'Киселёва', 'Светлана', 'Владимировна', '2021-01-28', 'Ж', '11111111111', 'aa@mail.ru', '/img/users/1_1.png'),
(2, 'admin', 'admin', 'Администратор', 'Костин', 'Владислав', 'Константинович', '2021-02-04', 'М', '22222222222', 'bb@mail.ru', 'null'),
(3, 'mAkSI', '111', 'ЗавОтделением', 'Максимова', 'Татьяна', 'Викторовна', '2021-02-04', 'Ж', '33333333333', 'cc@mail.ru', 'null'),
(4, 'KOSTIN', '1123', 'Студент', 'Костин', 'Владислав', 'Константинович', '2021-02-04', 'М', '44444444444', 'dd@mail.ru', 'null'),
(5, 'sec_student', '11112', 'Студент', 'Абдулберов', 'Тимур', 'Рушанович', '2021-02-04', 'М', '88888888888', 'ee@mail.ru', 'null'),
(6, 'Natali', 'Y/eGYDEHi96EblqmeGifuw==', 'Студент', 'Тихомирова', 'Наталья', NULL, '2021-04-01', 'Ж', '21111111111', '', NULL),
(13, 'Oksi', '1C1Y1xPX6e54zLTw5/0Q+w==', 'Студент', 'Юрченко', 'Оксана', NULL, '2021-05-01', 'Ж', '111', '111', NULL);

--
-- Триггеры `users`
--
DELIMITER $$
CREATE TRIGGER `new_user_insert` AFTER INSERT ON `users` FOR EACH ROW BEGIN
	IF NEW.user_role LIKE 'Студент' THEN
    	INSERT INTO students VALUES(NULL,NEW.user_id,null,null,null,null);
    ELSEIF NEW.user_role LIKE 'Преподаватель' THEN
    	INSERT INTO teachers VALUES(NULL,NEW.user_id,null,null);
    ELSEIF NEW.user_role LIKE 'ЗавОтделением' THEN
    	INSERT INTO heads VALUES(null,NEW.user_id);
    ELSEIF NEW.user_role LIKE 'Администратор' THEN
    	INSERT INTO admins 
        VALUES(null,NEW.user_id);
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `new_user_options` AFTER INSERT ON `users` FOR EACH ROW INSERT INTO options VALUES(NEW.user_id,
42,'#212529',16,'#212529',1,1,1)
$$
DELIMITER ;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `absenteeismes`
--
ALTER TABLE `absenteeismes`
  ADD PRIMARY KEY (`absenteeismes_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `attendance_id` (`attendance_id`);

--
-- Индексы таблицы `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`achievement_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Индексы таблицы `additional_educations`
--
ALTER TABLE `additional_educations`
  ADD PRIMARY KEY (`ae_id`),
  ADD KEY `ae_lecturer_id` (`ae_lecturer_id`);

--
-- Индексы таблицы `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`announcement_id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `announcement_type` (`announcement_type`);

--
-- Индексы таблицы `announcement_types`
--
ALTER TABLE `announcement_types`
  ADD PRIMARY KEY (`announcement_type_id`);

--
-- Индексы таблицы `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`attendance_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Индексы таблицы `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `ae_id` (`ae_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Индексы таблицы `deductions`
--
ALTER TABLE `deductions`
  ADD PRIMARY KEY (`deduction_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Индексы таблицы `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`),
  ADD UNIQUE KEY `department_name` (`department_name`),
  ADD UNIQUE KEY `department_address` (`department_address`),
  ADD UNIQUE KEY `department_abbreviated` (`department_abbreviated`);

--
-- Индексы таблицы `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`document_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Индексы таблицы `duty_schedule`
--
ALTER TABLE `duty_schedule`
  ADD PRIMARY KEY (`ds_id`),
  ADD KEY `second_student_id` (`second_student_id`),
  ADD KEY `first_student_id` (`first_student_id`) USING BTREE,
  ADD KEY `group_id` (`group_id`);

--
-- Индексы таблицы `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `event_type_id` (`event_type_id`);

--
-- Индексы таблицы `event_types`
--
ALTER TABLE `event_types`
  ADD PRIMARY KEY (`event_type_id`);

--
-- Индексы таблицы `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`gallery_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Индексы таблицы `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`) USING BTREE,
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `id_spetiality` (`spetiality_id`),
  ADD KEY `tutor_id` (`head_id`);

--
-- Индексы таблицы `group_chat`
--
ALTER TABLE `group_chat`
  ADD PRIMARY KEY (`chat_id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_group` (`id_group`);

--
-- Индексы таблицы `heads`
--
ALTER TABLE `heads`
  ADD PRIMARY KEY (`head_id`) USING BTREE,
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `individual_works`
--
ALTER TABLE `individual_works`
  ADD PRIMARY KEY (`iw_id`),
  ADD KEY `iw_type_id` (`iw_type_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Индексы таблицы `individual_work_types`
--
ALTER TABLE `individual_work_types`
  ADD PRIMARY KEY (`iw_type_id`);

--
-- Индексы таблицы `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`option_id`),
  ADD KEY `option_login` (`option_id`),
  ADD KEY `theme_id` (`theme_id`);

--
-- Индексы таблицы `parents`
--
ALTER TABLE `parents`
  ADD PRIMARY KEY (`parent_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Индексы таблицы `passports`
--
ALTER TABLE `passports`
  ADD PRIMARY KEY (`passport_id`),
  ADD KEY `id_student` (`student_id`);

--
-- Индексы таблицы `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Индексы таблицы `spetialities`
--
ALTER TABLE `spetialities`
  ADD PRIMARY KEY (`spetiality_id`),
  ADD KEY `spetiality_profession_id` (`spetiality_profession_id`);

--
-- Индексы таблицы `spetiality_professions`
--
ALTER TABLE `spetiality_professions`
  ADD PRIMARY KEY (`spetiality_profession_id`);

--
-- Индексы таблицы `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `group_id` (`group_id`) USING BTREE,
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`theme_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_login` (`user_login`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `absenteeismes`
--
ALTER TABLE `absenteeismes`
  MODIFY `absenteeismes_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `achievements`
--
ALTER TABLE `achievements`
  MODIFY `achievement_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `additional_educations`
--
ALTER TABLE `additional_educations`
  MODIFY `ae_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `announcements`
--
ALTER TABLE `announcements`
  MODIFY `announcement_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `announcement_types`
--
ALTER TABLE `announcement_types`
  MODIFY `announcement_type_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `attendance`
--
ALTER TABLE `attendance`
  MODIFY `attendance_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `deductions`
--
ALTER TABLE `deductions`
  MODIFY `deduction_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `documents`
--
ALTER TABLE `documents`
  MODIFY `document_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `duty_schedule`
--
ALTER TABLE `duty_schedule`
  MODIFY `ds_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `event_types`
--
ALTER TABLE `event_types`
  MODIFY `event_type_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `gallery`
--
ALTER TABLE `gallery`
  MODIFY `gallery_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `group_chat`
--
ALTER TABLE `group_chat`
  MODIFY `chat_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `heads`
--
ALTER TABLE `heads`
  MODIFY `head_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `individual_works`
--
ALTER TABLE `individual_works`
  MODIFY `iw_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `individual_work_types`
--
ALTER TABLE `individual_work_types`
  MODIFY `iw_type_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `parents`
--
ALTER TABLE `parents`
  MODIFY `parent_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `passports`
--
ALTER TABLE `passports`
  MODIFY `passport_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `reports`
--
ALTER TABLE `reports`
  MODIFY `report_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT для таблицы `spetialities`
--
ALTER TABLE `spetialities`
  MODIFY `spetiality_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `spetiality_professions`
--
ALTER TABLE `spetiality_professions`
  MODIFY `spetiality_profession_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `themes`
--
ALTER TABLE `themes`
  MODIFY `theme_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `absenteeismes`
--
ALTER TABLE `absenteeismes`
  ADD CONSTRAINT `absenteeismes_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `absenteeismes_ibfk_2` FOREIGN KEY (`attendance_id`) REFERENCES `attendance` (`attendance_id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `achievements`
--
ALTER TABLE `achievements`
  ADD CONSTRAINT `achievements_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `additional_educations`
--
ALTER TABLE `additional_educations`
  ADD CONSTRAINT `additional_educations_ibfk_1` FOREIGN KEY (`ae_lecturer_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcement_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `announcement_ibfk_2` FOREIGN KEY (`announcement_type`) REFERENCES `announcement_types` (`announcement_type_id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`ae_id`) REFERENCES `additional_educations` (`ae_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `deductions`
--
ALTER TABLE `deductions`
  ADD CONSTRAINT `deductions_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `duty_schedule`
--
ALTER TABLE `duty_schedule`
  ADD CONSTRAINT `duty_schedule_ibfk_1` FOREIGN KEY (`first_student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `duty_schedule_ibfk_2` FOREIGN KEY (`second_student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `duty_schedule_ibfk_3` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`);

--
-- Ограничения внешнего ключа таблицы `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`event_type_id`) REFERENCES `event_types` (`event_type_id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `gallery`
--
ALTER TABLE `gallery`
  ADD CONSTRAINT `gallery_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `groups_ibfk_2` FOREIGN KEY (`spetiality_id`) REFERENCES `spetialities` (`spetiality_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `groups_ibfk_3` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `groups_ibfk_4` FOREIGN KEY (`head_id`) REFERENCES `heads` (`head_id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `group_chat`
--
ALTER TABLE `group_chat`
  ADD CONSTRAINT `group_chat_ibfk_1` FOREIGN KEY (`id_group`) REFERENCES `groups` (`group_id`),
  ADD CONSTRAINT `group_chat_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`user_id`);

--
-- Ограничения внешнего ключа таблицы `heads`
--
ALTER TABLE `heads`
  ADD CONSTRAINT `heads_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `individual_works`
--
ALTER TABLE `individual_works`
  ADD CONSTRAINT `individual_works_ibfk_1` FOREIGN KEY (`iw_type_id`) REFERENCES `individual_work_types` (`iw_type_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `individual_works_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`option_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `options_ibfk_2` FOREIGN KEY (`theme_id`) REFERENCES `themes` (`theme_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `parents`
--
ALTER TABLE `parents`
  ADD CONSTRAINT `parents_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `passports`
--
ALTER TABLE `passports`
  ADD CONSTRAINT `passports_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `spetialities`
--
ALTER TABLE `spetialities`
  ADD CONSTRAINT `spetialities_ibfk_1` FOREIGN KEY (`spetiality_profession_id`) REFERENCES `spetiality_professions` (`spetiality_profession_id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_3` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

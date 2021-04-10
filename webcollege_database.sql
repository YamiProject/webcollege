-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 10 2021 г., 22:38
-- Версия сервера: 10.3.22-MariaDB
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `webcollege_database`
--

-- --------------------------------------------------------

--
-- Структура таблицы `absenteeismes`
--

CREATE TABLE `absenteeismes` (
  `absenteeismes_id` int(11) NOT NULL,
  `attendance_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `absenteeismes_date` date NOT NULL,
  `absenteeismes_type` enum('Н','З') NOT NULL,
  `absenteeismes_file` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `absenteeismes`
--

INSERT INTO `absenteeismes` (`absenteeismes_id`, `attendance_id`, `student_id`, `absenteeismes_date`, `absenteeismes_type`, `absenteeismes_file`) VALUES
(1, 1, 1, '2021-04-05', 'Н', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `additional_educations`
--

CREATE TABLE `additional_educations` (
  `ae_id` int(11) NOT NULL,
  `ae_name` varchar(300) NOT NULL,
  `ae_lecturer_id` int(11) NOT NULL,
  `ae_beg_date` date NOT NULL,
  `ae_end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `announcements`
--

CREATE TABLE `announcements` (
  `announcement_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `announcement_data` datetime NOT NULL,
  `announcement_header` varchar(300) NOT NULL,
  `announcement_type` int(11) NOT NULL,
  `announcement_file` text DEFAULT NULL,
  `announcement_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `announcements`
--

INSERT INTO `announcements` (`announcement_id`, `group_id`, `announcement_data`, `announcement_header`, `announcement_type`, `announcement_file`, `announcement_text`) VALUES
(26, 1, '2021-04-07 12:23:32', '2e1e1e12', 2, NULL, 'wadawdadadw'),
(27, 1, '2021-04-07 12:24:19', 'fafaf', 2, NULL, 'fafaf'),
(28, 1, '2021-04-07 12:24:47', 'dsad1213', 2, NULL, '213'),
(29, 1, '2021-04-10 22:25:17', '21313', 1, NULL, '12313');

-- --------------------------------------------------------

--
-- Структура таблицы `announcement_types`
--

CREATE TABLE `announcement_types` (
  `announcement_type_id` int(11) NOT NULL,
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
  `attendance_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `attendance_date` date NOT NULL,
  `attendance_present` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `attendance`
--

INSERT INTO `attendance` (`attendance_id`, `group_id`, `attendance_date`, `attendance_present`) VALUES
(1, 1, '2021-04-05', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `ae_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `deductions`
--

CREATE TABLE `deductions` (
  `deduction_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `deduction_date` date NOT NULL,
  `deduction_reasone` text NOT NULL,
  `deduction_file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
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
  `document_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `document_name` varchar(200) NOT NULL,
  `document_number` varchar(40) NOT NULL,
  `document_scan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `duty_schedule`
--

CREATE TABLE `duty_schedule` (
  `ds_id` int(11) NOT NULL,
  `ds_date` date NOT NULL,
  `first_student_id` int(11) NOT NULL,
  `second_student_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `event_type_id` int(11) NOT NULL,
  `event_description` text NOT NULL,
  `event_date` date NOT NULL,
  `event_archive` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `event_types`
--

CREATE TABLE `event_types` (
  `event_type_id` int(11) NOT NULL,
  `event_type_name` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `groups`
--

CREATE TABLE `groups` (
  `group_id` int(11) NOT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `head_id` int(11) DEFAULT NULL,
  `department_id` int(11) NOT NULL,
  `spetiality_id` int(11) NOT NULL,
  `group_beg_education_date` date NOT NULL,
  `group_end_education_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `groups`
--

INSERT INTO `groups` (`group_id`, `teacher_id`, `head_id`, `department_id`, `spetiality_id`, `group_beg_education_date`, `group_end_education_date`) VALUES
(1, 1, 4, 1, 1, '2021-03-04', '2022-05-31');

-- --------------------------------------------------------

--
-- Структура таблицы `heads`
--

CREATE TABLE `heads` (
  `head_id` int(11) NOT NULL,
  `head_login` varchar(300) NOT NULL,
  `head_password` varchar(300) NOT NULL,
  `head_sur_name` varchar(200) NOT NULL,
  `head_name` varchar(200) NOT NULL,
  `head_mid_name` varchar(200) DEFAULT NULL,
  `head_number` varchar(13) NOT NULL,
  `head_birth_date` date NOT NULL,
  `head_sex` enum('М','Ж') NOT NULL,
  `head_photo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `heads`
--

INSERT INTO `heads` (`head_id`, `head_login`, `head_password`, `head_sur_name`, `head_name`, `head_mid_name`, `head_number`, `head_birth_date`, `head_sex`, `head_photo`) VALUES
(4, '$maksi', '1111', 'Максимова', 'Татьяна', 'Викторовна', '22222222222', '2021-03-10', 'Ж', '');

--
-- Триггеры `heads`
--
DELIMITER $$
CREATE TRIGGER `new_user_tutor` BEFORE INSERT ON `heads` FOR EACH ROW INSERT IGNORE INTO  users 
VALUES(null,new.tutor_login,'Тьютор')
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_user_tutor` BEFORE UPDATE ON `heads` FOR EACH ROW UPDATE users SET user_login=NEW.tutor_login
WHERE user_login=OLD.tutor_login
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `individual_works`
--

CREATE TABLE `individual_works` (
  `iw_id` int(11) NOT NULL,
  `iw_type_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `iw_reasone` text NOT NULL,
  `iw_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `individual_work_types`
--

CREATE TABLE `individual_work_types` (
  `iw_type_id` int(11) NOT NULL,
  `iw_type_name` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `options`
--

CREATE TABLE `options` (
  `option_id` int(11) NOT NULL,
  `h_size` int(3) NOT NULL,
  `h_color` varchar(300) NOT NULL,
  `font_size` int(3) NOT NULL,
  `font_color` varchar(100) NOT NULL,
  `theme_id` int(11) NOT NULL,
  `logo_d` tinyint(1) NOT NULL,
  `app_name_d` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `options`
--

INSERT INTO `options` (`option_id`, `h_size`, `h_color`, `font_size`, `font_color`, `theme_id`, `logo_d`, `app_name_d`) VALUES
(6, 42, '#212529', 16, '#212529', 1, 1, 1),
(7, 42, '#212529', 16, '#212529', 1, 1, 1),
(8, 42, '#212529', 16, '#212529', 1, 1, 1),
(15, 42, '#212529', 16, '#212529', 1, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `parents`
--

CREATE TABLE `parents` (
  `parent_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
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
  `passport_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `passport_series` int(4) NOT NULL,
  `passport_number` int(6) NOT NULL,
  `passport_data_of_issue` date NOT NULL,
  `passport_address` varchar(250) NOT NULL,
  `passport_issued_by` varchar(250) NOT NULL,
  `passport_scan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `portfolio`
--

CREATE TABLE `portfolio` (
  `portfolio_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `portfolio_scan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `reports`
--

CREATE TABLE `reports` (
  `report_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `report_reasone` text NOT NULL,
  `report_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `reports`
--

INSERT INTO `reports` (`report_id`, `creator_id`, `group_id`, `report_reasone`, `report_date`) VALUES
(2, 1, 1, 'fafaf', '2021-03-27'),
(3, 1, 1, 'афафаф', '2021-03-27'),
(4, 1, 1, 'faff', '2021-03-27'),
(5, 1, 1, 'fasfaf', '2021-03-27'),
(6, 1, 1, 'fafaf', '2021-03-27'),
(7, 1, 1, 'fafaf', '2021-03-27');

-- --------------------------------------------------------

--
-- Структура таблицы `spetialities`
--

CREATE TABLE `spetialities` (
  `spetiality_id` int(11) NOT NULL,
  `spetiality_profession_id` int(11) NOT NULL,
  `spetiality_abbreviated` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `spetialities`
--

INSERT INTO `spetialities` (`spetiality_id`, `spetiality_profession_id`, `spetiality_abbreviated`) VALUES
(1, 1, '18ИС-13');

-- --------------------------------------------------------

--
-- Структура таблицы `spetiality_professions`
--

CREATE TABLE `spetiality_professions` (
  `spetiality_profession_id` int(11) NOT NULL,
  `spetiality_full_name` varchar(200) NOT NULL,
  `spetiality_profession` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `spetiality_professions`
--

INSERT INTO `spetiality_professions` (`spetiality_profession_id`, `spetiality_full_name`, `spetiality_profession`) VALUES
(1, 'Информационные системы и программирование', 'Разработка веб и мультимедиа');

-- --------------------------------------------------------

--
-- Структура таблицы `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `student_login` varchar(300) NOT NULL,
  `student_password` varchar(300) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
  `student_sur_name` varchar(200) NOT NULL,
  `student_name` varchar(200) NOT NULL,
  `student_mid_name` varchar(200) DEFAULT NULL,
  `student_number` varchar(13) NOT NULL,
  `student_birth_date` date NOT NULL,
  `student_sex` enum('М','Ж','Не определено','') NOT NULL,
  `student_disabled` tinyint(1) NOT NULL,
  `student_photo` text NOT NULL,
  `student_headman` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `students`
--

INSERT INTO `students` (`student_id`, `student_login`, `student_password`, `group_id`, `student_sur_name`, `student_name`, `student_mid_name`, `student_number`, `student_birth_date`, `student_sex`, `student_disabled`, `student_photo`, `student_headman`) VALUES
(1, 'admin', '1234', 1, 'Костин', 'Владислав', 'Константинович', '1111111111', '2021-03-16', 'М', 1, '', 1),
(2, 'aaa', 'a12', 1, 'Абдулберов', 'Тимур', 'Рубенович', '88888888888', '2020-09-27', 'М', 1, '', 0);

--
-- Триггеры `students`
--
DELIMITER $$
CREATE TRIGGER `new_user_student` BEFORE INSERT ON `students` FOR EACH ROW INSERT IGNORE INTO  users 
VALUES(null,new.student_login,'Студент')
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_user_student` BEFORE UPDATE ON `students` FOR EACH ROW UPDATE users SET user_login=NEW.student_login
WHERE user_login=OLD.student_login
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(11) NOT NULL,
  `teacher_login` varchar(300) NOT NULL,
  `teacher_password` varchar(300) NOT NULL,
  `teacher_sur_name` varchar(200) NOT NULL,
  `teacher_name` varchar(200) NOT NULL,
  `teacher_mid_name` varchar(200) DEFAULT NULL,
  `teacher_number` varchar(13) NOT NULL,
  `teacher_birth_date` date NOT NULL,
  `teacher_sex` enum('М','Ж') NOT NULL,
  `teacher_photo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `teacher_login`, `teacher_password`, `teacher_sur_name`, `teacher_name`, `teacher_mid_name`, `teacher_number`, `teacher_birth_date`, `teacher_sex`, `teacher_photo`) VALUES
(1, '@kiselova12', '123', 'Киселёва', 'Светлана', 'Владимировна', '1111111111', '2021-03-11', 'Ж', '');

--
-- Триггеры `teachers`
--
DELIMITER $$
CREATE TRIGGER `new_user_courator` BEFORE INSERT ON `teachers` FOR EACH ROW INSERT IGNORE INTO  users 
VALUES(null,new.courator_login,'Куратор')
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_user_courator` BEFORE UPDATE ON `teachers` FOR EACH ROW UPDATE users SET user_login=NEW.courator_login
WHERE user_login=OLD.courator_login
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `themes`
--

CREATE TABLE `themes` (
  `theme_id` int(11) NOT NULL,
  `theme_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `themes`
--

INSERT INTO `themes` (`theme_id`, `theme_name`) VALUES
(1, 'По умолчанию');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_login` varchar(300) NOT NULL,
  `user_role` enum('Студент','Куратор','Тьютор','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `user_login`, `user_role`) VALUES
(6, 'admin', 'Студент'),
(7, '$maksi', 'Тьютор'),
(8, '@kiselova12', 'Куратор'),
(15, 'aaa', 'Студент');

--
-- Триггеры `users`
--
DELIMITER $$
CREATE TRIGGER `new_user_options` AFTER INSERT ON `users` FOR EACH ROW INSERT IGNORE INTO options
  VALUES (NEW.user_id,42,'#212529',16,'#212529',1,1,1,1)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_users_options` AFTER UPDATE ON `users` FOR EACH ROW UPDATE options SET option_id=NEW.user_id
WHERE option_id=OLD.user_id
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
  ADD KEY `first_student_id` (`first_student_id`) USING BTREE;

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
-- Индексы таблицы `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`) USING BTREE,
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `id_spetiality` (`spetiality_id`),
  ADD KEY `tutor_id` (`head_id`);

--
-- Индексы таблицы `heads`
--
ALTER TABLE `heads`
  ADD PRIMARY KEY (`head_id`,`head_login`),
  ADD KEY `tutor_login` (`head_login`);

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
  ADD UNIQUE KEY `passport_series` (`passport_series`),
  ADD UNIQUE KEY `passport_number` (`passport_number`),
  ADD KEY `id_student` (`student_id`);

--
-- Индексы таблицы `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`portfolio_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Индексы таблицы `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `creator_id` (`creator_id`);

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
  ADD PRIMARY KEY (`student_id`,`student_login`),
  ADD KEY `group_id` (`group_id`) USING BTREE,
  ADD KEY `students_ibfk_2` (`student_login`);

--
-- Индексы таблицы `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`,`teacher_login`),
  ADD KEY `courator_login` (`teacher_login`);

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
  MODIFY `absenteeismes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `additional_educations`
--
ALTER TABLE `additional_educations`
  MODIFY `ae_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `announcements`
--
ALTER TABLE `announcements`
  MODIFY `announcement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT для таблицы `announcement_types`
--
ALTER TABLE `announcement_types`
  MODIFY `announcement_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `attendance`
--
ALTER TABLE `attendance`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `deductions`
--
ALTER TABLE `deductions`
  MODIFY `deduction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `documents`
--
ALTER TABLE `documents`
  MODIFY `document_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `duty_schedule`
--
ALTER TABLE `duty_schedule`
  MODIFY `ds_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `event_types`
--
ALTER TABLE `event_types`
  MODIFY `event_type_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `heads`
--
ALTER TABLE `heads`
  MODIFY `head_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `individual_works`
--
ALTER TABLE `individual_works`
  MODIFY `iw_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `individual_work_types`
--
ALTER TABLE `individual_work_types`
  MODIFY `iw_type_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `parents`
--
ALTER TABLE `parents`
  MODIFY `parent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `passports`
--
ALTER TABLE `passports`
  MODIFY `passport_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `portfolio_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `reports`
--
ALTER TABLE `reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `spetialities`
--
ALTER TABLE `spetialities`
  MODIFY `spetiality_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `spetiality_professions`
--
ALTER TABLE `spetiality_professions`
  MODIFY `spetiality_profession_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `themes`
--
ALTER TABLE `themes`
  MODIFY `theme_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `absenteeismes`
--
ALTER TABLE `absenteeismes`
  ADD CONSTRAINT `absenteeismes_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `absenteeismes_ibfk_2` FOREIGN KEY (`attendance_id`) REFERENCES `attendance` (`attendance_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `additional_educations`
--
ALTER TABLE `additional_educations`
  ADD CONSTRAINT `additional_educations_ibfk_1` FOREIGN KEY (`ae_lecturer_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcement_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `announcement_ibfk_2` FOREIGN KEY (`announcement_type`) REFERENCES `announcement_types` (`announcement_type_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`ae_id`) REFERENCES `additional_educations` (`ae_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `deductions`
--
ALTER TABLE `deductions`
  ADD CONSTRAINT `deductions_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `duty_schedule`
--
ALTER TABLE `duty_schedule`
  ADD CONSTRAINT `duty_schedule_ibfk_1` FOREIGN KEY (`first_student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `duty_schedule_ibfk_2` FOREIGN KEY (`second_student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`event_type_id`) REFERENCES `event_types` (`event_type_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `groups_ibfk_2` FOREIGN KEY (`spetiality_id`) REFERENCES `spetialities` (`spetiality_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `groups_ibfk_3` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `groups_ibfk_4` FOREIGN KEY (`head_id`) REFERENCES `heads` (`head_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `heads`
--
ALTER TABLE `heads`
  ADD CONSTRAINT `heads_ibfk_1` FOREIGN KEY (`head_login`) REFERENCES `users` (`user_login`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `individual_works`
--
ALTER TABLE `individual_works`
  ADD CONSTRAINT `individual_works_ibfk_1` FOREIGN KEY (`iw_type_id`) REFERENCES `individual_work_types` (`iw_type_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `individual_works_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`option_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `parents`
--
ALTER TABLE `parents`
  ADD CONSTRAINT `parents_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `passports`
--
ALTER TABLE `passports`
  ADD CONSTRAINT `passports_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `portfolio`
--
ALTER TABLE `portfolio`
  ADD CONSTRAINT `portfolio_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_3` FOREIGN KEY (`creator_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `spetialities`
--
ALTER TABLE `spetialities`
  ADD CONSTRAINT `spetialities_ibfk_1` FOREIGN KEY (`spetiality_profession_id`) REFERENCES `spetiality_professions` (`spetiality_profession_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`student_login`) REFERENCES `users` (`user_login`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `students_ibfk_3` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`teacher_login`) REFERENCES `users` (`user_login`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Фев 02 2021 г., 16:01
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
-- База данных: `webcollege_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `absenteeismes`
--

CREATE TABLE `absenteeismes` (
  `absenteeismes_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `absenteeismes_date` date NOT NULL,
  `absenteeismes_file` text DEFAULT NULL
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

-- --------------------------------------------------------

--
-- Структура таблицы `desciplines`
--

CREATE TABLE `desciplines` (
  `descipline_id` varchar(8) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `descipline_name` varchar(30) NOT NULL,
  `descipline_hours` tinyint(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
-- Структура таблицы `grade_sheet`
--

CREATE TABLE `grade_sheet` (
  `gs_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `descipline_id` varchar(8) DEFAULT NULL,
  `tos_id` int(11) NOT NULL,
  `gs_date` date NOT NULL,
  `gs_lesson_number` tinyint(1) DEFAULT NULL,
  `gs_score` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `groups`
--

CREATE TABLE `groups` (
  `group_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `spetiality_id` int(11) NOT NULL,
  `group_beg_education_date` date NOT NULL,
  `group_end_education_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `offsite_events`
--

CREATE TABLE `offsite_events` (
  `oe_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `oe_date` date NOT NULL,
  `oe_name` varchar(300) NOT NULL,
  `oe_people` int(11) NOT NULL,
  `oe_archive` text NOT NULL,
  `oe_address` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `parent_role` varchar(30) NOT NULL,
  `parent_number` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `passports`
--

CREATE TABLE `passports` (
  `passport_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `passport_series` tinyint(4) NOT NULL,
  `passport_number` tinyint(6) NOT NULL,
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
  `portfolio_scan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `spetialities`
--

CREATE TABLE `spetialities` (
  `spetiality_id` int(11) NOT NULL,
  `spetiality_full_name` varchar(200) NOT NULL,
  `spetiality_abbreviated` varchar(20) NOT NULL,
  `spetiality_profession` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `student_sur_name` varchar(200) NOT NULL,
  `student_name` varchar(200) NOT NULL,
  `student_mid_name` varchar(200) DEFAULT NULL,
  `student_number` varchar(13) NOT NULL,
  `student_birth_date` date NOT NULL,
  `student_sex` tinytext NOT NULL,
  `student_disabled` tinyint(1) NOT NULL,
  `student_photo` text NOT NULL,
  `student_headman` tinyint(1) NOT NULL,
  `student_login` varchar(300) NOT NULL,
  `student_password` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(11) NOT NULL,
  `teacher_sur_name` varchar(200) NOT NULL,
  `teacher_name` varchar(200) NOT NULL,
  `teacher_mid_name` varchar(200) DEFAULT NULL,
  `teacher_number` varchar(13) NOT NULL,
  `teacher_birth_date` date NOT NULL,
  `teacher_login` varchar(300) NOT NULL,
  `teacher_password` varchar(300) NOT NULL,
  `teacher_accs_lvl` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `type_of_score`
--

CREATE TABLE `type_of_score` (
  `tos_id` int(11) NOT NULL,
  `tos_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `absenteeismes`
--
ALTER TABLE `absenteeismes`
  ADD PRIMARY KEY (`absenteeismes_id`),
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
-- Индексы таблицы `desciplines`
--
ALTER TABLE `desciplines`
  ADD PRIMARY KEY (`descipline_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Индексы таблицы `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`document_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Индексы таблицы `grade_sheet`
--
ALTER TABLE `grade_sheet`
  ADD PRIMARY KEY (`gs_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `descipline_id` (`descipline_id`),
  ADD KEY `tos_id` (`tos_id`);

--
-- Индексы таблицы `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`) USING BTREE,
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `id_spetiality` (`spetiality_id`);

--
-- Индексы таблицы `offsite_events`
--
ALTER TABLE `offsite_events`
  ADD PRIMARY KEY (`oe_id`),
  ADD KEY `group_id` (`group_id`);

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
-- Индексы таблицы `spetialities`
--
ALTER TABLE `spetialities`
  ADD PRIMARY KEY (`spetiality_id`);

--
-- Индексы таблицы `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `student_login` (`student_login`),
  ADD KEY `group_id` (`group_id`) USING BTREE;

--
-- Индексы таблицы `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`),
  ADD UNIQUE KEY `teacher_login` (`teacher_login`);

--
-- Индексы таблицы `type_of_score`
--
ALTER TABLE `type_of_score`
  ADD PRIMARY KEY (`tos_id`),
  ADD UNIQUE KEY `tos_name` (`tos_name`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `absenteeismes`
--
ALTER TABLE `absenteeismes`
  MODIFY `absenteeismes_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `deductions`
--
ALTER TABLE `deductions`
  MODIFY `deduction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `documents`
--
ALTER TABLE `documents`
  MODIFY `document_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `grade_sheet`
--
ALTER TABLE `grade_sheet`
  MODIFY `gs_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `offsite_events`
--
ALTER TABLE `offsite_events`
  MODIFY `oe_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `parents`
--
ALTER TABLE `parents`
  MODIFY `parent_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `passports`
--
ALTER TABLE `passports`
  MODIFY `passport_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `portfolio_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `spetialities`
--
ALTER TABLE `spetialities`
  MODIFY `spetiality_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `type_of_score`
--
ALTER TABLE `type_of_score`
  MODIFY `tos_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `absenteeismes`
--
ALTER TABLE `absenteeismes`
  ADD CONSTRAINT `absenteeismes_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `deductions`
--
ALTER TABLE `deductions`
  ADD CONSTRAINT `deductions_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `desciplines`
--
ALTER TABLE `desciplines`
  ADD CONSTRAINT `desciplines_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `grade_sheet`
--
ALTER TABLE `grade_sheet`
  ADD CONSTRAINT `grade_sheet_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `grade_sheet_ibfk_2` FOREIGN KEY (`tos_id`) REFERENCES `type_of_score` (`tos_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `grade_sheet_ibfk_3` FOREIGN KEY (`descipline_id`) REFERENCES `desciplines` (`descipline_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `groups_ibfk_2` FOREIGN KEY (`spetiality_id`) REFERENCES `spetialities` (`spetiality_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `groups_ibfk_3` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `offsite_events`
--
ALTER TABLE `offsite_events`
  ADD CONSTRAINT `offsite_events_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `parents`
--
ALTER TABLE `parents`
  ADD CONSTRAINT `parents_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `passports`
--
ALTER TABLE `passports`
  ADD CONSTRAINT `passports_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `portfolio`
--
ALTER TABLE `portfolio`
  ADD CONSTRAINT `portfolio_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

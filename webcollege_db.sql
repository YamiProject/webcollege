-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Фев 24 2021 г., 20:00
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
-- Структура таблицы `additional_educations`
--

CREATE TABLE `additional_educations` (
  `ae_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `ae_name` varchar(300) NOT NULL,
  `ae_lecturer` varchar(300) NOT NULL,
  `ae_beg_date` date NOT NULL,
  `ae_end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `courators`
--

CREATE TABLE `courators` (
  `courator_id` int(11) NOT NULL,
  `courator_sur_name` varchar(200) NOT NULL,
  `courator_name` varchar(200) NOT NULL,
  `courator_mid_name` varchar(200) DEFAULT NULL,
  `courator_number` varchar(13) NOT NULL,
  `courator_birth_date` date NOT NULL,
  `courator_login` varchar(300) NOT NULL,
  `courator_password` varchar(300) NOT NULL,
  `courator_accs_lvl` tinyint(1) NOT NULL,
  `courator_photo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `student_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `event_type_id` int(11) NOT NULL,
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
-- Структура таблицы `feed`
--

CREATE TABLE `feed` (
  `feed_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `feed_data` datetime NOT NULL,
  `feed_text` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `groups`
--

CREATE TABLE `groups` (
  `group_id` int(11) NOT NULL,
  `curator_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `spetiality_id` int(11) NOT NULL,
  `group_beg_education_date` date NOT NULL,
  `group_end_education_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
-- Структура таблицы `parents`
--

CREATE TABLE `parents` (
  `parent_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `parent_sur_name` varchar(200) NOT NULL,
  `parent_name` varchar(200) NOT NULL,
  `parent_mid_name` varchar(200) DEFAULT NULL,
  `parent_role` varchar(30) NOT NULL,
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
-- Структура таблицы `reports`
--

CREATE TABLE `reports` (
  `report_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `report_reasone` text NOT NULL,
  `teacher_name` varchar(400) NOT NULL
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
-- Индексы таблицы `additional_educations`
--
ALTER TABLE `additional_educations`
  ADD PRIMARY KEY (`ae_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Индексы таблицы `courators`
--
ALTER TABLE `courators`
  ADD PRIMARY KEY (`courator_id`),
  ADD UNIQUE KEY `teacher_login` (`courator_login`);

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
  ADD KEY `student_id` (`student_id`);

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
-- Индексы таблицы `feed`
--
ALTER TABLE `feed`
  ADD PRIMARY KEY (`feed_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Индексы таблицы `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`) USING BTREE,
  ADD KEY `teacher_id` (`curator_id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `id_spetiality` (`spetiality_id`);

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
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `absenteeismes`
--
ALTER TABLE `absenteeismes`
  MODIFY `absenteeismes_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `additional_educations`
--
ALTER TABLE `additional_educations`
  MODIFY `ae_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `courators`
--
ALTER TABLE `courators`
  MODIFY `courator_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT для таблицы `feed`
--
ALTER TABLE `feed`
  MODIFY `feed_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT для таблицы `reports`
--
ALTER TABLE `reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;

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
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `absenteeismes`
--
ALTER TABLE `absenteeismes`
  ADD CONSTRAINT `absenteeismes_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `additional_educations`
--
ALTER TABLE `additional_educations`
  ADD CONSTRAINT `additional_educations_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`ae_id`) REFERENCES `additional_educations` (`ae_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `deductions`
--
ALTER TABLE `deductions`
  ADD CONSTRAINT `deductions_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `duty_schedule`
--
ALTER TABLE `duty_schedule`
  ADD CONSTRAINT `duty_schedule_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`event_type_id`) REFERENCES `event_types` (`event_type_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `feed`
--
ALTER TABLE `feed`
  ADD CONSTRAINT `feed_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`curator_id`) REFERENCES `courators` (`courator_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `groups_ibfk_2` FOREIGN KEY (`spetiality_id`) REFERENCES `spetialities` (`spetiality_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `groups_ibfk_3` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `individual_works`
--
ALTER TABLE `individual_works`
  ADD CONSTRAINT `individual_works_ibfk_1` FOREIGN KEY (`iw_type_id`) REFERENCES `individual_work_types` (`iw_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `individual_works_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Ограничения внешнего ключа таблицы `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

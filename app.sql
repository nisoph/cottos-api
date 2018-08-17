-- Host: localhost    Database: konddify_db
-- ------------------------------------------------------
-- Server version	5.7.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth`
--

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `konddify_db` DEFAULT CHARACTER SET utf8 ;
USE `konddify_db` ;

-- -----------------------------------------------------
-- Table `roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `roles` ;

CREATE TABLE IF NOT EXISTS `roles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;

INSERT INTO `users` VALUES (1,1,'Super Admin','Cottos','sadmin@konddify.com','https://picsum.photos/150/150/?image=58',0,'2018-07-29 13:38:34'),
(2,2,'Aministrador','Cottos','administrador@konddify.com','https://picsum.photos/150/150/?image=59',0,'2018-08-07 20:29:48'),
(3,3,'Residente','Cottos','residente@konddify.com','https://picsum.photos/150/150/?image=60',0,'2018-08-07 20:29:48'),
(4,4,'Seguridad','Cottos','seguridad@konddify.com','https://picsum.photos/150/150/?image=61',0,'2018-08-07 20:30:14');


-- -----------------------------------------------------
-- Table `usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `usuarios` ;

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_rol` INT(11) NOT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `perfil_img` VARCHAR(150) NULL DEFAULT NULL,
  `estatus` TINYINT(1) NOT NULL DEFAULT '0',
  `creado` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_USER_ROLES`
    FOREIGN KEY (`id_rol`)
    REFERENCES `roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `auth`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `auth` ;

CREATE TABLE IF NOT EXISTS `auth` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` INT(11) NOT NULL,
  `contrasena` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_id`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;

INSERT INTO `auth` VALUES (1,1,'25d55ad283aa400af464c76d713c07ad'),
(2,2,'25d55ad283aa400af464c76d713c07ad'),
(3,3,'25d55ad283aa400af464c76d713c07ad'),
(4,4,'25d55ad283aa400af464c76d713c07ad');


-- -----------------------------------------------------
-- Table `cotos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cotos` ;

CREATE TABLE IF NOT EXISTS `cotos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `direccion` VARCHAR(150) NOT NULL,
  `numero_ext` VARCHAR(45) NOT NULL,
  `colonia` VARCHAR(45) NOT NULL,
  `coto_img` VARCHAR(150) NULL,
  `estado` VARCHAR(45) NOT NULL,
  `ciudad` VARCHAR(45) NOT NULL,
  `tel_contacto` VARCHAR(45) NOT NULL,
  `tel_emergencia` VARCHAR(45) NOT NULL,
  `status` TINYINT(1) NOT NULL DEFAULT '0',
  `creado` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cotos_admin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cotos_admin` ;

CREATE TABLE IF NOT EXISTS `cotos_admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_coto` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_COTOS_ADMIN-COTOS`
    FOREIGN KEY (`id_coto`)
    REFERENCES `cotos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_COTOS_ADMIN-USERS`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `propiedades`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `propiedades` ;

CREATE TABLE IF NOT EXISTS `propiedades` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_coto` INT NOT NULL,
  `id_propietario` INT NOT NULL,
  `calle` VARCHAR(150) NOT NULL,
  `numero_int` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_PROPIEDADES-COTOS`
    FOREIGN KEY (`id_coto`)
    REFERENCES `cotos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_PROPIEDADES-USERS`
    FOREIGN KEY (`id_propietario`)
    REFERENCES `usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

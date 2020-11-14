SET sql_mode = '';

DROP TABLE IF EXISTS `tarefas_bd`.`breno_enderecos`;
CREATE TABLE  `tarefas_bd`.`breno_enderecos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tpLogr` varchar(15) DEFAULT NULL,
  `logradouro` varchar(255) DEFAULT NULL,
  `bairro` varchar(255) DEFAULT NULL,
  `cidade` varchar(255) DEFAULT NULL,
  `uf` varchar(2) DEFAULT NULL,
  `createdAt` datetime,
  `updatedAt` datetime,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `tarefas_bd`.`usuarios`;
CREATE TABLE  `tarefas_bd`.`usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `createdAt` datetime,
  `updatedAt` datetime,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

INSERT INTO `tarefas_bd`.`usuarios`(nome,login,senha) VALUES ('Breno Bianardi','breno' ,'senhasegura');
INSERT INTO `tarefas_bd`.`usuarios`(nome,login,senha) VALUES ('Bruno Stoll','bruno' ,'supersenha');
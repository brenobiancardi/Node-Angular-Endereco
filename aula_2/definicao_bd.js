const Sequelize = require("sequelize");
const sequelize = new Sequelize("tarefas_bd", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(function () {
    console.log("Conectado com sucesso!");
  })
  .catch(function (erro) {
    console.log("Erro ao conectar ao banco de dados: " + erro);
    return;
  });

/* ##########################################
               DEFINIR ESTRUTURAS
   ########################################## */

const Usuario = sequelize.define("usuarios", {
  nome: { type: Sequelize.STRING },
  login: { type: Sequelize.STRING },
  senha: { type: Sequelize.STRING },
});

const Endereco = sequelize.define("breno_endereco", {
  tpLogr: { type: Sequelize.STRING(15) },
  logradouro: { type: Sequelize.STRING },
  bairro: { type: Sequelize.STRING },
  cidade: { type: Sequelize.STRING },
  uf: { type: Sequelize.STRING(2) },
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  Usuario: Usuario,
  Endereco: Endereco,
};

let sincronizarBD = false;
if (sincronizarBD) {
  Usuario.sync({ force: true });
  Endereco.sync({ force: true });
}
//  node definicao_bd.js

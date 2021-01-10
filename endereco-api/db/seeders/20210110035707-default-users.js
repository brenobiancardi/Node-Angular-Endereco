'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'usuarios',
      [
        {
          id: 1,
          tipo_usuario: 'default_admin',
          nome: 'Breno Biancardi',
          login: 'breno',
          senha: 'senhasegura',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          tipo_usuario: 'default_admin',
          nome: 'Bruno Stoll',
          login: 'bruno',
          senha: 'supersenha',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  },
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Teams', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      team_name: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Teams');
  },
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      home_team: {
        type: Sequelize.INTEGER
      },
      home_team_goals: {
        type: Sequelize.INTEGER
      },
      away_team: {
        type: Sequelize.INTEGER
      },
      away_team_goals: {
        type: Sequelize.INTEGER
      },
      in_progress: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  },
};
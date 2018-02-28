

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    score: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    totalscore: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    answers: {
      type: Sequelize.JSONB,
      defaultValue: {},
    },
    createdAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users'),
};
